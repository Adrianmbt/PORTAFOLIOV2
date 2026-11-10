import { useEffect, useRef, useState } from 'react';
import {
  answerQuestion,
  getSessionId,
  isRemoteEnabled,
  SUGGESTIONS,
} from '../lib/assistant';

const GREETING = {
  id: 'greeting',
  role: 'assistant',
  text: 'Hola. Soy el asistente de Adrián. Puedo contar su trayectoria, los sistemas que ha construido o cómo contactarlo. ¿Qué necesitas saber?',
};

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H10l-4.5 4v-4A2.5 2.5 0 0 1 4 12.5z" />
      <path d="M8 7.75h8M8 10.5h5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M6.5 10.5L12 5l5.5 5.5" />
    </svg>
  );
}

export default function Assistant({ open, onOpenChange }) {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(open);

  const panelRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const sessionRef = useRef(null);
  const pendingRef = useRef(false);

  useEffect(() => {
    let timer;

    if (open) {
      setMounted(true);
      timer = window.setTimeout(() => setShown(true), 20);
    } else {
      setShown(false);
      timer = window.setTimeout(() => setMounted(false), 200);
    }

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!shown) return undefined;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 140);
    return () => window.clearTimeout(timer);
  }, [shown]);

  useEffect(() => {
    if (!mounted) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onOpenChange(false);
    };

    const onPointerDown = (event) => {
      if (panelRef.current?.contains(event.target)) return;
      if (triggerRef.current?.contains(event.target)) return;
      onOpenChange(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [mounted, onOpenChange]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, pending, shown]);

  async function ask(raw) {
    const text = raw.trim();
    if (!text || pendingRef.current) return;

    if (!sessionRef.current) sessionRef.current = getSessionId();

    const userMessage = { id: `u-${Date.now()}`, role: 'user', text };
    setMessages((current) => [...current, userMessage]);
    setInput('');
    pendingRef.current = true;
    setPending(true);

    try {
      const result = await answerQuestion(text, sessionRef.current);
      setMessages((current) => [
        ...current,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: result.reply,
          sources: result.sources,
        },
      ]);
    } finally {
      pendingRef.current = false;
      setPending(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    ask(input);
  }

  const showSuggestions = messages.length <= 1 && !pending;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        className="assistant-trigger fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 rounded-full bg-forest py-3 pl-3.5 pr-4 text-cream sm:bottom-6 sm:right-6"
        aria-expanded={open}
        aria-controls="portfolio-assistant"
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente del portafolio'}
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-cream/15">
          <ChatIcon />
        </span>
        <span className="hidden text-[12.5px] font-semibold sm:inline">
          {open ? 'Cerrar' : 'Pregúntame'}
        </span>
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cream/90" aria-hidden="true" />
      </button>

      {mounted && (
        <div
          ref={panelRef}
          id="portfolio-assistant"
          role="dialog"
          aria-label="Asistente del portafolio"
          className="assistant-panel"
          data-open={shown ? 'true' : 'false'}
        >
          <div className="flex items-center gap-3 border-b border-line/80 px-4 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-forest font-display text-[11px] font-semibold text-cream">
              AB
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[13.5px] font-semibold leading-tight">
                Asistente de Adrián
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-forest" aria-hidden="true" />
                {isRemoteEnabled ? 'n8n · RAG' : 'RAG local'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="grid h-8 w-8 place-items-center rounded-[4px] text-muted transition-colors duration-150 hover:bg-paper hover:text-ink"
              aria-label="Cerrar asistente"
            >
              <CloseIcon />
            </button>
          </div>

          <div
            ref={listRef}
            role="log"
            aria-live="polite"
            aria-label="Conversación con el asistente"
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`assistant-msg ${
                  message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                }`}
              >
                <div
                  className={
                    message.role === 'user'
                      ? 'max-w-[85%] rounded-[6px] rounded-br-[2px] bg-forest px-3.5 py-2.5 text-[13px] leading-[1.55] text-cream'
                      : 'max-w-[88%] rounded-[6px] rounded-bl-[2px] border border-line/80 bg-paper px-3.5 py-2.5 text-[13px] leading-[1.55] text-ink'
                  }
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  {message.sources?.length > 0 && (
                    <p className="mt-2 border-t border-line/70 pt-2 font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted">
                      Fuente: {message.sources.map((source) => source.title).join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {pending && (
              <div className="flex justify-start" aria-label="El asistente está escribiendo">
                <div className="flex items-center gap-1 rounded-[6px] border border-line/80 bg-paper px-3.5 py-3">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="typing-dot h-1.5 w-1.5 rounded-full bg-muted/70"
                      style={{ animationDelay: `${dot * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {showSuggestions && (
              <div className="assistant-suggestions flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    type="button"
                    data-suggestion
                    onClick={() => ask(suggestion)}
                    className="suggestion-pill rounded-full border border-line bg-cream px-2.5 py-1.5 text-left text-[11px] leading-tight text-muted transition-colors duration-150 hover:border-forest/40 hover:text-forest"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-line/80 bg-cream p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Trayectoria, sistemas o contacto…"
                aria-label="Escribe tu pregunta"
                className="min-w-0 flex-1 rounded-[4px] border border-line bg-paper px-3 py-2.5 text-[13px] text-ink placeholder:text-muted/60 focus:border-forest/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || pending}
                aria-label="Enviar pregunta"
                className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[4px] bg-forest text-cream transition-[background-color,transform] duration-150 ease-out active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
