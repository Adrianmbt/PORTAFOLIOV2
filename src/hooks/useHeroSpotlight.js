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
