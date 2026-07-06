import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Education from './components/sections/Education'
import Experience from './components/sections/Experience'
import TechStack from './components/sections/TechStack'
import Impact from './components/sections/Impact'
import Contact from './components/sections/Contact'
import Background from './components/Background'

export default function App() {
  return (
    <LanguageProvider>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Education />
        <Experience />
        <TechStack />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
