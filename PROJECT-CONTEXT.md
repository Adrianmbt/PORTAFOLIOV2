# Contexto del Proyecto - Portafolio 3D Adrián Bello
## Fecha: Junio 2026

---

## 🎯 Objetivo
Portafolio interactivo 3D para roles Junior/Mid Full-Stack Developer, optimizado para reclutadores técnicos.

## 🛠️ Stack Tecnológico
- **Frontend:** React 19 + Vite
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion
- **3D:** Three.js + React Three Fiber + Drei
- **Iconos:** Lucide React

## 📁 Estructura de Componentes
```
src/
├── components/
│   ├── Hero3D.jsx        # Hero principal con esferas 3D y partículas
│   ├── Skills3D.jsx      # Anillo interactivo de habilidades técnicas
│   ├── Projects.jsx      # Sección de proyectos (PENDIENTE: Reordenar)
│   ├── Experience.jsx    # Experiencia laboral
│   ├── Contact.jsx       # Formulario de contacto
│   └── LanguageSwitch.jsx # Switch EN/ES (NUEVO)
├── App.jsx               # Componente principal
└── main.jsx              # Entry point
```

## 📋 Tareas Pendientes

### Alta Prioridad
- [ ] Arreglar responsive design en todas las secciones
- [ ] Implementar switch de idioma (EN/ES)
- [ ] Reordenar sección de proyectos según lista del usuario
- [ ] Integrar demos en vivo para reclutadores

### Media Prioridad
- [ ] Mejorar navegación entre secciones
- [ ] Agregar smooth scrolling
- [ ] Optimizar carga de componentes 3D (lazy loading)
- [ ] Agregar modo claro/oscuro

### Baja Prioridad
- [ ] Agregar animaciones de entrada por scroll
- [ ] Implementar búsqueda de proyectos por tecnología
- [ ] Agregar analytics (Google Analytics o Plausible)

## 🎨 Paleta de Colores Actual
- **Primario:** `#00ff88` (verde neón)
- **Secundario:** `#00aaff` (azul)
- **Fondo:** `#000000` → `#111122` (gradiente oscuro)
- **Texto:** `#ffffff` / `#cccccc`

## 📱 Breakpoints Tailwind
- `sm`: 640px (móvil)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (desktop grande)

## 🌐 Traducciones (EN/ES)
### Hero
- ES: "Full-Stack Developer" / EN: "Full-Stack Developer"
- ES: "Construyendo aplicaciones web escalables" / EN: "Building scalable web applications"

### Skills
- ES: "Habilidades Técnicas" / EN: "Technical Skills"
- ES: "Interactúa con las esferas" / EN: "Interact with the spheres"

### Projects
- ES: "Proyectos Destacados" / EN: "Featured Projects"
- ES: "Ver Demo" / EN: "Live Demo"
- ES: "Ver Código" / EN: "View Code"

### Contact
- ES: "Contacto" / EN: "Contact"
- ES: "Enviar Mensaje" / EN: "Send Message"

## 🔗 Proyectos Pendientes de Agregar
*(El usuario proporcionará lista con links GitHub y demos)*

## 📊 Análisis LinkedIn
- Ver `linkedin-improvement.md` para diagnóstico completo y cursos recomendados

## 💡 Notas de Diseño
- Priorizar mobile-first en todas las secciones
- Usar `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` para contenedores
- Grid responsivo: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Tipografía: `text-base sm:text-lg lg:text-xl` para cuerpo
- Botones: `w-full sm:w-auto` para móviles

---

## 🔄 Historial de Cambios
- 2026-06-09: Instalación de Three.js + R3F + Drei
- 2026-06-09: Creación de Hero3D.jsx y Skills3D.jsx
- 2026-06-09: Actualización de SEO en index.html
- 2026-06-09: Generación de linkedin-improvement.md
- 2026-06-09: Creación de LanguageContext.jsx con i18n EN/ES
- 2026-06-09: Creación de LanguageSwitch.jsx componente
- 2026-06-09: Fix responsive design en Navbar (mobile-first, sm/md/lg breakpoints)
- 2026-06-09: Fix responsive design en Hero (text sizes, padding, grid adjustments)
- 2026-06-09: Fix responsive design en Experience (project cards, metrics, tech chips)
- 2026-06-09: Fix responsive design en Footer (flex layouts, icon sizes)
- 2026-06-09: Integración de LanguageProvider en App.jsx
- 2026-06-09: Pendiente: Fix responsive en TechStack, Impact, Contact
- 2026-06-09: Pendiente: Agregar sección Projects con demos en vivo
- 2026-06-09: Pendiente: Usuario listará proyectos con links GitHub/demos
