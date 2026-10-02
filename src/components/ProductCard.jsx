import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function ProductCard({ product, className = '' }) {
  const dot = product.accent === 'sand' ? 'bg-sand-400' : 'bg-teal-400'
  const ring = product.accent === 'sand' ? 'group-hover:border-sand-400/40' : 'group-hover:border-teal-400/40'

  return (
    <article className={`card card-hover group flex h-full flex-col ${ring} ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 rounded-full ${dot}`} aria-hidden="true" />
          <h3 className="text-lg font-semibold">{product.name}</h3>
        </div>
        <span className="pill shrink-0">{product.status}</span>
      </div>

      <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
        {product.subtitle}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{product.oneLiner}</p>

      <dl className="mt-5 space-y-1 text-xs text-slate-500">
        <div className="flex gap-2">
          <dt className="shrink-0 font-medium text-slate-400">For</dt>
          <dd>{product.audience}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold">
        <Link to={`/products/${product.slug}`} className="inline-flex items-center gap-1.5 text-teal-300 hover:text-teal-200">
          Explore {product.name}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
        {product.url && (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-300"
          >
            {product.urlLabel}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}
