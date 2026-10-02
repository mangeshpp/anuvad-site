import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import Container from '../Container.jsx'
import Reveal from './Reveal.jsx'
import { site } from '../../data/site.js'

/** Same copy and layout as <CTABand>, framed by a slowly travelling light border. */
export default function MotionCTABand({
  title = 'Let us build something remarkable',
  body = 'Tell us what decision you are trying to make and what data you already have. We will tell you honestly whether one of our products fits, whether it needs a build, or whether you do not need us at all.',
  primaryLabel = 'Start a project',
  primaryTo = '/contact',
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="m-cta-frame">
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 px-6 py-12 sm:px-12 sm:py-16">
            <div className="m-cta-orb" aria-hidden="true" />
            <div className="m-cta-grid" aria-hidden="true" />
            <div className="relative max-w-2xl">
              <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
              <p className="lede mt-4">{body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={primaryTo} className="btn-primary m-sheen">
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href={`mailto:${site.email}`} className="btn-secondary">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
