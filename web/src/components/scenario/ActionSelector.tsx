import type { Decision } from '@/data/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ActionSelectorProps {
  decision: Decision
  selectedId: string | null
  isAnswered: boolean
  isCorrect: boolean | null
  onSelect: (optionId: string) => void
  onSubmit: () => void
}

const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F']

export function ActionSelector({
  decision,
  selectedId,
  isAnswered,
  isCorrect,
  onSelect,
  onSubmit,
}: ActionSelectorProps) {
  return (
    <div className="space-y-4">
      {/* 問題 */}
      <div className="rounded-lg border-l-4 bg-gray-50 p-3 md:p-4" style={{ borderLeftColor: 'var(--medical-navy)' }}>
        <h3
          className="text-base font-semibold md:text-lg"
          style={{ color: 'var(--medical-navy)' }}
        >
          {decision.question}
        </h3>
      </div>

      {/* 選項 */}
      <div className="grid gap-2 md:grid-cols-2">
        {decision.options.map((option, idx) => {
          const isSelected = selectedId === option.id
          const showCorrect = isAnswered && option.correct
          const showIncorrect = isAnswered && isSelected && !option.correct

          return (
            <button
              key={option.id}
              onClick={() => !isAnswered && onSelect(option.id)}
              disabled={isAnswered}
              className={cn(
                'flex items-start gap-3 rounded-lg border-2 p-3 text-left transition-all md:p-4',
                'hover:shadow-md disabled:cursor-default',
                !isAnswered && !isSelected && 'border-gray-200 bg-white hover:border-gray-400',
                !isAnswered && isSelected && 'border-[var(--medical-blue)] bg-blue-50 shadow-md',
                showCorrect && 'border-green-500 bg-green-50',
                showIncorrect && 'border-red-500 bg-red-50',
                isAnswered && !showCorrect && !showIncorrect && 'border-gray-200 bg-gray-50 opacity-60'
              )}
            >
              {/* Option label circle */}
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  !isAnswered && !isSelected && 'bg-gray-200 text-gray-600',
                  !isAnswered && isSelected && 'bg-[var(--medical-blue)] text-white',
                  showCorrect && 'bg-green-500 text-white',
                  showIncorrect && 'bg-red-500 text-white',
                  isAnswered && !showCorrect && !showIncorrect && 'bg-gray-200 text-gray-400'
                )}
              >
                {optionLabels[idx]}
              </span>

              {/* Option text */}
              <span className={cn(
                'pt-1 text-sm md:text-base',
                showCorrect && 'font-medium text-green-800',
                showIncorrect && 'font-medium text-red-800'
              )}>
                {option.text}
              </span>
            </button>
          )
        })}
      </div>

      {/* 送出按鈕 */}
      {!isAnswered && (
        <div className="flex justify-center pt-2">
          <Button
            onClick={onSubmit}
            disabled={!selectedId}
            size="lg"
            className="min-w-[160px] text-base"
            style={{
              backgroundColor: selectedId ? 'var(--medical-blue)' : undefined,
            }}
          >
            確認答案
          </Button>
        </div>
      )}

      {/* 結果指示 */}
      {isAnswered && (
        <div
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold',
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          )}
        >
          <span className="text-lg">{isCorrect ? '\u2713' : '\u2717'}</span>
          <span>{isCorrect ? '回答正確！' : '回答錯誤'}</span>
        </div>
      )}
    </div>
  )
}
