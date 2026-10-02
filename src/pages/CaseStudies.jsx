import Section from '../components/Section.jsx'
import CTABand from '../components/CTABand.jsx'
import { caseStudies } from '../data/caseStudies.js'
import { useSeo } from '../lib/seo.js'

export default function CaseStudies() {
  useSeo({
    title: 'Case studies — media intelligence and automated reporting',
    description:
      'How Anuvad Software Solutions built an enterprise media intelligence platform reporting twelve FMCG categories monthly, and the validation layer that checks every report before release.',
    path: '/case-studies',
  })

  return (
    <>
      <Section
        eyebrow="Case studies"
        title="Work we can talk about"
        titleAs="h1"
        lede="Client names are withheld where an NDA applies. Everything else here — the architecture, the failures we hit and the outcomes — is described as it happened."
      />

      {caseStudies.map((cs, index) => (
        <Section key={cs.slug} tone={index % 2 === 0 ? 'raised' : 'default'} className={index === 0 ? '!pt-0' : ''}>
          <article>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="pill">{cs.industry}</span>
              <span className="pill">{cs.duration}</span>
            </div>
            <h2 className="h-section mt-5">{cs.title}</h2>
            <p className="mt-2 text-sm font-medium text-teal-300">{cs.client}</p>
            <p className="lede mt-5 max-w-3xl">{cs.summary}</p>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="card">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">The challenge</p>
                <ul className="prose-list mt-4 space-y-3 text-sm">
                  {cs.challenge.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="card border-teal-400/20">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">What we did</p>
                <ul className="prose-list mt-4 space-y-3 text-sm">
                  {cs.approach.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cs.outcomes.map(([value, label]) => (
                <div key={label} className="card !py-5">
                  <span className="block font-display text-2xl font-bold text-teal-300">{value}</span>
                  <span className="mt-2 block text-sm leading-snug text-slate-400">{label}</span>
                </div>
              ))}
            </div>

            {cs.quote && (
              <blockquote className="mt-8 border-l-2 border-teal-400/50 pl-5">
                <p className="text-base italic leading-relaxed text-slate-300">“{cs.quote.text}”</p>
                <footer className="mt-2 text-xs text-slate-500">— {cs.quote.attribution}</footer>
              </blockquote>
            )}

            {cs.note && <p className="mt-6 text-xs text-slate-600">{cs.note}</p>}
          </article>
        </Section>
      ))}

      <CTABand
        title="Build something similar"
        body="Most of these engagements started with one report that nobody trusted. If that sounds familiar, that is a good first conversation."
      />
    </>
  )
}
