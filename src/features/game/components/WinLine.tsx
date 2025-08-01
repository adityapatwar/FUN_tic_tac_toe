import React, { useMemo } from 'react'

export function WinLine({
  line,
}: {
  line: number[] | undefined
}) {
  // Map line indices to orientation and position
  // Board index layout:
  // 0 1 2
  // 3 4 5
  // 6 7 8
  const config = useMemo(() => {
    if (!line || line.length !== 3) return null
    const [a, , c] = line
    // Rows
    if (line.join(',') === '0,1,2') return { top: '16.66%', left: '0%', right: '0%', rotate: 0 }
    if (line.join(',') === '3,4,5') return { top: '50%', left: '0%', right: '0%', rotate: 0 }
    if (line.join(',') === '6,7,8') return { top: '83.33%', left: '0%', right: '0%', rotate: 0 }
    // Cols
    if (line.join(',') === '0,3,6') return { top: '0%', left: '16.66%', bottom: '0%', rotate: 90 }
    if (line.join(',') === '1,4,7') return { top: '0%', left: '50%', bottom: '0%', rotate: 90 }
    if (line.join(',') === '2,5,8') return { top: '0%', left: '83.33%', bottom: '0%', rotate: 90 }
    // Diagonals
    if (line.join(',') === '0,4,8') return { top: '50%', left: '50%', rotate: 45, diag: true }
    if (line.join(',') === '2,4,6') return { top: '50%', left: '50%', rotate: -45, diag: true }
    return null
  }, [line])

  if (!config) return null

  const style: React.CSSProperties = config.diag
    ? { position: 'absolute', inset: 0 }
    : { position: 'absolute', inset: 0 }

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* For rows/cols we stretch across the board using scaleX */}
      {!config.diag ? (
        <div
          className="win-line"
          style={{
            position: 'absolute',
            top: config.top,
            left: config.left,
            right: config.right,
            bottom: config.bottom,
            transform: `rotate(${config.rotate}deg) scaleX(0)`,
          }}
        />
      ) : (
        <div
          className="win-line"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '140%', // diagonal longer
            transform: `translate(-50%,-50%) rotate(${config.rotate}deg) scaleX(0)`,
          }}
        />
      )}
    </div>
  )
}
