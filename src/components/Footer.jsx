export default function Footer() {
  return (
    <footer className="border-t border-black/10 px-5 sm:px-8 py-8 flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-4">
      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-black/40 text-center md:text-left">
        © {new Date().getFullYear()} saksham kaushish. All rights reserved.
      </span>

      <div className="flex items-center gap-6">
        {[
          { label: 'GitHub', url: 'https://github.com/saksham-hacked' },
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/reach-saksham-kaushish/' },
          { label: 'Twitter', url: 'https://x.com/DunkinDomino' },
        ].map(({ label, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 hover:text-black transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </div>

      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-black/40 text-center md:text-right">
        Designed &amp; Built by Saksham.K
      </span>
    </footer>
  )
}
