import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useMagnetic } from '../../hooks/useMagnetic'
// import {RevalImage} from './RevealImage'
// import { useRef, useEffect } from 'react'

// Replace your existing image div with this component
function RevealImage() {
  const containerRef = useRef(null)
  const maskRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const mask = maskRef.current
    if (!container || !mask) return

    const RADIUS = 120 // size of the reveal circle in px

    const onMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Move the circular reveal mask to cursor position
      mask.style.clipPath = `circle(${RADIUS}px at ${x}px ${y}px)`
      mask.style.opacity = '1'
    }

    const onLeave = () => {
      mask.style.opacity = '0'
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="hero-img-container relative h-[450px] md:h-[600px] overflow-hidden cursor-none"
    >
      {/* Bottom layer — base image (always visible) */}
      <img
        src="/src/assets/portrait2.jpg"
        alt="Your Name"
        className="w-full h-full object-cover"
      />

      {/* Top layer — revealed image (shown only around cursor) */}
      <div
        ref={maskRef}
        className="absolute inset-0 opacity-0"
        style={{
          clipPath: 'circle(0px at 50% 50%)',
          transition: 'opacity 0.3s ease, clip-path 0.05s ease',
          willChange: 'clip-path',
        }}
      >
        <img
          src="/src/assets/portrait3.jpg" 
          alt="Your Name Anime"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Optional: small label that follows the reveal */}
      <div
        className="absolute bottom-4 right-4 font-mono text-[9px] tracking-[0.3em] uppercase text-white/50 pointer-events-none"
      >
        Hover to reveal
      </div>
    </div>
  )
}

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero
 * Full-height landing section.
 * Initial animation states are controlled by Loader.jsx.
 * Replace the img-placeholder div with your actual portrait image.
 */
export default function Hero() {
  const startBtn = useMagnetic(0.35)
  const profileBtn = useMagnetic(0.35)
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const tween = gsap.to(el, {
      y: 20, opacity: 0, ease: 'none',
      scrollTrigger: {
        trigger: el, start: 'top 80%', end: 'top 20%', scrub: true,
      },
    })
    return () => tween.scrollTrigger?.kill()
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="min-h-screen grid-bg relative flex flex-col justify-end pb-20 px-8 md:px-16 pt-32 overflow-hidden">

      {/* DEV label */}
      <div className="absolute top-32 left-8 md:left-16">
        <span className="font-mono text-[10px] tracking-[0.4em] text-black/30 uppercase">Dev</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">

        {/* Left — Text */}
        <div className="flex flex-col gap-6">

          <div className="hero-reveal overflow-hidden">
            <p className="font-mono text-xs tracking-[0.35em] uppercase text-black/40">
              Hello, I am
            </p>
          </div>

          <div className="hero-reveal overflow-hidden">
            <h1 className="text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.9] tracking-tight uppercase">
              Saksham
              <br />
              {/* ← CHANGE THIS to your name */}
              <span className="relative">
                Kaushish
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-black" />
              </span>
            </h1>
          </div>

          <div className="hero-reveal overflow-hidden">
            {/* ← CHANGE role text */}
            <h2 className="text-[clamp(1.2rem,3vw,2.5rem)] font-light tracking-tight uppercase text-black/60 leading-tight">
              Full Stack
              <br />
              Creative
            </h2>
          </div>

          <div className="hero-reveal">
            <span
              id="typewriter"
              className="font-mono text-xs tracking-[0.2em] text-black/40 uppercase"
            />
          </div>

          <div className="hero-reveal flex flex-wrap gap-4 pt-4">
            <button
              ref={startBtn}
              onClick={() => scrollTo('contact')}
              className="magnetic-btn px-8 py-4 bg-black text-white font-mono text-[11px] tracking-[0.3em] uppercase hover:bg-black/80 transition-colors duration-200"
            >
              Start a Project
            </button>
            <button
              ref={profileBtn}
              onClick={() => scrollTo('about')}
              className="magnetic-btn px-8 py-4 border border-black/20 font-mono text-[11px] tracking-[0.3em] uppercase hover:border-black hover:bg-black hover:text-white transition-all duration-200"
            >
              View Profile
            </button>
          </div>
        </div>

            {/* <RevealImage /> */}
            <div className="hero-img-container relative h-[450px] md:h-[600px] overflow-hidden">
              <img src="/portrait2.jpg" alt="Your Name" className="w-full h-full object-cover" />
            </div>
       
        {/* <div className="hero-img-container relative h-[450px] md:h-[600px] overflow-hidden">
          <div className="img-placeholder w-full h-full">
            <svg className="w-12 h-12 mb-4 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p>Your Portrait Photo</p>
            <p className="mt-1 text-[9px] opacity-50">Add to src/assets/portrait.jpg</p>
          </div>
        </div> */}
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
