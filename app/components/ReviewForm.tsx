"use client";

import { useState } from "react";

function StarSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n !== 1 ? "s" : ""}`}
          className="text-2xl leading-none transition-transform hover:scale-110"
          style={{ color: n <= (hovered || value) ? "#111" : "#d1d5db" }}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setErrorMsg("Please select a star rating.");
      return;
    }
    if (name.trim().length === 0) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (text.trim().length < 10) {
      setErrorMsg("Review must be at least 10 characters.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), rating, text: text.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[#f8f8f8] p-7 flex flex-col items-start gap-2">
        <div className="text-2xl">✓</div>
        <p className="text-sm font-black uppercase tracking-wider text-[#111]">
          Thanks for your review
        </p>
        <p className="text-xs text-gray-500">
          Your feedback helps the community.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#f8f8f8] p-7 flex flex-col gap-4">
      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#111]">
        Leave a Review
      </h3>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-semibold">
          Rating
        </label>
        <StarSelector value={rating} onChange={setRating} />
      </div>

      <div>
        <label
          htmlFor="review-name"
          className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-semibold"
        >
          Name
        </label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          placeholder="Your name"
          className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#111] transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="review-text"
          className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-semibold"
        >
          Review
        </label>
        <textarea
          id="review-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
          rows={4}
          placeholder="Tell us about your experience..."
          className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#111] transition-colors resize-none"
        />
      </div>

      {errorMsg && (
        <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-[#111] text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-start"
      >
        {status === "submitting" ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
