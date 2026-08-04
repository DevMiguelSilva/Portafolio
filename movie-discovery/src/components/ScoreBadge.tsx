import { formatScore, scoreColor } from '../api/tmdb'

interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

const sizeClasses = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-14 w-14 text-base',
  lg: 'h-20 w-20 text-xl',
}

export function ScoreBadge({ score, size = 'md', showLabel = false }: ScoreBadgeProps) {
  const percentage = Math.round(score * 10)

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`relative flex items-center justify-center rounded-full border-2 border-cinema-gold/40 bg-cinema-900/90 font-bold backdrop-blur ${sizeClasses[size]} ${scoreColor(score)}`}
        title={`TMDB score: ${formatScore(score)}/10`}
      >
        <span>{formatScore(score)}</span>
      </div>
      {showLabel && (
        <span className="text-xs uppercase tracking-wider text-gray-400">
          {percentage}% match
        </span>
      )}
    </div>
  )
}
