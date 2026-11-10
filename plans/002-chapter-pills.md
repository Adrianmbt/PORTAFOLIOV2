# 002 — Chapter pills with a sliding highlight and timeline progress

- **Status**: DONE
- **Commit**: no-git (repo sin inicializar)
- **Severity**: HIGH (navegación + orientación)
- **Category**: Missing interaction / Choreography
- **Estimated scope**: 2 new files, 2 edited (`Trajectory.jsx`, `index.css`), ~220 lines

## Problem

La sección de trayectoria es larga (4 capítulos), no tiene navegación interna y el único indicador de avance es una línea vertical estática. En móvil, el usuario no sabe en qué capítulo está ni puede saltar a otro sin scrollear todo.

`src/components/Trajectory.jsx:97-139` — estructura actual:

```jsx
export default function Trajectory({ onAsk }) {
  return (
    <section
      id="trayectoria"
      aria-labelledby="trayectoria-title"
      className="relative border-t border-line/60"
    >
      <div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.4fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            ...
          </div>

          <ol className="trajectory-list relative" aria-label="Capítulos de la trayectoria">
            {CHAPTERS.map((chapter, index) => (
              <Chapter key={chapter.index} chapter={chapter} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
```

`src/components/Trajectory.jsx:43-55` — el `<li>` no tiene `id` ni forma de observarse por capítulo:

```jsx
function Chapter({ chapter, index }) {
  const ref = useInView();

  return (
    <li
      ref={ref}
      className="t-item"
      data-visible="false"
      ...
```

`src/index.css:427-435` — la línea es puramente decorativa:

```css
.trajectory-list::before {
  content: "";
  position: absolute;
  left: 7px;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: rgba(221, 211, 196, 0.95);
}
```

Problemas:

- No hay estado activo ni navegación; el usuario no puede saltar entre capítulos.
- La línea no comunica progreso real de lectura.
- En móvil no hay ningún anclaje visual mientras se recorre la lista.
- Un salto por ancla dejaría el capítulo tapado por el header (aunque `scroll-margin-top: 6rem` ya existe en `src/index.css:57-60`).

## Target

1. **Pills segmentadas** de ancho igual, sobre la lista: 4 botones (`01 Recaudo`, `02 Producto`, `03 Academia`, `04 Dirección`), alto 34px, radio 4px, borde `line/80`, fondo `paper/70`.
2. **Highlight deslizante**: bloque `cream` con borde `forest/25` que se mueve con `translateX(calc(index * 100%))`, `240ms var(--ease-out)`. Sin reflow, sin animar `left`.
3. **Sincronización por scroll**: `IntersectionObserver` con `rootMargin: '-45% 0px -45% 0px'`; el capítulo que cruza la banda central queda activo.
4. **Click lock de 800ms**: al hacer click, se fija el índice elegido, se hace `scrollIntoView({ block: 'start' })` y el observer ignora cambios durante 800ms para evitar parpadeo al atravesar capítulos intermedios.
5. **Línea de progreso**: reemplaza la línea estática por una base `line` + relleno `forest` con `transform: scaleY(progress)` calculado con rAF en scroll/resize. `progress = clamp((innerHeight * 0.45 - listTop) / listHeight, 0, 1)`.
6. **Móvil**: la barra de pills queda `sticky top-20` con fondo `paper/90` + blur; en `md+` es estática y alineada al ancho de la columna.
7. **Reduced motion**: sin transición en el highlight, scroll instantáneo (`behavior: 'auto'`), progreso actualizado sin rAF decorativo (mismo cálculo, sin animación adicional).

## Repo conventions to follow

- `useInView` actual como patrón de observer: `src/hooks/useInView.js:6-28`.
- Easing tokens: `--ease-out` (`src/index.css:18`).
- El header mide ~72px; `scroll-margin-top` ya es `6rem` (`src/index.css:57-60`). Para la barra sticky usar `top-20` (5rem).
- Colores/tokening Tailwind: `paper`, `cream`, `line`, `forest`, `muted` (`src/index.css:3-15`).
- Comentarios de sección en CSS: `/* ---------- Trajectory ---------- */`.

## Steps

### 1. Agregar etiquetas cortas a `CHAPTERS` en `src/components/Trajectory.jsx`

En cada objeto, agregar `short` (sin tocar copy existente):

```js
{ index: '01', short: 'Recaudo', ... }
{ index: '02', short: 'Producto', ... }
{ index: '03', short: 'Academia', ... }
{ index: '04', short: 'Dirección', ... }
```

### 2. Crear `src/components/ChapterPills.jsx`

```jsx
export default function ChapterPills({ chapters, activeIndex, onSelect, className = '' }) {
  return (
    <nav
      aria-label="Capítulos de la trayectoria"
      className={`chapter-pills ${className}`}
    >
      <div className="chapter-pills__track">
        <span
          className="chapter-pills__highlight"
          aria-hidden="true"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        {chapters.map((chapter, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={chapter.index}
              type="button"
              onClick={() => onSelect(index)}
              aria-current={active ? 'step' : undefined}
              aria-controls={`chapter-${chapter.index}`}
              className="chapter-pills__button"
              data-active={active ? 'true' : 'false'}
            >
              <span className="chapter-pills__index">{chapter.index}</span>
              <span className="chapter-pills__label">{chapter.short}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
```

### 3. Crear `src/hooks/useTrajectoryProgress.js`

```js
import { useEffect, useRef } from 'react';

export function useTrajectoryProgress() {
  const wrapRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bar = barRef.current;
    if (!wrap || !bar) return undefined;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const readingLine = window.innerHeight * 0.45;
      const progress = Math.min(Math.max((readingLine - rect.top) / rect.height, 0), 1);
      bar.style.transform = `scaleY(${progress.toFixed(4)})`;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { wrapRef, barRef };
}
```

### 4. Actualizar `src/components/Trajectory.jsx`

Imports:

```jsx
import { useEffect, useRef, useState } from 'react';
import ChapterPills from './ChapterPills';
import { useInView } from '../hooks/useInView';
import { useTrajectoryProgress } from '../hooks/useTrajectoryProgress';
```

En `Chapter`, aceptar `id` y aplicarlo al `<li>`:

```jsx
function Chapter({ chapter, index }) {
  const ref = useInView();

  return (
    <li
      ref={ref}
      id={`chapter-${chapter.index}`}
      className="t-item"
      data-visible="false"
      ...
```

En `Trajectory`, antes del `return`:

```jsx
const [activeIndex, setActiveIndex] = useState(0);
const { wrapRef, barRef } = useTrajectoryProgress();
const listRef = useRef(null);
const lockRef = useRef(0);

useEffect(() => {
  const list = listRef.current;
  if (!list) return undefined;

  const items = Array.from(list.querySelectorAll('.t-item'));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
```

Nota: `lockRef` debe vivir en el componente `Trajectory`, no dentro del efecto. El observer solo se crea una vez; usa `lockRef` por closure.

Insertar la barra de pills antes del `grid`:

```jsx
<div className="chapter-nav sticky top-20 z-30 -mx-5 mb-8 border-y border-line/60 bg-paper/90 px-5 py-2.5 backdrop-blur-md md:static md:mx-0 md:mb-10 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
  <ChapterPills
    chapters={CHAPTERS}
    activeIndex={activeIndex}
    onSelect={selectChapter}
  />
</div>
```

Envolver la lista con el track de progreso:

```jsx
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
```

### 5. Actualizar CSS en `src/index.css`

Dentro de `/* ---------- Trajectory ---------- */`, después de `.trajectory-list::before`, agregar:

```css
.trajectory-track {
  position: relative;
}

.trajectory-progress {
  position: absolute;
  left: 7px;
  top: 6px;
  bottom: 6px;
  z-index: 1;
  width: 1px;
  pointer-events: none;
}

.trajectory-progress span {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--color-forest);
  opacity: 0.5;
  transform: scaleY(0);
  transform-origin: top;
}

.chapter-pills {
  width: 100%;
}

.chapter-pills__track {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 4px;
  border: 1px solid rgba(221, 211, 196, 0.9);
  border-radius: 4px;
  background: rgba(243, 237, 227, 0.7);
}

.chapter-pills__highlight {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc((100% - 0.5rem) / 4);
  border: 1px solid rgba(11, 107, 79, 0.22);
  border-radius: 3px;
  background: var(--color-cream);
  box-shadow: 0 2px 8px -4px rgba(29, 26, 22, 0.24);
  transition: transform 240ms var(--ease-out);
}

.chapter-pills__button {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  height: 34px;
  padding: 0 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-muted);
  transition: color 180ms var(--ease-out);
}

.chapter-pills__index {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.08em;
  opacity: 0.7;
}

.chapter-pills__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chapter-pills__button[data-active="true"] {
  color: var(--color-forest);
}

@media (max-width: 639px) {
  .chapter-pills__index {
    display: none;
  }

  .chapter-pills__button {
    font-size: 10.5px;
  }
}

@media (hover: hover) and (pointer: fine) {
  .chapter-pills__button:hover {
    color: var(--color-ink);
  }

  .chapter-pills__button[data-active="true"]:hover {
    color: var(--color-forest);
  }
}
```

Agregar al bloque reduced-motion (`src/index.css:580-631`):

```css
  .chapter-pills__highlight {
    transition: none;
  }
```

### 6. Verificar el `scroll-margin-top`

El `<li>` recibe `id`, y `section[id], article[id]` tiene scroll-margin, pero `li[id]` no. Agregar al inicio de `src/index.css` (después de la regla actual de `section[id], article[id]`):

```css
li[id] {
  scroll-margin-top: 6.5rem;
}
```

## Boundaries

- No cambiar el copy de los capítulos, highlights, tags ni el CTA `Pregúntale al asistente`.
- No agregar dependencias ni librerías de scroll.
- No animar `left`, `width`, `height` ni `top`; el highlight usa `transform` y la línea usa `scaleY`.
- No usar `scrollIntoView` con `behavior: 'smooth'` si `prefers-reduced-motion: reduce`.
- Mantener el observer de aparición de capítulos (`useInView`) intacto.
- Si `Trajectory.jsx` no coincide con los excerpts, STOP y reportar.

## Verification

- **Mechanical**: `npm run build` sin errores.
- **DOM/layout**:
  - 4 botones `.chapter-pills__button`; exactamente uno con `aria-current="step"`.
  - `.chapter-pills__highlight` cambia `transform` a `matrix(1,0,0,1, W*i, 0)` al hacer click en cada pill.
  - A 390px la barra tiene `position: sticky` y su `top` computado es 80px; no hay overflow horizontal.
- **Comportamiento**:
  - Click en "04 Dirección" → scroll al capítulo, highlight en el 4º, y durante ~800ms el observer no lo revierte.
  - Scroll manual → el pill activo sigue al capítulo que cruza la banda central.
  - `.trajectory-progress span` termina en `scaleY(1)` al pie de la lista y en `scaleY(0)` al inicio.
- **Feel check**:
  - El highlight se desliza como una sola pieza continua; no salta ni se estira.
  - No hay parpadeo del activo al atravesar capítulos al saltar.
  - En reduced motion el highlight cambia sin deslizarse y el salto es instantáneo.
- **Done when**: build pasa, navegación por pills y observer coinciden, progreso llega a 1, y móvil queda usable sin overflow.
