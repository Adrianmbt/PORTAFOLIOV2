import { useEffect, useState } from 'react';

const NAV = [
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Enfoque', href: '#enfoque' },
  { label: 'Contacto', href: 'mailto:contact@adrianbello.com' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50" data-scrolled={scrolled}>
      <div className="mx-auto flex h-20 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-[4px] bg-forest font-display text-[13px] font-semibold tracking-[-0.02em] text-cream">
            AB
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold tracking-[-0.01em]">
              Adrián M. Bello T.
            </span>
            <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.18em] text-muted sm:block">
              Software &amp; AI Engineer
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} className="nav-link text-[13px] font-medium">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="mailto:contact@adrianbello.com" className="btn-head">
          Hablemos
        </a>
      </div>
    </header>
  );
}
