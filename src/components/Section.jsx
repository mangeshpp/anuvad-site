import Container from './Container.jsx'

export default function Section({
  id,
  eyebrow,
  title,
  titleAs = 'h2',
  lede,
  children,
  className = '',
  align = 'left',
  tone = 'default',
}) {
  const Heading = titleAs
  const toneClass =
    tone === 'raised'
      ? 'bg-ink-850/70 border-y border-white/[0.06]'
      : tone === 'deep'
        ? 'bg-ink-950/60 border-y border-white/[0.06]'
        : ''

  const headingClass =
    titleAs === 'h1'
      ? 'font-display text-4xl font-bold leading-tight sm:text-5xl'
      : 'h-section'

  return (
    <section id={id} className={`py-16 sm:py-24 ${toneClass} ${className}`}>
      <Container>
        {(eyebrow || title || lede) && (
          <header className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <Heading className={headingClass}>{title}</Heading>}
            {lede && <p className="lede mt-4">{lede}</p>}
          </header>
        )}
        {children && <div className={eyebrow || title || lede ? 'mt-12' : ''}>{children}</div>}
      </Container>
    </section>
  )
}
