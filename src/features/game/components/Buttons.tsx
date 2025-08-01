import React from 'react'

export function ControlButton({
  icon: Icon,
  label,
  onClick,
  tone = 'default',
  disabled,
}: {
  icon: React.ElementType
  label: string
  onClick: () => void
  tone?: 'default' | 'primary' | 'danger' | 'ghost'
  disabled?: boolean
}) {
  const toneClass =
    tone === 'primary'
      ? 'bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30'
      : tone === 'danger'
      ? 'bg-rose-500/20 text-rose-200 hover:bg-rose-500/30'
      : tone === 'ghost'
      ? 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700'
      : 'bg-zinc-800/60 text-zinc-200 hover:bg-zinc-700'
  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-700 transition-colors ${toneClass} disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </button>
  )
}
