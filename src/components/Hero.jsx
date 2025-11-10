import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Sparkles } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-2xl bg-black/60 ring-1 ring-white/10 shadow-2xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/0mJk5q1l3dCv7B9D/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft glow overlays that don't block Spline interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
      <div className="pointer-events-none absolute -inset-x-10 -top-20 h-60 bg-gradient-to-r from-fuchsia-500/30 via-cyan-400/20 to-violet-500/30 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
          <span>AI Content Oracle</span>
        </div>
        <h1 className="mt-5 max-w-3xl text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Predict. Improve. Go Viral.
        </h1>
        <p className="mt-4 max-w-2xl text-sm md:text-base text-white/80">
          Upload content or paste a script. Get virality scores, instant fixes, trending tips, and battle‑tested hashtags.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/20 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50"
          >
            <Rocket className="h-4 w-4" />
            Get Started
          </button>
          <a
            href="#forecast"
            className="rounded-xl bg-white/10 px-5 py-3 text-sm font-medium text-white/90 ring-1 ring-white/15 hover:bg-white/15"
          >
            Future Forecast
          </a>
        </div>
      </div>
    </section>
  );
}
