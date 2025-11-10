import React, { useState } from 'react';
import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import Dashboard from './components/Dashboard';
import Forecast from './components/Forecast';

// NOTE: Backend endpoints are not wired in this first pass. This UI simulates
// immediate AI feedback locally so you can interact with the experience.

function fakeAIAnalyze({ file, text }) {
  const seed = (file?.size || text?.length || 42) % 100;
  const rand = (n) => Math.floor((Math.sin(seed + n) + 1) * 50);
  return {
    virality: 40 + ((rand(1) + rand(7)) % 60),
    sentiment: 30 + ((rand(2) + rand(8)) % 70),
    readability: 20 + ((rand(3) + rand(9)) % 80),
    impact: 25 + ((rand(4) + rand(10)) % 75),
    trendAlign: 35 + ((rand(5) + rand(11)) % 65),
    tips: [
      'Lead with a bold hook in the first 2 seconds.',
      'Add dynamic captions with kinetic typography.',
      'Use 3-5 hashtags that blend niche + broad keywords.'
    ],
  };
}

function fakeForecast(idea) {
  const score = Math.min(98, 50 + Math.floor(Math.random() * 48));
  const palette = ['#8b5cf6', '#06b6d4', '#f59e0b', '#22c55e'];
  const title = `The Rise of ${idea.replace(/\b\w/g, (m) => m.toUpperCase())}`;
  return { score, palette, title, when: 'in ~3 months' };
}

export default function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [forecast, setForecast] = useState(null);

  const handleSubmit = async ({ file, text }) => {
    // Simulated instant response; swap with backend calls later
    const res = fakeAIAnalyze({ file, text });
    setResult(res);
    setHistory((h) => [{ time: Date.now(), ...res }, ...h].slice(0, 20));
  };

  const handleForecast = async (idea) => {
    const f = fakeForecast(idea);
    setForecast(f);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500" />
            <div>
              <h2 className="text-lg font-bold">AI Content Oracle</h2>
              <p className="text-xs text-white/60">Predict. Enhance. Go Viral.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">Light</button>
            <button className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white">Dark</button>
          </div>
        </header>

        <Hero />
        <UploadZone onSubmit={handleSubmit} />
        <Dashboard result={result} history={history} />
        <Forecast onGenerate={handleForecast} />

        {forecast && (
          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-2">
              <h3 className="mb-2 text-white/90">Mock Viral Thumbnail</h3>
              <div className="relative h-56 w-full overflow-hidden rounded-xl">
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${forecast.palette[0]}, ${forecast.palette[1]})` }} />
                <div className="absolute inset-0 mix-blend-overlay" style={{ background: `radial-gradient(circle at 30% 30%, ${forecast.palette[2]}55, transparent 50%), radial-gradient(circle at 70% 70%, ${forecast.palette[3]}55, transparent 50%)` }} />
                <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-black/40 p-3 text-lg font-bold leading-tight">
                  {forecast.title}
                  <div className="text-xs font-medium text-white/80">Predicted surge {forecast.when}</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="mb-2 text-white/90">Forecast</h3>
              <p className="text-sm text-white/80">Trend-fit score</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500" style={{ width: `${forecast.score}%` }} />
              </div>
              <p className="mt-3 text-sm text-white/80">Suggested title:</p>
              <p className="text-sm font-semibold">{forecast.title}</p>
            </div>
          </section>
        )}

        <footer className="mt-16 text-center text-xs text-white/50">
          Built with neon gradients, glassmorphism, and love.
        </footer>
      </div>
    </div>
  );
}
