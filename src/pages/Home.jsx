import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ShieldCheck, Gauge, Layers } from 'lucide-react'
import Container from '../components/Container.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import Reveal from '../components/motion/Reveal.jsx'
import CountUp from '../components/motion/CountUp.jsx'
import AnimatedWords from '../components/motion/AnimatedWords.jsx'
import NetworkCanvas from '../components/motion/NetworkCanvas.jsx'
import ScrollProgress from '../components/motion/ScrollProgress.jsx'
import MotionSection from '../components/motion/MotionSection.jsx'
import MotionCTABand from '../components/motion/MotionCTABand.jsx'
import { useSpotlight } from '../components/motion/useSpotlight.js'
import '../components/motion/motion.css'
import { site, stats, process, differentiators } from '../data/site.js'
import { services } from '../data/services.js'
import { products } from '../data/products.js'
import { caseStudies } from '../data/caseStudies.js'
import { useSeo } from '../lib/seo.js'

/**
 * Homepage, with the motion layer: 3D data-globe hero, scroll reveals,
 * count-up figures, cursor spotlight on cards, process progress line and the
 * travelling-light call to action. Everything honours reduced-motion settings.
 * Motion code lives in src/components/motion/.
 */

const STAGGER = 90

export default function Home() {
  useSeo({
    title: 'Data that drives decisions. Not doubts.',
    description:
      'Anuvad Software Solutions builds analytics platforms, media intelligence systems and operations software — Akhani, Fiscora, Brimline, ReturnLoop and Warehouse Inventory Tracking. Pune, India.',
    path: '/',
  })

  const rootRef = useRef(null)
  useSpotlight(rootRef)

  const flagship = caseStudies[0]

  return (
    <div ref={rootRef} className="motion-root">
      <ScrollProgress />

      {/* Hero */}
      <section className="relative overflow-hidden pb-4 pt-16 sm:pt-24">
        <NetworkCanvas />
        <div className="m-hero-scrim" aria-hidden="true" />

        <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="eyebrow m-rise" style={{ '--m-delay': '0ms' }}>
                <span className="m-ping h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400 text-teal-400" aria-hidden="true" />
                Business Intelligence · Media Analytics · Automation
              </p>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
                <AnimatedWords text="Data that drives decisions." startDelay={150} />{' '}
                <span className="m-word" style={{ '--m-delay': '520ms' }}>
                  <span className="m-shimmer">Not doubts.</span>
                </span>
              </h1>
              <p className="lede m-rise mt-6 max-w-xl" style={{ '--m-delay': '760ms' }}>
                {site.subline}
              </p>

              <div className="m-rise mt-8 flex flex-wrap gap-3" style={{ '--m-delay': '900ms' }}>
                <Link to="/contact" className="btn-primary m-sheen">
                  Start a project
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/products" className="btn-secondary">
                  See our five products
                </Link>
              </div>

              <p className="m-rise mt-8 text-xs leading-relaxed text-slate-500" style={{ '--m-delay': '1050ms' }}>
                Founded on {site.foundedContext} — built at Nielsen, Mindshare and Wavemaker before it was built
                into software.
              </p>
            </div>

            {/* Product rail */}
            <div
              className="m-rise m-glass rounded-2xl p-2"
              style={{ '--m-delay': '600ms' }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Our platforms</p>
                <Link to="/products" className="text-xs font-semibold text-teal-300 hover:text-teal-200">
                  All products →
                </Link>
              </div>
              <div className="space-y-1">
                {products.map((p, i) => (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    className="m-rise group flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/5"
                    style={{ '--m-delay': `${800 + i * 110}ms` }}
                  >
                    <span
                      className={`m-ping h-2 w-2 shrink-0 rounded-full ${
                        p.accent === 'sand' ? 'bg-sand-400 text-sand-400' : 'bg-teal-400 text-teal-400'
                      }`}
                      style={{ '--m-delay': `${i * 480}ms` }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-white">{p.name}</span>
                      <span className="block truncate text-xs text-slate-500">{p.subtitle}</span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-teal-300"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <div className="mt-12">
        <section className="m-statband border-y border-white/[0.06] bg-ink-950/50 py-12">
          <Container>
            <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((item, i) => (
                <Reveal key={item.label} delay={i * STAGGER}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <CountUp
                      value={item.value}
                      className="block font-display text-3xl font-bold text-teal-300 sm:text-4xl"
                    />
                    <span className="mt-2 block text-sm leading-snug text-slate-400">{item.label}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </Container>
        </section>
      </div>

      {/* Services */}
      <MotionSection
        eyebrow="What we do"
        title="End-to-end intelligence for marketing, media and operations teams"
        lede="Six capabilities that combine into one thing: a number your leadership can act on, produced the same way every month, with the working shown."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * STAGGER}>
              <ServiceCard service={service} className="m-spot" />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8" delay={120}>
          <Link to="/services" className="btn-ghost group">
            See what each capability includes
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </MotionSection>

      {/* Products */}
      <MotionSection
        tone="raised"
        eyebrow="Products"
        title="Five platforms, already built"
        lede="Every one of these came out of a real engagement and now carries Anuvad IP. Licence one on subscription, or use it as the starting point for something shaped around you."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * STAGGER}>
              <ProductCard product={product} className="m-spot" />
            </Reveal>
          ))}
        </div>
      </MotionSection>

      {/* Why Anuvad */}
      <MotionSection
        eyebrow="Why Anuvad"
        title="Bought by people who check the numbers"
        lede="Our buyers are analysts, finance heads and operations managers. They do not take a dashboard on trust, and we do not ask them to."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={(i % 2) * STAGGER}>
              <div className="card card-hover m-spot h-full">
                <span className="font-mono text-xs text-teal-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-semibold">{d.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </MotionSection>

      {/* Process */}
      <MotionSection
        tone="deep"
        eyebrow="Our process"
        title="How an engagement runs"
        lede="No discovery theatre. Four phases, each ending in something you can see."
      >
        <Reveal as="ol" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" y={10}>
          {process.map((p, i) => (
            <li key={p.step} className="card card-hover m-spot" style={{ '--m-step-delay': `${250 + i * 480}ms` }}>
              <span className="m-step-bar" aria-hidden="true" />
              <span className="m-step-num font-mono text-sm font-semibold text-teal-400/60">{p.step}</span>
              <h3 className="mt-3 text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.body}</p>
            </li>
          ))}
        </Reveal>
      </MotionSection>

      {/* Featured case study */}
      <MotionSection eyebrow="Featured case study" title={flagship.title} lede={flagship.summary}>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="card m-spot h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">The problem</p>
              <ul className="prose-list mt-4 space-y-2.5 text-sm">
                {flagship.challenge.slice(0, 3).map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">What we built</p>
              <ul className="prose-list mt-4 space-y-2.5 text-sm">
                {flagship.approach.slice(0, 3).map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <Link to="/case-studies" className="btn-ghost group mt-7 !px-0">
                Read the full case study
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="space-y-4">
            {flagship.outcomes.map(([value, label], i) => (
              <Reveal key={label} delay={i * STAGGER} y={12}>
                <div className="card m-spot flex items-baseline gap-4 !py-5">
                  <CountUp value={value} className="font-display text-2xl font-bold text-teal-300" />
                  <span className="text-sm leading-snug text-slate-400">{label}</span>
                </div>
              </Reveal>
            ))}
            <p className="px-1 text-xs text-slate-600">{flagship.note}</p>
          </div>
        </div>
      </MotionSection>

      {/* Trust strip */}
      <MotionSection tone="raised">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: 'Built to be audited',
              body: 'Nothing is quietly overwritten and every report is checked before it goes out. If a figure is questioned, the trail is there.',
            },
            {
              icon: Gauge,
              title: 'Sized honestly',
              body: 'We will tell you when a small VPS is the right answer and when it is not. Infrastructure recommendations come with the arithmetic.',
            },
            {
              icon: Layers,
              title: 'Yours to keep',
              body: 'Custom work is handed over complete and documented, so you could give it to someone else tomorrow. Nothing is held hostage.',
            },
          ].map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * STAGGER} className="flex gap-4">
              <Icon
                className="m-float h-5 w-5 shrink-0 text-teal-400"
                style={{ '--m-delay': `${i * 700}ms` }}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </MotionSection>

      {/* Product sites */}
      <MotionSection
        eyebrow="Product sites"
        title="Go straight to a product"
        lede="Each platform has its own home, with sign-up, pricing and documentation."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {products
            .filter((p) => p.url)
            .map((p, i) => (
              <Reveal key={p.slug} delay={i * STAGGER}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover m-spot group flex h-full items-center justify-between gap-4"
                >
                  <span>
                    <span className="block text-base font-semibold text-white">{p.name}</span>
                    <span className="mt-1 block text-xs text-slate-500">{p.urlLabel}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-400"
                    aria-hidden="true"
                  />
                </a>
              </Reveal>
            ))}
        </div>
      </MotionSection>

      <MotionCTABand />

    </div>
  )
}
