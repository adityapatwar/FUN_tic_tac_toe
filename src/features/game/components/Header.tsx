import React from 'react'
import { Brain, Trophy, Users, Bot, Menu } from 'lucide-react'
import type { Mode, Series } from '../logic/types'
import { Brand } from './Brand'

export function Header({
  mode,
  setMode,
  series,
  setSeries,
}: {
  mode: Mode
  setMode: (m: Mode) => void
  series: Series
  setSeries: (s: Series) => void
}) {
  const isCPU = mode === 'CPU'
  return (
    <header className="w-full">
      <div className="flex items-center justify-between">
        <Brand />
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 mr-2">
            <span className="text-xs text-zinc-400">Mode</span>
            <div className="flex rounded-xl overflow-hidden border border-zinc-700">
              <button
                className={`px-3 py-2 text-sm transition-colors ${mode==='PVP' ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:bg-zinc-800/60'}`}
                onClick={() => setMode('PVP')}
              >
                <Users className="inline w-4 h-4 mr-1" /> PvP
              </button>
              <button
                className={`px-3 py-2 text-sm transition-colors ${isCPU ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:bg-zinc-800/60'}`}
                onClick={() => setMode('CPU')}
              >
                <Bot className="inline w-4 h-4 mr-1" /> CPU
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-zinc-400">Series</span>
            <div className="flex rounded-xl overflow-hidden border border-zinc-700">
              {(['single','bestOf3','bestOf5'] as Series[]).map(s => (
                <button
                  key={s}
                  className={`px-3 py-2 text-sm transition-colors ${series===s ? 'bg-zinc-800 text-white' : 'text-zinc-300 hover:bg-zinc-800/60'}`}
                  onClick={() => setSeries(s)}
                >
                  {s==='single' ? 'Single' : s==='bestOf3' ? 'Best of 3' : 'Best of 5'}
                </button>
              ))}
            </div>
          </div>
          <button className="sm:hidden p-2 rounded-lg border border-zinc-700 bg-zinc-800/60 text-zinc-300" aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mt-6 relative overflow-hidden rounded-2xl border border-zinc-800 bg-[radial-gradient(circle_at_20%_20%,rgba(158,127,255,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.18),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">Strategic Tic Tac Toe</h1>
            <p className="text-zinc-300 mt-1">Fast. Beautiful. Competitive.</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="turn-badge px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/60 text-sm text-zinc-200" data-active={mode==='PVP'}>
                PvP
              </span>
              <span className="turn-badge px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/60 text-sm text-zinc-200" data-active={isCPU}>
                vs CPU
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div
                className="absolute -inset-4 blur-2xl opacity-50"
                style={{
                  background:
                    'conic-gradient(from 180deg at 50% 50%, rgba(158,127,255,0.3), rgba(56,189,248,0.2), rgba(244,114,182,0.2), rgba(158,127,255,0.3))',
                }}
              />
              <div className="relative px-5 py-3 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-md text-sm text-zinc-200">
                <span className="inline-flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-300" />
                  Designed for champions
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="sr-only" aria-live="polite">
          {mode === 'CPU' ? 'Mode CPU aktif' : 'Mode Player vs Player aktif'}
        </div>
      </div>
    </header>
  )
}
