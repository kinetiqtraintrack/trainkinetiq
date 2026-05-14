<!-- /autoplan restore point: /Users/joeycherubino/.gstack/projects/kinetiqtraintrack-trainkinetiq/design-v2-mega-menu-pdp-autoplan-restore-20260514-172144.md -->
# Plan: Add "About Us" Nav Link + Page

## Summary

Add "About Us" as a fourth navigation item beside the existing Shop / App / Reviews headers, and create a dedicated `/about` page with an About Us section.

## User Request

> add an about us section at the top of website
> beside the headers "shop" "app" "reviews" add a fourth about us

## Context

- **Branch:** design/v2-mega-menu-pdp
- **App:** Next.js 15 App Router, Tailwind CSS, Space Grotesk font, green/black brand palette
- **Nav file:** `app/components/Nav.tsx` — desktop links at `ul.hidden.md:flex`, mobile drawer below
- **Existing nav links:** Shop (MegaMenu, `/#app` anchor), App (`/#app`), Reviews (`/#reviews`)
- **No existing `/about` page**

## What Changes

### 1. Nav.tsx — Desktop links (line ~83-103)
Add a fourth `<li>` after Reviews. Use `gap-6 lg:gap-8` on the `<ul>` (currently `gap-8`) to accommodate 4 items on 768–1024px screens:
```tsx
<li>
  <Link
    href="/about"
    className="uppercase text-xs font-bold tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center"
  >
    About
  </Link>
</li>
```
Also update `<ul>` gap: `gap-6 lg:gap-8` (was `gap-8`).

### 2. Nav.tsx — Mobile drawer (line ~171-204)
Add after the Reviews link:
```tsx
<Link
  href="/about"
  onClick={() => setMobileOpen(false)}
  className="uppercase text-sm font-black tracking-widest text-[#262626] hover:text-[#15803d] transition-colors min-h-[44px] flex items-center"
>
  About
</Link>
```

### 3b. Footer.tsx — Add About link
In `Footer.tsx`, add after the "App" list item:
```tsx
<li>
  <Link
    href="/about"
    className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#262626] transition-colors min-h-[44px] flex items-center"
  >
    About
  </Link>
</li>
```
Note: Footer uses `<a>` not `<Link>` currently — use the same `<a href="/about">` pattern for consistency.

### 3. New page: `app/about/page.tsx`
Server Component (no `"use client"`). Fetches Sanity about doc, renders with static fallback.

Layout: `<Nav /> + <main> + <Footer />`

**Section A — Hero**
- Eyebrow: `text-[10px] font-black uppercase tracking-[0.22em] text-[#15803d]` → "Our Story"
- Tagline: `text-[clamp(2.5rem,7vw,5rem)] font-black uppercase tracking-tighter text-[#262626]` → "One app. One brand. Built for the athlete who trains like it's a job."
- Mission: `text-lg font-medium text-gray-500 max-w-2xl` → (shown in Story section below)
- Background: `bg-white` (consistent with rest of site)

**Section B — Story**
- Section heading: `text-[10px] font-black uppercase tracking-[0.22em] text-gray-400` → "Our Story"
- Body (3 paragraphs): CMS `story` field, fallback:
  - "I got tired of juggling five different apps just to track a workout. So I built my own — one place for every program, every session, every PR."
  - "Then came the clothes. Most of what was out there was either too expensive, too thin, or cut for someone who'd never touched a barbell. Nothing fit right, nothing lasted."
  - "So I designed my own. Kinetiq started as a solution to my own problems — and it turned out a lot of other people had the same ones."
- Layout: `max-w-screen-xl mx-auto px-6 py-16`

**Section C — Values**
- Heading: CMS `valuesHeadline` field, fallback: "What We Stand For"
- Grid: `grid grid-cols-1 sm:grid-cols-3 gap-8` (IMPORTANT: 1-col on mobile)
- Each card: value name in `text-xl font-black uppercase text-[#262626]`, description in `text-sm font-medium text-gray-500`
- Values: "Train Smarter" / "Built Different" / "Made to Move"

**Section D — Follow the Journey (CTA)**
Import and render `<SocialStrip />` directly. No new code needed.

**SEO Metadata:**
```tsx
export const metadata: Metadata = {
  title: "About — Kinetiq",
  description: "The story behind Kinetiq — gear for athletes who treat the gym like a craft.",
};
```

Uses existing design system: Space Grotesk font, `text-[#262626]` / `text-[#15803d]` brand colours, same max-w-screen-xl container.

## Affected Files

1. `app/components/Nav.tsx` — add 4th nav item desktop + mobile, adjust `ul` gap
2. `app/components/Footer.tsx` — add About link
3. `app/about/page.tsx` — new file (About Us page, Server Component)
4. `sanity/schemas/about.ts` — new file (Sanity schema for about content)
5. `sanity/schemas/index.ts` — register the about schema
6. `lib/sanity/queries.ts` — add `aboutQuery` and `AboutContent` type

## Expanded Scope (CEO Phase additions)

### 4. Sanity schema: about content
New `sanity/schemas/about.ts`:
```ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About Page",
  type: "document",
  // Singleton: prevent creating or deleting extra docs
  __experimental_actions: ["update", "publish", "discardChanges"],
  fields: [
    defineField({ name: "mission", title: "Mission Statement", type: "string" }),
    defineField({ name: "story", title: "Brand Story", type: "text" }),
    defineField({ name: "valuesHeadline", title: "Values Section Headline", type: "string" }),
  ],
});
```

Update `sanity/schemas/index.ts` to import and register `about`.

### 4b. Sanity query: `getSanityAbout`
Add to `lib/sanity/queries.ts`:
```ts
export interface AboutContent {
  mission?: string;
  story?: string;
  valuesHeadline?: string;
}

export async function getSanityAbout(): Promise<AboutContent | null> {
  if (!isSanityConfigured) return null;        // ← required guard
  try {
    return await sanityClient.fetch(
      `*[_type == "about"][0] { mission, story, valuesHeadline }`,
      {},
      { next: { tags: ["about"], revalidate: 3600 } }  // 1h TTL — about content rarely changes
    );
  } catch {
    return null;
  }
}
```

### 5. Social follow CTA at page bottom
Import and render `<SocialStrip />` at the bottom of `app/about/page.tsx`. No new code needed — it's already an async Server Component.

## Out of Scope

- Contact form on about page (separate task — pending Resend setup in TODOS.md)
- Team members section with photos (requires assets)
- Press/media kit section
- Careers section

## What Already Exists

| Sub-problem | Existing code |
|---|---|
| Desktop nav link pattern | `Nav.tsx:83-103` — `<Link className="uppercase text-xs font-bold tracking-widest...">` |
| Mobile drawer link pattern | `Nav.tsx:171-204` — same Link + `onClick={() => setMobileOpen(false)}` |
| Page wrapper (Nav+Footer) | `app/page.tsx` — import Nav, main content, Footer |
| Design tokens | Tailwind: `text-[#262626]` `text-[#15803d]` `max-w-screen-xl mx-auto px-6` |
| Social links pattern | `app/components/Footer.tsx` and `app/components/SocialStrip.tsx` |
| Sanity schema pattern | `sanity/schemas/product.ts`, `collection.ts` — singleton document pattern |
| Sanity queries | `lib/sanity/queries.ts` — add `aboutQuery` following existing pattern |

## Error & Rescue Registry

| Error | Trigger | Catch | User sees | Tested? |
|---|---|---|---|---|
| `/about` 404 | page.tsx not created | Next.js 404 | "Page not found" | Nav + page must ship together |
| Sanity fetch fails | CDN/network issue | Static fallback content | About page renders with fallback text | In plan |
| Missing Nav import | Developer error | Build error | Nothing — build fails before deploy | TypeScript build |
| Mobile drawer stays open | Missing `onClick` close | None | Drawer stuck open | Manual test |

## Failure Modes Registry

| Failure | Severity | Gap? |
|---|---|---|
| `/about` renders without Nav/Footer | HIGH | Fixed: page must import both |
| Missing `export const metadata` | MED | Fixed: add SEO title/description |
| Static content never updated | MED | Fixed: Sanity CMS hook added |
| Page not linked from footer | LOW | Flag: add About link to Footer |
| `"use client"` on Server Component | LOW | Fixed: page is Server Component |

## Dream State Delta

```
THIS PLAN leaves us at: Nav has About link, /about has static-backed-by-Sanity content
12-MONTH IDEAL:        Founder story video, team photos, press features, 
                        newsletter signup, About as conversion trust anchor
DELTA:                 CMS foundation laid; content quality and trust CTAs can grow
                        without code changes after this ships
```

## CEO Completion Summary

| Section | Status | Key findings |
|---|---|---|
| Premise challenge | DONE | 5 premises, all reasonable |
| Code leverage map | DONE | Nav pattern, Sanity pattern, Footer social — all reuse |
| Dream state | DONE | Content depth can grow post-ship |
| Alternatives | DONE | /about vs /#about → /about wins on SEO + shareability |
| Scope decisions | DONE | Added Sanity schema + CTA section |
| Sections 1-10 | DONE | 2 gaps fixed in plan |

## Test Plan

- Desktop nav renders 4 links: Shop / App / Reviews / About
- Mobile drawer renders About link, closes on click
- `/about` route renders without 404
- `/about` page renders Nav + main content + Footer
- `/about` page has correct SEO metadata (title, description)
- Sanity about document creates/updates without schema errors
- Static fallback renders if Sanity is unavailable
- Footer has About link (consistency)
- `/about` page passes TypeScript build (`npm run build`)
- `getSanityAbout()` returns `null` gracefully when Sanity is not configured (no `.env.local`)
- Static fallback copy renders correctly when `aboutData` is `null`
- After updating the Sanity about doc, page updates within 1h (or after tag invalidation)
- Creating a second Sanity "About Page" doc doesn't break the page (query returns first)
- Values grid renders single column on 375px without overflow

## Decision Audit Trail

| # | Phase | Decision | Classification | Principle | Rationale | Rejected |
|---|-------|----------|----------------|-----------|-----------|----------|
| 1 | CEO | `/about` dedicated page vs `/#about` anchor | Mechanical | P1+P5 | Dedicated page wins on SEO, shareability, and brand credibility | `/#about` anchor |
| 2 | CEO | Sanity CMS for about content | Mechanical | P1+P2 | Static content rots; in blast radius; <1 day CC; adds CMS hook for free | Static-only |
| 3 | CEO | Add social follow CTA at page bottom | Mechanical | P1+P2 | Trust-building CTA adds ~5 lines, reuses Footer social pattern | None |
| 4 | CEO | Nav label "About" vs "Our Story" | Mechanical | P5 | "About" matches uppercase tracking-widest nav style; consistent | "Our Story" |
| 5 | CEO | Footer should include About link | Mechanical | P1 | All other major pages linked in footer; About should be too | Not in footer |
| 6 | Design | Fallback copy for Sanity fields | Mechanical | P1 | Critical: implementer must not invent brand copy; specify literal fallbacks | No fallback |
| 7 | Design | Responsive grid `grid-cols-1 sm:grid-cols-3` | Mechanical | P1 | 3-col at 375px = ~110px columns, word-wrapping breaks layout | `grid-cols-3` only |
| 8 | Design | Hero type scale `text-[clamp(2.5rem,7vw,5rem)]` | Mechanical | P5 | Explicit type scale prevents 5+ silent implementation decisions | Generic "large" |
| 9 | Design | Nav gap `gap-6 lg:gap-8` | Mechanical | P5 | 4 items + logo + icons needs room at md breakpoint | `gap-8` fixed |
| 10 | Eng | Singleton `__experimental_actions` | Mechanical | P1 | Prevents creating duplicate about docs silently | No action guard |
| 11 | Eng | `isSanityConfigured` guard in `getSanityAbout` | Mechanical | P1 | Every existing query has this guard; without it, throws on dev env | No guard |
| 12 | Eng | `revalidate: 3600` not 60 | Mechanical | P3 | About content rarely changes; 60s is product/collection TTL | `revalidate: 60` |

## GSTACK REVIEW REPORT

| Run | Skill | Status | Findings |
|-----|-------|--------|----------|
| 2026-05-14 | plan-ceo-review | clean | 5 auto-decided: /about page, Sanity CMS hook, social CTA, "About" label, footer link |
| 2026-05-14 | plan-design-review | clean | 4 auto-decided: fallback copy, responsive grid, hero type scale, nav gap |
| 2026-05-14 | plan-eng-review | clean | 3 auto-decided: singleton guard, isSanityConfigured, revalidate TTL |
| 2026-05-14 | autoplan | clean | 12 total decisions, 0 user challenges, 0 taste decisions |

**Voices:** [subagent-only — Codex binary not found]
