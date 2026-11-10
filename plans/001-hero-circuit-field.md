# 001 — Replace the hero atmosphere with an interactive circuit field

- **Status**: DONE
- **Commit**: no-git (repo sin inicializar)
- **Severity**: HIGH (oportunidad aditiva principal)
- **Category**: Missed opportunities + Performance
- **Estimated scope**: 3 files (`Hero.jsx`, `index.css`, new hook), ~180 lines

## Problem

El fondo del hero es una retícula estática de 72px más dos blobs radiales enormes que derivan en loop. No reacciona al puntero, no comunica "sistemas" y no es un punto de conversación.

`src/components/Hero.jsx:8-13` — actual:

```jsx
<section className="relative overflow-hidden">
  <div className="hero-canvas" aria-hidden="true">
    <div className="tech-grid" />
    <div className="aurora aurora-a" />
    <div className="aurora aurora-b" />
  </div>
```

`src/index.css:207-247` — actual:

```css
.hero-canvas { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }

.tech-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(29, 26, 22, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(29, 26, 22, 0.05) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: radial-gradient(ellipse 80% 62% at 50% 4%, #000 0%, transparent 72%);
  mask-image: radial-gradient(ellipse 80% 62% at 50% 4%, #000 0%, transparent 72%);
}

.aurora {
  position: absolute;
  border-radius: 9999px;
  will-change: transform;
}

.aurora-a {
  width: 52rem;
  height: 52rem;
  top: -24rem;
  left: -16rem;
  background: radial-gradient(circle at 40% 40%, rgba(11, 107, 79, 0.16), rgba(11, 107, 79, 0) 62%);
  animation: drift-a 28s var(--ease-in-out) infinite alternate;
}

.aurora-b {
  width: 40rem;
  height: 40rem;
  top: 4rem;
  right: -14rem;
  background: radial-gradient(circle at 50% 50%, rgba(180, 140, 90, 0.2), rgba(180, 140, 90, 0) 65%);
  animation: drift-b 34s var(--ease-in-out) infinite alternate;
}
```

`src/index.css:249-265` define `drift-a` y `drift-b`. `src/index.css:588` apaga `.aurora` en reduced-motion.

Problemas concretos:

- `will-change: transform` permanente en dos capas de 52rem/40rem (memoria GPU innecesaria en móvil).
- El movimiento es decorativo y ajeno al contenido: no explica nada.
- La retícula no responde al cursor ni al scroll; el hero se siente estático después de la entrada.

## Target

Un "circuit field" en capas, dentro del mismo `.hero-canvas`:

1. **Wash** estático: dos radiales muy suaves (forest arriba-izquierda, ámbar arriba-derecha).
2. **Retícula base** de 24px, líneas `rgba(29,26,22,0.05)`, enmascarada para desvanecerse en los bordes.
3. **Spotlight** de 44rem centrado en el hero: una segunda retícula de 24px en forest (`rgba(11,107,79,0.16)`), recortada por una máscara radial, que sigue al puntero con `transform: translate3d(...)`. Sin `background-position`, sin variables CSS por frame.
4. **Señales** SVG: 4 trazos ortogonales finos (`1px`, `rgba(11,107,79,0.38)`) con un dash que viaja en loop lineal, enmascarados para que solo se vean en la periferia (nunca detrás del titular).
5. **Nodos**: 4 círculos de 2.5px al final de cada trazo, con pulso de opacidad y escala cada 3.2s.

Comportamiento:

- Sigue al puntero solo con `(hover: hover) and (pointer: fine)` y sin `prefers-reduced-motion`.
- Interpolación `0.14` por frame; se detiene cuando queda a menos de `0.4px` del objetivo.
- Al salir del hero, el spotlight vuelve al centro.
- Sin JS (touch, reduced-motion): spotlight centrado y señales/nodos estáticos. El hero sigue viéndose intencional.
- Sin `will-change`. Solo `transform`/`opacity` en el movimiento interactivo; los trazos son 4 paths finos.

## Repo conventions to follow

- Tokens de easing en `src/index.css:17-20`: usar `var(--ease-out)` y `var(--ease-in-out)`; no introducir curvas nuevas.
- Colores del tema: `var(--color-forest)`, `var(--color-paper)`, `var(--color-ink)` (definidos en `src/index.css:3-15`).
- Patrón de hook con rAF + refs + chequeo de media queries: `src/hooks/usePointerGlow.js:6-51`.
- Reduced-motion centralizado al final de `src/index.css:580-631`.
- Comentarios de sección en CSS: `/* ---------- Hero atmosphere ---------- */`.

## Steps

### 1. Crear `src/hooks/useHeroSpotlight.js`

```js
import { useEffect, useRef } from 'react';

export function useHeroSpotlight() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    let raf = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let primed = false;

    const tick = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      glow.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      const settled =
        Math.abs(targetX - currentX) < 0.4 && Math.abs(targetY - currentY) < 0.4;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      const rect = section.getBoundingClientRect();
      targetX = event.clientX - rect.left - rect.width / 2;
      targetY = event.clientY - rect.top - rect.height * 0.4;

      if (!primed) {
        currentX = targetX;
        currentY = targetY;
        primed = true;
      }

      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!primed) return;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    section.addEventListener('pointermove', onMove, { passive: true });
    section.addEventListener('pointerleave', onLeave);

    return () => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { sectionRef, glowRef };
}
```

### 2. Actualizar `src/components/Hero.jsx`

Agregar el import y el hook:

```jsx
import { useHeroSpotlight } from '../hooks/useHeroSpotlight';
```

Dentro de `Hero`, antes del `return`:

```jsx
const { sectionRef, glowRef } = useHeroSpotlight();
```

Reemplazar la apertura de la sección y el bloque del canvas:

```jsx
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
```

No tocar nada más del hero (eyebrow, H1, párrafo, CTAs, ticker, proof cards).

### 3. Reemplazar la sección de atmósfera en `src/index.css`

Borrar desde `/* ---------- Hero atmosphere ---------- */` (línea 205) hasta el final de `@keyframes drift-b` (línea 265), y poner:

```css
/* ---------- Hero atmosphere ---------- */

.hero-canvas {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 52% 48% at 78% 6%, rgba(180, 140, 90, 0.16), transparent 68%),
    radial-gradient(ellipse 46% 44% at 16% 18%, rgba(11, 107, 79, 0.12), transparent 70%);
}

.circuit-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(29, 26, 22, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(29, 26, 22, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  -webkit-mask-image: radial-gradient(ellipse 88% 76% at 50% 30%, #000 0%, transparent 78%);
  mask-image: radial-gradient(ellipse 88% 76% at 50% 30%, #000 0%, transparent 78%);
}

.circuit-glow {
  position: absolute;
  left: 50%;
  top: 40%;
  width: 44rem;
  height: 44rem;
  margin: -22rem 0 0 -22rem;
  transform: translate3d(0, 0, 0);
  -webkit-mask-image: radial-gradient(circle at center, #000 0%, rgba(0, 0, 0, 0.55) 34%, transparent 68%);
  mask-image: radial-gradient(circle at center, #000 0%, rgba(0, 0, 0, 0.55) 34%, transparent 68%);
}

.circuit-grid--bright {
  background-image:
    linear-gradient(rgba(11, 107, 79, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(11, 107, 79, 0.16) 1px, transparent 1px);
  -webkit-mask-image: none;
  mask-image: none;
}

.circuit-signals {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.85;
  -webkit-mask-image: radial-gradient(ellipse 56% 52% at 50% 44%, transparent 18%, #000 76%);
  mask-image: radial-gradient(ellipse 56% 52% at 50% 44%, transparent 18%, #000 76%);
}

.signal {
  fill: none;
  stroke: rgba(11, 107, 79, 0.38);
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 10 90;
  stroke-dashoffset: 100;
  animation: signal-travel 8s linear infinite;
}

.signal-b {
  animation-duration: 10s;
  animation-delay: -2s;
}

.signal-c {
  animation-duration: 9s;
  animation-delay: -5s;
}

.signal-d {
  animation-duration: 11s;
  animation-delay: -7s;
}

@keyframes signal-travel {
  to {
    stroke-dashoffset: 0;
  }
}

.circuit-node circle {
  fill: var(--color-forest);
  opacity: 0.45;
  transform-box: fill-box;
  transform-origin: center;
  animation: node-pulse 3.2s var(--ease-in-out) infinite;
}

.node-b circle {
  animation-delay: 0.6s;
}

.node-c circle {
  animation-delay: 1.4s;
}

.node-d circle {
  animation-delay: 2.1s;
}

@keyframes node-pulse {
  0%,
  100% {
    opacity: 0.28;
    transform: scale(1);
  }
  45% {
    opacity: 0.9;
    transform: scale(1.6);
  }
}
```

### 4. Actualizar reduced-motion en `src/index.css`

En el selector de la línea 588, quitar `.aurora,` (ya no existe). Agregar al final del bloque `@media (prefers-reduced-motion: reduce)`:

```css
  .signal,
  .circuit-node circle {
    animation: none !important;
  }

  .signal {
    stroke-dashoffset: 40;
    opacity: 0.35;
  }

  .circuit-node circle {
    opacity: 0.55;
  }

  .circuit-glow {
    transform: none !important;
  }
```

## Boundaries

- No tocar copy, CTAs, ticker, proof cards ni el header.
- No agregar canvas, WebGL ni dependencias. Máximo 4 paths de señal.
- No usar `will-change`, ni animar `width`, `height`, `top`, `left`, `background-position`.
- No cambiar la estructura de `Hero.jsx` fuera del bloque `hero-canvas`.
- Si el código encontrado no coincide con los excerpts (drift posterior al commit), STOP y reportar.

## Verification

- **Mechanical**: `npm run build` → debe compilar sin warnings nuevos.
- **DOM** (headless o DevTools):
  - `.hero-wash`, `.circuit-grid`, `.circuit-grid--bright`, `.circuit-glow`, `.circuit-signals`, 4 `.signal`, 4 `.circuit-node` existen.
  - `document.documentElement.scrollWidth === innerWidth` a 1440 y 390.
- **Pointer**: mover el mouse por el hero; el `transform` inline de `.circuit-glow` debe cambiar y volver cerca de `translate3d(0,0,0)` al salir. En touch (390) no debe haber transform inline.
- **Feel check**:
  - El spotlight sigue al cursor con un retraso perceptible pero corto (~80–120ms), no instantáneo ni flotante.
  - Las señales cruzan la periferia, nunca por detrás del H1; se leen como datos, no como decoración.
  - A 10% de playback (DevTools → Animations) el dash viaja continuo y los nodos respiran sin saltos.
  - Activar reduced-motion: spotlight centrado, sin dash ni pulsos; el hero sigue viéndose completo.
- **Done when**: build pasa, no hay overflow, el fondo responde al puntero y reduced-motion deja un frame estático limpio.
