function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function Nav() {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-[60px]">
        {/* Logo */}
        <a
          href="/"
          className="font-black text-[22px] tracking-tighter text-[#111] uppercase"
        >
          Kinetiq
        </a>

        {/* Center links */}
        <ul className="hidden md:flex items-center gap-8">
          {["Shop", "App", "Reviews"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="uppercase text-xs font-bold tracking-widest text-[#111] hover:text-[#22c55e] transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="text-[#111] hover:text-[#22c55e] transition-colors"
          >
            <SearchIcon />
          </button>
          <button
            aria-label="Shopping bag"
            className="text-[#111] hover:text-[#22c55e] transition-colors"
          >
            <BagIcon />
          </button>
          <a
            href="#app-banner"
            className="hidden sm:inline-flex items-center bg-[#111] text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#222] transition-colors"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  );
}
