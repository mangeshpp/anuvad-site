import { useEffect, useState } from 'react'

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * True once the element has scrolled into view, and stays true.
 * With reduced motion (or no IntersectionObserver) it is true immediately,
 * so nothing is ever left hidden waiting for an animation that will not run.
 */
export function useInView(ref, { rootMargin = '0px 0px -8% 0px', threshold = 0.12 } = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin, threshold])

  return inView
}
