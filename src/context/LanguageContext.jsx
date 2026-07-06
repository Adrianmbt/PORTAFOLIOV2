import { createContext, useContext, useState, useEffect } from 'react'

const translations = {
  nav: {
    education: { es: 'Estudios', en: 'Education' },
    experience: { es: 'Experiencia', en: 'Experience' },
    skills: { es: 'Skills', en: 'Skills' },
    impact: { es: 'Impacto', en: 'Impact' },
    projects: { es: 'Proyectos', en: 'Projects' },
    contact: { es: 'Contacto', en: 'Contact' },
    hire: { es: 'Contratar', en: 'Hire Me' },
  },
  hero: {
    available: { es: 'Disponible para proyectos', en: 'Available for projects' },
    role: { es: 'Full Stack Engineer', en: 'Full Stack Engineer' },
    subtitle: {
      es: 'Más de 6 años transformando requerimientos complejos en sistemas robustos — desde plataformas gubernamentales con millones de registros hasta soluciones SaaS para el sector privado. Arquitectura que escala, decisiones que perduran.',
      en: 'Over 6 years turning complex requirements into robust systems — from government platforms with millions of records to SaaS solutions for the private sector. Architecture that scales, decisions that last.',
    },
    explore: { es: 'Explorar Trayectoria', en: 'Explore My Journey' },
    contactBtn: { es: 'Contactar', en: 'Contact' },
    scroll: { es: 'Scroll', en: 'Scroll' },
    follow: { es: 'Sígueme', en: 'Follow Me' },
    statsLabel: { es: '// Impacto', en: '// Impact' },
    live: { es: 'EN VIVO', en: 'LIVE' },
    techStack: { es: 'Stack tecnológico', en: 'Tech stack' },
  },
  experience: {
    label: { es: '// Trayectoria', en: '// Experience' },
    title: { es: 'Experiencia', en: 'Experience' },
    subtitle: {
      es: 'Arquitectura de soluciones que conectan la administración pública con la eficiencia tecnológica.',
      en: 'Architecture solutions connecting public administration with technological efficiency.',
    },
    live: { es: 'EN VIVO', en: 'LIVE' },
  },
  skills: {
    label: { es: '// Ecosistema Tecnológico', en: '// Tech Ecosystem' },
    title: { es: 'Stack &', en: 'Stack &' },
    subtitle: {
      es: 'Arquitectura MVC de alto rendimiento y APIs robustas, potenciadas con IA para acelerar ciclos de desarrollo.',
      en: 'High-performance MVC architecture and robust APIs, powered by AI to accelerate development cycles.',
    },
    aiTitle: { es: 'AI-Augmented Engineering', en: 'AI-Augmented Engineering' },
    aiDesc: {
      es: 'Uso avanzado de Cursor y GitHub Copilot para acelerar ciclos de desarrollo y refactorización compleja.',
      en: 'Advanced use of Cursor and GitHub Copilot to accelerate development cycles and complex refactoring.',
    },
  },
  education: {
    label: { es: '// Formación Académica', en: '// Academic Background' },
    title: { es: 'Formación', en: 'Education' },
    subtitle: {
      es: 'Base técnica sólida con enfoque en desarrollo de software, complementada con proyectos colaborativos y experiencia práctica durante la carrera.',
      en: 'Solid technical foundation with a focus on software development, complemented by collaborative projects and hands-on experience during my degree.',
    },
    degree1: { es: 'Técnico Superior Universitario en Informática', en: 'Higher University Technician in Computer Science' },
    degree1Short: { es: 'TSU en Informática', en: 'TSU in Computer Science' },
    institution1: { es: 'Universidad Politécnica Territorial', en: 'Polytechnic University' },
    period1: { es: '2019 — 2021', en: '2019 — 2021' },
    degree2: { es: 'Ingeniería en Informática', en: 'Computer Engineering' },
    degree2Short: { es: 'Ing. en Informática', en: 'Computer Engineering' },
    institution2: { es: 'Universidad Politécnica Territorial', en: 'Polytechnic University' },
    period2: { es: '2023 — 2025', en: '2023 — 2025' },
    pause: { es: 'Pausa estratégica', en: 'Strategic pause' },
    projectsTitle: { es: 'Proyectos Universitarios', en: 'University Projects' },
    projectsSub: {
      es: 'Sistemas desarrollados durante la carrera, tanto propios como en colaboración con colegas ingenieros.',
      en: 'Systems developed during my degree, both personal and in collaboration with fellow engineers.',
    },
    project1: { es: 'Sistema de Gestión de Afiliados', en: 'Affiliate Management System' },
    project1Desc: {
      es: 'Plataforma web para la gestión integral de afiliados, desarrollada como proyecto propio durante la formación universitaria.',
      en: 'Web platform for comprehensive affiliate management, developed as a personal project during university studies.',
    },
    project2: { es: 'Sistema de Atención al Ciudadano', en: 'Citizen Service System' },
    project2Desc: {
      es: 'Sistema de registro y seguimiento de solicitudes ciudadanas para la Gobernación del Estado Anzoátegui, desarrollado en colaboración con colegas estudiantes.',
      en: 'Citizen request registration and tracking system for the Anzoátegui State Government, developed in collaboration with fellow students.',
    },
  },
  impact: {
    label: { es: '// Resultados Medibles', en: '// Measurable Results' },
    title: { es: 'Impacto', en: 'Impact' },
    subtitle: {
      es: 'Cada proyecto deja una huella medible en la organización y en las personas.',
      en: 'Every project leaves a measurable footprint on the organization and people.',
    },
    timeline: { es: '// Línea de Tiempo', en: '// Timeline' },
  },
  projects: {
    label: { es: '// Proyectos Destacados', en: '// Featured Projects' },
    title: { es: 'Mis', en: 'My' },
    subtitle: {
      es: 'Proyectos con demos en vivo para que puedas ver el código en acción.',
      en: 'Projects with live demos so you can see the code in action.',
    },
    demo: { es: 'Ver Demo', en: 'Live Demo' },
    code: { es: 'Ver Código', en: 'View Code' },
  },
  contact: {
    label: { es: '// Colaboremos', en: '// Let\'s Collaborate' },
    title: { es: '¿Listo para', en: 'Ready to' },
    subtitle: {
      es: 'Actualmente aceptando roles Full-Stack Junior/Mid y proyectos remotos.',
      en: 'Currently accepting Junior/Mid Full-Stack roles and remote projects.',
    },
    name: { es: 'Nombre', en: 'Name' },
    namePlaceholder: { es: 'Tu nombre', en: 'Your name' },
    email: { es: 'Email', en: 'Email' },
    emailPlaceholder: { es: 'tu@email.com', en: 'you@email.com' },
    subject: { es: 'Asunto', en: 'Subject' },
    subjectPlaceholder: { es: 'Oportunidad laboral, propuesta de proyecto...', en: 'Job opportunity, project proposal...' },
    message: { es: 'Mensaje', en: 'Message' },
    messagePlaceholder: { es: 'Cuéntame sobre el rol, el stack que usan, el equipo...', en: 'Tell me about the role, your tech stack, the team...' },
    sending: { es: 'Enviando...', en: 'Sending...' },
    sent: { es: '¡Mensaje enviado!', en: 'Message sent!' },
    error: { es: 'Error, intenta de nuevo', en: 'Error, try again' },
    send: { es: 'Enviar Mensaje', en: 'Send Message' },
    available: {
      es: 'Disponible para proyectos remotos y roles Full-Stack de largo plazo.',
      en: 'Available for remote projects and long-term Full-Stack roles.',
    },
  },
  footer: {
    built: { es: 'Construido con', en: 'Built with' },
    rights: { es: 'Todos los derechos reservados', en: 'All rights reserved' },
  },
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    return saved || 'es'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => setLang((prev) => (prev === 'es' ? 'en' : 'es'))

  const t = (key) => {
    const keys = key.split('.')
    let value = translations
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        return key
      }
    }
    return typeof value === 'object' ? value[lang] : value
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}