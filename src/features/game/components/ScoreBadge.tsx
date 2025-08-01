import React from 'react'

export function ScoreBadge({ label, score, tone='default' }: { label: string; score: number; tone?: 'default'|'indigo'|'pink'|'emerald' }) {
  const map = {
    default: 'bg-zinc-800/60 text-zinc-200',
    indigo: 'bg-indigo-500/20 text-indigo-200',
    pink: 'bg-pink-500/20 text-pink-200',
    emerald: 'bg-emerald-500/20 text-emerald-200',
  } as const
  return (
    <div className={`px-3 py-2 rounded-xl border border-zinc-700 ${map[tone]}`}>
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="text-lg font-semibold">{score}</div>
    </div>
  )
}
