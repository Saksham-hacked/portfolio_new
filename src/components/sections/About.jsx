import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '../../hooks/useGSAP'
import LocationMap from '../Map'

gsap.registerPlugin(ScrollTrigger)

// ← CHANGE THESE to your real dates
const BIRTH_DATE = new Date('2005-04-23T00:00:00')
const CAREER_START = new Date('2023-07-10T00:00:00')

function calcAge() {
  const now = new Date()
  let years = now.getFullYear() - BIRTH_DATE.getFullYear()
  let months = now.getMonth() - BIRTH_DATE.getMonth()
  let days = now.getDate() - BIRTH_DATE.getDate()
  let hours = now.getHours() - BIRTH_DATE.getHours()
  let minutes = now.getMinutes() - BIRTH_DATE.getMinutes()
  let seconds = now.getSeconds() - BIRTH_DATE.getSeconds()

  if (seconds < 0) { seconds += 60; minutes-- }
  if (minutes < 0) { minutes += 60; hours-- }
  if (hours < 0) { hours += 24; days-- }
  if (days < 0) { days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); months-- }
  if (months < 0) { months += 12; years-- }

  const expYrs = Math.max(0, now.getFullYear() - CAREER_START.getFullYear())
  const expMos = now.getMonth() - CAREER_START.getMonth()
  // const totalMos = Math.max(0, expYrs * 12 + expMos)
  const projects = 20

  return { years, months, days, hours, minutes, seconds, expYrs, projects }
}

const pad = (n) => String(n).padStart(2, '0')

/**
 * About
 * Story, stats, live age chronometer, and location map placeholder.
 */
export default function About() {
  const [age, setAge] = useState(calcAge())
  const sectionRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setAge(calcAge()), 1000)
    return () => clearInterval(id)
  }, [])

  useGSAP(() => {
    gsap.from('.about-heading', {
      scrollTrigger: { trigger: '.about-heading', start: 'top 85%', toggleActions: 'play reverse play reverse' },
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
    })
    gsap.from('.about-para', {
      scrollTrigger: { trigger: '.about-para', start: 'top 85%', toggleActions: 'play reverse play reverse' },
      y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.2,
    })
    gsap.from('.about-stat', {
      scrollTrigger: { trigger: '.about-stat', start: 'top 85%', toggleActions: 'play reverse play reverse' },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    })
    gsap.from('.chronometer-box', {
      scrollTrigger: { trigger: '.chronometer-box', start: 'top 80%', toggleActions: 'play reverse play reverse' },
      scale: 0.95, opacity: 0, duration: 1, ease: 'power3.out',
    })
  }, [], sectionRef)

  return (
    <section id="about" ref={sectionRef} className="py-32 px-8 md:px-16 bg-white">

      <div className="mb-16">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/30">Location_Data</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Story */}
        <div>
          {/* ← CHANGE city/country */}
          <h2 className="about-heading text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-tight tracking-tight mb-8">
            Born in<br />
            <span className="text-black/30">Roorkee</span>
          </h2>

          {/* ← EDIT these paragraphs */}
          <p className="about-para text-black/60 leading-relaxed max-w-md mb-6 font-light">
            I’m a developer driven by curiosity and precision — passionate about crafting seamless digital products that are both visually refined and technically robust.
Currently an Electrical Engineering student, focused on software development, machine learning, and modern web technologies.
          </p>
          <p className="about-para text-black/40 leading-relaxed max-w-md font-light text-sm">
            From full-stack applications to AI-powered tools, I love building solutions that are fast, scalable, and meaningful.
          </p>

          <div className="mt-12 flex gap-12">
            <div className="about-stat">
              <p className="font-mono text-4xl font-bold">{age.expYrs}+</p>
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-black/40 mt-1">Years coding.</p>
            </div>
            <div className="about-stat">
              <p className="font-mono text-4xl font-bold">{age.projects}+</p>
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-black/40 mt-1">Projects Done</p>
            </div>
          </div>
        </div>

        {/* Chronometer */}
        <div className="chronometer-box border border-black/10 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-black" />
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-black/40">System Runtime</span>
          </div>

          <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Life Chronometer</h3>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Years', val: pad(age.years) },
              { label: 'Months', val: pad(age.months) },
              { label: 'Days', val: pad(age.days) },
              { label: 'Hours', val: pad(age.hours) },
              { label: 'Minutes', val: pad(age.minutes) },
              { label: 'Seconds', val: pad(age.seconds) },
            ].map(({ label, val }) => (
              <div key={label} className="bg-black/[0.03] p-4 text-center">
                <p className="age-digit text-3xl font-bold leading-none">{val}</p>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/40 mt-2">{label}</p>
              </div>
            ))}
          </div>

          <div className="sec-bar-track mt-6">
            <div className="sec-bar-fill" style={{ width: `${(age.seconds / 60) * 100}%` }} />
          </div>

          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/25 mt-4">
            Origin: {BIRTH_DATE.toISOString()}
          </p>
        </div>
      </div>

      {/* Map placeholder
          Replace with a real SVG world map or react-simple-maps component */}
      {/* <div className="mt-24">
        <div className="img-placeholder h-56 w-full max-w-2xl mx-auto">
          <svg className="w-8 h-8 mb-3 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="10" r="3" />
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          </svg>
          <p>World Map / Location</p>
          <p className="mt-1 text-[9px] opacity-50">Replace with SVG map or react-simple-maps</p>
        </div>
      </div> */}
      <LocationMap />
    </section>
  )
}
