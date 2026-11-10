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
