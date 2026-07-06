import { useState, useEffect, useRef } from 'react'
import { Menu, X, Terminal, GraduationCap, Briefcase, FolderGit2, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import LanguageSwitch from '../ui/LanguageSwitch'

const sections = [
  { key: 'education', href: '#education', labelKey: 'nav.education', icon: GraduationCap },
  { key: 'experience', href: '#experience', labelKey: 'nav.experience', icon: Briefcase },
  { key: 'projects', href: '#projects', labelKey: 'nav.projects', icon: FolderGit2 },
  { key: 'contact', href: '#contact', labelKey: 'nav.contact', icon: Mail },
]

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const progressRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 40)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id || 'hero')
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    const sectionIds = ['home', ...sections.map((s) => s.key)]
    const sectionElements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    sectionElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleNav = (href, key) => {
    setActive(key)
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav
        className={`relative transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(12,19,36,0.82)] backdrop-blur-2xl shadow-[0_1px_0_rgba(78,222,163,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 flex items-center justify-between h-14 sm:h-16 lg:h-18">
          <a
            href="#home"
            onClick={() => setActive('hero')}
            className="flex items-center gap-2 sm:gap-2.5 group"
          >
            <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg bg-gradient-to-br from-[#4edea3] to-[#10b981] group-hover:shadow-[0_0_20px_rgba(78,222,163,0.35)] transition-shadow duration-300">
              <Terminal size={12} className="text-[#003824] sm:w-[14px] sm:h-[14px]" />
            </span>
            <span className="hidden sm:block">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-[#dce1fb] group-hover:text-white transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Adrián Bello
              </span>
              <span className="block text-[8px] sm:text-[9px] text-[#86948a] -mt-0.5 whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                Full Stack Engineer & Automation & Data Systems
              </span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {sections.map((s) => (
              <a
                key={s.key}
                href={s.href}
                onClick={() => handleNav(s.href, s.key)}
                className={`relative flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-all duration-300 ${
                  active === s.key
                    ? 'text-[#4edea3]'
                    : 'text-[#86948a] hover:text-[#dce1fb]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <s.icon size={14} className="shrink-0" />
                {t(s.labelKey)}
                {active === s.key && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-[rgba(78,222,163,0.08)] border border-[rgba(78,222,163,0.12)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <LanguageSwitch />
            <a
              href="#contact"
              className="relative overflow-hidden group flex items-center gap-2 bg-gradient-to-r from-[#4edea3] to-[#10b981] text-[#003824] px-3.5 xl:px-4 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_24px_rgba(78,222,163,0.35)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">{t('nav.hire')}</span>
            </a>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <LanguageSwitch />
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-1.5 sm:p-2 rounded-lg text-[#86948a] hover:text-[#dce1fb] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-[rgba(12,19,36,0.95)] backdrop-blur-2xl border-t border-[rgba(78,222,163,0.06)] overflow-hidden"
            >
              <div className="px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-4 flex flex-col gap-1">
                {sections.map((s, i) => (
                  <motion.a
                    key={s.key}
                    href={s.href}
                    onClick={() => handleNav(s.href, s.key)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active === s.key
                        ? 'text-[#4edea3] bg-[rgba(78,222,163,0.08)] border border-[rgba(78,222,163,0.12)]'
                        : 'text-[#86948a] hover:text-[#dce1fb] hover:bg-[rgba(255,255,255,0.03)]'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <s.icon size={16} className="shrink-0" />
                    {t(s.labelKey)}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.2 }}
                  className="mt-2 bg-gradient-to-r from-[#4edea3] to-[#10b981] text-[#003824] px-4 py-3 rounded-lg text-sm font-semibold text-center"
                >
                  {t('nav.hire')}
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(78,222,163,0.06)]"
        >
          <div
            className="h-full bg-gradient-to-r from-[#4edea3] to-[#10b981] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>
    </motion.header>
  )
}
