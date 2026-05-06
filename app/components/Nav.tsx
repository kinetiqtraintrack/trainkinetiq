"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";

const APP_STORE_URL = "https://apps.apple.com/app/id6759758630";
const NAV_LINKS = ["Shop", "App", "Reviews"];

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <>
    <CartDrawer />
    {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-[60px]">
        {/* Logo — TODO: replace with <Image src="/logo.png"> once logo.png is committed */}
        <Link href="/" className="font-black text-[22px] tracking-tighter text-[#111] uppercase min-h-[44px] flex items-center">
          Kinetiq
        </Link>

        {/* Desktop center links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <Link
                href={link === "Shop" ? "/collections/obsidian" : `/#${link.toLowerCase()}`}
                className="uppercase text-xs font-bold tracking-widest text-[#111] hover:text-[#22c55e] transition-colors min-h-[44px] flex items-center"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className="text-[#111] hover:text-[#22c55e] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            <SearchIcon />
          </button>
          <button onClick={openCart} aria-label={`Shopping bag, ${count} item${count !== 1 ? "s" : ""}`} className="relative text-[#111] hover:text-[#22c55e] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            <BagIcon />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#22c55e] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#111] text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#222] transition-colors min-h-[44px]"
          >
            Download
          </a>
        </div>

        {/* Mobile right actions */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={openCart} aria-label={`Shopping bag, ${count} item${count !== 1 ? "s" : ""}`} className="relative text-[#111] hover:text-[#22c55e] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            <BagIcon />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#22c55e] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="text-[#111] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link}
              href={link === "Shop" ? "/collections/obsidian" : `/#${link.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="uppercase text-sm font-black tracking-widest text-[#111] hover:text-[#22c55e] transition-colors min-h-[44px] flex items-center"
            >
              {link}
            </Link>
          ))}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center bg-[#111] text-white px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#222] transition-colors min-h-[44px]"
          >
            Download App
          </a>
        </div>
      )}
    </header>
    </>
  );
}
