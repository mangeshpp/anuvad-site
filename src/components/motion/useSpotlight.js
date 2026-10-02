import { useEffect } from 'react'

/**
 * One delegated pointer listener for a whole page. Any element with the
 * `m-spot` class under `ref` gets --mx / --my set to the cursor position
 * inside it, which the CSS turns into a soft glow and a lit edge.
 */
export function useSpotlight(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root || !window.matchMedia('(hover: hover)').matches) return

    let raf = 0
    let pending = null

    const apply = () => {
      raf = 0
      if (!pending) return
      const { el, x, y } = pending
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${x - rect.left}px`)
      el.style.setProperty('--my', `${y - rect.top}px`)
    }

    const onMove = (e) => {
      const el = e.target instanceof Element ? e.target.closest('.m-spot') : null
      if (!el || !root.contains(el)) return
      pending = { el, x: e.clientX, y: e.clientY }
      if (!raf) raf = requestAnimationFrame(apply)
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      root.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}
