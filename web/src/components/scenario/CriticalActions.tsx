import type { CriticalAction } from '@/data/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface CriticalActionsProps {
  actions: CriticalAction[]
  completedIds: Set<string>
  className?: string
}

export function CriticalActions({
  actions,
  completedIds,
  className,
}: CriticalActionsProps) {
  const completedCount = actions.filter((a) => completedIds.has(a.id)).length

  return (
    <div className={cn('rounded-lg border bg-white p-3 md:p-4', className)}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          關鍵動作追蹤
        </h3>
        <span className="text-xs text-gray-500">
          {completedCount} / {actions.length}
        </span>
      </div>

      <div className="space-y-1.5">
        {actions.map((action) => {
          const isCompleted = completedIds.has(action.id)

          return (
            <div
              key={action.id}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                isCompleted ? 'bg-green-50' : 'bg-gray-50'
              )}
            >
              {/* Checkbox indicator */}
              <span
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs',
                  isCompleted
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300 bg-white'
                )}
              >
                {isCompleted && '\u2713'}
              </span>

              {/* Action text */}
              <span
                className={cn(
                  'flex-1 text-xs md:text-sm',
                  isCompleted ? 'text-green-700 line-through' : 'text-gray-700'
                )}
              >
                {action.text}
              </span>

              {/* Critical badge */}
              {action.isCritical && (
                <Badge
                  variant="destructive"
                  className="text-[10px] px-1.5 py-0"
                >
                  必要
                </Badge>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
