import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'

import { initLenis, destroyLenis } from './animations/lenis'

import MagneticCursor from './components/MagneticCursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false)

  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  useEffect(() => {
    if (loaderDone) {
      setTimeout(() => ScrollTrigger.refresh(), 100)
    }
  }, [loaderDone])

  return (
    <div className="relative">
      {/* Custom cursor — hidden on touch devices */}
      <div className="hidden md:block">
        <MagneticCursor />
      </div>

      {/* Loader */}
      <Loader onComplete={() => setLoaderDone(true)} />

      {/* Main content */}
      <div id="main-content">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
