const STACK = ['Python', 'FastAPI', 'React', 'Cloud', 'AI Solutions'];

export default function StackTicker() {
  return (
    <section aria-label="Stack técnico" className="relative border-y border-line/60 py-4">
      <div className="flex items-center gap-4">
        <span className="mono-label hidden shrink-0 text-muted md:block">Stack</span>
        <div className="stack-marquee min-w-0 flex-1">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="marquee-group"
                aria-hidden={copy === 1 ? 'true' : undefined}
              >
                {STACK.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60"
                  >
                    {item}
                    <span aria-hidden="true" className="text-forest/40">
                      ·
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
