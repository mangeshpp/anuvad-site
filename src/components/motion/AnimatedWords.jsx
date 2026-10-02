/**
 * Splits a line into words that rise in one after another on load.
 * The words stay real text inside the parent heading, so it reads and
 * indexes exactly as before.
 */
export default function AnimatedWords({ text, startDelay = 0, step = 70, className = '' }) {
  return text.split(' ').map((word, i, all) => (
    <span
      key={`${word}-${i}`}
      className={`m-word ${className}`}
      style={{ '--m-delay': `${startDelay + i * step}ms` }}
    >
      {word}
      {i < all.length - 1 ? ' ' : ''}
    </span>
  ))
}
