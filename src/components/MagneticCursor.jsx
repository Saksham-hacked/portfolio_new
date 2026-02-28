import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * MagneticCursor
 * Custom cursor: small dot (instant) + large ring (smooth lag).
 * Auto-scales on hover over interactive elements.
 */
export default function MagneticCursor() {
  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0
    let rafId = null

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0 })
    }

    const animateOutline = () => {
      curX += (mouseX - curX) * 0.18
      curY += (mouseY - curY) * 0.18
      outline.style.left = curX + 'px'
      outline.style.top = curY + 'px'
      rafId = requestAnimationFrame(animateOutline)
    }

    const onEnter = () => {
      gsap.to(outline, { scale: 1.8, opacity: 0.4, duration: 0.3 })
      gsap.to(dot, { scale: 0.5, duration: 0.3 })
    }
    const onLeave = () => {
      gsap.to(outline, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)
    animateOutline()

    const interactives = document.querySelectorAll('a, button, .magnetic-btn')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={outlineRef} className="cursor-outline" aria-hidden="true" />
    </>
  )
}
