import { useRef } from 'react'
import { useInView } from './useInView.js'

/**
 * Fades and lifts its content in the first time it scrolls into view.
 * `delay` (ms) staggers siblings; `as` keeps list and grid semantics intact.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, y = 18, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <Tag
      ref={ref}
      className={`m-reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--m-delay': `${delay}ms`, '--m-y': `${y}px`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
