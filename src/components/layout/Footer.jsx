import { Mail, Heart } from 'lucide-react'
import { Github, Linkedin } from '../icons/BrandIcons'
import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { t, lang } = useLanguage()

  const links = [
    { href: '#experience', label: t('nav.experience') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#impact', label: t('nav.impact') },
    { href: '#contact', label: t('nav.contact') },
  ]

  const socials = [
    { href: 'https://github.com', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:contact@adrianbello.com', icon: Mail, label: 'Email' },
  ]

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderColor: 'rgba(60,74,66,0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
          {/* Brand */}
          <div>
            <p className="font-bold text-base sm:text-lg gradient-primary-text mb-1"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Adrián Bello
            </p>
            <p className="text-xs" style={{ color: 'var(--color-outline)', fontFamily: 'Inter, sans-serif' }}>
              Full-Stack Developer
            </p>
          </div>

          {/* Nav */}
          <ul className="flex flex-wrap gap-3 sm:gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs sm:text-sm transition-colors hover:text-[#4edea3]"
                  style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg glass flex items-center justify-center transition-all duration-200 hover:scale-110 hover:text-[#4edea3]"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                <Icon size={14} className="sm:w-[16px] sm:h-[16px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3"
          style={{ borderTop: '1px solid rgba(60,74,66,0.15)' }}>
          <p className="text-xs flex items-center gap-1.5"
            style={{ color: 'var(--color-outline)', fontFamily: 'Inter, sans-serif' }}>
            © 2026 Adrián Bello
            <span>·</span>
            {lang === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}
          </p>
          <p className="text-xs flex items-center gap-1"
            style={{ color: 'var(--color-outline)', fontFamily: 'Inter, sans-serif' }}>
            {lang === 'es' ? 'Construido con' : 'Built with'} <Heart size={11} style={{ color: '#4edea3' }} /> React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
