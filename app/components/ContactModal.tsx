"use client";

import { useState, useEffect } from "react";

interface Props {
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("All fields are required.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} aria-hidden="true" />
      <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
            <span className="text-xs font-black uppercase tracking-widest text-[#111]">Contact</span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-gray-400 hover:text-[#111] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {status === "success" ? (
            <div className="px-7 py-10 flex flex-col items-center gap-3 text-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <p className="text-sm font-black uppercase tracking-wider text-[#111]">Message sent</p>
              <p className="text-xs text-gray-400">We&apos;ll get back to you soon.</p>
              <button onClick={onClose} className="mt-4 text-xs font-black uppercase tracking-widest text-[#111] hover:text-[#22c55e] transition-colors min-h-[44px]">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-semibold">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#111] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-semibold">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#111] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-semibold">Message</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#111] transition-colors resize-none"
                />
              </div>
              {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-[#111] text-white px-6 py-3.5 text-xs font-black uppercase tracking-widest hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
