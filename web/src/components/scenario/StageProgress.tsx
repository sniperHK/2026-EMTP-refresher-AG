import type { Stage } from '@/data/types'
import { cn } from '@/lib/utils'

interface StageProgressProps {
  stages: Stage[]
  currentIndex: number
  onStageClick: (index: number) => void
  accentColor?: string
  className?: string
}

export function StageProgress({
  stages,
  currentIndex,
  onStageClick,
  accentColor = 'var(--medical-blue)',
  className,
}: StageProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Desktop: horizontal step indicator */}
      <div className="flex items-center justify-center gap-0">
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentIndex
          const isCurrent = idx === currentIndex

          return (
            <div key={stage.id} className="flex items-center">
              {/* Step dot */}
              <button
                onClick={() => onStageClick(idx)}
                className={cn(
                  'group relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all md:h-10 md:w-10 md:text-sm',
                  'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2',
                )}
                style={{
                  borderColor: isCompleted || isCurrent ? accentColor : '#d1d5db',
                  backgroundColor: isCompleted
                    ? accentColor
                    : isCurrent
                    ? 'white'
                    : '#f3f4f6',
                  color: isCompleted
                    ? 'white'
                    : isCurrent
                    ? accentColor
                    : '#9ca3af',
                }}
                title={stage.label}
              >
                {isCompleted ? '\u2713' : idx + 1}

                {/* Tooltip */}
                <span className="absolute -bottom-7 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-0.5 text-[10px] text-white group-hover:block md:-bottom-8 md:text-xs">
                  {stage.label}
                </span>
              </button>

              {/* Connector line */}
              {idx < stages.length - 1 && (
                <div
                  className="h-0.5 w-6 md:w-12 lg:w-16 transition-colors"
                  style={{
                    backgroundColor: idx < currentIndex ? accentColor : '#d1d5db',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Current stage label */}
      <div className="mt-4 text-center md:mt-5">
        <span
          className="text-sm font-semibold md:text-base"
          style={{ color: accentColor }}
        >
          {stages[currentIndex]?.label}
        </span>
        <span className="ml-2 text-xs text-gray-400">
          ({currentIndex + 1} / {stages.length})
        </span>
      </div>
    </div>
  )
}
