import React from 'react';
import { Gauge, Activity, TrendingUp, Clock } from 'lucide-react';

function Meter({ label, value, colorFrom, colorTo }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/80">{label}</span>
        <span className="text-sm font-semibold text-white">{pct}%</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard({ result, history }) {
  const safe = result || { virality: 0, sentiment: 0, readability: 0, impact: 0 };
  const items = history || [];

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-3" aria-label="Interactive Dashboard">
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2 text-white">
            <Gauge className="h-5 w-5 text-cyan-300" />
            <h3 className="font-semibold">Virality & Sentiment</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Meter label="Virality Score" value={safe.virality} colorFrom="#8b5cf6" colorTo="#06b6d4" />
            <Meter label="Sentiment" value={safe.sentiment} colorFrom="#f59e0b" colorTo="#22c55e" />
            <Meter label="Readability" value={safe.readability} colorFrom="#06b6d4" colorTo="#a78bfa" />
            <Meter label="Listener Impact" value={safe.impact} colorFrom="#ef4444" colorTo="#f59e0b" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2 text-white">
            <Activity className="h-5 w-5 text-fuchsia-300" />
            <h3 className="font-semibold">Sentiment Heatmap</h3>
          </div>
          <div className="grid grid-cols-12 gap-2">
            {new Array(48).fill(0).map((_, i) => {
              const v = items[i]?.sentiment ?? Math.floor(Math.random() * 100);
              const hue = 200 + Math.floor((v / 100) * 140); // cool to warm
              return (
                <div key={i} className="aspect-square w-full rounded-md" style={{ backgroundColor: `hsl(${hue} 85% 55% / 0.7)` }} />
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2 text-white">
            <TrendingUp className="h-5 w-5 text-emerald-300" />
            <h3 className="font-semibold">Trend Sync</h3>
          </div>
          <p className="text-sm text-white/80">Live trend alignment: {safe.trendAlign ?? Math.floor(40 + Math.random() * 60)}%</p>
          <div className="mt-3 h-28 w-full rounded-xl bg-gradient-to-br from-fuchsia-500/20 via-cyan-400/20 to-emerald-400/20" />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2 text-white">
            <Clock className="h-5 w-5 text-amber-300" />
            <h3 className="font-semibold">History</h3>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {items.length === 0 && (
              <p className="text-sm text-white/60">No history yet. Upload content to see your creative trail.</p>
            )}
            {items.map((h, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="flex items-center gap-2 text-white/90">
                  <span className="text-xs text-white/60">{new Date(h.time).toLocaleTimeString()}</span>
                </div>
                <div className="text-xs text-white/80">Viral {h.virality}% · Sent {h.sentiment}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
