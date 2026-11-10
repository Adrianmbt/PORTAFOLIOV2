# 004 — Impact metrics on view, transform-based card glow, magnetic primary CTA

- **Status**: DONE
- **Commit**: no-git (repo sin inicializar)
- **Severity**: MEDIUM (percepción de rendimiento + detalle táctil)
- **Category**: Performance / Missing interaction
- **Estimated scope**: 2 new files, 4 edited, ~150 lines

## Problem

Tres detalles hacen que el impacto y el CTA se sientan menos sólidos de lo que deberían:

1. Los contadores arrancan por tiempo (`delay` de 700–860ms) sin importar si la tarjeta está en pantalla; si el usuario carga con scroll restaurado o entra directo a `#impacto`, la animación ya terminó.
2. El glow de las tarjetas se pinta con un `radial-gradient` reposicionado por variables CSS en cada frame (`--mx`, `--my`), lo que obliga a repintar el gradiente de 280px en cada movimiento del puntero.
3. El CTA principal no responde al puntero; es el elemento más importante del hero y se siente estático comparado con el resto.

`src/components/ProofCards.jsx:28-41` — el contador depende solo del tiempo:

```jsx
function Stat({ prefix = '', value, suffix, label, delay }) {
  const current = useCountUp(value, { duration: 950, delay });
  ...
```

`src/components/ProofCards.jsx:84-98` — el trazo pulsa al cargar, no al entrar en vista:

```jsx
<path
  className="data-pulse"
  d="M0 13 H34 L44 6 L54 19 L64 13 H140"
  fill="none"
  stroke="rgba(11,107,79,0.45)"
  strokeWidth="1.2"
  ...
```

`src/hooks/usePointerGlow.js:20-29` — variables CSS por frame:

```js
const tick = () => {
  currentX += (targetX - currentX) * 0.18;
  currentY += (targetY - currentY) * 0.18;
  el.style.setProperty('--mx', `${currentX}px`);
  el.style.setProperty('--my', `${currentY}px`);
  ...
```

`src/index.css:392-410` — gradiente que se repinta:

```css
  .glow-card::before {
    ...
    background: radial-gradient(
      280px circle at var(--mx) var(--my),
      rgba(11, 107, 79, 0.13),
      transparent 68%
    );
```

`src/components/Hero.jsx:57-62` — CTA principal sin referencia:

```jsx
<a href="mailto:contact@adrianbello.com" className="btn-primary">
  Hablemos de su proyecto
  <span aria-hidden="true" className="arrow">
    →
  </span>
</a>
```

## Target

1. **Métricas al entrar en vista**: un `IntersectionObserver` por tarjeta de impacto; los 3 contadores arrancan una sola vez cuando la tarjeta cruza el 35% y el trazo `data-pulse` se dibuja entonces, con `200ms` de delay. Reduced motion salta directo al valor final.
2. **Glow por transform**: un `<span class="glow-spot">` de 280px con un radial estático; el hook mueve `transform: translate3d(x, y, 0)` sobre ese span. Se elimina el gradiente animado por variables CSS. Sin repintar el gradiente.
3. **CTA magnético**: `useMagnetic` mueve el CTA hasta ±6px usando la propiedad individual `translate` (no `transform`, para no pelear con `:active scale`). Solo `(hover: hover) and (pointer: fine)` y sin reduced motion. Al salir, vuelve a `0px 0px` con `180ms var(--ease-out)` vía WAAPI.
4. El resto de botones y tarjetas queda igual.

## Repo conventions to follow

- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` / `var(--ease-out)` (`src/index.css:18`).
- Hover gated por media query (`src/index.css:378`, `561`).
- Hooks con rAF + refs: patrón de `src/hooks/usePointerGlow.js:6-51`.
- Observer de una sola vez: patrón de `src/hooks/useInView.js:16-27`.
- Reduced-motion centralizado (`src/index.css:580-631`).

## Steps

### 1. Crear `src/hooks/useInViewFlag.js`

```js
import { useEffect, useRef, useState } from 'react';

export function useInViewFlag({ threshold = 0.35, rootMargin = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
```

### 2. Extender `src/hooks/useCountUp.js`

Cambiar la firma y el efecto:

```js
export function useCountUp(target, { duration = 900, delay = 0, start = true } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    ...
  }, [target, duration, delay, start]);
```

No cambiar el resto del cuerpo. `start` por defecto `true` mantiene compatibilidad con cualquier otro uso.

### 3. Actualizar `src/components/ProofCards.jsx`

Imports:

```jsx
import { useInViewFlag } from '../hooks/useInViewFlag';
```

`Stat` recibe `start`:

```jsx
function Stat({ prefix = '', value, suffix, label, delay, start }) {
  const current = useCountUp(value, { duration: 950, delay, start });
  ...
```

En `ProofCards`:

```jsx
export default function ProofCards() {
  const [impactRef, impactInView] = useInViewFlag();

  return (
    ...
```

En la primera tarjeta, agregar el `ref` al contenedor interno (línea 66):

```jsx
<div ref={impactRef} className="relative z-10">
```

Pasar `start` a cada stat:

```jsx
{STATS.map((stat) => (
  <Stat key={stat.label} {...stat} start={impactInView} />
))}
```

Y condicionar el trazo:

```jsx
<path
  className="data-pulse"
  data-run={impactInView ? 'true' : 'false'}
  ...
```

### 4. Reescribir `src/hooks/usePointerGlow.js`

```js
import { useEffect, useRef } from 'react';

export function usePointerGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const spot = el.querySelector('.glow-spot');
    if (!spot) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return undefined;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let primed = false;

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      spot.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      const settled =
        Math.abs(targetX - currentX) < 0.5 && Math.abs(targetY - currentY) < 0.5;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;

      if (!primed) {
        currentX = targetX;
        currentY = targetY;
        primed = true;
      }

      if (!raf) raf = requestAnimationFrame(tick);
    };

    el.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      el.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
```

### 5. Actualizar `GlowCard` en `src/components/ProofCards.jsx`

Agregar el span antes de `{children}`:

```jsx
<article ...>
  <span className="glow-spot" aria-hidden="true" />
  {children}
</article>
```

### 6. Actualizar CSS en `src/index.css`

Reemplazar `.glow-card { --mx: 50%; --my: 0%; }` y el bloque `.glow-card::before`:

```css
.glow-card {
  position: relative;
}

.glow-spot {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  width: 280px;
  height: 280px;
  margin: -140px 0 0 -140px;
  border-radius: 9999px;
  pointer-events: none;
  background: radial-gradient(circle, rgba(11, 107, 79, 0.13), transparent 68%);
  opacity: 0;
  transition: opacity 240ms var(--ease-out);
  transform: translate3d(0, 0, 0);
}

@media (hover: hover) and (pointer: fine) {
  .glow-card:hover .glow-spot {
    opacity: 1;
  }
}
```

Mantener las reglas existentes de hover que mueven la tarjeta (`translateY(-2px)`, borde, sombra). Borrar únicamente `.glow-card::before` y `.glow-card:hover::before`.

Cambiar `.data-pulse`:

```css
.data-pulse {
  stroke-dasharray: 240;
  stroke-dashoffset: 240;
}

.data-pulse[data-run="true"] {
  animation: dash 1.8s var(--ease-out) 200ms forwards;
}
```

En reduced-motion, agregar:

```css
  .glow-spot {
    display: none;
  }
```

### 7. Crear `src/hooks/useMagnetic.js`

```js
import { useEffect, useRef } from 'react';

export function useMagnetic({ strength = 0.18, max = 6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    let raf = 0;
    let animation = null;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      raf = 0;
      el.style.translate = `${targetX.toFixed(2)}px ${targetY.toFixed(2)}px`;
    };

    const onMove = (event) => {
      if (animation) {
        animation.cancel();
        animation = null;
      }

      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);

      targetX = Math.max(-max, Math.min(max, dx * strength));
      targetY = Math.max(-max, Math.min(max, dy * strength));

      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }

      animation = el.animate(
        [
          { translate: el.style.translate || '0px 0px' },
          { translate: '0px 0px' },
        ],
        { duration: 180, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
      );

      animation.onfinish = () => {
        el.style.translate = '0px 0px';
        animation = null;
      };
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      if (animation) animation.cancel();
      el.style.translate = '';
    };
  }, [strength, max]);

  return ref;
}
```

### 8. Actualizar `src/components/Hero.jsx`

Agregar el import:

```jsx
import { useMagnetic } from '../hooks/useMagnetic';
```

Dentro de `Hero`, antes del `return`:

```jsx
const ctaRef = useMagnetic();
```

Agregar `ref` solo al CTA principal:

```jsx
<a ref={ctaRef} href="mailto:contact@adrianbello.com" className="btn-primary">
```

Si el plan 001 ya se ejecutó, conservar `useHeroSpotlight` y su `sectionRef`/`glowRef`; agregar `ctaRef` sin quitarlos.

## Boundaries

- No tocar los valores de los stats, el copy, las instituciones ni el ticker.
- No animar `box-shadow`, `background-position` ni filtros en movimiento.
- No aplicar el magnético a `.btn-quiet`, al header ni al trigger del asistente.
- No cambiar la transición de hover de `.glow-card` (elevación, borde, sombra).
- No usar `transform` para el magnético: debe ser la propiedad `translate`.
- Si `ProofCards.jsx`, `usePointerGlow.js` o `Hero.jsx` no coinciden con los excerpts, STOP y reportar.

## Verification

- **Mechanical**: `npm run build` sin errores.
- **DOM/layout**:
  - Cada `.glow-card` contiene un `.glow-spot`.
  - `.data-pulse` tiene `data-run="false"` al cargar con la tarjeta fuera de vista y pasa a `"true"` al entrar.
  - A 1440 y 390 no hay overflow horizontal.
- **Comportamiento**:
  - Recargar con `#impacto` en la URL: los contadores arrancan desde 0 y el trazo se dibuja (no aparecen ya terminados).
  - Mover el puntero sobre la tarjeta: `.glow-spot` recibe `transform: translate3d(...)`; no existen `--mx`/`--my`.
  - Puntero sobre el CTA: `style.translate` varía dentro de ±6px; al salir vuelve a `0px 0px` con transición suave.
  - Click en el CTA: sigue navegando a `mailto:` y el `:active scale` no se rompe.
- **Reduced motion**: stats en valor final, sin glow, sin magnético, `data-pulse` visible completo.
- **Feel check**: el magnético se siente como atracción sutil, no como el botón persiguiendo el cursor; el glow sigue al puntero sin “pegarse” ni saltar al entrar.
- **Done when**: build pasa, los contadores se disparan por visibilidad una sola vez y el CTA responde al puntero sin afectar el click.
