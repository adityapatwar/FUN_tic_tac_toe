import React from 'react'
import { Swords } from 'lucide-react'

export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div
          className="absolute -inset-1 rounded-2xl blur-lg opacity-60"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 50%, rgba(158,127,255,0.35), rgba(56,189,248,0.15))',
          }}
        />
        <div className="relative rounded-2xl p-2 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 border border-white/10">
          <Swords className="w-6 h-6 text-indigo-300" aria-hidden />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-white font-semibold text-xl tracking-tight">TicTac Pro</span>
        <span className="text-xs text-zinc-400">Play. Think. Triumph.</span>
      </div>
    </div>
  )
}
