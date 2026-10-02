import { Link } from 'react-router-dom'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="Anuvad Software Solutions — home">
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="anuvad-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="38" height="38" rx="11" fill="#0b1726" stroke="rgba(255,255,255,0.12)" />
        <path d="M11 28 L20 11 L29 28" stroke="url(#anuvad-mark)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M15.5 23.5 H24.5" stroke="#5de7d5" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="20" cy="31.5" r="1.7" fill="#2dd4bf" />
      </svg>
      <span className="leading-tight">
        <span className="block font-display text-[15px] font-semibold tracking-tight text-white">Anuvad</span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 transition group-hover:text-teal-400">
          Software Solutions
        </span>
      </span>
    </Link>
  )
}
