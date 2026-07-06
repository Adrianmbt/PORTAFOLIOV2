import { useLanguage } from '../../context/LanguageContext'
import { motion } from 'framer-motion'

export default function LanguageSwitch() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      onClick={toggleLang}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:bg-[rgba(255,255,255,0.06)]"
      style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}
      aria-label={`Switch to ${lang === 'es' ? 'English' : 'Español'}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <motion.span
        key={lang}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="uppercase"
      >
        {lang}
      </motion.span>
    </button>
  )
}