import type { Board, Player, WIN_LINES } from './types'
import { WIN_LINES as LINES } from './types'

export function calculateWinner(board: Board): { winner: Player | 'Draw' | null, line: number[] | null } {
  for (const [a,b,c] of LINES as typeof WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a]!, line: [a,b,c] }
    }
  }
  if (board.every(Boolean)) {
    return { winner: 'Draw', line: null }
  }
  return { winner: null, line: null }
}
