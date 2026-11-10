import { useHeroSpotlight } from '../hooks/useHeroSpotlight';
import { useMagnetic } from '../hooks/useMagnetic';
import ProofCards from './ProofCards';
import StackTicker from './StackTicker';

const INSTITUTIONS = ['SEMATRIG', 'SABAT', 'SIGRAED', 'Don Beni', 'UPTJAA'];

export default function Hero() {
  const { sectionRef, glowRef } = useHeroSpotlight();
  const ctaRef = useMagnetic();

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="hero-canvas" aria-hidden="true">
        <div className="hero-wash" />
        <div className="circuit-grid" />

        <div ref={glowRef} className="circuit-glow">
          <div className="circuit-grid circuit-grid--bright" />
        </div>

        <svg
          className="circuit-signals"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMin slice"
          focusable="false"
        >
          <path className="signal signal-a" pathLength="100" d="M110 214 H352 V332 H628" />
          <path className="signal signal-b" pathLength="100" d="M1330 176 H1088 V296 H812" />
          <path className="signal signal-c" pathLength="100" d="M168 706 H428 V588 H716" />
          <path className="signal signal-d" pathLength="100" d="M1272 664 H1012 V548 H748" />

          <g className="circuit-node node-a"><circle cx="628" cy="332" r="2.5" /></g>
          <g className="circuit-node node-b"><circle cx="812" cy="296" r="2.5" /></g>
          <g className="circuit-node node-c"><circle cx="716" cy="588" r="2.5" /></g>
          <g className="circuit-node node-d"><circle cx="748" cy="548" r="2.5" /></g>
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1120px] px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
        <div className="flex flex-col items-center text-center">
          <div
            className="reveal flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
            style={{ animationDelay: '40ms' }}
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/70">
              Adrián M. Bello T. <span className="text-muted/70">·</span> Software &amp; AI Engineer
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-line sm:block" />
            <span className="inline-flex items-center gap-2 rounded-full border border-line/90 bg-cream/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-forest">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-forest" />
              Disponible para proyectos
            </span>
          </div>

          <h1 className="mt-6 max-w-[900px] font-display text-[clamp(2.5rem,6.2vw,5.2rem)] font-semibold leading-[1.01] tracking-[-0.035em]">
            <span className="hero-line">
              <span style={{ animationDelay: '120ms' }}>Tu próxima plataforma</span>
            </span>
            <span className="hero-line">
              <span style={{ animationDelay: '190ms' }}>
                <span className="title-highlight">no debería caerse</span>
              </span>
            </span>
            <span className="hero-line">
              <span style={{ animationDelay: '260ms' }}>cuando más importa.</span>
            </span>
          </h1>

          <p
            className="reveal mt-7 max-w-[58ch] text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.66] text-muted"
            style={{ animationDelay: '360ms' }}
          >
            Diseño y lidero sistemas para instituciones que no pueden fallar. Ingeniería de
            software e IA aplicada, con resultados medibles y equipos que aprenden a sostenerlos.
          </p>

          <div
            className="reveal mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
            style={{ animationDelay: '430ms' }}
          >
            <a ref={ctaRef} href="mailto:contact@adrianbello.com" className="btn-primary">
              Hablemos de su proyecto
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </a>
            <a href="#impacto" className="btn-quiet">
              Ver impacto
              <span aria-hidden="true" className="arrow">
                ↓
              </span>
            </a>
          </div>
        </div>

        <div className="reveal mt-12" style={{ animationDelay: '520ms' }}>
          <StackTicker />
        </div>

        <ProofCards />

        <div
          className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-line/60 pt-6"
          style={{ animationDelay: '720ms' }}
        >
          <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted/80">
            Instituciones
          </span>
          {INSTITUTIONS.map((name, index) => (
            <span
              key={name}
              className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50"
            >
              {name}
              {index < INSTITUTIONS.length - 1 && (
                <span aria-hidden="true" className="text-line">
                  /
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
