import type { Board, Player } from './types'
import { calculateWinner } from './winner'

export function getBestMove(board: Board, ai: Player, human: Player): number {
  // Try to win
  for (let i=0;i<9;i++){
    if (!board[i]) {
      const copy = board.slice()
      copy[i] = ai
      if (calculateWinner(copy).winner === ai) return i
    }
  }
  // Block human win
  for (let i=0;i<9;i++){
    if (!board[i]) {
      const copy = board.slice()
      copy[i] = human
      if (calculateWinner(copy).winner === human) return i
    }
  }
  // Take center
  if (!board[4]) return 4
  // Take corners
  const corners = [0,2,6,8].filter(i => !board[i])
  if (corners.length) return corners[Math.floor(Math.random()*corners.length)]
  // Take sides
  const sides = [1,3,5,7].filter(i => !board[i])
  if (sides.length) return sides[Math.floor(Math.random()*sides.length)]
  return -1
}
