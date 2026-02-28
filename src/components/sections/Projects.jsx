import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ← EDIT with your real projects
const PROJECTS = [
  {
    id: '01',
    title: 'Expense Manager AI Assistant',
    category: 'AI + Backend',
    description:
      'AI-powered expense management system built on an MCP-based architecture separating reasoning from execution. Includes secure JWT auth, structured tool pipelines, and Chrome extension interface.',
    tech: ['Node.js', 'Express', 'MongoDB', 'MCP', 'Chrome Extension'],
    image: 'src/assets/projects/expense.png',
    link: 'https://chromewebstore.google.com/detail/expense-manager-ai-assist/bhjicgdndhekipmjgdkhjoecnhlhaphj',
  },
  {
    id: '02',
    title: 'T1D Expert – Diabetes Platform',
    category: 'Full Stack',
    description:
      'Full-stack health tracking platform with event-driven backend workflows and WhatsApp integration for real-time patient logging and automated reminders.',
    tech: ['MERN', 'WhatsApp Cloud API', 'REST APIs'],
    image: 'src/assets/projects/t1d.png',
    link: 'https://it1dxpert.org/',
  },
  {
    id: '03',
    title: 'MeView Social Platform',
    category: 'MERN Stack',
    description:
      'Scalable social platform with secure authentication, TMDB API integration across 250k+ titles, and structured backend architecture for reliability and performance.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'TMDB API'],
    image: 'src/assets/projects/meview.png',
    link: 'https://meviewisfun.vercel.app/',
  },
  // {
  //   id: '04',
  //   title: 'Developer Portfolio (GSAP)',
  //   category: 'Frontend',
  //   description:
  //     'Modern animated developer portfolio built with React, GSAP, and Tailwind. Features smooth scrolling, advanced animations, and recruiter-focused UI.',
  //   tech: ['React', 'GSAP', 'Tailwind', 'Vite'],
  //   image: '/projects/portfolio.png',
  //   link: '#',
  // },
]

/**
 * Projects
 * Horizontally scrollable cards pinned to viewport while scrolling.
 */
export default function Projects() {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!container || !wrapper) return

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

  return (
    <section id="works">
      {/* Header — outside the pin zone */}
      <div className="px-8 md:px-16 pt-32 pb-8 bg-white">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/30">Selected Works</span>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/30">02</span>
        </div>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-tight tracking-tight">Works</h2>
      </div>

      {/* Pinned horizontal container */}
      <div ref={containerRef} className="overflow-hidden bg-white" id="works-container">
        <div ref={wrapperRef} className="works-wrapper py-16" id="works-wrapper">

          {PROJECTS.map((project) => (
            <div key={project.id} className="work-card work-item">
              {/* Image placeholder — replace with <img src="..." /> */}
              <img src={project.image} alt={project.title} className="h-72 w-full object-cover mb-6" />
              {/* <div className="img-placeholder h-72 w-full mb-6">
                <svg className="w-10 h-10 mb-3 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="text-[10px] uppercase tracking-widest">Project Screenshot</p>
                <p className="text-[8px] opacity-40 mt-1">{project.title}</p>
              </div> */}

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

              <a href={project.link} className="font-mono text-[10px] tracking-[0.3em] uppercase hover:opacity-50 transition-opacity flex items-center gap-2">
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
