import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react'
import Logo from './Logo.jsx'
import { products } from '../data/products.js'
import { site } from '../data/site.js'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products', mega: true },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    setProductsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setProductsOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive ? 'text-teal-300' : 'text-slate-300 hover:text-white'
    }`

  return (
    <header
      className={`sticky top-0 z-40 transition duration-300 ${
        scrolled ? 'border-b border-white/[0.08] bg-ink-950/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((link) =>
            link.mega ? (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <NavLink to={link.to} className={navClass}>
                  <span className="inline-flex items-center gap-1">
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                  </span>
                </NavLink>
                {productsOpen && (
                  <div className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3">
                    <div className="animate-fade-up rounded-2xl border border-white/10 bg-ink-850/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
                      {products.map((p) => (
                        <Link
                          key={p.slug}
                          to={`/products/${p.slug}`}
                          className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/5"
                        >
                          <span
                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                              p.accent === 'sand' ? 'bg-sand-400' : 'bg-teal-400'
                            }`}
                          />
                          <span className="min-w-0">
                            <span className="flex items-center gap-2 text-sm font-semibold text-white">
                              {p.name}
                              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                {p.category}
                              </span>
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">{p.oneLiner}</span>
                          </span>
                        </Link>
                      ))}
                      <Link
                        to="/products"
                        className="mt-1 block rounded-xl px-3 py-2 text-xs font-semibold text-teal-300 hover:bg-white/5"
                      >
                        Compare all five products →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={link.to} to={link.to} className={navClass}>
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/contact" className="btn-primary !px-4 !py-2.5">
            Start a project
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.08] bg-ink-950/95 backdrop-blur-xl lg:hidden">
          <div className="container-x space-y-1 py-4">
            {links
              .filter((l) => !l.mega)
              .map((link) => (
                <NavLink key={link.to} to={link.to} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5">
                  {link.label}
                </NavLink>
              ))}
            <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Products
            </p>
            {products.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-white/5"
              >
                <span>{p.name}</span>
                <span className="text-[11px] text-slate-500">{p.category}</span>
              </Link>
            ))}
            <Link to="/contact" className="btn-primary mt-4 w-full">
              Start a project
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="btn-secondary mt-2 w-full"
            >
              {site.email} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
