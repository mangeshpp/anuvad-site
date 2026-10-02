import Container from '../Container.jsx'
import Reveal from './Reveal.jsx'

/**
 * Same markup and spacing as <Section>, with the heading block revealed on
 * scroll. Kept separate so the live Section component is untouched until the
 * preview is approved.
 */
export default function MotionSection({
  id,
  eyebrow,
  title,
  lede,
  children,
  className = '',
  tone = 'default',
}) {
  const toneClass =
    tone === 'raised'
      ? 'bg-ink-850/70 border-y border-white/[0.06]'
      : tone === 'deep'
        ? 'bg-ink-950/60 border-y border-white/[0.06]'
        : ''

  return (
    <section id={id} className={`relative py-16 sm:py-24 ${toneClass} ${className}`}>
      <Container>
        {(eyebrow || title || lede) && (
          <header className="max-w-3xl">
            {eyebrow && (
              <Reveal as="p" className="eyebrow mb-3" y={10}>
                <span className="m-eyebrow-line" aria-hidden="true" />
                {eyebrow}
              </Reveal>
            )}
            {title && (
              <Reveal as="h2" className="h-section" delay={80}>
                {title}
              </Reveal>
            )}
            {lede && (
              <Reveal as="p" className="lede mt-4" delay={160}>
                {lede}
              </Reveal>
            )}
          </header>
        )}
        {children && <div className={eyebrow || title || lede ? 'mt-12' : ''}>{children}</div>}
      </Container>
    </section>
  )
}
