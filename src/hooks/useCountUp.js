import { useEffect, useState } from 'react';

export function useCountUp(target, { duration = 900, delay = 0, start = true } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    let raf = 0;
    let startTime = 0;

    const tick = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(target * eased);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    const timeout = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay, start]);

  return value;
}
