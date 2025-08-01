export type Player = 'X' | 'O'
export type Cell = Player | null
export type Board = Cell[]
export type Mode = 'PVP' | 'CPU'
export type Series = 'single' | 'bestOf3' | 'bestOf5'

export const initialBoard: Board = Array(9).fill(null)

export const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]
