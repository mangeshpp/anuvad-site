import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import { useSeo } from '../lib/seo.js'

export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'That page does not exist on anuvadsoftware.com.',
    path: '/404',
  })

  return (
    <Section>
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="font-mono text-sm text-teal-400">404</p>
        <h1 className="mt-4 text-3xl font-bold">That page is not here</h1>
        <p className="lede mt-4">
          The link may be out of date, or the page may have moved. The products and services pages are the two
          most likely places you were heading.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
          <Link to="/products" className="btn-secondary">
            See our products
          </Link>
        </div>
      </div>
    </Section>
  )
}
