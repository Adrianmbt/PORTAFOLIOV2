import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building2, Package, Shield, CreditCard, ExternalLink, TrendingUp } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const projects = [
  {
    id: 'impuestos',
    title: { es: 'Sistema de Pago de Impuestos', en: 'Tax Payment System' },
    category: { es: 'Gobierno Digital', en: 'Digital Government' },
    categoryColor: '#4edea3',
    icon: CreditCard,
    size: 'large',
    description: {
      es: 'Liderazgo técnico en la digitalización del recaudo municipal, integrando pasarelas de pago y auditoría en tiempo real para millones de registros tributarios.',
      en: 'Technical leadership in municipal collection digitization, integrating payment gateways and real-time auditing for millions of tax records.',
    },
    tech: ['Laravel', 'MySQL', 'REST API', 'Pasarela de Pago'],
    metrics: [
      { label: { es: 'Registros', en: 'Records' }, value: '2M+' },
      { label: { es: 'Uptime', en: 'Uptime' }, value: '99.9%' },
    ],
    gradient: 'from-[#4edea3]/10 to-transparent',
    github: 'https://github.com/AdrianBello',
    demo: null,
  },
  {
    id: 'sigraed',
    title: { es: 'SIGRAED', en: 'SIGRAED' },
    category: { es: 'Protección Civil', en: 'Civil Protection' },
    categoryColor: '#ffb3af',
    icon: Shield,
    size: 'medium',
    description: {
      es: 'Plataforma de registro y gestión para entidades de emergencia y protección civil. Sistema centralizado de operaciones críticas en tiempo real.',
      en: 'Registration and management platform for emergency and civil protection entities. Centralized critical operations system in real-time.',
    },
    tech: ['PHP MVC', 'PostgreSQL', 'WebSockets'],
    metrics: [{ label: { es: 'Entidades', en: 'Entities' }, value: '30+' }],
    gradient: 'from-[#ffb3af]/10 to-transparent',
    github: 'https://github.com/AdrianBello',
    demo: null,
  },
  {
    id: 'licoreria',
    title: { es: 'Licorería Don Beni', en: 'Licorería Don Beni' },
    category: { es: 'SaaS Retail', en: 'Retail SaaS' },
    categoryColor: '#adc6ff',
    icon: Package,
    size: 'medium',
    description: {
      es: 'Software de inventario multicurrency escalable. Control de stock automatizado y reportes financieros complejos para operaciones comerciales.',
      en: 'Scalable multicurrency inventory software. Automated stock control and complex financial reports for commercial operations.',
    },
    tech: ['Vue.js', 'Node.js', 'MongoDB'],
    metrics: [{ label: { es: 'Divisas', en: 'Currencies' }, value: '3' }],
    gradient: 'from-[#adc6ff]/10 to-transparent',
    github: 'https://github.com/AdrianBello',
    demo: null,
  },
  {
    id: 'tributaria',
    title: { es: 'Gestión Tributaria Avanzada', en: 'Advanced Tax Management' },
    category: { es: 'Fiscalización', en: 'Tax Auditing' },
    categoryColor: '#4edea3',
    icon: TrendingUp,
    size: 'small',
    description: {
      es: 'Optimización de procesos de fiscalización y control de ingresos institucionales con reportes automatizados.',
      en: 'Optimization of auditing processes and institutional income control with automated reports.',
    },
    tech: ['Python', 'Django', 'PostgreSQL'],
    metrics: [{ label: { es: 'Ahorro', en: 'Savings' }, value: '40%' }],
    gradient: 'from-[#4edea3]/8 to-transparent',
    github: 'https://github.com/AdrianBello',
    demo: null,
  },
  {
    id: 'mentoria',
    title: { es: 'Mentoría Técnica UPTJAA', en: 'Technical Mentorship UPTJAA' },
    category: { es: 'Academia', en: 'Academia' },
    categoryColor: '#adc6ff',
    icon: Building2,
    size: 'small',
    description: {
      es: 'Formación de la siguiente generación de ingenieros a través de transferencia tecnológica institucional.',
      en: 'Training the next generation of engineers through institutional technology transfer.',
    },
    tech: ['Docencia', 'Arquitectura', 'TDD'],
    metrics: [{ label: { es: 'Estudiantes', en: 'Students' }, value: '50+' }],
    gradient: 'from-[#adc6ff]/8 to-transparent',
    github: 'https://github.com/AdrianBello',
    demo: null,
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()
  const Icon = project.icon

  const isLarge = project.size === 'large'
  const isMedium = project.size === 'medium'

  const title = typeof project.title === 'object' ? project.title.es : project.title
  const description = typeof project.description === 'object' ? project.description.es : project.description

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className={`bento-card p-4 sm:p-5 md:p-6 flex flex-col group relative overflow-hidden ${
        isLarge ? 'md:col-span-2 md:row-span-2' : isMedium ? 'md:col-span-1 md:row-span-2' : ''
      }`}
    >
      {/* Data pulse on hover */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(78,222,163,0.6), transparent)' }}
      />

      {/* Gradient corner */}
      <div className={`absolute top-0 right-0 w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-bl ${project.gradient} pointer-events-none`} />

      {/* Category + Icon */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <span className="tech-chip text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1" style={{ '--dot-color': project.categoryColor }}>
          <span className="power-dot" style={{ backgroundColor: project.categoryColor }} />
          {typeof project.category === 'object' ? project.category.es : project.category}
        </span>
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${project.categoryColor}15` }}>
          <Icon size={14} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" style={{ color: project.categoryColor }} />
        </div>
      </div>

      {/* Title */}
      <h3 className={`font-semibold mb-1.5 sm:mb-2 leading-tight ${isLarge ? 'text-lg sm:text-xl md:text-2xl' : 'text-sm sm:text-base md:text-lg'}`}
        style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-on-surface)' }}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 flex-1"
        style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}>
        {description}
      </p>

      {/* Metrics */}
      {project.metrics.length > 0 && (
        <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
          {project.metrics.map((m) => (
            <div key={typeof m.label === 'object' ? m.label.es : m.label} className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-center"
              style={{ backgroundColor: 'var(--color-surface-container)' }}>
              <p className="text-base sm:text-lg font-bold font-display gradient-primary-text"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {m.value}
              </p>
              <p className="text-[9px] sm:text-xs" style={{ color: 'var(--color-outline)', fontFamily: 'Inter, sans-serif' }}>
                {typeof m.label === 'object' ? m.label.es : m.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack chips */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="tech-chip text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  return (
    <section id="experience" className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto" style={{ paddingLeft: 'clamp(1.25rem, 6vw, 5rem)', paddingRight: 'clamp(1.25rem, 6vw, 5rem)' }}>

        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <p className="text-label-md mb-2 sm:mb-3" style={{ color: 'var(--color-primary)' }}>
            {t('experience.label')}
          </p>
          <h2 className="text-display-md mb-3 sm:mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-on-surface)' }}>
            {t('experience.title')}{' '}
            <span className="gradient-primary-text">{t('experience.subtitle').split('.')[0]}</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}>
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 auto-rows-[minmax(160px,auto)]">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
