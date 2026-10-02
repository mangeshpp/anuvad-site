import Container from './Container.jsx'

export default function StatBand({ items }) {
  return (
    <section className="border-y border-white/[0.06] bg-ink-950/50 py-12">
      <Container>
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label}>
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-bold text-teal-300 sm:text-4xl">{item.value}</span>
                <span className="mt-2 block text-sm leading-snug text-slate-400">{item.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
