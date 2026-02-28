import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

/**
 * Loader
 * Black fullscreen loader with percentage counter.
 * Curtain slides up, then hero animates in.
 * @prop {Function} onComplete - called after loader finishes
 */
export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const curtainRef = useRef(null)
  const percentRef = useRef(null)

  useEffect(() => {
    const loader = loaderRef.current
    const curtain = curtainRef.current
    const percentEl = percentRef.current

    gsap.set('body', { autoAlpha: 1 })
    gsap.set('.hero-reveal', { y: 100, autoAlpha: 0 })
    gsap.set('.hero-img-container', { scale: 0.9, autoAlpha: 0 })
    gsap.set('#navbar', { autoAlpha: 0 })

    const count = { val: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(loader, { display: 'none' })
        gsap.set(curtain, { display: 'none' })
        ScrollTrigger.refresh()
        onComplete?.()
      },
    })

    // Counter 0 → 100
    tl.to(count, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (percentEl) percentEl.innerText = Math.floor(count.val) + '%'
      },
    })
    // Curtains up
    .to(loader, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
    .to(curtain, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '-=0.6')
    // Navbar
    .to('#navbar', { autoAlpha: 1, duration: 0.5 })
    // Hero text stagger
    .to('.hero-reveal', {
      y: 0, autoAlpha: 1, scale: 1,
      stagger: 0.12, duration: 1, ease: 'power3.out',
    }, '-=0.5')
    // Hero image
    .to('.hero-img-container', {
      autoAlpha: 1, scale: 1, duration: 1.2, ease: 'power3.out',
    }, '-=1.0')
    // Typewriter
    .add(() => {
      const tw = document.getElementById('typewriter')
      if (tw) gsap.to(tw, { text: 'Fullstack | AI | Web ', duration: 3, ease: 'none' })
    }, '-=0.5')

    // Safety fallback
    const fallback = setTimeout(() => {
      gsap.set('body', { autoAlpha: 1 })
      gsap.to(loader, { yPercent: -100, duration: 0.5 })
      gsap.set('.hero-reveal', { y: 0, autoAlpha: 1 })
      gsap.set('#navbar', { autoAlpha: 1 })
      onComplete?.()
    }, 6000)

    return () => clearTimeout(fallback)
  }, [onComplete])

  return (
    <>
      <div ref={loaderRef} className="loader-overlay" id="loader">
        {/* Logo */}
        <span className="absolute top-8 left-8 font-mono text-xs tracking-[0.3em] text-white/50 uppercase">
          Portfolio
        </span>

        {/* Counter */}
        <div className="flex flex-col items-center gap-4">
          <span
            ref={percentRef}
            id="loader-percent"
            className="font-mono text-[clamp(4rem,12vw,9rem)] font-bold leading-none text-white tabular-nums"
          >
            0%
          </span>
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase">
            Loading Interface
          </span>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
      </div>

      {/* Secondary curtain */}
      <div ref={curtainRef} className="loader-curtain" id="loader-curtain" />
    </>
  )
}
