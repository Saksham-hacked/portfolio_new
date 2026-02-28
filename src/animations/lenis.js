import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

let lenisInstance = null

export function initLenis() {
  if (lenisInstance) lenisInstance.destroy()

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  })

  // Sync Lenis RAF with GSAP ticker — eliminates jitter
  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000)
  })

  // Disable GSAP lag smoothing to prevent conflicts
  gsap.ticker.lagSmoothing(0)

  // Keep ScrollTrigger in sync
  lenisInstance.on('scroll', ScrollTrigger.update)

  return lenisInstance
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

export { lenisInstance }
