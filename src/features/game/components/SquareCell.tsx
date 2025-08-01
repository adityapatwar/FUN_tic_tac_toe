import React, { useEffect, useRef } from 'react'
import { Circle, X as XIcon } from 'lucide-react'
import type { Cell } from '../logic/types'

export function SquareCell({
  value,
  onClick,
  highlight,
  index,
  disabled,
}: {
  value: Cell
  onClick: () => void
  highlight?: boolean
  index: number
  disabled?: boolean
}) {
  const Icon = value === 'X' ? XIcon : value === 'O' ? Circle : null

  // Detect new value to trigger enter animation
  const prev = useRef<Cell>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value && prev.current !== value && iconRef.current) {
      iconRef.current.classList.remove('symbol-enter')
      // Force reflow to restart animation
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      iconRef.current.offsetHeight
      iconRef.current.classList.add('symbol-enter')
    }
    prev.current = value
  }, [value])

  const cellRef = useRef<HTMLButtonElement>(null)
  const handleClick = () => {
    if (disabled || value) {
      // invalid shake feedback
      if (cellRef.current) {
        cellRef.current.classList.remove('shake')
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        cellRef.current.offsetHeight
        cellRef.current.classList.add('shake')
      }
      return
    }
    onClick()
  }

  return (
    <button
      ref={cellRef}
      aria-label={`Cell ${index + 1}${value ? `, ${value}` : ''}`}
      className={[
        'group relative aspect-square rounded-2xl border',
        'flex items-center justify-center',
        'transition-all duration-200 focus:outline-none',
        'cell-hover cell-focus',
        highlight ? 'border-transparent ring-2 ring-emerald-400/60' : 'border-zinc-700 hover:border-zinc-600',
        disabled ? 'opacity-60 cursor-not-allowed' : 'active:translate-y-0',
        'bg-zinc-800/60 backdrop-blur-sm',
      ].join(' ')}
      style={{ boxShadow: highlight ? '0 0 24px rgba(16,185,129,0.25)' : '0 0 0 rgba(0,0,0,0)' }}
      onClick={handleClick}
      disabled={disabled && !value}
    >
      {Icon ? (
        <div ref={iconRef}>
          <Icon
            className={`w-12 h-12 transition-colors ${value === 'X' ? 'text-indigo-300' : 'text-pink-300'}`}
            strokeWidth={2.5}
          />
        </div>
      ) : (
        <div className="w-2 h-2 rounded-full bg-zinc-700 opacity-0 group-hover:opacity-60 transition-opacity" />
      )}
      {highlight && <div className="absolute inset-0 rounded-2xl border border-emerald-400/30 pointer-events-none" />}
    </button>
  )
}
