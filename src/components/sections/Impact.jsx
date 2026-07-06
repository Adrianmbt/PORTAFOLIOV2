import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Users, Globe, Award } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const impactStats = [
  {
    icon: TrendingUp,
    value: '2M+',
    label: { es: 'Registros tributarios procesados', en: 'Tax records processed' },
    description: {
      es: 'Sistema de pago de impuestos municipales con auditoría en tiempo real.',
      en: 'Municipal tax payment system with real-time auditing.',
    },
    color: '#4edea3',
  },
  {
    icon: Users,
    value: '50+',
    label: { es: 'Ingenieros formados', en: 'Engineers trained' },
    description: {
      es: 'Programa de mentoría técnica en la UPTJAA transferencia de conocimiento institucional.',
      en: 'Technical mentorship program at UPTJAA institutional knowledge transfer.',
    },
    color: '#adc6ff',
  },
  {
    icon: Globe,
    value: '30+',
    label: { es: 'Entidades conectadas', en: 'Connected entities' },
    description: {
      es: 'SIGRAED: red interoperativa para organismos de protección civil y emergencias.',
      en: 'SIGRAED: interoperable network for civil protection and emergency agencies.',
    },
    color: '#ffb3af',
  },
  {
    icon: Award,
    value: '8+',
    label: { es: 'Años de liderazgo técnico', en: 'Years of technical leadership' },
    description: {
      es: 'De pasante a Director Técnico: trayectoria continua de crecimiento y responsabilidad.',
      en: 'From intern to Technical Director: continuous growth and responsibility trajectory.',
    },
    color: '#4edea3',
  },
]

const timeline = [
  {
    year: '2024–Now',
    role: { es: 'Director Técnico', en: 'Technical Director' },
    org: { es: 'Proyectos Institucionales', en: 'Institutional Projects' },
    color: '#4edea3',
  },
  {
    year: '2021–2024',
    role: { es: 'Líder de Ingeniería', en: 'Engineering Lead' },
    org: { es: 'Gobierno Municipal', en: 'Municipal Government' },
    color: '#adc6ff',
  },
  {
    year: '2018–2021',
    role: { es: 'Software Engineer Sr.', en: 'Sr. Software Engineer' },
    org: { es: 'Sector Público', en: 'Public Sector' },
    color: '#4edea3',
  },
  {
    year: '2016–2018',
    role: { es: 'Desarrollador Junior', en: 'Junior Developer' },
    org: { es: 'Primer cargo profesional', en: 'First professional role' },
    color: '#bbcabf',
  },
]

export default function Impact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  return (
    <section id="impact" className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto" style={{ paddingLeft: 'clamp(1.25rem, 6vw, 5rem)', paddingRight: 'clamp(1.25rem, 6vw, 5rem)' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <p className="text-label-md mb-2 sm:mb-3" style={{ color: 'var(--color-primary)' }}>
            {t('impact.label')}
          </p>
          <h2 className="text-display-md mb-3 sm:mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-on-surface)' }}>
            {t('impact.title')}{' '}
            <span className="gradient-primary-text">{t('impact.subtitle').split('.')[0]}</span>
          </h2>
          <p className="text-sm sm:text-base max-w-xl"
            style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}>
            {t('impact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-5 sm:gap-6 lg:gap-7">
          {/* Impact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {impactStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={typeof stat.label === 'object' ? stat.label.es : stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  className="bento-card p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${stat.color}80, transparent)` }} />

                  <div className="flex items-start justify-between">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${stat.color}18` }}>
                      <Icon size={16} className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]" style={{ color: stat.color }} />
                    </div>
                  </div>

                  <div>
                    <p className="text-2xl sm:text-3xl font-bold mb-1 gradient-primary-text"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                      style={{ color: 'var(--color-on-surface)', fontFamily: 'Inter, sans-serif' }}>
                      {typeof stat.label === 'object' ? stat.label.es : stat.label}
                    </p>
                    <p className="text-[10px] sm:text-xs leading-relaxed"
                      style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}>
                      {typeof stat.description === 'object' ? stat.description.es : stat.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bento-card p-4 sm:p-5 md:p-6 relative overflow-hidden h-fit lg:sticky lg:top-24"
          >
            <div className="data-pulse-line" />
            <p className="text-label-md mb-4 sm:mb-5 md:mb-6" style={{ color: 'var(--color-primary)' }}>
              {t('impact.timeline')}
            </p>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[14px] sm:left-[16px] md:left-[18px] top-0 bottom-0 w-px"
                style={{ backgroundColor: 'var(--color-surface-container-high)' }} />

              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    className="flex gap-3 sm:gap-4 items-start relative"
                  >
                    {/* Dot */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex-shrink-0 flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110"
                      style={{ backgroundColor: `${item.color}20`, border: `2px solid ${item.color}40` }}>
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-mono" style={{ color: item.color }}>
                        {item.year}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold mt-0.5"
                        style={{ color: 'var(--color-on-surface)', fontFamily: 'Space Grotesk, sans-serif' }}>
                        {typeof item.role === 'object' ? item.role.es : item.role}
                      </p>
                      <p className="text-[10px] sm:text-xs mt-0.5"
                        style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}>
                        {typeof item.org === 'object' ? item.org.es : item.org}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
