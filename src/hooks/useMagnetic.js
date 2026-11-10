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
        [{ translate: el.style.translate || '0px 0px' }, { translate: '0px 0px' }],
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
