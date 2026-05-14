"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";
import MegaMenu from "./MegaMenu";

const APP_STORE_URL = "https://apps.apple.com/app/id6759758630";

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
          {/* Brand lockup — K mark + wordmark */}
          <Link href="/" className="inline-flex items-center gap-2.5 min-h-[44px]">
            <span
              className="w-7 h-7 bg-[#262626] shrink-0"
              style={{
                WebkitMaskImage: "url('/logo-white.png')",
                WebkitMaskSize: "contain",
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                maskImage: "url('/logo-white.png')",
                maskSize: "contain",
                maskPosition: "center",
                maskRepeat: "no-repeat",
              }}
              aria-hidden="true"
            />
            <span className="font-black text-[22px] tracking-tighter text-[#262626] uppercase">
              Kinetiq
            </span>
          </Link>

          {/* Desktop center links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            <li>
              <MegaMenu label="Shop" />
            </li>
            <li>
              <Link
                href="/#app"
                className="uppercase text-xs font-bold tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center"
              >
                App
              </Link>
            </li>
            <li>
              <Link
                href="/#reviews"
                className="uppercase text-xs font-bold tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center"
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="uppercase text-xs font-bold tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center"
              >
                About
              </Link>
            </li>
          </ul>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <SearchIcon />
            </button>
            <button
              onClick={openCart}
              aria-label={`Shopping bag, ${count} item${count !== 1 ? "s" : ""}`}
              className="relative text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <BagIcon />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none" style={{ background: "linear-gradient(135deg, #15803d 0%, #65a30d 100%)" }}>
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-[8px] min-h-[44px] transition-all"
              style={{ background: "linear-gradient(135deg, #15803d 0%, #65a30d 100%)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "linear-gradient(135deg, #166534 0%, #4d7c0f 100%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "linear-gradient(135deg, #15803d 0%, #65a30d 100%)";
              }}
            >
              Download
            </a>
          </div>

          {/* Mobile right actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={openCart}
              aria-label={`Shopping bag, ${count} item${count !== 1 ? "s" : ""}`}
              className="relative text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <BagIcon />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none" style={{ background: "linear-gradient(135deg, #15803d 0%, #65a30d 100%)" }}>
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="text-[#262626] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
            <Link
              href="/collections/obsidian"
              onClick={() => setMobileOpen(false)}
              className="uppercase text-sm font-black tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center"
            >
              Shop
            </Link>
            <Link
              href="/#app"
              onClick={() => setMobileOpen(false)}
              className="uppercase text-sm font-black tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center"
            >
              App
            </Link>
            <Link
              href="/#reviews"
              onClick={() => setMobileOpen(false)}
              className="uppercase text-sm font-black tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center"
            >
              Reviews
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="uppercase text-sm font-black tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center"
            >
              About
            </Link>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center text-white px-5 py-3 text-xs font-black uppercase tracking-widest rounded-[8px] min-h-[44px] transition-all"
              style={{ background: "linear-gradient(135deg, #15803d 0%, #65a30d 100%)" }}
            >
              Download App
            </a>
          </div>
        )}
      </header>
    </>
  );
}
