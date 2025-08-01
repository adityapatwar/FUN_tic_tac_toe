import React, { useEffect, useState, useMemo, useRef } from 'react'
import type { Mode, Series } from '../logic/types'
import { getBestMove } from '../logic/ai'
import { Header } from '../components/Header'
import { SquareCell } from '../components/SquareCell'
import { ControlButton } from '../components/Buttons'
import { ScoreBadge } from '../components/ScoreBadge'
import { Brain, History, RefreshCcw, Trophy, Undo2, Redo2 } from 'lucide-react'
import { useSeries } from '../hooks/useSeries'
import { WinLine } from '../components/WinLine'

export function GamePage() {
  const [mode, setMode] = useState<Mode>('PVP')
  const [series, setSeries] = useState<Series>('single')
  const [boardAnim, setBoardAnim] = useState<'idle'|'fade-out'|'fade-in'>('idle')

  const { state, actions, flags, statusText } = useSeries(series)
  const { currentBoard, winner, line, scores, seriesWins, xIsNext } = state
  const { playMove, resetBoard, fullReset, undo, redo, setCurrentMove } = actions
  const { canUndo, canRedo, gameDisabled } = flags

  const safeBoard = useMemo(() => (Array.isArray(currentBoard) ? currentBoard : []), [currentBoard])
  const safeHistory = useMemo(() => (Array.isArray(state.history) ? state.history : []), [state.history])

  const moves = useMemo(
    () =>
      safeHistory.map((_, move) => ({
        move,
        desc: move === 0 ? 'Mulai' : `Langkah #${move}`,
      })),
    [safeHistory]
  )

  // CPU turn
  useEffect(() => {
    const isCPU = mode === 'CPU'
    if (!isCPU) return
    if (winner) return

    const cpu: 'O' = 'O'
    const currentPlayer: 'X' | 'O' = xIsNext ? 'X' : 'O'
    if (currentPlayer !== cpu) return

    if (!Array.isArray(safeBoard) || safeBoard.length !== 9) return
    const move = getBestMove(safeBoard as typeof currentBoard, cpu, 'X')
    if (move >= 0) {
      const id = setTimeout(() => playMove(move), 280)
      return () => clearTimeout(id)
    }
  }, [mode, safeBoard, xIsNext, winner, playMove])

  // Animated reset handler
  const handleRematch = useRef<() => void>()
  handleRematch.current = () => {
    setBoardAnim('fade-out')
    window.setTimeout(() => {
      resetBoard(true)
      setBoardAnim('fade-in')
      window.setTimeout(() => setBoardAnim('idle'), 240)
    }, 200)
  }

  const gridAnimClass =
    boardAnim === 'fade-out' ? 'board-fade-out'
    : boardAnim === 'fade-in' ? 'board-fade-in'
    : ''

  return (
    <>
      <Header mode={mode} setMode={setMode} series={series} setSeries={setSeries} />

      <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="relative rounded-3xl border border-zinc-800 p-6 bg-zinc-900/40 backdrop-blur-md overflow-hidden">
            <div
              className="absolute -inset-10 opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(60% 60% at 70% 20%, rgba(158,127,255,0.2), transparent 55%)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/60 text-sm text-zinc-200">
                    {mode === 'CPU' ? (
                      <span className="inline-flex items-center gap-1"><Brain className="w-4 h-4" /> vs CPU</span>
                    ) : (
                      <span className="inline-flex items-center gap-1">PvP</span>
                    )}
                  </div>
                  <div className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/60 text-sm text-zinc-200">
                    {series === 'single' ? 'Single Match' : series === 'bestOf3' ? 'Best of 3' : 'Best of 5'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ControlButton icon={Undo2} label="Undo" onClick={undo} disabled={!canUndo} tone="ghost" />
                  <ControlButton icon={Redo2} label="Redo" onClick={redo} disabled={!canRedo} tone="ghost" />
                  <ControlButton
                    icon={RefreshCcw}
                    label="Rematch"
                    onClick={() => handleRematch.current?.()}
                    tone="primary"
                  />
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-zinc-300">{statusText}</div>
                <div className="flex items-center gap-2">
                  <ScoreBadge label="X Rounds" score={scores.X} tone="indigo" />
                  <ScoreBadge label="O Rounds" score={scores.O} tone="pink" />
                  <ScoreBadge label="Series X" score={seriesWins.X} />
                  <ScoreBadge label="Series O" score={seriesWins.O} />
                </div>
              </div>

              <div className={`relative ${gridAnimClass}`}>
                <div className="grid grid-cols-3 gap-3 sm:gap-4" role="grid" aria-label="Tic Tac Toe Board">
                  {Array.isArray(safeBoard) && safeBoard.length === 9 ? (
                    safeBoard.map((cell, idx) => (
                      <SquareCell
                        key={idx}
                        value={cell}
                        index={idx}
                        onClick={() => playMove(idx)}
                        highlight={line?.includes(idx)}
                        disabled={gameDisabled || Boolean(cell) || (mode === 'CPU' && !xIsNext)}
                      />
                    ))
                  ) : (
                    <div className="p-4 rounded-2xl border border-zinc-700 bg-zinc-800/60 text-zinc-300">
                      Memuat papan...
                    </div>
                  )}
                </div>
                {line && <WinLine line={line} />}
              </div>

              {winner && (
                <div className="mt-5 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 flex items-center justify-between notif-enter">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">
                      {winner === 'Draw'
                        ? 'Seri! Permainan berakhir imbang.'
                        : `Selamat ${winner}! Kamu menang ronde ini.`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ControlButton icon={RefreshCcw} label="Main Lagi" onClick={() => handleRematch.current?.()} tone="primary" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="rounded-3xl border border-zinc-800 p-6 bg-zinc-900/40 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-zinc-300" />
                <h2 className="text-lg font-semibold">Riwayat Langkah</h2>
              </div>
              <ControlButton icon={RefreshCcw} label="Reset Semua" onClick={fullReset} tone="danger" />
            </div>
            <ul className="space-y-2 max-h-[320px] overflow-auto pr-1">
              {moves.map(({ move, desc }) => (
                <li key={move}>
                  <button
                    onClick={() => setCurrentMove(move)}
                    className={`w-full text-left px-3 py-2 rounded-xl border transition-colors ${
                      move === state.currentMove
                        ? 'border-indigo-400/40 bg-indigo-500/10 text-indigo-100'
                        : 'border-zinc-700 bg-zinc-800/40 text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    {desc}
                  </button>
                </li>
              ))}
              {moves.length === 0 && (
                <li className="text-sm text-zinc-400 px-3 py-2">Belum ada langkah.</li>
              )}
            </ul>

            <div className="mt-6 space-y-3">
              <h3 className="text-sm text-zinc-400">Legend</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-800/50">
                  X <span className="text-sm text-zinc-300">Player X</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-800/50">
                  O <span className="text-sm text-zinc-300">Player O</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-800/50">
                  🏆 <span className="text-sm text-zinc-300">Menang</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-zinc-800 p-6 bg-zinc-900/40 backdrop-blur-md">
            <h2 className="text-lg font-semibold mb-3">Tips</h2>
            <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside">
              <li>Kuasai center untuk kontrol maksimal.</li>
              <li>Blokir ancaman dua arah lawan.</li>
              <li>Gunakan undo/redo untuk belajar pola.</li>
            </ul>
          </div>
        </aside>
      </main>
    </>
  )
}
