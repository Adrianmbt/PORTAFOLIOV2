import { useCountUp } from '../hooks/useCountUp';
import { useInViewFlag } from '../hooks/useInViewFlag';
import { usePointerGlow } from '../hooks/usePointerGlow';

const STATS = [
  { prefix: '+', value: 10, suffix: 'K', label: 'ciudadanos beneficiados', delay: 700 },
  { prefix: '+', value: 5, suffix: 'M', label: 'transacciones procesadas', delay: 780 },
  { value: 35, suffix: '%', label: 'menos carga administrativa', delay: 860 },
];

const STEPS = [
  {
    number: '01',
    title: 'Diagnóstico honesto',
    body: 'Entiendo la operación antes de proponer código.',
  },
  {
    number: '02',
    title: 'Arquitectura primero',
    body: 'Sistemas que escalan sin reescribirse cada año.',
  },
  {
    number: '03',
    title: 'IA donde suma',
    body: 'Automatización con criterio, no por moda.',
  },
];

function Stat({ prefix = '', value, suffix, label, delay, start }) {
  const current = useCountUp(value, { duration: 950, delay, start });

  return (
    <div>
      <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums text-forest">
        {prefix}
        {Math.round(current)}
        {suffix}
      </p>
      <p className="mt-2 text-[11.5px] leading-[1.4] text-muted">{label}</p>
    </div>
  );
}

function GlowCard({ id, delay, className = '', children }) {
  const ref = usePointerGlow();

  return (
    <article
      ref={ref}
      id={id}
      className={`glow-card reveal relative overflow-hidden rounded-[4px] border border-line bg-cream text-left shadow-[0_20px_44px_-32px_rgba(60,45,25,0.35)] ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="glow-spot" aria-hidden="true" />
      {children}
    </article>
  );
}

export default function ProofCards() {
  const [impactRef, impactInView] = useInViewFlag();

  return (
    <section
      id="impacto"
      aria-label="Impacto y forma de trabajo"
      className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-[1.35fr_1fr]"
    >
      <GlowCard delay={560} className="p-6 sm:p-7">
        <div ref={impactRef} className="relative z-10">
          <div className="flex items-center justify-between gap-4">
            <span className="mono-label text-muted">Impacto verificado</span>
            <span className="mono-label hidden text-forest/70 sm:block">
              Sistemas en producción
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-5">
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} start={impactInView} />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-line/80 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Recaudación municipal · SEMATRIG
            </p>
            <svg
              aria-hidden="true"
              viewBox="0 0 140 24"
              className="h-5 w-[104px] shrink-0 overflow-visible sm:w-[124px]"
            >
              <path
                className="data-pulse"
                data-run={impactInView ? 'true' : 'false'}
                d="M0 13 H34 L44 6 L54 19 L64 13 H140"
                fill="none"
                stroke="rgba(11,107,79,0.45)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </GlowCard>

      <GlowCard id="enfoque" delay={640} className="p-6 sm:p-7">
        <div className="relative z-10">
          <span className="mono-label text-muted">Cómo trabajo</span>

          <ul className="mt-4 divide-y divide-line/70">
            {STEPS.map((step) => (
              <li key={step.number} className="flex gap-4 py-3 first:pt-1 last:pb-0">
                <span className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-forest/70">
                  {step.number}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold leading-tight">{step.title}</p>
                  <p className="mt-1 text-[11.5px] leading-[1.45] text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </GlowCard>
    </section>
  );
}
