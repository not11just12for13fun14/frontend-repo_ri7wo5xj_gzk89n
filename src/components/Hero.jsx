import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute -top-16 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/25 blur-2xl" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium text-white backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-amber-300" />
          Multi‑Modal Predictions
        </div>
        <h1 className="mt-4 bg-gradient-to-br from-white via-violet-200 to-cyan-200 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          AI Content Oracle
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-white/85">
          Upload images, videos, audio, text or PDFs. Get instant predictions on virality, sentiment, and success — wrapped in a futuristic, neon UI.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#uploader"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:shadow-cyan-500/30"
          >
            <Rocket className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            Start Predicting
          </a>
          <a
            href="#forecast"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-md hover:bg-white/20"
          >
            Future Forecast
          </a>
        </div>
      </div>
    </section>
  );
}
