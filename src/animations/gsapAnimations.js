import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

/** Fade + slide-up with ScrollTrigger */
export function fadeReveal(el, options = {}) {
  return gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: options.start || 'top 90%',
      end: 'bottom top',
      toggleActions: 'play reverse play reverse',
    },
    opacity: 0,
    y: options.y ?? 20,
    duration: options.duration ?? 0.8,
    ease: options.ease ?? 'power2.out',
    delay: options.delay ?? 0,
  })
}

/** Slide-up reveal */
export function slideUpReveal(el, options = {}) {
  return gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: options.start || 'top 85%',
      end: 'bottom top',
      toggleActions: 'play reverse play reverse',
    },
    y: options.y ?? 80,
    opacity: 0,
    duration: options.duration ?? 1,
    ease: 'power3.out',
    delay: options.delay ?? 0,
  })
}

/** Stagger reveal for a list of elements */
export function staggerReveal(els, options = {}) {
  return gsap.from(els, {
    scrollTrigger: {
      trigger: els[0],
      start: 'top 85%',
      end: 'bottom top',
      toggleActions: 'play reverse play reverse',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: options.stagger ?? 0.1,
    ease: 'power3.out',
  })
}

/** Typewriter effect */
export function typewriterAnim(el, text, options = {}) {
  return gsap.to(el, {
    text: text,
    duration: options.duration ?? 3,
    ease: 'none',
    delay: options.delay ?? 0,
  })
}

/** Parallax on scroll */
export function parallaxEl(el, speed) {
  return gsap.to(el, {
    y: () => ScrollTrigger.maxScroll(window) * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
    },
  })
}

export { gsap, ScrollTrigger }
