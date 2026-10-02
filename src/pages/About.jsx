import Section from '../components/Section.jsx'
import CTABand from '../components/CTABand.jsx'
import { site, stats, differentiators } from '../data/site.js'
import { useSeo } from '../lib/seo.js'
import StatBand from '../components/StatBand.jsx'

const timeline = [
  {
    period: 'Before Anuvad',
    title: 'Two decades inside the industry',
    body: 'Senior analytics and business intelligence roles at Nielsen India, Mindshare and Wavemaker (WPP). Measurement, media planning and the reporting that agencies and advertisers run on.',
  },
  {
    period: 'Founding',
    title: 'Anuvad Software Solutions, Pune',
    body: 'Founded to build the systems that kept being improvised in spreadsheets — properly, as software, with the domain knowledge already inside them.',
  },
  {
    period: 'Delivery',
    title: 'Enterprise media intelligence at scale',
    body: 'A multi-year platform for a multinational media agency and its FMCG client: an AWS lakehouse, twelve categories of monthly reporting, and a report cycle that went from days to under a minute.',
  },
  {
    period: 'Now',
    title: 'Five products carrying Anuvad IP',
    body: 'Akhani, Fiscora, Brimline, ReturnLoop and the Warehouse Inventory system — each grown out of a real engagement and now licensed on subscription.',
  },
]

const principles = [
  {
    title: 'Say what is modelled',
    body: 'Where a number is derived rather than measured, the software says so on screen and shows the assumption. A confident wrong number costs more than an honest range.',
  },
  {
    title: 'Fail closed',
    body: 'Who can see what is enforced by the system, not by someone remembering to apply a filter. If access is unclear, nothing is shown — and we can demonstrate that to your security reviewer.',
  },
  {
    title: 'Never mix what should not be mixed',
    body: 'Category boundaries, tenant boundaries, period boundaries. These are hard rules in our systems, checked automatically, not conventions someone has to remember.',
  },
  {
    title: 'Leave it runnable',
    body: 'Every build is handed over documented, with backups running and a way to move it elsewhere. You should never be stuck with us because leaving is hard.',
  },
]

export default function About() {
  useSeo({
    title: 'About — analytics-first, built in Pune',
    description:
      'Anuvad Software Solutions is a Pune-based B2B technology company specialising in business intelligence, data engineering, media analytics and process automation, founded on 24+ years in the industry.',
    path: '/about',
  })

  return (
    <>
      <Section
        eyebrow="About Anuvad"
        title="Built for the analytics-first era"
        titleAs="h1"
        lede={`${site.name} is a ${site.location.split(',')[0]}-based B2B technology company specialising in business intelligence, data engineering, media analytics and process automation. We work with FMCG brands, media agencies and operations teams across India and abroad.`}
      >
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="card">
            <p className="text-base leading-relaxed text-slate-300">
              Anuvad was founded after more than two decades inside the measurement and media industry — Nielsen
              India, Mindshare and Wavemaker. That matters because the hardest part of this work is rarely the
              engineering. It is knowing which number is the right one, why two sources disagree, and what a
              planner or a finance head is actually going to do with the answer.
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              We build cloud-agnostic systems that combine data engineering, product design and domain knowledge.
              Some of that work is bespoke. Increasingly, it is products — five of them now — that started as
              client engagements and earned their own life.
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              We are deliberately a small, senior team. You talk to the people who build the thing.
            </p>
          </div>
          <div className="card">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">At a glance</h3>
            <dl className="mt-5 space-y-4 text-sm">
              {[
                ['Founded by', 'Mangesh Pawar'],
                ['Based in', site.location],
                ['Experience', site.foundedContext],
                ['Sectors', 'FMCG, media agencies, logistics, professional services'],
                ['Markets', 'India, Middle East, South East Asia'],
                ['Contact', site.email],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">{k}</dt>
                  <dd className="mt-1 text-slate-300">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <StatBand items={stats} />

      <Section tone="raised" eyebrow="How we got here" title="A short history">
        <ol className="relative space-y-6 border-l border-white/10 pl-6">
          {timeline.map((t) => (
            <li key={t.period} className="relative">
              <span className="absolute -left-[1.85rem] top-2 h-2.5 w-2.5 rounded-full bg-teal-400 ring-4 ring-ink-850" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">{t.period}</p>
              <h3 className="mt-1.5 text-lg font-semibold">{t.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">{t.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Principles"
        title="Four rules our software follows"
        lede="These are not values-page decoration. Each one shows up as a specific mechanism in the products."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="card card-hover">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="deep" eyebrow="Why clients stay" title="What we hear back">
        <div className="grid gap-5 sm:grid-cols-2">
          {differentiators.map((d) => (
            <div key={d.title} className="card">
              <h3 className="text-base font-semibold">{d.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABand
        title="Work with us"
        body="Whether it is a product subscription, a custom build or a managed reporting cycle, the first conversation is the same: what are you trying to decide, and what do you have to decide it with?"
      />
    </>
  )
}
