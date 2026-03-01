import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '01',
    title: 'Expense Manager AI Assistant',
    category: 'AI + Backend',
    description:
      'AI-powered expense management system built on an MCP-based architecture separating reasoning from execution. Includes secure JWT auth, structured tool pipelines, and Chrome extension interface.',
    tech: ['Node.js', 'Express', 'MongoDB', 'MCP', 'Chrome Extension'],
    image: '/projects/expense.png',
    link: 'https://chromewebstore.google.com/detail/expense-manager-ai-assist/bhjicgdndhekipmjgdkhjoecnhlhaphj',
  },
  {
    id: '02',
    title: 'T1D Expert – Diabetes Platform',
    category: 'Full Stack',
    description:
      'Full-stack health tracking platform with event-driven backend workflows and WhatsApp integration for real-time patient logging and automated reminders.',
    tech: ['MERN', 'WhatsApp Cloud API', 'REST APIs'],
    image: '/projects/t1d.png',
    link: 'https://it1dxpert.org/',
  },
  {
    id: '03',
    title: 'MeView Social Platform',
    category: 'MERN Stack',
    description:
      'Scalable social platform with secure authentication, TMDB API integration across 250k+ titles, and structured backend architecture for reliability and performance.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'TMDB API'],
    image: '/projects/meview.png',
    link: 'https://meviewisfun.vercel.app/',
  },
]

/* ─── Mobile accordion item ─────────────────────────────────────── */
function AccordionItem({ project, isOpen, onToggle }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.opacity = '1'
    } else {
      el.style.maxHeight = '0px'
      el.style.opacity = '0'
    }
  }, [isOpen])

  return (
    <div className="border-t border-black/10 last:border-b">
      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-5 text-left group"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-3xl font-bold text-black/10 group-hover:text-black/20 transition-colors">
            {project.id}
          </span>
          <div>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/30 block mb-0.5">
              {project.category}
            </span>
            <h3 className="text-sm font-bold uppercase tracking-tight leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Animated +/× */}
        <div className="flex-shrink-0 w-7 h-7 border border-black/20 rounded-full flex items-center justify-center ml-3">
          <span
            className="font-mono text-xs text-black/50 transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}
          >
            +
          </span>
        </div>
      </button>

      {/* Collapsible body */}
      <div
        ref={bodyRef}
        style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease' }}
      >
        <div className="px-5 pb-6">
          {/* Image */}
          <div className="w-full h-48 mb-4 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ transform: isOpen ? 'scale(1)' : 'scale(1.05)', transition: 'transform 0.6s ease' }}
            />
          </div>

          {/* Description */}
          <p className="text-xs text-black/50 leading-relaxed font-light mb-4">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[8px] tracking-[0.2em] uppercase px-2 py-1 border border-black/15 text-black/40"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase bg-black text-white px-5 py-3 hover:bg-black/80 transition-colors"
          >
            View Project <span>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function Projects() {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(0) // first card open by default

  /* Desktop GSAP horizontal scroll — unchanged */
  useEffect(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!container || !wrapper) return

    // Only run on desktop
    if (window.innerWidth < 768) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth)
      const tween = gsap.to(wrapper, { x: getScrollAmount, ease: 'none' })

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => '+=' + (wrapper.scrollWidth - window.innerWidth),
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      })
    })

    return () => ctx.revert()
  }, [])

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="works">
      {/* Section header */}
      <div className="px-5 sm:px-8 md:px-16 pt-24 md:pt-32 pb-6 md:pb-8 bg-white">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/30">Selected Works</span>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/30">02</span>
        </div>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-tight tracking-tight">Works</h2>
      </div>

      {/* ── MOBILE: accordion ─────────────────────────────────────── */}
      <div className="md:hidden bg-white pb-16 px-0">
        {PROJECTS.map((project, i) => (
          <AccordionItem
            key={project.id}
            project={project}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}

        {/* View all row */}
        <div className="border-t border-black/10 px-5 py-5 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/30">More coming soon</span>
          <div className="w-7 h-7 border border-black/20 rounded-full flex items-center justify-center">
            <span className="text-xs text-black/40">→</span>
          </div>
        </div>
      </div>

      {/* ── DESKTOP: pinned horizontal scroll ─────────────────────── */}
      <div ref={containerRef} className="hidden md:block overflow-hidden bg-white" id="works-container">
        <div ref={wrapperRef} className="works-wrapper py-16" id="works-wrapper">
          {PROJECTS.map((project) => (
            <div key={project.id} className="work-card work-item">
              <img src={project.image} alt={project.title} className="h-72 w-full object-cover mb-6" />

              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/40 block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight">{project.title}</h3>
                </div>
                <span className="font-mono text-4xl font-bold text-black/10">{project.id}</span>
              </div>

              <p className="text-sm text-black/50 leading-relaxed mb-4 font-light">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1 border border-black/15 text-black/50">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.3em] uppercase hover:opacity-50 transition-opacity flex items-center gap-2"
              >
                View Project <span>→</span>
              </a>
            </div>
          ))}

          {/* View All card */}
          <div className="work-card work-item flex flex-col items-center justify-center border border-black/10 h-72">
            <a href="#" className="flex flex-col items-center gap-4 group">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/40 group-hover:text-black transition-colors">
                View All
              </span>
              <div className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300">
                <span className="group-hover:text-white transition-colors">→</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
