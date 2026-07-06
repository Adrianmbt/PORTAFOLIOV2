import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Bot, Code2, Database, Globe, GitBranch, Layers,
  Cpu, Zap, Server, Lock,
} from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const skillCategories = [
  {
    label: { es: 'Backend', en: 'Backend' },
    color: '#4edea3',
    skills: [
      { name: 'PHP / Laravel', icon: Server, level: 95 },
      { name: 'Python / Django', icon: Code2, level: 80 },
      { name: 'Node.js', icon: Zap, level: 75 },
    ],
  },
  {
    label: { es: 'Frontend', en: 'Frontend' },
    color: '#adc6ff',
    skills: [
      { name: 'React', icon: Globe, level: 78 },
      { name: 'Vue.js', icon: Layers, level: 82 },
      { name: 'TypeScript', icon: Code2, level: 72 },
    ],
  },
  {
    label: { es: 'Infraestructura', en: 'Infrastructure' },
    color: '#ffb3af',
    skills: [
      { name: 'MySQL / PostgreSQL', icon: Database, level: 90 },
      { name: 'Docker / Linux', icon: Server, level: 80 },
      { name: 'Git / CI-CD', icon: GitBranch, level: 85 },
    ],
  },
  {
    label: { es: 'IA & DevOps', en: 'AI & DevOps' },
    color: '#4edea3',
    skills: [
      { name: 'Cursor / Copilot', icon: Bot, level: 88 },
      { name: 'Arquitectura MVC', icon: Cpu, level: 95 },
      { name: 'Seguridad & Auth', icon: Lock, level: 82 },
    ],
  },
]

function SkillBar({ skill, color, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const Icon = skill.icon

  return (
    <div ref={ref} className="flex flex-col gap-1.5 sm:gap-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
          style={{ color: 'var(--color-on-surface)', fontFamily: 'Inter, sans-serif' }}>
          <Icon size={12} className="sm:w-[14px] sm:h-[14px]" style={{ color }} />
          {skill.name}
        </span>
        <span className="text-[10px] sm:text-xs font-mono" style={{ color: 'var(--color-outline)' }}>
          {skill.level}%
        </span>
      </div>
      <div className="h-1 sm:h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-container)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 0.9, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
        />
      </div>
    </div>
  )
}

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  return (
    <section
      id="skills"
      className="section-padding"
      style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
    >
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
            {t('skills.label')}
          </p>
          <h2 className="text-display-md mb-3 sm:mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-on-surface)' }}>
            {t('skills.title')}{' '}
            <span className="gradient-primary-text">{t('skills.subtitle').split('.')[0]}</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl"
            style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}>
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={typeof cat.label === 'object' ? cat.label.es : cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 + 0.2 }}
              className="bento-card p-4 sm:p-5 flex flex-col gap-4 sm:gap-5"
            >
              <div className="data-pulse-line" style={{ background: `linear-gradient(90deg, transparent, ${cat.color}80, transparent)` }} />
              {/* Category header */}
              <div className="flex items-center gap-2">
                <span className="power-dot" style={{ backgroundColor: cat.color }} />
                <span className="text-label-md text-xs sm:text-sm" style={{ color: cat.color }}>
                  {typeof cat.label === 'object' ? cat.label.es : cat.label}
                </span>
              </div>
              {/* Skills */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={cat.color}
                    delay={ci * 0.1 + si * 0.08 + 0.4}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 sm:mt-7 lg:mt-8 bento-card p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 relative overflow-hidden"
        >
          <div className="data-pulse-line" />
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <Bot size={18} className="sm:w-[22px] sm:h-[22px] text-[#003824]" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base mb-1"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-on-surface)' }}>
                {t('skills.aiTitle')}
              </h3>
              <p className="text-xs sm:text-sm"
                style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}>
                {t('skills.aiDesc')}
              </p>
            </div>
          </div>
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {['Cursor IDE', 'GitHub Copilot', 'Gemini'].map((tool) => (
              <span key={tool} className="tech-chip text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1">
                <span className="power-dot" style={{ backgroundColor: '#4edea3' }} />
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
