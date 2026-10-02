import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Check, Circle } from 'lucide-react'
import Section from '../components/Section.jsx'
import Container from '../components/Container.jsx'
import CTABand from '../components/CTABand.jsx'
import { products, productBySlug } from '../data/products.js'
import { useSeo } from '../lib/seo.js'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = productBySlug(slug)

  useSeo({
    title: product ? `${product.name} — ${product.subtitle}` : 'Product',
    description: product ? product.oneLiner : 'Anuvad Software Solutions product.',
    path: `/products/${slug}`,
  })

  if (!product) return <Navigate to="/products" replace />

  const accentText = product.accent === 'sand' ? 'text-sand-400' : 'text-teal-300'
  const accentBg = product.accent === 'sand' ? 'bg-sand-400' : 'bg-teal-400'
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-2 pt-14 sm:pt-20">
        <div
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-teal-500/[0.08] blur-[110px]"
          aria-hidden="true"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
            <Link to="/products" className="hover:text-teal-300">
              Products
            </Link>
            <span className="px-2">/</span>
            <span className="text-slate-400">{product.name}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.35fr_1fr]">
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${accentBg}`} aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{product.category}</p>
                <span className="pill">{product.status}</span>
              </div>

              <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{product.name}</h1>
              <p className={`mt-2 text-lg font-medium ${accentText}`}>{product.subtitle}</p>
              <p className="lede mt-6 max-w-2xl">{product.hero}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Request a demo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {product.url && (
                  <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    Visit {product.urlLabel}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <aside className="card !p-0 overflow-hidden">
              <div className="border-b border-white/[0.08] px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">At a glance</p>
              </div>
              <dl className="divide-y divide-white/[0.06]">
                {product.atAGlance.map(([label, value]) => (
                  <div key={label} className="px-6 py-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-teal-300/80">{label}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-slate-300">{value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      {/* Problem / solution */}
      <Section tone="raised">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card">
            <p className="eyebrow mb-3">The problem</p>
            <p className="text-base leading-relaxed text-slate-300">{product.problem}</p>
          </div>
          <div className="card border-teal-400/20">
            <p className="eyebrow mb-3">How {product.name} solves it</p>
            <p className="text-base leading-relaxed text-slate-300">{product.solution}</p>
          </div>
        </div>
      </Section>

      {/* How you use it */}
      <Section
        eyebrow="How you use it"
        title={`Four steps, start to finish`}
        lede="This is the whole workflow — not a simplified version of it."
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {product.howItWorks.map((s, i) => (
            <li key={s.title} className="card card-hover">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-teal-400/25 bg-teal-400/10 font-mono text-sm font-semibold text-teal-300">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Features */}
      <Section
        tone="raised"
        eyebrow="What it does"
        title={`What ${product.name} gives you`}
        lede="Written from the working product, not a roadmap."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {product.features.map((f) => (
            <div key={f.title} className="card card-hover">
              <div className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Outcomes */}
      <Section
        eyebrow="What changes"
        title="The difference it makes"
        lede={`What teams tell us is different once ${product.name} is in place.`}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {product.outcomes.map((o) => (
            <div key={o} className="flex items-start gap-3.5 rounded-xl border border-white/[0.08] bg-ink-800/40 p-5">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-slate-300">{o}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section tone="deep" eyebrow="Plans" title="Pricing" lede={product.pricingNote}>
        <div className="grid gap-5 lg:grid-cols-3">
          {product.plans.map((plan) => (
            <div
              key={plan.name}
              className={`card flex h-full flex-col ${
                plan.featured ? 'border-teal-400/40 bg-ink-700/50 ring-1 ring-teal-400/20' : ''
              }`}
            >
              {plan.featured && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-teal-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-300">
                  Most chosen
                </span>
              )}
              <h3 className="text-base font-semibold">{plan.name}</h3>
              <p className="mt-3 font-display text-3xl font-bold text-white">
                {plan.price}
                {plan.cadence && <span className="text-sm font-medium text-slate-500">{plan.cadence}</span>}
              </p>
              <p className="mt-2 text-xs text-slate-500">{plan.note}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-slate-400">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className={`mt-7 w-full ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}>
                {plan.price === 'On request' ? 'Request pricing' : 'Get started'}
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Other products */}
      <Section eyebrow="Also from Anuvad" title="Other platforms you might need">
        <div className="grid gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <Link key={p.slug} to={`/products/${p.slug}`} className="card card-hover group">
              <div className="flex items-center gap-2.5">
                <Circle
                  className={`h-2.5 w-2.5 ${p.accent === 'sand' ? 'fill-sand-400 text-sand-400' : 'fill-teal-400 text-teal-400'}`}
                  aria-hidden="true"
                />
                <h3 className="text-base font-semibold">{p.name}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.oneLiner}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">
                Explore
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CTABand
        title={`See ${product.name} against your own data`}
        body="Bring one of your own files to the call. Thirty minutes is usually enough to tell whether this is the right tool for you — and we would rather find that out early too."
        primaryLabel="Book a demo"
      />
    </>
  )
}
