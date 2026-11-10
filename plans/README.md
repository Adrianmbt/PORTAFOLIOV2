# Animation plans — Portfolio de Adrián M. Bello T.

Cuatro planes de mejora de movimiento derivados de la auditoría de `improve-animations`. Son autocontenidos: cada uno incluye excerpts del código actual, valores exactos, pasos, límites y verificación. Ninguno modifica el código fuente por sí mismo; se ejecutan de a uno.

## Orden recomendado

| Orden | Plan | Por qué primero |
| --- | --- | --- |
| 1 | [`003-assistant-motion.md`](./003-assistant-motion.md) | Menor riesgo, 2 archivos, corrige un bug de reduced-motion y mejora la interacción más usada. |
| 2 | [`004-impact-motion-perf.md`](./004-impact-motion-perf.md) | Elimina repintado por frame y hace que las métricas se disparen por visibilidad. Base de rendimiento para el resto. |
| 3 | [`002-chapter-pills.md`](./002-chapter-pills.md) | Navegación nueva en trayectoria; independiente de Hero y del asistente. |
| 4 | [`001-hero-circuit-field.md`](./001-hero-circuit-field.md) | El cambio más grande y visible; se hace al final, sobre una base ya estable. |

## Estado

| Plan | Estado | Archivos principales | Dependencias |
| --- | --- | --- | --- |
| 003 | DONE | `src/components/Assistant.jsx`, `src/index.css` | Ninguna |
| 004 | DONE | `src/components/ProofCards.jsx`, `src/components/Hero.jsx`, `src/hooks/usePointerGlow.js`, `src/hooks/useCountUp.js`, `src/index.css`, nuevos `useInViewFlag.js` y `useMagnetic.js` | Ninguna |
| 002 | DONE | `src/components/Trajectory.jsx`, `src/index.css`, nuevos `ChapterPills.jsx` y `useTrajectoryProgress.js` | Ninguna |
| 001 | DONE | `src/components/Hero.jsx`, `src/index.css`, nuevo `useHeroSpotlight.js` | Ninguna |

## Colisiones

- **001 y 004 tocan `Hero.jsx`.** Ejecutar 004 antes que 001 (orden recomendado). Si se invierte, al aplicar 004 hay que conservar `useHeroSpotlight`, `sectionRef` y `glowRef` que introduce 001, y agregar solo `ctaRef`.
- **001 y 002 tocan `src/index.css`** en secciones distintas (`Hero atmosphere` vs `Trajectory`). No hay conflicto si se respetan los límites de cada plan.
- **003 y 004 tocan `src/index.css`** en secciones distintas (`Assistant` vs `Cards`/`Reduced motion`). Al editar reduced-motion, cada plan agrega reglas al final del mismo bloque; aplicar en orden y verificar que ambas queden.
- Ningún plan modifica `src/lib/assistant.js`, `src/data/knowledge.json` ni la carpeta `assistant/`.

## Reglas globales

- Solo `opacity` y `transform`/`translate` para movimiento; nunca `width`, `height`, `top`, `left`, `background-position` ni filtros animados.
- Duraciones de UI menores a 300ms; curvas existentes `var(--ease-out)` y `var(--ease-in-out)`.
- Hover solo bajo `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce` conserva la comprensión: fundidos cortos sí, desplazamientos y bucles no.
- Sin dependencias nuevas. Sin `will-change` permanente.
- No hay repositorio git: los planes usan el sello `no-git`.

## Verificación transversal

Después de cada plan:

1. `npm run build` sin errores ni warnings nuevos.
2. Revisar a 1440×1000 y 390×844: sin overflow horizontal (`scrollWidth === innerWidth`).
3. Probar con reduced-motion activado: el contenido sigue completo y legible.
4. Al terminar los cuatro, repetir el recorrido completo: hero → impacto → trayectoria → asistente, con teclado y puntero.
