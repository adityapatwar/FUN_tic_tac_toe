import type { Board, Player, WIN_LINES } from './types'
import { WIN_LINES as LINES } from './types'

export function calculateWinner(
  board: Board | undefined | null
): { winner: Player | 'Draw' | null; line: number[] | null } {
  // Guard against invalid board
  if (!Array.isArray(board) || board.length !== 9) {
    return { winner: null, line: null }
  }

  for (const [a, b, c] of LINES as typeof WIN_LINES) {
    const va = board[a]
    const vb = board[b]
    const vc = board[c]
    if (va && va === vb && va === vc) {
      return { winner: va, line: [a, b, c] }
    }
  }

  // Draw if all cells are filled and no winner
  if (board.every(cell => Boolean(cell))) {
    return { winner: 'Draw', line: null }
  }

  return { winner: null, line: null }
}
