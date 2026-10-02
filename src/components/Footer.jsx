import { Link } from 'react-router-dom'
import { Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import Logo from './Logo.jsx'
import { site } from '../data/site.js'
import { products } from '../data/products.js'
import { services } from '../data/services.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-white/[0.08] bg-ink-950/70">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              {site.tagline} Business intelligence, media analytics and operations software, built in Pune for
              teams in India and abroad.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-slate-400">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-teal-300">
                <Mail className="h-4 w-4 text-teal-400" aria-hidden="true" />
                {site.email}
              </a>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-teal-400" aria-hidden="true" />
                {site.location}
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-teal-400" aria-hidden="true" />
                {site.hours}
              </p>
            </div>
          </div>

          <nav aria-label="Products">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Products</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}`} className="text-slate-400 hover:text-teal-300">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services#${s.slug}`} className="text-slate-400 hover:text-teal-300">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Product sites</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {products
                .filter((p) => p.url)
                .map((p) => (
                  <li key={p.slug}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-teal-300"
                    >
                      {p.urlLabel}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
            </ul>
            <Link to="/contact" className="btn-primary mt-6 !px-4 !py-2.5 text-xs">
              Book a walkthrough
            </Link>
          </div>
        </div>

        <div className="hairline mt-12 flex flex-col gap-3 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Anuvad Software Solutions. All rights reserved.</p>
          <p>Built in Pune, India.</p>
        </div>
      </div>
    </footer>
  )
}
