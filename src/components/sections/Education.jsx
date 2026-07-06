import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, BookOpen, Code, Users } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const degrees = [
  {
    key: 'degree1',
    periodKey: 'period1',
    shortKey: 'degree1Short',
    institutionKey: 'institution1',
    icon: BookOpen,
    color: '#4edea3',
  },
  {
    key: 'degree2',
    periodKey: 'period2',
    shortKey: 'degree2Short',
    institutionKey: 'institution2',
    icon: GraduationCap,
    color: '#adc6ff',
    noteKey: 'pause',
  },
]

const projects = [
  {
    key: 'project1',
    descKey: 'project1Desc',
    icon: Code,
    color: '#4edea3',
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'Bootstrap'],
  },
  {
    key: 'project2',
    descKey: 'project2Desc',
    icon: Users,
    color: '#ffb3af',
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'Bootstrap'],
  },
]

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t, lang } = useLanguage()

  return (
    <section
      id="education"
      className="section-padding"
      style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
    >
      <div
        className="max-w-6xl mx-auto"
        style={{ paddingLeft: 'clamp(1.25rem, 6vw, 5rem)', paddingRight: 'clamp(1.25rem, 6vw, 5rem)' }}
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <p className="text-label-md mb-2 sm:mb-3" style={{ color: 'var(--color-primary)' }}>
            {t('education.label')}
          </p>
          <h2
            className="text-display-md mb-3 sm:mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-on-surface)' }}
          >
            {t('education.title')}{' '}
            <span className="gradient-primary-text">{t('education.subtitle').split('.')[0]}</span>
          </h2>
          <p
            className="text-sm sm:text-base max-w-2xl"
            style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}
          >
            {t('education.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 sm:gap-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            {degrees.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                  className="bento-card p-5 sm:p-6 flex items-start gap-4 sm:gap-5 relative overflow-hidden group"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${item.color}80, transparent)` }}
                  />
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}18` }}
                  >
                    <Icon size={18} className="sm:w-[20px] sm:h-[20px]" style={{ color: item.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className="text-[10px] sm:text-xs font-mono font-semibold tracking-wide"
                      style={{ color: item.color }}
                    >
                      {t(`education.${item.periodKey}`)}
                    </span>
                    <h3
                      className="text-sm sm:text-base font-semibold mt-1"
                      style={{ color: 'var(--color-on-surface)', fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {t(`education.${item.key}`)}
                    </h3>
                    <p
                      className="text-xs sm:text-sm mt-0.5"
                      style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}
                    >
                      {t(`education.${item.institutionKey}`)}
                    </p>
                    {item.noteKey && (
                      <span className="inline-flex items-center gap-1 mt-2 text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full border"
                        style={{ color: item.color, borderColor: `${item.color}30`, backgroundColor: `${item.color}10` }}
                      >
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: item.color }} />
                        {t(`education.${item.noteKey}`)}
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4 sm:mb-5"
            >
              <p className="text-label-md mb-1" style={{ color: 'var(--color-primary)' }}>
                {t('education.projectsTitle')}
              </p>
              <p
                className="text-xs sm:text-sm"
                style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}
              >
                {t('education.projectsSub')}
              </p>
            </motion.div>

            <div className="flex flex-col gap-4 sm:gap-5">
              {projects.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.4 }}
                    className="bento-card p-5 sm:p-6 relative overflow-hidden group"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, transparent, ${item.color}80, transparent)` }}
                    />
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${item.color}18` }}
                      >
                        <Icon size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: item.color }} />
                      </div>
                      <div>
                        <h3
                          className="text-sm sm:text-base font-semibold"
                          style={{ color: 'var(--color-on-surface)', fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          {t(`education.${item.key}`)}
                        </h3>
                        <p
                          className="text-xs sm:text-sm mt-0.5"
                          style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}
                        >
                          {t(`education.${item.descKey}`)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: `${item.color}12`,
                            color: item.color,
                            border: `1px solid ${item.color}20`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
