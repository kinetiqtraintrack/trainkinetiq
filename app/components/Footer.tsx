const links = ["Shop", "App", "Privacy", "Contact"];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="/"
          className="font-black text-xl tracking-tighter text-[#111] uppercase"
        >
          Kinetiq
        </a>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-6 justify-center">
            {links.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#111] transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-[11px] text-gray-400 uppercase tracking-wider">
          © 2026 Kinetiq
        </p>
      </div>
    </footer>
  );
}
