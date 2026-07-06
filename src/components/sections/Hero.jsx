import { motion } from 'framer-motion'
import { ArrowDown, Mail, Terminal, Code, Database, Globe, TrendingUp, Cpu, Activity, ShoppingCart } from 'lucide-react'
import { Github, Linkedin } from '../icons/BrandIcons'
import { useLanguage } from '../../context/LanguageContext'
import TechMarquee from '../ui/TechMarquee'

// 📊 Diccionario local para asegurar la consistencia del Hero en ambos idiomas
const translations = {
  es: {
    available: 'DISPONIBLE PARA PROYECTOS',
    subtitle: 'Ingeniero de Software y Datos especializado en automatización y arquitecturas escalables. Combino el desarrollo backend con ingeniería de datos para transformar flujos críticos en plataformas de alta concurrencia. Código eficiente, infraestructura que rinde.',
    explore: 'Explorar Trayectoria',
    contactBtn: 'Contactar',
    follow: 'SÍGUEME',
    statsLabel: 'METRICAS DE PROYECTOS',
    live: 'DASHBOARD INTERACTIVO',
    techStack: 'STACK TECNOLÓGICO',
    scroll: 'SCROLL',
    transacciones: 'Transacciones',
    sedes: 'Sedes conectadas',
    tiempos: 'Tiempos Operativos'
  },
  en: {
    available: 'AVAILABLE FOR PROJECTS',
    subtitle: 'Software & Data Engineer specialized in automation and scalable architectures. I blend backend development with data engineering to transform critical workflows into high-concurrency platforms. Efficient code, performing infrastructure.',
    explore: 'Explore Trajectory',
    contactBtn: 'Contact Me',
    follow: 'FOLLOW ME',
    statsLabel: 'PROJECT METRICS',
    live: 'INTERACTIVE DASHBOARD',
    techStack: 'TECH STACK',
    scroll: 'SCROLL',
    transacciones: 'Transactions',
    sedes: 'Connected branches',
    tiempos: 'Operational Times'
  }
}

// 🛠️ 5 Proyectos Estratégicos con sus métricas e insignias de stack explícitas
const impactHighlights = [
  {
    icon: Database,
    label: 'Tax Payment Platform (SEMATRIG)',
    metric: '+5M',
    metricKey: 'transacciones',
    status: { es: 'Optimizado', en: 'Optimized' },
    statusColor: '#4edea3',
    sparkline: [20, 45, 28, 60, 55, 80, 95],
    stack: ['Python', 'FastAPI', 'MySQL', 'React']
  },
  {
    icon: ShoppingCart,
    label: 'Don Beni Bodegón SaaS',
    metric: 'Multi-tenant',
    metricKey: 'transacciones',
    status: { es: 'Alta Concurrencia', en: 'High Concurrency' },
    statusColor: '#adc6ff',
    sparkline: [40, 50, 45, 70, 65, 85, 90],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'React']
  },
  {
    icon: Globe,
    label: 'SIGRAED (Emergencias)',
    metric: '30+',
    metricKey: 'sedes',
    status: { es: 'Tiempo Real', en: 'Real-Time' },
    statusColor: '#ffb3af',
    sparkline: [10, 15, 35, 25, 45, 42, 60],
    stack: ['FastAPI', 'React', 'SQL']
  },
  {
    icon: Code,
    label: 'Atención al Ciudadano (Gobernación)',
    metric: 'Estatal',
    metricKey: 'transacciones',
    status: { es: 'Producción', en: 'Production' },
    statusColor: '#4edea3',
    sparkline: [30, 40, 60, 70, 75, 85, 95],
    stack: ['PHP', 'MySQL', 'JavaScript']
  },
  {
    icon: Terminal,
    label: 'Infinity Gym Center',
    metric: '-30%',
    metricKey: 'tiempos',
    status: { es: 'Eficiencia', en: 'Efficiency' },
    statusColor: '#4edea3',
    sparkline: [80, 70, 55, 45, 40, 35, 30],
    stack: ['PHP', 'Laravel', 'JavaScript', 'MySQL']
  },
]

export default function Hero() {
  const { lang } = useLanguage()
  const t = (key) => translations[lang]?.[key] || translations['es'][key]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col bg-grid overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[900px] h-[55vh] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, #4edea3, transparent 70%)' }}
      />

      <div
        className="relative w-full"
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          paddingTop: 'clamp(5.5rem, 14vw, 10rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          paddingLeft: 'clamp(1.25rem, 6vw, 5rem)',
          paddingRight: 'clamp(1.25rem, 6vw, 5rem)',
        }}
      >
        <div
          className="grid items-stretch" 
          style={{
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: 'clamp(2rem, 5vw, 4rem)',
          }}
          ref={el => {
            if (!el) return;
            const update = () => {
              el.style.gridTemplateColumns = window.innerWidth >= 1024
                ? '1fr 1fr'
                : '1fr';
            };
            update();
            window.addEventListener('resize', update);
          }}
        >
          
          {/* LEFT COLUMN */}
          <div className="min-w-0 flex flex-col justify-center" style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="tech-chip text-[10px] sm:text-xs px-3 py-1">
                  <span className="power-dot" style={{ backgroundColor: '#4edea3' }} />
                  {t('available')}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-4"
              >
                <h1 className="text-[clamp(2.5rem,5.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  <span style={{ color: 'var(--color-on-surface)' }}>ADRIÁN</span>
                  <br />
                  <span className="gradient-primary-text">BELLO</span>
                </h1>
                
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-semibold leading-relaxed tracking-tight text-[var(--color-on-surface-variant)]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  <span className="text-[#4edea3] font-mono text-[10px] sm:text-[11px] border border-[#4edea3]/20 bg-[#4edea3]/5 px-1.5 sm:px-2 py-0.5 rounded flex items-center gap-1 sm:gap-1.5">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#4edea3]" />
                    Python
                  </span>
                  <span className="text-[#61DAFB] font-mono text-[10px] sm:text-[11px] border border-[#61DAFB]/20 bg-[#61DAFB]/5 px-1.5 sm:px-2 py-0.5 rounded flex items-center gap-1 sm:gap-1.5">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#61DAFB]" />
                    React
                  </span>
                  <span className="text-[#86948a] font-normal px-0.5">|</span>
                  <span>Full Stack Engineer</span>
                  <span className="text-[#86948a] font-normal">&</span>
                  <span className="text-white">Automation & Data Systems</span>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base leading-relaxed max-w-xl text-[#bbcabf] font-body"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
            >
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="#experience"
                  className="bg-gradient-to-r from-[#4edea3] to-[#10b981] text-[#003824] px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(78,222,163,0.4)] hover:scale-[1.02] inline-flex items-center gap-1.5 sm:gap-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t('explore')}
                  <ArrowDown size={12} className="sm:w-[14px] sm:h-[14px]" />
                </a>
                <a
                  href="#contact"
                  className="glass-card px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:border-[rgba(78,222,163,0.25)] hover:scale-[1.02] inline-flex items-center gap-1.5 sm:gap-2"
                  style={{ color: 'var(--color-on-surface)', fontFamily: 'Inter, sans-serif' }}
                >
                  <Mail size={12} className="sm:w-[14px] sm:h-[14px]" />
                  {t('contactBtn')}
                </a>
              </div>

              <div className="hidden sm:block h-7 w-px bg-[rgba(255,255,255,0.08)]" />

              <div className="flex items-center gap-2.5">
                {[
                  { href: 'https://github.com/Adrianmbt', icon: Github, label: 'GitHub' },
                  { href: 'https://linkedin.com/in/adrian-bello-2b14a2199', icon: Linkedin, label: 'LinkedIn' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg glass flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-[rgba(78,222,163,0.3)] hover:text-[#4edea3]"
                    style={{ color: 'var(--color-on-surface-variant)' }}
                  >
                    <Icon size={14} className="sm:w-[16px] sm:h-[16px] lg:w-[18px] lg:h-[18px]" />
                  </a>
                ))}
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#86948a] ml-0.5">{t('follow')}</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - DASHBOARD REESTRUCTURADO Y EXPANDIDO VERTICALMENTE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="hidden md:flex flex-col w-full relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-[#4edea3] to-[#10b981] rounded-2xl blur-lg opacity-[0.01] group-hover:opacity-[0.04] transition duration-1000 pointer-events-none" />
            
            {/* px-10 margen lateral amplio para que bordes no tapen el contenido */}
            <div className="relative border border-[rgba(78,222,163,0.15)] bg-[rgba(10,15,28,0.7)] backdrop-blur-xl rounded-2xl overflow-hidden px-10 py-5 shadow-2xl flex flex-col justify-between h-full">
              
              {/* ⬆️ HEADER con padding vertical reducido */}
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3 mb-3 px-1 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/40" />
                  </div>
                  {/* Cambiado a text-xs para mejor legibilidad */}
                  <span className="text-xs font-mono tracking-wider text-[#9fb0a4] flex items-center gap-2 ml-2 select-none">
                    <Cpu size={12} className="text-[#4edea3]" /> {t('statsLabel')}
                  </span>
                </div>
                {/* Expandido el contenedor del Badge Live para evitar cortes de texto */}
                <div className="flex items-center gap-1.5 bg-[#4edea3]/10 px-3 py-1 rounded-full border border-[#4edea3]/20 flex-shrink-0">
                  <Activity size={11} className="text-[#4edea3] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-[#4edea3] uppercase tracking-widest">
                    {t('live')}
                  </span>
                </div>
              </div>

              {/* ➡️ FILAS INTERNAS MÁS COMPACTAS */}
              <div className="flex-1 flex flex-col justify-between py-1.5 gap-1.5">
                {impactHighlights.map((item, i) => {
                  const Icon = item.icon;
                  const points = item.sparkline
                    .map((val, index) => `${(index * 96) / (item.sparkline.length - 1)},${38 - (val * 30) / 100}`)
                    .join(' ');

                  return (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.02)' }}
                      className="p-3 rounded-xl border border-[rgba(255,255,255,0.03)] bg-[rgba(255,255,255,0.01)] flex flex-col gap-1.5 transition-all duration-200"
                    >
                      {/* Top Row: Icon, Title, Sparkline and Metric */}
                      <div className="flex items-center justify-between gap-3">
                        
                        {/* Title group */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="p-2 rounded-lg bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] flex-shrink-0" style={{ color: item.color }}>
                            <Icon size={14} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xs font-semibold text-[#e2e8f0] truncate tracking-tight">{item.label}</h3>
                            <span className="text-[9px] font-mono text-[#86948a] flex items-center gap-1 mt-0.5">
                              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: item.statusColor }} />
                              {typeof item.status === 'object' ? item.status[lang] : item.status}
                            </span>
                          </div>
                        </div>

                        {/* SVG Sparkline (Gráfica de tendencia analítica) */}
                        <div className="w-24 h-8 hidden lg:block overflow-visible opacity-40 group-hover:opacity-80 transition-opacity">
                          <svg className="w-full h-full">
                            <polyline
                              fill="none"
                              stroke={item.color || '#4edea3'}
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={points}
                            />
                          </svg>
                        </div>

                        {/* Metric Output - Espaciado lateral derecho para que números no se tapen */}
                        <div className="text-right flex-shrink-0 min-w-[95px] pr-2">
                          <div className="text-xs font-mono font-bold tracking-tight text-white flex items-center justify-end gap-0.5">
                            {item.metric.includes('+') || item.metric.includes('-') ? (
                              <TrendingUp size={10} className="text-[#4edea3]" />
                            ) : null}
                            {item.metric}
                          </div>
                          <div className="text-[7.5px] font-semibold text-[#86948a] uppercase tracking-wider mt-0.5 whitespace-nowrap">
                            {t(item.metricKey)}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Micro-chips de tecnología */}
                      <div className="flex flex-wrap gap-1 pl-9">
                        {item.stack.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="text-[8px] font-mono font-medium px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-[var(--color-on-surface-variant)] tracking-tight"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </motion.div>
        </div>

        {/* Tech Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-14 sm:mt-16 lg:mt-20 relative"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="text-label-md text-[9px] sm:text-xs flex-shrink-0" style={{ color: 'var(--color-outline)' }}>
              {t('techStack')}
            </span>
            <span className="h-px flex-1" style={{ backgroundColor: 'var(--color-outline-variant)' }} />
          </div>
          
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 lg:w-24 bg-gradient-to-r from-[rgba(12,19,36,0.88)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 lg:w-24 bg-gradient-to-l from-[rgba(12,19,36,0.88)] to-transparent z-10 pointer-events-none" />
            <TechMarquee />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden sm:flex justify-center mt-12 sm:mt-14 lg:mt-16"
        >
          <a href="#education" className="flex flex-col items-center gap-1 sm:gap-1.5 group">
            <span className="text-label-md text-[9px] sm:text-xs" style={{ color: 'var(--color-outline)' }}>{t('scroll')}</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={12} className="sm:w-[14px] sm:h-[14px]" style={{ color: 'var(--color-primary)' }} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}