import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const contactInfo = [
  { icon: Mail, label: { es: 'Email', en: 'Email' }, value: 'contact@adrianbello.com', href: 'mailto:contact@adrianbello.com' },
  { icon: Phone, label: { es: 'Disponibilidad', en: 'Availability' }, value: { es: 'Lun–Vie, 9am–6pm (VET)', en: 'Mon–Fri, 9am–6pm (VET)' }, href: null },
  { icon: MapPin, label: { es: 'Ubicación', en: 'Location' }, value: 'Venezuela (Remote-friendly)', href: null },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLanguage()

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await new Promise((r) => setTimeout(r, 1500))
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 4000)
  }

  const inputBase = `w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm outline-none transition-all duration-300`
  const inputStyle = (field) => ({
    backgroundColor: 'var(--color-surface-container-lowest)',
    color: 'var(--color-on-surface)',
    fontFamily: 'Inter, sans-serif',
    border: focusedField === field
      ? '1px solid rgba(78, 222, 163, 0.4)'
      : '1px solid rgba(60, 74, 66, 0.2)',
    boxShadow: focusedField === field ? 'inset 2px 0 0 rgba(78,222,163,0.5)' : 'none',
  })

  return (
    <section
      id="contact"
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
            {t('contact.label')}
          </p>
          <h2 className="text-display-md mb-3 sm:mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--color-on-surface)' }}>
            {t('contact.title')}{' '}
            <span className="gradient-primary-text">{t('contact.subtitle').split('.')[0]}</span>?
          </h2>
          <p className="text-sm sm:text-base max-w-xl"
            style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-5 sm:gap-6 lg:gap-7">

          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3 sm:gap-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={typeof label === 'object' ? label.es : label}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bento-card p-4 sm:p-5 flex items-center gap-3 sm:gap-4 group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(78,222,163,0.12)' }}>
                  <Icon size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: '#4edea3' }} />
                </div>
                <div>
                  <p className="text-label-md text-[10px] sm:text-xs mb-1" style={{ color: 'var(--color-outline)' }}>
                    {typeof label === 'object' ? label.es : label}
                  </p>
                  {href ? (
                    <a href={href} className="text-xs sm:text-sm font-medium hover:text-[#4edea3] transition-colors"
                      style={{ color: 'var(--color-on-surface)', fontFamily: 'Inter, sans-serif' }}>
                      {value}
                    </a>
                  ) : (
                    <p className="text-xs sm:text-sm font-medium"
                      style={{ color: 'var(--color-on-surface)', fontFamily: 'Inter, sans-serif' }}>
                      {typeof value === 'object' ? value.es : value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* CTA info card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="bento-card p-4 sm:p-5 relative overflow-hidden flex-1"
            >
              <div className="data-pulse-line" />
              <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4"
                style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'Inter, sans-serif' }}>
                💼 {t('contact.available')}
              </p>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                <span className="tech-chip text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1">
                  <span className="power-dot" style={{ backgroundColor: '#4edea3' }} />
                  Open to work
                </span>
                <span className="tech-chip text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1">Remote</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bento-card p-4 sm:p-5 md:p-6 lg:p-8 relative overflow-hidden"
          >
            <div className="data-pulse-line" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="contact-name" className="text-label-md text-[10px] sm:text-xs" style={{ color: 'var(--color-outline)' }}>
                    {t('contact.name')}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={t('contact.namePlaceholder')}
                    required
                    className={inputBase}
                    style={inputStyle('name')}
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="contact-email" className="text-label-md text-[10px] sm:text-xs" style={{ color: 'var(--color-outline)' }}>
                    {t('contact.email')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={t('contact.emailPlaceholder')}
                    required
                    className={inputBase}
                    style={inputStyle('email')}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                <label htmlFor="contact-subject" className="text-label-md text-[10px] sm:text-xs" style={{ color: 'var(--color-outline)' }}>
                  {t('contact.subject')}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t('contact.subjectPlaceholder')}
                  required
                  className={inputBase}
                  style={inputStyle('subject')}
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                <label htmlFor="contact-message" className="text-label-md text-[10px] sm:text-xs" style={{ color: 'var(--color-outline)' }}>
                  {t('contact.message')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t('contact.messagePlaceholder')}
                  required
                  rows={4}
                  className={inputBase}
                  style={{ ...inputStyle('message'), resize: 'none' }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="gradient-primary text-[#003824] px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(78,222,163,0.4)] hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {status === 'sending' ? (
                  <>
                    <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#003824] border-t-transparent rounded-full animate-spin" />
                    {t('contact.sending')}
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={14} className="sm:w-4 sm:h-4" />
                    {t('contact.sent')}
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle size={14} className="sm:w-4 sm:h-4" />
                    {t('contact.error')}
                  </>
                ) : (
                  <>
                    <Send size={14} className="sm:w-4 sm:h-4" />
                    {t('contact.send')}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
