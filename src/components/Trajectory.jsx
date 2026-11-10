import { useEffect, useRef, useState } from 'react';
import ChapterPills from './ChapterPills';
import { useInView } from '../hooks/useInView';
import { useTrajectoryProgress } from '../hooks/useTrajectoryProgress';

const CHAPTERS = [
  {
    index: '01',
    short: 'Recaudo',
    phase: 'Sector público',
    org: 'SEMATRIG · SABAT',
    title: 'Recaudación municipal a escala',
    body: 'Lideré la digitalización del recaudo: pasarelas de pago, auditoría en tiempo real y procesos tributarios para miles de contribuyentes. Un sistema que hoy sostiene operación crítica.',
    highlights: ['+5M transacciones', '+10K ciudadanos', '−35% carga administrativa'],
    tags: ['Laravel', 'PHP', 'PostgreSQL'],
  },
  {
    index: '02',
    short: 'Producto',
    phase: 'Producto privado',
    org: 'Don Beni · SIGRAED',
    title: 'Operación comercial y respuesta ante emergencias',
    body: 'Software de inventario multicurrency con reportes financieros complejos, y una plataforma de registro y gestión para entidades de protección civil. Dos operaciones distintas, el mismo criterio: claridad bajo presión.',
    highlights: ['Inventario multicurrency', 'Reportes financieros', 'Registro institucional'],
    tags: ['Producto', 'Datos', 'Operación'],
  },
  {
    index: '03',
    short: 'Academia',
    phase: 'Academia',
    org: 'UPTJAA',
    title: 'Transferencia tecnológica',
    body: 'Mentoría técnica a la siguiente generación de ingenieros: acompañamiento en proyectos reales, buenas prácticas y transferencia de conocimiento para que el equipo siga sin depender de una sola persona.',
    highlights: ['Mentoría técnica', 'Formación aplicada'],
    tags: ['Docencia', 'Mentoría', 'Equipos'],
  },
  {
    index: '04',
    short: 'Dirección',
    phase: 'Dirección técnica & IA',
    org: 'Actualidad',
    title: 'Arquitectura, equipos e IA aplicada',
    body: 'Dirección técnica de plataformas, liderazgo de equipos y soluciones de IA sobre Python, FastAPI y React. Automatizaciones en n8n que liberan tiempo operativo y reducen trabajo manual.',
    highlights: ['Dirección técnica', 'IA aplicada', 'Automatización n8n'],
    tags: ['Python', 'FastAPI', 'React', 'Cloud', 'AI'],
    current: true,
  },
];

function Chapter({ chapter, index }) {
  const ref = useInView();

  return (
    <li
      ref={ref}
      id={`chapter-${chapter.index}`}
      className="t-item"
      data-visible="false"
      data-current={chapter.current ? 'true' : undefined}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="t-node" aria-hidden="true" />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-forest">
          {chapter.index}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {chapter.phase}
        </span>
        {chapter.current && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/25 bg-forest/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-forest">
            <span className="h-1 w-1 rounded-full bg-forest" aria-hidden="true" />
            Ahora
          </span>
        )}
      </div>

      <h3 className="mt-2 max-w-[26ch] font-display text-[clamp(1.2rem,1.9vw,1.55rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
        {chapter.title}
      </h3>
      <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
        {chapter.org}
      </p>
      <p className="mt-3 max-w-[56ch] text-[14px] leading-[1.66] text-muted">{chapter.body}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {chapter.highlights.map((item) => (
          <span
            key={item}
            className="rounded-full border border-line/80 bg-cream px-2.5 py-1 text-[10.5px] font-medium text-ink/70"
          >
            {item}
          </span>
        ))}
      </div>

      <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/40">
        {chapter.tags.join(' · ')}
      </p>
    </li>
  );
}

export default function Trajectory({ onAsk }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { wrapRef, barRef } = useTrajectoryProgress();
  const listRef = useRef(null);
  const lockRef = useRef(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;

    const items = Array.from(list.querySelectorAll('.t-item'));

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockRef.current) return;
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible) return;
        const index = items.indexOf(visible.target);
        if (index >= 0) setActiveIndex(index);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const selectChapter = (index) => {
    const chapter = CHAPTERS[index];
    if (!chapter) return;

    lockRef.current = Date.now() + 800;
    setActiveIndex(index);

    const target = document.getElementById(`chapter-${chapter.index}`);
    if (!target) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="trayectoria"
      aria-labelledby="trayectoria-title"
      className="relative border-t border-line/60"
    >
      <div className="mx-auto max-w-[1120px] px-5 pb-28 pt-20 sm:px-8 sm:py-28">
        <div className="chapter-nav sticky top-20 z-30 -mx-5 mb-8 border-y border-line/60 bg-paper/90 px-5 py-2.5 backdrop-blur-md md:static md:mx-0 md:mb-10 md:max-w-[25rem] md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
          <ChapterPills
            chapters={CHAPTERS}
            activeIndex={activeIndex}
            onSelect={selectChapter}
          />
        </div>

        <div className="grid gap-10 md:grid-cols-[0.85fr_1.4fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="mono-label text-forest">Trayectoria</p>
            <h2
              id="trayectoria-title"
              className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
            >
              Una trayectoria construida en producción.
            </h2>
            <p className="mt-5 max-w-[38ch] text-[14.5px] leading-[1.66] text-muted">
              Del primer módulo al liderazgo de plataformas institucionales. Cada etapa dejó
              sistemas en operación, equipos formados y resultados medibles.
            </p>

            <button type="button" onClick={onAsk} className="btn-quiet mt-7">
              Pregúntale al asistente
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </button>
            <p className="mt-3 max-w-[34ch] font-mono text-[9px] uppercase tracking-[0.14em] text-muted/70">
              Respuestas basadas en esta trayectoria
            </p>
          </div>

          <div ref={wrapRef} className="trajectory-track relative">
            <div className="trajectory-progress" aria-hidden="true">
              <span ref={barRef} />
            </div>

            <ol
              ref={listRef}
              className="trajectory-list relative"
              aria-label="Capítulos de la trayectoria"
            >
              {CHAPTERS.map((chapter, index) => (
                <Chapter key={chapter.index} chapter={chapter} index={index} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
