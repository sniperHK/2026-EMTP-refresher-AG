import type { CriticalAction } from '@/data/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface CriticalActionsProps {
  actions: CriticalAction[]
  completedIds: Set<string>
  instructorCheckedIds?: Set<string>
  interactive?: boolean
  onToggleInstructorCheck?: (actionId: string) => void
  onExportJson?: () => void
  onExportCsv?: () => void
  className?: string
}

export function CriticalActions({
  actions,
  completedIds,
  instructorCheckedIds = new Set<string>(),
  interactive = false,
  onToggleInstructorCheck,
  onExportJson,
  onExportCsv,
  className,
}: CriticalActionsProps) {
  const completedCount = actions.filter(
    (a) => completedIds.has(a.id) || instructorCheckedIds.has(a.id)
  ).length

  return (
    <div className={cn('rounded-lg border bg-white p-3 md:p-4', className)}>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">
            關鍵動作追蹤
          </h3>
          {interactive && (
            <p className="mt-1 text-xs text-gray-500">
              自動完成來自答題結果；講師可手動補勾。
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {interactive && (
            <>
              <button
                type="button"
                onClick={onExportJson}
                className="rounded border px-2 py-1 text-[11px] text-gray-600 transition-colors hover:bg-gray-50"
              >
                JSON
              </button>
              <button
                type="button"
                onClick={onExportCsv}
                className="rounded border px-2 py-1 text-[11px] text-gray-600 transition-colors hover:bg-gray-50"
              >
                CSV
              </button>
            </>
          )}
          <span className="text-xs text-gray-500">
            {completedCount} / {actions.length}
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        {actions.map((action) => {
          const isAutoCompleted = completedIds.has(action.id)
          const isInstructorChecked = instructorCheckedIds.has(action.id)
          const isCompleted = isAutoCompleted || isInstructorChecked

          return (
            <button
              key={action.id}
              type="button"
              onClick={() => {
                if (!interactive || !onToggleInstructorCheck) return
                onToggleInstructorCheck(action.id)
              }}
              disabled={!interactive}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
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
              {isAutoCompleted && (
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0"
                >
                  Auto
                </Badge>
              )}
              {isInstructorChecked && (
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0"
                >
                  講師
                </Badge>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
