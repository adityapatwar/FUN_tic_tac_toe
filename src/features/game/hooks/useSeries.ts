import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Board, Player, Series } from '../logic/types'
import { initialBoard } from '../logic/types'
import { calculateWinner } from '../logic/winner'

export function useSeries(series: Series) {
  const [history, setHistory] = useState<Board[]>([initialBoard])
  const [currentMove, setCurrentMove] = useState(0)
  const [scores, setScores] = useState({ X: 0, O: 0 })
  const [seriesWins, setSeriesWins] = useState({ X: 0, O: 0 })
  const [startingPlayer, setStartingPlayer] = useState<Player>('X')

  const xIsNext = useMemo(() => currentMove % 2 === 0, [currentMove])
  const currentBoard = history[currentMove]
  const { winner, line } = useMemo(() => calculateWinner(currentBoard), [currentBoard])

  const playMove = useCallback((index: number) => {
    if (winner || currentBoard[index]) return
    const nextBoard = currentBoard.slice()
    nextBoard[index] = xIsNext ? 'X' : 'O'
    const nextHistory = [...history.slice(0, currentMove + 1), nextBoard]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }, [winner, currentBoard, history, currentMove, xIsNext])

  const resetBoard = useCallback((changeStarter = false) => {
    const newStarter: Player = changeStarter ? (startingPlayer === 'X' ? 'O' : 'X') : startingPlayer
    setStartingPlayer(newStarter)
    setHistory([Array(9).fill(null).map(() => null) as Board])
    setCurrentMove(newStarter === 'X' ? 0 : 1)
  }, [startingPlayer])

  const fullReset = useCallback(() => {
    setHistory([initialBoard])
    setCurrentMove(0)
    setScores({ X: 0, O: 0 })
    setSeriesWins({ X: 0, O: 0 })
    setStartingPlayer('X')
  }, [])

  const canUndo = currentMove > 0
  const canRedo = currentMove < history.length - 1
  const undo = useCallback(() => { if (canUndo) setCurrentMove(m => m - 1) }, [canUndo])
  const redo = useCallback(() => { if (canRedo) setCurrentMove(m => m + 1) }, [canRedo])

  useEffect(() => {
    if (winner === 'X') {
      setScores(s => ({ ...s, X: s.X + 1 }))
    } else if (winner === 'O') {
      setScores(s => ({ ...s, O: s.O + 1 }))
    }
  }, [winner])

  useEffect(() => {
    const target = series === 'bestOf3' ? 2 : series === 'bestOf5' ? 3 : 1
    if (series === 'single') return
    if (scores.X >= target) {
      setSeriesWins(w => ({ ...w, X: w.X + 1 }))
      setScores({ X: 0, O: 0 })
      resetBoard(true)
    } else if (scores.O >= target) {
      setSeriesWins(w => ({ ...w, O: w.O + 1 }))
      setScores({ X: 0, O: 0 })
      resetBoard(true)
    }
  }, [scores, series, resetBoard])

  return {
    state: {
      history, currentMove, currentBoard, xIsNext, winner, line,
      scores, seriesWins, startingPlayer,
    },
    actions: { playMove, resetBoard, fullReset, undo, redo, setCurrentMove },
    flags: { canUndo, canRedo, gameDisabled: Boolean(winner) },
    statusText: winner === 'Draw' ? 'Hasil: Seri' : winner ? `Pemenang ronde: ${winner}` : `Giliran: ${ ( (currentMove % 2) === 0 ) ? 'X' : 'O' }`,
  }
}
