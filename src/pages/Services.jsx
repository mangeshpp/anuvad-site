import Section from '../components/Section.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CTABand from '../components/CTABand.jsx'
import { process, engagementModels } from '../data/site.js'
import { services } from '../data/services.js'
import { useSeo } from '../lib/seo.js'

export default function Services() {
  useSeo({
    title: 'Services — BI, media analytics, automation and integration',
    description:
      'Business intelligence, media analytics, data engineering and automation, AI-powered insights, hosting and integration from Anuvad Software Solutions, Pune.',
    path: '/services',
  })

  return (
    <>
      <Section
        eyebrow="Services"
        title="What we do, and what that actually includes"
        titleAs="h1"
        lede="Six capabilities. Most engagements use three or four of them together — the list below is what each one means in practice, not a category name."
      />

      <Section tone="raised" className="!pt-0 !mt-0">
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} expanded />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Engagement models"
        title="Three ways to work with us"
        lede="Which one fits usually becomes obvious in the first conversation. We will say so even when the answer is the cheaper one."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {engagementModels.map((m) => (
            <div key={m.title} className="card card-hover flex h-full flex-col">
              <h3 className="text-lg font-semibold">{m.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{m.body}</p>
              <p className="mt-5 border-t border-white/[0.08] pt-4 text-xs font-medium text-teal-300">{m.fit}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="deep"
        eyebrow="Our process"
        title="Four phases, each ending in something you can see"
        lede="Discovery produces a document, not a feeling. Build produces working software you can open. Nothing is invoiced against a phase you cannot inspect."
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <li key={p.step} className="card card-hover">
              <span className="font-mono text-sm font-semibold text-teal-400">{p.step}</span>
              <h3 className="mt-3 text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CTABand
        title="Tell us the decision, not the requirement"
        body="The best briefs we get start with what someone needs to decide and how often. Send us that and we will come back with a shape, a rough size and an honest view of whether it is worth building."
      />
    </>
  )
}
