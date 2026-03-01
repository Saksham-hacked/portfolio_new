import { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '../../hooks/useGSAP'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE = [
  {
    year: '2023 — Present',
    type: 'Education',
    title: 'B.Tech Electrical Engineering',
    org: 'NIT Jalandhar',
    desc:
      'Pursuing Electrical Engineering while actively building skills in full-stack development, backend systems, and AI/ML. Focused on scalable software and strong CS fundamentals.',
    side: 'left',
  },
  {
    year: 'June – July 2025',
    type: 'Internship',
    title: 'Full Stack Developer Intern',
    org: 'iRoots',
    desc:
      'Worked as a full-stack developer building and improving web applications using modern MERN stack. Contributed to frontend UI, backend APIs, and real-world deployment workflows in a production environment.',
    side: 'right',
  },
  {
    year: '2025 — Present',
    type: 'Experience',
    title: 'Backend Developer — Xceed NITJ',
    org: 'Institute Technical Team',
    desc:
      'Developing backend systems, search APIs, and messaging features for institute platforms. Focused on reliability, structured architecture, and scalable backend design.',
    side: 'left',
  },
  {
    year: '2023 — Present',
    type: 'Growth',
    title: 'Full Stack & AI Development Journey',
    org: 'Self-driven Learning',
    desc:
      'Solved 400+ DSA problems and built multiple MERN and AI-based projects including health platforms, social apps, and intelligent systems while exploring system design and machine learning.',
    side: 'right',
  },
]

export default function Experience() {
  const sectionRef = useRef(null)

  // Separate refs for each layout's animated line
  const mobileLineRef = useRef(null)
  const mobileContainerRef = useRef(null)
  const desktopLineRef = useRef(null)
  const desktopContainerRef = useRef(null)

  useGSAP(() => {
    // ── Desktop line animation ──
    if (desktopLineRef.current && desktopContainerRef.current) {
      gsap.to(desktopLineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: desktopContainerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
      })
    }

    // ── Mobile line animation ──
    if (mobileLineRef.current && mobileContainerRef.current) {
      gsap.to(mobileLineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: mobileContainerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
      })
    }

    // ── Item entrance animations ──
    document.querySelectorAll('.timeline-item').forEach((item) => {
      const isMobile = window.innerWidth < 768
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        x: isMobile ? 0 : item.classList.contains('timeline-left') ? -40 : 40,
        y: isMobile ? 20 : 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    })
  }, [], sectionRef)

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 px-5 sm:px-8 md:px-16 bg-white overflow-hidden">

      <div className="flex items-center justify-between mb-12 md:mb-20">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/30">Experience & Education</span>
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/30">04</span>
      </div>

      <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-black uppercase leading-tight tracking-tight mb-12 md:mb-20 max-w-2xl">
        My Journey<br />
        <span className="text-black/30">So Far</span>
      </h2>

      {/* ── MOBILE layout (< md): left-anchored line ── */}
      <div ref={mobileContainerRef} className="md:hidden relative">
        <div className="absolute left-3 top-0 w-px h-full bg-black/10" />
        <div ref={mobileLineRef} className="absolute left-3 top-0 w-px bg-black" style={{ height: '0%', zIndex: 1 }} />

        <div className="flex flex-col">
          {TIMELINE.map((item, i) => (
            <div key={i} className="timeline-item timeline-left relative flex gap-5 py-8 pl-10">
              <div className="absolute left-[7px] top-9 w-3 h-3 rounded-full bg-white border-2 border-black z-10 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/30 border border-black/15 px-2 py-0.5">
                    {item.type}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/30">{item.year}</span>
                </div>
                <h3 className="text-base font-bold uppercase tracking-tight mb-0.5 leading-tight">{item.title}</h3>
                <p className="font-mono text-[10px] tracking-wider text-black/40 mb-2">{item.org}</p>
                <p className="text-xs text-black/50 leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP layout (≥ md): center line, alternating sides ── */}
      <div ref={desktopContainerRef} className="hidden md:block timeline-container relative max-w-4xl mx-auto">
        <div className="timeline-line-bg" />
        {/* ← ref now correctly on the desktop progress line */}
        <div ref={desktopLineRef} className="timeline-progress" />

        <div className="flex flex-col gap-0">
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className={`timeline-item relative z-10 flex items-start gap-8 py-12 ${
                item.side === 'right' ? 'timeline-right flex-row-reverse text-right' : 'timeline-left'
              }`}
            >
              <div className="flex-1">
                <div className={`flex items-center gap-3 mb-3 ${item.side === 'right' ? 'justify-end' : ''}`}>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/30 border border-black/15 px-2 py-1">
                    {item.type}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/30">{item.year}</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-1">{item.title}</h3>
                <p className="font-mono text-xs tracking-wider text-black/40 mb-3">{item.org}</p>
                <p className="text-sm text-black/50 leading-relaxed font-light max-w-xs">{item.desc}</p>
              </div>

              <div className="relative flex-shrink-0 flex items-center justify-center w-8">
                <div className="w-3 h-3 rounded-full bg-white border-2 border-black z-10" />
              </div>

              <div className="flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
