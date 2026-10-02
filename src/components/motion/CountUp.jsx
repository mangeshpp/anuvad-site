import { useEffect, useRef, useState } from 'react'
import { useInView, prefersReducedMotion } from './useInView.js'

/**
 * Counts a stat up from zero when it scrolls into view.
 *
 * Takes the display string as-is ("24+", "<60s", "5×", "1,000") and animates
 * only the number inside it, keeping prefix and suffix fixed. Anything with no
 * number in it ("Pre-release") is rendered unchanged. Screen readers get the
 * final value, never the ticking one.
 */
const PATTERN = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/

export default function CountUp({ value, duration = 1500, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.4 })
  const match = String(value).match(PATTERN)

  const [prefix, numText, suffix] = match ? [match[1], match[2], match[3]] : ['', '', '']
  const target = match ? parseFloat(numText.replace(/,/g, '')) : 0
  const decimals = match && numText.includes('.') ? numText.split('.')[1].length : 0
  const grouped = match ? numText.includes(',') : false

  const hasNumber = Boolean(match)
  const [shown, setShown] = useState(0)

  // Depend on primitives only. `match` is a new array on every render, so using
  // it here would restart the animation each frame and pin the number near zero.
  useEffect(() => {
    if (!hasNumber || !inView) return
    if (prefersReducedMotion()) {
      setShown(target)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 4) // ease-out quart: fast start, soft landing
      setShown(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, hasNumber])

  if (!match) return <span className={className}>{value}</span>

  const formatted = shown.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  })

  return (
    <span ref={ref} className={`m-count ${className}`} aria-label={String(value)}>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  )
}
