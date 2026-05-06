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
            className="font-black text-xl tracking-tighter text-[#111] uppercase min-h-[44px] flex items-center"
          >
            Kinetiq
          </a>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6 justify-center">
              <li>
                <a
                  href="/collections/obsidian"
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#111] transition-colors min-h-[44px] flex items-center"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#111] transition-colors min-h-[44px] flex items-center"
                >
                  App
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#111] transition-colors min-h-[44px] flex items-center"
                >
                  Privacy
                </a>
              </li>
              <li>
                <button
                  onClick={() => setContactOpen(true)}
                  className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#111] transition-colors min-h-[44px] flex items-center"
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
