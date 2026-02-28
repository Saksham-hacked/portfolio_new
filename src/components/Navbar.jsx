import { useRef, useEffect, useState } from 'react'

/**
 * Navbar
 * Fixed top nav — GSAP reveals it after the loader completes.
 * Adds backdrop blur on scroll.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-[1000] px-8 py-6 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-black/5' : ''
      }`}
      style={{ opacity: 0, visibility: 'hidden' }}
    >
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        className="font-mono text-sm font-bold tracking-[0.25em] uppercase hover:opacity-50 transition-opacity"
      >
        Saksham.K
      </a>

      {/* Availability */}
      <div className="hidden md:flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/50">
          Available for work
        </span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-8">
        {['about', 'works', 'contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className="magnetic-btn font-mono text-[11px] tracking-[0.3em] uppercase text-black/40 hover:text-black transition-colors duration-200"
          >
            [{item}]
          </button>
        ))}
      </div>
    </nav>
  )
}
