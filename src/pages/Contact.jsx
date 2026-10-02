import { useState } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import Section from '../components/Section.jsx'
import { site } from '../data/site.js'
import { products } from '../data/products.js'
import { useSeo } from '../lib/seo.js'

/**
 * Contact endpoint.
 *
 * Set VITE_CONTACT_ENDPOINT in .env to a Google Apps Script web app URL (or any
 * endpoint accepting a JSON POST) and the form submits there. With no endpoint
 * configured it falls back to opening the visitor's mail client with everything
 * pre-filled — which always works, and never silently swallows a lead.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || ''

const interests = [
  { value: '', label: 'What is this about?' },
  ...products.map((p) => ({ value: p.name, label: `${p.name} — ${p.subtitle}` })),
  { value: 'Custom build', label: 'A custom build' },
  { value: 'Managed analytics', label: 'Managed analytics / reporting' },
  { value: 'Something else', label: 'Something else' },
]

const empty = { name: '', email: '', company: '', interest: '', message: '', website: '' }

export default function Contact() {
  useSeo({
    title: 'Contact — start a project',
    description:
      'Talk to Anuvad Software Solutions about business intelligence, media analytics, automation or one of our five platforms. Pune, India. info@anuvadsoftware.com',
    path: '/contact',
  })

  const [form, setForm] = useState(empty)
  const [state, setState] = useState('idle') // idle | sending | sent | error | mailto
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const composeBody = () =>
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      form.interest && `Interested in: ${form.interest}`,
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    // Honeypot — bots fill hidden fields, humans never see this one.
    if (form.website) return

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email and a short message are needed before we can reply.')
      setState('error')
      return
    }

    if (!ENDPOINT) {
      const subject = encodeURIComponent(
        form.interest ? `Enquiry: ${form.interest}` : `Enquiry from ${form.name}`,
      )
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(composeBody())}`
      setState('mailto')
      return
    }

    setState('sending')
    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...form, submittedAt: new Date().toISOString(), source: 'anuvadsoftware.com' }),
      })
      setState('sent')
      setForm(empty)
    } catch {
      setError('That did not go through. Please email us directly and we will pick it up straight away.')
      setState('error')
    }
  }

  const field =
    'w-full rounded-lg border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition focus:border-teal-400/60 focus:outline-none focus:ring-1 focus:ring-teal-400/40'

  return (
    <>
      <Section
        eyebrow="Contact"
        title="Let's build something remarkable"
        titleAs="h1"
        lede="Tell us what you are trying to decide and what data you already have. We reply to everything, usually within one working day."
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={onSubmit} className="card" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Name <span className="text-teal-400">*</span>
                </label>
                <input id="name" name="name" className={field} value={form.name} onChange={update('name')} placeholder="Your name" autoComplete="name" required />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Work email <span className="text-teal-400">*</span>
                </label>
                <input id="email" name="email" type="email" className={field} value={form.email} onChange={update('email')} placeholder="you@company.com" autoComplete="email" required />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Company
                </label>
                <input id="company" name="company" className={field} value={form.company} onChange={update('company')} placeholder="Company name" autoComplete="organization" />
              </div>
              <div>
                <label htmlFor="interest" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Interested in
                </label>
                <select id="interest" name="interest" className={field} value={form.interest} onChange={update('interest')}>
                  {interests.map((opt) => (
                    <option key={opt.label} value={opt.value} className="bg-ink-850">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-400">
                What are you trying to solve? <span className="text-teal-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`${field} resize-y`}
                value={form.message}
                onChange={update('message')}
                placeholder="The decision you need to make, the data you have today, and roughly when you need it working."
                required
              />
            </div>

            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Leave this empty</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
            </div>

            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Send message'}
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>

            <div aria-live="polite" className="mt-4">
              {state === 'sent' && (
                <p className="flex items-start gap-2 text-sm text-teal-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  Thank you — that has reached us. You will hear back within one working day.
                </p>
              )}
              {state === 'mailto' && (
                <p className="flex items-start gap-2 text-sm text-teal-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  Your email client should have opened with everything filled in — just press send.
                </p>
              )}
              {state === 'error' && error && (
                <p className="flex items-start gap-2 text-sm text-amber-400">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate-600">
              We use what you send here only to reply to you. No lists, no forwarding, no automated sequences.
            </p>
          </form>

          <div className="space-y-5">
            <div className="card">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Get in touch directly</h2>
              <div className="mt-5 space-y-4 text-sm">
                <a href={`mailto:${site.email}`} className="flex items-start gap-3 text-slate-300 hover:text-teal-300">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                  <span>
                    {site.email}
                    <span className="mt-0.5 block text-xs text-slate-500">General and new business</span>
                  </span>
                </a>
                <p className="flex items-start gap-3 text-slate-300">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                  <span>
                    {site.location}
                    <span className="mt-0.5 block text-xs text-slate-500">Remote engagements across India, the Gulf and SEA</span>
                  </span>
                </p>
                <p className="flex items-start gap-3 text-slate-300">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                  <span>
                    {site.hours}
                    <span className="mt-0.5 block text-xs text-slate-500">We answer outside these when it is urgent</span>
                  </span>
                </p>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Product sites</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {products
                  .filter((p) => p.url)
                  .map((p) => (
                    <li key={p.slug}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-300">
                        {p.name} — {p.urlLabel}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="card border-teal-400/20">
              <h2 className="text-base font-semibold">Bring a file to the call</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                The fastest demo is your own data. A plan export, a bank statement, a stock sheet — thirty minutes
                and you will know whether this is right for you.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
