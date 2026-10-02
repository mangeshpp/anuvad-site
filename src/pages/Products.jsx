import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import Section from '../components/Section.jsx'
import ProductCard from '../components/ProductCard.jsx'
import CTABand from '../components/CTABand.jsx'
import { products } from '../data/products.js'
import { useSeo } from '../lib/seo.js'

const groups = [
  {
    key: 'Media',
    title: 'Media & planning',
    body: 'Built on Indian currency data by people who spent two decades inside agencies.',
    slugs: ['akhani', 'brimline'],
  },
  {
    key: 'Finance',
    title: 'Finance operations',
    body: 'GST-native billing and accounting that runs itself between month-ends.',
    slugs: ['fiscora'],
  },
  {
    key: 'Logistics',
    title: 'Logistics & warehousing',
    body: 'Two systems for physical inventory — one for returnable assets, one for stock.',
    slugs: ['returnloop', 'warehouse-inventory'],
  },
]

export default function Products() {
  useSeo({
    title: 'Products — Akhani, Fiscora, Brimline, ReturnLoop, Warehouse Inventory',
    description:
      'Five platforms from Anuvad Software Solutions: Akhani TV spot scheduler, Fiscora accounting, Brimline reach optimisation, ReturnLoop RFID packaging tracking and QR-based Warehouse Inventory Tracking.',
    path: '/products',
  })

  return (
    <>
      <Section
        eyebrow="Products"
        title="Five platforms, already built and running"
        titleAs="h1"
        lede="Each one started as a real problem in a real operation. Licence them on subscription, or use one as the foundation for something shaped around your own process."
      />

      <Section className="!pt-0">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      {groups.map((group) => (
        <Section key={group.key} tone="raised" eyebrow={group.key} title={group.title} lede={group.body}>
          <div className="space-y-5">
            {group.slugs.map((slug) => {
              const p = products.find((x) => x.slug === slug)
              if (!p) return null
              return (
                <article key={slug} className="card grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold">{p.name}</h3>
                      <span className="pill">{p.status}</span>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-teal-300 hover:text-teal-200"
                        >
                          {p.urlLabel}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.hero}</p>
                    <Link to={`/products/${p.slug}`} className="btn-ghost mt-5 !px-0">
                      Full product detail →
                    </Link>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-ink-900/50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Headline capabilities</p>
                    <ul className="mt-4 space-y-2.5">
                      {p.features.slice(0, 4).map((f) => (
                        <li key={f.title} className="flex gap-2.5 text-sm text-slate-400">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                          {f.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </Section>
      ))}

      <Section
        eyebrow="At a glance"
        title="Which product solves which problem"
        lede="If none of these is quite it, the sixth option is a custom build — and we will say so rather than sell you the nearest fit."
      >
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-ink-850/80 text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold">Product</th>
                <th scope="col" className="px-5 py-4 font-semibold">Solves</th>
                <th scope="col" className="px-5 py-4 font-semibold">Built for</th>
                <th scope="col" className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {products.map((p) => (
                <tr key={p.slug} className="transition hover:bg-white/[0.03]">
                  <th scope="row" className="px-5 py-4 align-top font-semibold text-white">
                    <Link to={`/products/${p.slug}`} className="hover:text-teal-300">
                      {p.name}
                    </Link>
                    <span className="mt-1 block text-xs font-normal text-slate-500">{p.category}</span>
                  </th>
                  <td className="px-5 py-4 align-top text-slate-400">{p.oneLiner}</td>
                  <td className="px-5 py-4 align-top text-slate-400">{p.audience}</td>
                  <td className="px-5 py-4 align-top">
                    <span className="pill">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <CTABand
        title="Want a walkthrough with your own data?"
        body="The fastest way to judge any of these is to run one of your own files through it. Send us a plan export, a statement or a stock sheet and we will show you the output on a call."
        primaryLabel="Book a walkthrough"
      />
    </>
  )
}
