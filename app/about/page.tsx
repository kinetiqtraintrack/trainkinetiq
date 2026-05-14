import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SocialStrip from "../components/SocialStrip";
import { getSanityAbout } from "../../lib/sanity/queries";

export const metadata: Metadata = {
  title: "About — Kinetiq",
  description: "The story behind Kinetiq — one app, one brand, built for the athlete who trains like it's a job.",
};

const FALLBACK_MISSION = "One app. One brand. Built for the athlete who trains like it's a job.";

const FALLBACK_STORY = [
  "I got tired of juggling five different apps just to track a workout — Strava for runs, Runna for run training, Hevy for lifts, Whoop for recovery, Apple Fitness+ for everything else. None of them talked to each other. So I built my own — one place for every program, every session, every PR.",
  "I work construction. I'm also about to have twin boys. Time is not something I have a lot of. So every minute I spent switching between apps, re-entering data, or waiting for a sync felt personal. That frustration is what built this.",
  "Then came the clothes. Most of what was out there was either too expensive, too thin, or cut for someone who'd never touched a barbell. Nothing fit right, nothing lasted. So I designed my own.",
  "Kinetiq started as a solution to my own problems — built on nights and weekends, whether that's 5am before a shift or 9pm after one. Turns out a lot of other people had the same ones.",
];

const FALLBACK_VALUES_HEADLINE = "What We Stand For";

const VALUES = [
  {
    name: "Train Smarter",
    description: "One app, everything in it. No more fragmented stack — your training, recovery, sleep, and gear all in one place.",
  },
  {
    name: "Built Different",
    description: "Gear designed by athletes, not marketing teams. Fits real bodies, lasts real training.",
  },
  {
    name: "Made to Move",
    description: "Every piece engineered for the gym floor, not the photo shoot. Built for the person training at 5am or 9pm — not for the highlight reel.",
  },
];

export default async function AboutPage() {
  const about = await getSanityAbout();

  const mission = about?.mission ?? FALLBACK_MISSION;
  const storyParagraphs = about?.story
    ? about.story.split("\n").filter(Boolean)
    : FALLBACK_STORY;
  const valuesHeadline = about?.valuesHeadline ?? FALLBACK_VALUES_HEADLINE;

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-white">
          <div className="max-w-screen-xl mx-auto px-6 py-20 md:py-28">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#15803d] mb-4">
              Our Story
            </p>
            <h1
              className="font-black uppercase tracking-tighter text-[#262626] mb-0"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1.05 }}
            >
              {mission}
            </h1>
          </div>
        </section>

        {/* The Origin */}
        <section className="bg-[#f8f8f8]">
          <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400 mb-6">
              The Origin
            </p>
            <div className="max-w-2xl space-y-5">
              {storyParagraphs.map((para, i) => (
                <p key={i} className="text-base font-medium text-[#262626] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* The Community */}
        <section className="bg-white">
          <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400 mb-6">
              The Community
            </p>
            <div className="max-w-2xl">
              <h2
                className="font-black uppercase tracking-tighter text-[#262626] mb-6"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.1 }}
              >
                Built for people who actually show up.
              </h2>
              <p className="text-base font-medium text-[#262626] leading-relaxed">
                Whether you&apos;re in the gym before the sun comes up or squeezing in a session after a full day — Kinetiq is for you. Early users get all Pro features free until v2.0 launches. After that, you&apos;re grandfathered in for good. Get in before it changes.
              </p>
            </div>
          </div>
        </section>

        {/* What We Stand For */}
        <section className="bg-[#f8f8f8]">
          <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400 mb-10">
              {valuesHeadline}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {VALUES.map((value) => (
                <div key={value.name} className="border-t-2 border-[#262626] pt-6">
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#262626] mb-3">
                    {value.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Follow the Journey */}
        <SocialStrip />
      </main>
      <Footer />
    </>
  );
}
