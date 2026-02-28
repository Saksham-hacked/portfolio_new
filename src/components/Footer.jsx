export default function Footer() {
  return (
    <footer className="border-t border-black/10 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-black/40">
        © {new Date().getFullYear()} Your Name
      </span>

      <div className="flex items-center gap-6">
        {[
          { label: 'GitHub', url: '#' },
          { label: 'LinkedIn', url: '#' },
          { label: 'Dribbble', url: '#' },
        ].map(({ label, url }) => (
          <a
            key={label}
            href={url}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 hover:text-black transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </div>

      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-black/40">
        Designed &amp; Built by You
      </span>
    </footer>
  )
}
