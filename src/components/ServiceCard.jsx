import { BarChart3, Tv, Workflow, Sparkles, Cloud, Plug, Box } from 'lucide-react'

/**
 * Explicit map rather than `import * as Icons` — a namespace import of
 * lucide-react defeats tree-shaking and pulls the entire icon set (~800 kB)
 * into the bundle.
 */
const ICONS = { BarChart3, Tv, Workflow, Sparkles, Cloud, Plug }

export default function ServiceCard({ service, expanded = false, className = '' }) {
  const Icon = ICONS[service.icon] || Box

  return (
    <article id={service.slug} className={`card card-hover scroll-mt-28 h-full ${className}`}>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
        <Icon className="h-5 w-5 text-teal-300" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{service.summary}</p>
      {expanded && (
        <ul className="prose-list mt-5 space-y-2.5 text-sm">
          {service.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </article>
  )
}
