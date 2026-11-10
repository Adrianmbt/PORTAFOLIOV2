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
      if (!wrap.offsetHeight) return;

      const rect = wrap.getBoundingClientRect();
      const readingLine = window.innerHeight * 0.45;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const absoluteTop = rect.top + window.scrollY;

      const raw = (readingLine - rect.top) / rect.height;
      const reachable = Math.min(
        Math.max((readingLine - absoluteTop + maxScroll) / rect.height, 0),
        1
      );
      const progress = reachable > 0 ? raw / reachable : raw;
      const clamped = Math.min(Math.max(progress, 0), 1);

      bar.style.transform = `scaleY(${clamped.toFixed(4)})`;
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
