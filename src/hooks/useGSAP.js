import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGSAP
 * Runs GSAP animations inside a scoped context with automatic cleanup on unmount.
 *
 * @param {Function} animationFn - registers GSAP animations
 * @param {Array}    deps        - dependency array (like useEffect)
 * @param {Object}   scopeRef    - optional ref to scope GSAP context to a DOM element
 */
export function useGSAP(animationFn, deps = [], scopeRef = null) {
  const ctxRef = useRef(null)

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      animationFn(ctxRef.current)
    }, scopeRef?.current || document.documentElement)

    return () => {
      ctxRef.current?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ctxRef
}
