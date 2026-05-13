"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

const APP_STORE_URL = "https://apps.apple.com/app/id6759758630";

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 min-h-[44px]"
          >
            <span
              className="w-6 h-6 bg-[#262626] shrink-0"
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
            <span className="font-black text-xl tracking-tighter text-[#262626] uppercase">
              Kinetiq
            </span>
          </a>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6 justify-center">
              <li>
                <a
                  href="/collections/obsidian"
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#262626] transition-colors min-h-[44px] flex items-center"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#262626] transition-colors min-h-[44px] flex items-center"
                >
                  App
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#262626] transition-colors min-h-[44px] flex items-center"
                >
                  Privacy
                </a>
              </li>
              <li>
                <button
                  onClick={() => setContactOpen(true)}
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#262626] transition-colors min-h-[44px] flex items-center"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider">
            © 2026 Kinetiq
          </p>
        </div>
      </footer>
    </>
  );
}
