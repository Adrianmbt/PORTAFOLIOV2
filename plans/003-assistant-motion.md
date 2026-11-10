# 003 — Assistant message and suggestion entrances

- **Status**: DONE
- **Commit**: no-git (repo sin inicializar)
- **Severity**: MEDIUM (pulido de la interacción principal)
- **Category**: Missing interaction / Reduced-motion fix
- **Estimated scope**: 2 files (`Assistant.jsx`, `index.css`), ~50 lines

## Problem

Las burbujas del asistente aparecen de golpe, sin transición, y las sugerencias también. Además, el bloque de reduced-motion apaga por completo la transición del panel (`transition: none`), de modo que abrir/cerrar el panel pierde incluso el fundido de opacidad, que sí ayuda a comprender el cambio.

`src/components/Assistant.jsx:199-219` — mensajes sin clase de entrada:

```jsx
{messages.map((message) => (
  <div
    key={message.id}
    className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
  >
    <div
      className={
        message.role === 'user'
          ? 'max-w-[85%] rounded-[6px] rounded-br-[2px] bg-forest px-3.5 py-2.5 text-[13px] leading-[1.55] text-cream'
          : 'max-w-[88%] rounded-[6px] rounded-bl-[2px] border border-line/80 bg-paper px-3.5 py-2.5 text-[13px] leading-[1.55] text-ink'
      }
    >
      <p className="whitespace-pre-line">{message.text}</p>
      ...
```

`src/components/Assistant.jsx:235-249` — sugerencias sin stagger:

```jsx
{showSuggestions && (
  <div className="flex flex-wrap gap-2 pt-1">
    {SUGGESTIONS.map((suggestion) => (
      <button
        key={suggestion}
        type="button"
        data-suggestion
        onClick={() => ask(suggestion)}
        className="rounded-full border border-line bg-cream px-2.5 py-1.5 text-left text-[11px] leading-tight text-muted transition-colors duration-150 hover:border-forest/40 hover:text-forest"
      >
        {suggestion}
      </button>
    ))}
  </div>
)}
```

`src/index.css:623-625` — reduced-motion elimina todo el fundido del panel:

```css
  .assistant-panel {
    transition: none;
  }
```

Problemas:

- El mensaje del usuario y la respuesta aparecen sin ninguna continuidad; el ojo no sabe dónde mirar.
- Las 4 sugerencias aparecen como un bloque; no se leen en orden.
- En reduced-motion, el panel se materializa/desaparece de golpe; debería conservar un fundido corto de opacidad (sin desplazamiento).

## Target

1. **Mensajes**: entrada de `200ms var(--ease-out)` con `opacity 0 → 1` y `translateY(6px) → 0`. Aplica a usuario y asistente; el saludo también entra al abrir.
2. **Sugerencias**: entrada de `260ms var(--ease-out)` con `opacity 0 → 1` y `translateY(4px) → 0`, stagger de `40ms` por pill (0/40/80/120ms).
3. **Fill mode `backwards`** en las pills: el estado final no queda fijado, así `:active { transform: scale(0.97) }` sigue funcionando después de la entrada.
4. **Pills interactivas**: `transition: transform 120ms var(--ease-out)` + `:active scale(0.97)`; hover de color ya existe.
5. **Reduced motion**: mensajes con fundido de `120ms` solo de opacidad; sugerencias sin animación; panel con `transition: opacity 150ms var(--ease-out)` y sin `transform` en el estado cerrado.

## Repo conventions to follow

- Curvas y duraciones: `--ease-out` (`src/index.css:18`); UI <300ms.
- Hover gated con `@media (hover: hover) and (pointer: fine)` (`src/index.css:173`, `561`).
- Reduced-motion centralizado (`src/index.css:580-631`).
- No animar `height`/`width`; solo `opacity` y `transform`.

## Steps

### 1. Mensajes en `src/components/Assistant.jsx`

Agregar `assistant-msg` al wrapper de cada mensaje (sin cambiar el resto del markup):

```jsx
<div
  key={message.id}
  className={`assistant-msg ${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
>
```

### 2. Sugerencias en `src/components/Assistant.jsx`

```jsx
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
```

### 3. CSS nuevo en `src/index.css` (sección Assistant)

Insertar después de `.typing-dot` y antes del bloque hover del trigger:

```css
.assistant-msg {
  animation: msg-in 200ms var(--ease-out) both;
}

@keyframes msg-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.suggestion-pill {
  animation: pill-in 260ms var(--ease-out) backwards;
  transition:
    color 150ms var(--ease-out),
    border-color 150ms var(--ease-out),
    transform 120ms var(--ease-out);
}

.suggestion-pill:active {
  transform: scale(0.97);
}

@keyframes pill-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 4. Corregir reduced motion en `src/index.css`

Reemplazar:

```css
  .assistant-panel {
    transition: none;
  }
```

por:

```css
  .assistant-panel {
    transition: opacity 150ms var(--ease-out);
  }

  .assistant-panel[data-open="false"] {
    transform: none;
  }

  .assistant-msg {
    animation: msg-fade 120ms linear both;
  }

  .suggestion-pill {
    animation: none;
    transition: none;
  }

  @keyframes msg-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
```

Nota: un `@keyframes` dentro de `@media` es válido, pero para mantener el archivo ordenado se puede declarar `msg-fade` junto a `msg-in` y dejar solo las reglas dentro del bloque reduced-motion. Preferible:

```css
@keyframes msg-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

junto a `msg-in`, y en el bloque reduced-motion únicamente `.assistant-msg { animation: msg-fade 120ms linear both; }`.

## Boundaries

- No cambiar el texto del saludo, las sugerencias, el placeholder, el copy de fuentes ni la lógica de `ask`.
- No tocar la transición del panel en modo normal (`170ms opacity` / `220ms transform`).
- No animar `max-height`, `height` ni `filter`.
- No agregar dependencias.
- Si `Assistant.jsx` no coincide con los excerpts, STOP y reportar.

## Verification

- **Mechanical**: `npm run build` sin errores.
- **DOM**:
  - Cada mensaje renderizado tiene `.assistant-msg`.
  - Las 4 sugerencias tienen `.suggestion-pill` y `animationDelay` 0/40/80/120ms.
- **Comportamiento**:
  - Al enviar una pregunta, la burbuja del usuario y luego la respuesta entran con un desplazamiento apenas perceptible (6px), sin salto.
  - Las sugerencias aparecen en cascada de izquierda a derecha/derecha abajo, sin reordenarse.
  - Mantener presionada una sugerencia después de la entrada muestra `scale(0.97)`.
- **Reduced motion**: abrir/cerrar el panel conserva un fundido de 150ms sin desplazamiento; los mensajes aparecen con fundido corto; las sugerencias no animan.
- **Feel check**: la entrada no “rebota” ni se siente lenta; se percibe como que el mensaje aterriza, no que se desliza desde lejos.
- **Done when**: build pasa y los tres estados (normal, activo, reduced-motion) se comportan como se describe.
