import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const ITEMS = ['Coding', 'Agentic AI', 'Generative AI', 'Web Development', 'Full-Stack', 'Backend','Software development']

/**
 * Marquee
 * Infinite scrolling text ticker strip between sections.
 */
export default function Marquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tween = gsap.to(track, { xPercent: -50, ease: 'none', duration: 20, repeat: -1 })
    return () => tween.kill()
  }, [])

  // Quadruple for seamless loop
  const allItems = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="overflow-hidden border-y border-black/10 py-4 bg-white relative z-10">
      <div ref={trackRef} className="marquee-track flex items-center">
        {allItems.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-black/50 whitespace-nowrap px-6">
              {item}
            </span>
            <span className="text-black/20 font-mono text-xs">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
