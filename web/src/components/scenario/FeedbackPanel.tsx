import type { Decision } from '@/data/types'
import { cn } from '@/lib/utils'

interface FeedbackPanelProps {
  decision: Decision
  selectedOptionId: string
  isCorrect: boolean
  teachingPoint?: string
  showTeachingPoint: boolean
  onToggleTeachingPoint: () => void
  className?: string
}

export function FeedbackPanel({
  decision,
  selectedOptionId,
  isCorrect,
  teachingPoint,
  showTeachingPoint,
  onToggleTeachingPoint,
  className,
}: FeedbackPanelProps) {
  const selectedOption = decision.options.find((o) => o.id === selectedOptionId)
  const correctOption = decision.options.find((o) => o.correct)

  if (!selectedOption) return null

  return (
    <div
      className={cn(
        'animate-in slide-in-from-top-4 fade-in duration-500 space-y-3 rounded-lg border p-4 md:p-5',
        isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50',
        className
      )}
    >
      {/* 回饋訊息 */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
            isCorrect ? 'bg-green-500' : 'bg-red-500'
          )}>
            {isCorrect ? '\u2713' : '\u2717'}
          </span>
          <div>
            <p className={cn(
              'text-sm font-semibold md:text-base',
              isCorrect ? 'text-green-800' : 'text-red-800'
            )}>
              {isCorrect ? '正確！' : '不正確'}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              {selectedOption.feedback}
            </p>
          </div>
        </div>

        {/* 若答錯，顯示正確答案 */}
        {!isCorrect && correctOption && (
          <div className="ml-8 rounded-md border border-green-300 bg-green-100 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
              正確答案
            </p>
            <p className="mt-1 text-sm font-medium text-green-800">
              {correctOption.text}
            </p>
            <p className="mt-1 text-sm text-green-700">
              {correctOption.feedback}
            </p>
          </div>
        )}

        {/* 後果說明 */}
        {selectedOption.consequence && (
          <div className="ml-8 rounded-md border border-amber-300 bg-amber-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
              後果
            </p>
            <p className="mt-1 text-sm text-amber-800">
              {selectedOption.consequence}
            </p>
          </div>
        )}
      </div>

      {/* 教學要點（可收合，供講師用） */}
      {teachingPoint && (
        <div className="border-t border-gray-200 pt-3">
          <button
            onClick={onToggleTeachingPoint}
            className="flex w-full items-center gap-2 text-left text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className={cn(
              'inline-block transition-transform',
              showTeachingPoint && 'rotate-90'
            )}>
              &#9654;
            </span>
            <span>教學要點（講師用）</span>
          </button>
          {showTeachingPoint && (
            <div className="animate-in slide-in-from-top-2 fade-in duration-300 mt-2 rounded-md border bg-white p-3" style={{ borderColor: 'var(--medical-purple)' }}>
              <p className="text-sm leading-relaxed text-gray-700">
                {teachingPoint}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
