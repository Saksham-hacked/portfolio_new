import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useMagnetic } from '../../hooks/useMagnetic'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const startBtn = useMagnetic(0.35)
  const profileBtn = useMagnetic(0.35)
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const tween = gsap.to(el, {
      y: 20, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 20%', scrub: true },
    })
    return () => tween.scrollTrigger?.kill()
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="min-h-screen grid-bg relative flex flex-col justify-end pb-20 px-5 sm:px-8 md:px-16 pt-32 overflow-hidden">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">

        {/* Left — Text */}
        <div className="flex flex-col gap-5 md:gap-6">

          <div className="hero-reveal overflow-hidden">
            <p className="font-mono text-xs tracking-[0.35em] uppercase text-black/40">Hello, I am</p>
          </div>

          <div className="hero-reveal overflow-hidden">
            <h1 className="text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.9] tracking-tight uppercase">
              Saksham<br />
              <span className="relative">
                Kaushish
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-black" />
              </span>
            </h1>
          </div>

          <div className="hero-reveal overflow-hidden">
            <h2 className="text-[clamp(1.2rem,3vw,2.5rem)] font-light tracking-tight uppercase text-black/60 leading-tight">
              Full Stack<br />Creative
            </h2>
          </div>

          <div className="hero-reveal">
            <span id="typewriter" className="font-mono text-xs tracking-[0.2em] text-black/40 uppercase" />
          </div>

          <div className="hero-reveal flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
            <button
              ref={startBtn}
              onClick={() => scrollTo('contact')}
              className="magnetic-btn px-6 md:px-8 py-3 md:py-4 bg-black text-white font-mono text-[11px] tracking-[0.3em] uppercase hover:bg-black/80 transition-colors duration-200"
            >
              Start a Project
            </button>
            <button
              ref={profileBtn}
              onClick={() => scrollTo('about')}
              className="magnetic-btn px-6 md:px-8 py-3 md:py-4 border border-black/20 font-mono text-[11px] tracking-[0.3em] uppercase hover:border-black hover:bg-black hover:text-white transition-all duration-200"
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Portrait — hidden on mobile to avoid overflow from clip-path */}
        <div className="hero-img-container relative h-[380px] sm:h-[450px] md:h-[600px] overflow-hidden hidden sm:block">
          <img src="/portrait2.jpg" alt="Saksham Kaushish" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-black/30">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-black/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black" style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}
