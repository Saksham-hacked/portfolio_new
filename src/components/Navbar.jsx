import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-[1000] px-5 sm:px-8 py-5 flex items-center justify-between transition-all duration-300 ${
          scrolled || menuOpen ? 'bg-white/95 backdrop-blur-md border-b border-black/5' : ''
        }`}
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}
          className="font-mono text-sm font-bold tracking-[0.25em] uppercase hover:opacity-50 transition-opacity z-[1001]"
        >
          Saksham.K
        </a>

        {/* Availability — desktop only */}
        <div className="hidden md:flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/50">
            Available for work
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-[1001]"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-black transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-black transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-black transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[999] bg-white flex flex-col justify-center items-center gap-10 transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Availability badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/50">
            Available for work
          </span>
        </div>

        {['about', 'works', 'contact'].map((item, i) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className="font-mono text-2xl tracking-[0.3em] uppercase text-black/70 hover:text-black transition-colors duration-200"
            style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
          >
            [{item}]
          </button>
        ))}
      </div>
    </>
  )
}
