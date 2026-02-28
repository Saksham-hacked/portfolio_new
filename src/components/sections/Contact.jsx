import { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '../../hooks/useGSAP'
import { useMagnetic } from '../../hooks/useMagnetic'

gsap.registerPlugin(ScrollTrigger)

/**
 * Contact
 * Full-bleed dark section with big heading and email CTA.
 */
export default function Contact() {
  const sectionRef = useRef(null)
  const emailBtn = useMagnetic(0.2)

  useGSAP(() => {
    gsap.from('.contact-heading', {
      scrollTrigger: { trigger: '.contact-heading', start: 'top 85%', toggleActions: 'play reverse play reverse' },
      y: 80, opacity: 0, duration: 1.2, ease: 'power3.out',
    })
    gsap.from('.contact-sub', {
      scrollTrigger: { trigger: '.contact-sub', start: 'top 85%', toggleActions: 'play reverse play reverse' },
      y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power2.out',
    })
    gsap.from('.contact-links', {
      scrollTrigger: { trigger: '.contact-links', start: 'top 85%', toggleActions: 'play reverse play reverse' },
      y: 30, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power2.out',
    })
  }, [], sectionRef)

  return (
    <section id="contact" ref={sectionRef} className="py-40 px-8 md:px-16 bg-black text-white min-h-[70vh] flex flex-col justify-center">

      <div className="flex items-center justify-between mb-20">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30">Get In Touch</span>
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/30">05</span>
      </div>

      <h2 className="contact-heading text-[clamp(3rem,9vw,9rem)] font-black uppercase leading-none tracking-tight mb-10">
        Let's<br />
        <span className="text-white/20">Work.</span>
      </h2>

      {/* ← EDIT this text */}
      <p className="contact-sub font-light text-white/50 max-w-lg leading-relaxed mb-16 text-lg">
        Have a project in mind or looking for a developer intern? I'm available
        and excited to collaborate. Let's build something great together.
      </p>

      <div className="contact-links flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* ← CHANGE the email */}
        <a
          ref={emailBtn}
          href="https://mail.google.com/mail/?view=cm&fs=1&to=kaushishsaksham@gmail.com"
          className="magnetic-btn group flex items-center gap-4 border border-white/20 px-8 py-5 hover:bg-white hover:text-black transition-all duration-300"
        >
          <span className="font-mono text-sm tracking-[0.2em] uppercase">kaushishsaksham@gmail.com</span>
          <span className="text-xl group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>

        <div className="flex items-center gap-6">
          {[
            { label: 'GitHub', url: 'https://github.com/saksham-hacked' },   /* ← ADD your URLs */
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/reach-saksham-kaushish/' },
            { label: 'Twitter', url: 'https://x.com/DunkinDomino' },
          ].map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
    rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
