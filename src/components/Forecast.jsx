import React, { useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';

export default function Forecast({ onForecast }) {
  const [idea, setIdea] = useState('');

  return (
    <section id="forecast" className="rounded-2xl border border-white/15 bg-white/5 p-6">
      <div className="flex items-center gap-2 text-white/80">
        <Sparkles className="h-5 w-5 text-fuchsia-300" />
        <h3 className="font-semibold">Future Forecast</h3>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your next big idea…"
          className="w-full rounded-xl bg-black/40 px-4 py-3 text-white placeholder-white/40 ring-1 ring-white/10 outline-none"
        />
        <button
          onClick={() => onForecast(idea)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-5 py-3 text-white shadow-lg shadow-fuchsia-500/20 hover:brightness-110"
        >
          <Wand2 className="h-4 w-4" /> Predict
        </button>
      </div>
    </section>
  );
}
