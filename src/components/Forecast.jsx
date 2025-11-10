import React, { useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';

export default function Forecast({ onGenerate }) {
  const [idea, setIdea] = useState('a video about AI fashion robots');

  const handle = (e) => {
    e.preventDefault();
    if (!idea.trim()) return;
    onGenerate(idea);
  };

  return (
    <section id="forecast" className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-white">
        <Sparkles className="h-5 w-5 text-amber-300" />
        <h3 className="font-semibold">Future Forecast</h3>
      </div>
      <form onSubmit={handle} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your next big idea..."
          className="flex-1 rounded-xl border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
        />
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          <Wand2 className="h-4 w-4" /> Predict 3-Month Success
        </button>
      </form>
      <p className="mt-2 text-xs text-white/60">Generates a mock viral title, thumbnail color palette, and trend-fit score.</p>
    </section>
  );
}
