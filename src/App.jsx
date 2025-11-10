import React, { useMemo, useState } from 'react';
import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import Dashboard from './components/Dashboard';
import Forecast from './components/Forecast';

// Fake analysis logic for instant UX. Later, connect to backend endpoints.
function analyzeLocally({ file, text }) {
  const baseText = (text || '').toLowerCase();
  const mediaBoost = file ? (file.type?.startsWith('video/') ? 15 : file.type?.startsWith('image/') ? 8 : 5) : 0;
  const words = baseText.split(/\s+/).filter(Boolean);
  const lengthScore = Math.min(100, Math.max(20, 120 - Math.abs(words.length - 40)));
  const sentimentBoost = /(love|amazing|wow|insane|breakthrough|secret|free|new|ultimate)/.test(baseText) ? 12 : 0;

  const virality = Math.min(100, Math.round(55 + mediaBoost + sentimentBoost + (Math.random() * 20 - 10)));
  const sentiment = Math.min(100, Math.max(10, Math.round(50 + sentimentBoost + (Math.random() * 30 - 15))));
  const readability = Math.min(100, Math.round((lengthScore + 20 + Math.random() * 20)) / 2);
  const impact = Math.min(100, Math.round((virality * 0.5 + sentiment * 0.3 + readability * 0.2)));

  const tips = [
    'Lead with a 2–3 word hook in the first second.',
    'Use a curiosity gap: promise value, reveal later.',
    'Add subtitles with bold keywords for skimmers.',
    'Keep cuts under 1.5s for short‑form pace.',
    'End with a direct, single‑action CTA.',
  ];

  const hashtags = [
    '#AI', '#CreatorEconomy', '#ViralTips', '#Marketing', '#FYP', '#Shorts', '#Reels', '#ContentStrategy', '#Growth', '#Trends'
  ];

  const solution = `Suggested fix: Tighten your hook to one bold claim, front‑load payoff within 5 seconds, and pair it with a clean, high‑contrast thumbnail. Use on‑screen text for the main promise and remove filler words to boost retention.`;

  const preview = {
    caption: baseText
      ? `${text.trim()} — Unlock the secret in 30s. Save for later.`
      : 'This will change how you think about AI in 30 seconds. Save for later.',
    hook: 'Stop scrolling: the 15‑second AI shortcut every creator needs',
  };

  return { virality, sentiment, readability, impact, tips, hashtags, solution, preview };
}

function forecastLocally(idea) {
  const vibe = idea?.trim() || 'AI that edits while you sleep';
  const score = Math.min(100, Math.max(20, Math.round(70 + Math.random() * 25)));
  return {
    idea: vibe,
    projection: score,
    caption: `${vibe} — built for speed. Would you try this?`,
    hook: `The next wave: ${vibe}`,
  };
}

export default function App() {
  const [result, setResult] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState([]);

  const onAnalyze = (payload) => {
    const r = analyzeLocally(payload);
    setResult(r);
    setHistory((h) => [{ time: new Date().toLocaleTimeString(), ...r }, ...h].slice(0, 10));
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const onForecast = (idea) => {
    const f = forecastLocally(idea);
    setForecast(f);
  };

  const header = useMemo(() => (
    <header className="flex items-center justify-between py-5">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500" />
        <span className="text-white font-semibold">AI Content Oracle</span>
      </div>
      <nav className="hidden md:flex items-center gap-5 text-white/70 text-sm">
        <a href="#" className="hover:text-white">Home</a>
        <a href="#forecast" className="hover:text-white">Forecast</a>
        <a href="#how" className="hover:text-white">How it works</a>
      </nav>
    </header>
  ), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-black text-white selection:bg-fuchsia-500/30 selection:text-white">
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-8 space-y-8">
        {header}
        <Hero onGetStarted={() => document.getElementById('uploader')?.scrollIntoView({ behavior: 'smooth' })} />

        <section id="uploader" className="space-y-4">
          <h2 className="text-lg font-semibold text-white/90">Analyze your content</h2>
          <UploadZone onAnalyze={onAnalyze} />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-white/90">Your insights</h2>
          <Dashboard result={result} />
        </section>

        <section className="space-y-4">
          <Forecast onForecast={onForecast} />
          {forecast ? (
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <div className="text-white/80">Projected traction</div>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500" style={{ width: `${forecast.projection}%` }} />
                </div>
                <span className="text-white font-semibold">{forecast.projection}%</span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-white/70">Forecast Caption</p>
                  <p className="mt-2 text-white">{forecast.caption}</p>
                </div>
                <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-white/70">Forecast Hook</p>
                  <p className="mt-2 text-white">{forecast.hook}</p>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section id="how" className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
          We analyze hooks, sentiment cues, pacing, and clarity to estimate reach and give you concrete adjustments. Connect your real model later for production‑grade insights.
        </section>

        <footer className="py-10 text-center text-white/50">
          <p>Made with ⚡ by your AI Content Oracle</p>
        </footer>
      </main>
    </div>
  );
}
