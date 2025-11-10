import React from 'react';
import { Flame, TrendingUp, ThumbsUp, Gauge } from 'lucide-react';

function Meter({ label, value, colorFrom, colorTo }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/70">{label}</span>
        <span className="text-sm font-semibold text-white">{value}%</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard({ result }) {
  if (!result) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center text-white/70">
        Upload something and run Analyze to see predictions.
      </div>
    );
  }

  const { virality, sentiment, readability, impact, tips, hashtags, solution } = result;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Meter label="Virality" value={virality} colorFrom="#f0abfc" colorTo="#22d3ee" />
        <Meter label="Sentiment" value={sentiment} colorFrom="#34d399" colorTo="#22c55e" />
        <Meter label="Readability" value={readability} colorFrom="#a78bfa" colorTo="#60a5fa" />
        <Meter label="Impact" value={impact} colorFrom="#fb7185" colorTo="#f472b6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-white/80">
            <Flame className="h-5 w-5 text-fuchsia-300" />
            <h3 className="font-semibold">Actionable Solution</h3>
          </div>
          <p className="mt-3 text-sm text-white/80 leading-relaxed">{solution}</p>
          <div className="mt-4 grid gap-2">
            {tips.map((t, i) => (
              <div key={i} className="rounded-xl bg-black/30 px-3 py-2 text-sm text-white/80 ring-1 ring-white/10">
                • {t}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-white/80">
            <TrendingUp className="h-5 w-5 text-cyan-300" />
            <h3 className="font-semibold">Trending Hashtags</h3>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {hashtags.map((h, i) => (
              <span key={i} className="rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 px-3 py-1 text-xs text-white ring-1 ring-white/10">{h}</span>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-black/30 p-3 text-xs text-white/60 ring-1 ring-white/10">
            Tip: Mix broad tags with 2–3 niche tags for better discovery.
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5">
        <div className="flex items-center gap-2 text-white/80">
          <Gauge className="h-5 w-5 text-violet-300" />
          <h3 className="font-semibold">Preview</h3>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
            <p className="text-sm text-white/70">Caption Preview</p>
            <p className="mt-2 text-white">{result.preview.caption}</p>
          </div>
          <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
            <p className="text-sm text-white/70">Thumbnail/Hook Preview</p>
            <p className="mt-2 text-white">{result.preview.hook}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
