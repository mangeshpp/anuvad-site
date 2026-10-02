import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import Container from './Container.jsx'
import { site } from '../data/site.js'

export default function CTABand({
  title = 'Let us build something remarkable',
  body = 'Tell us what decision you are trying to make and what data you already have. We will tell you honestly whether one of our products fits, whether it needs a build, or whether you do not need us at all.',
  primaryLabel = 'Start a project',
  primaryTo = '/contact',
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-teal-400/20 bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 px-6 py-12 sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl animate-slow-drift"
            aria-hidden="true"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            <p className="lede mt-4">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={primaryTo} className="btn-primary">
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
      </Container>
    </section>
  )
}
