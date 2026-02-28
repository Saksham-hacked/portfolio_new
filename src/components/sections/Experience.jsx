import { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '../../hooks/useGSAP'

gsap.registerPlugin(ScrollTrigger)

// ← EDIT with your real experience / education
const TIMELINE = [
  {
    year: '2024',
    type: 'Education',
    title: 'B.Tech Computer Science',
    org: 'Your University Name',
    desc: 'Studying core CS fundamentals, algorithms, data structures, and software engineering.',
    side: 'left',
  },
  {
    year: '2023',
    type: 'Freelance',
    title: 'Frontend Developer',
    org: 'Self-employed',
    desc: 'Designed and built websites for local businesses. Focused on React, responsive design, and performance.',
    side: 'right',
  },
  {
    year: '2022',
    type: 'Education',
    title: 'High School Diploma',
    org: 'Your School Name',
    desc: 'Graduated with distinction in Computer Science and Mathematics.',
    side: 'left',
  },
  {
    year: '2020',
    type: 'Self-taught',
    title: 'Started Coding',
    org: 'Self-directed Learning',
    desc: 'Began with HTML, CSS, and JavaScript. Built first projects and found a deep passion for web development.',
    side: 'right',
  },
]

/**
 * Experience
 * Vertical timeline with animated line drawing on scroll.
 */
export default function Experience() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useGSAP(() => {
    const line = lineRef.current
    if (line) {
      gsap.to(line, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
      })
    }

    document.querySelectorAll('.timeline-item').forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 0,
        x: item.classList.contains('timeline-left') ? -40 : 40,
        duration: 0.8,
        ease: 'power3.out',
      })
    })
  }, [], sectionRef)

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-8 md:px-16 bg-white">

      <div className="flex items-center justify-between mb-20">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/30">Experience & Education</span>
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/30">04</span>
      </div>

      <h2 className="text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-tight tracking-tight mb-20 max-w-2xl">
        My Journey<br />
        <span className="text-black/30">So Far</span>
      </h2>

      <div className="timeline-container relative max-w-4xl mx-auto">
        <div className="timeline-line-bg" />
        <div ref={lineRef} className="timeline-progress" />

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

              {/* Center dot */}
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
