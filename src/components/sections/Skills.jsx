import { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '../../hooks/useGSAP'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  {
    category: 'Full-Stack Development',
    icon: '{ }',
    description:
      'Building scalable full-stack web applications with modern JavaScript frameworks. Focused on clean architecture, performance, and real-world usability.',
    items: ['React.js', 'Node.js / Express', 'MongoDB', 'Tailwind CSS', 'Flask', 'PostgreSQL'],
  },
  {
    category: 'AI',
    icon: '◎',
    description:
      'Exploring intelligent systems, deep learning, AI orchestration. Passionate about combining software engineering with AI to build impactful solutions.',
    items: ['Python', 'Deep Learning', 'Langchain', 'Langraph', 'AI Agents'],
  },
  {
    category: 'Engineering & Problem Solving',
    icon: '⚡',
    description:
      'Engineering student with strong problem-solving skills and system-level thinking. Interested in scalable software, optimization, and tech innovation.',
    items: ['DSA & Problem Solving', 'System Design Basics', 'Embedded Systems', 'Git & GitHub'],
  },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.skills-heading', {
      scrollTrigger: { trigger: '.skills-heading', start: 'top 85%', toggleActions: 'play reverse play reverse' },
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
    })
    const cards = document.querySelectorAll('.skill-card')
    if (cards.length) {
      gsap.from(cards, {
        scrollTrigger: { trigger: cards[0], start: 'top 85%', toggleActions: 'play reverse play reverse' },
        y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      })
    }
  }, [], sectionRef)

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 px-5 sm:px-8 md:px-16 bg-black text-white overflow-hidden">

      <div className="mb-12 md:mb-16 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30">Skills & Expertise</span>
        <div className="hidden md:block h-[1px] flex-1 mx-8 bg-white/10" />
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30">03</span>
      </div>

      <h2 className="skills-heading text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-tight tracking-tight mb-12 md:mb-20 max-w-2xl">
        What I Do<br />
        <span className="text-white/30">Best</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
        {SKILLS.map((skill, i) => (
          <div
            key={skill.category}
            className={`skill-card p-6 sm:p-10 flex flex-col gap-5 md:gap-6 group hover:bg-white/5 transition-colors duration-300 ${
              i < SKILLS.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''
            }`}
          >
            <span className="font-mono text-2xl text-white/30 group-hover:text-white/60 transition-colors duration-300">
              {skill.icon}
            </span>
            <div>
              <h3 className="text-base md:text-lg font-bold uppercase tracking-wide mb-2 md:mb-3">{skill.category}</h3>
              <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light">{skill.description}</p>
            </div>
            <ul className="flex flex-col gap-2 mt-auto">
              {skill.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                  <span className="font-mono text-[11px] tracking-wider text-white/50">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
