import { useState, useCallback } from 'react'
import type { Question } from '@/data/questions'
import type { QuizAnswerRecord, OptionKey } from '@/lib/quiz-results'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  questions: Question[]
  onFinish: (result: QuizFinishResult) => void
  onReset: () => void
}

export interface QuizFinishResult {
  score: number
  total: number
  answers: QuizAnswerRecord[]
}

const levelColor: Record<string, string> = {
  Remember: 'var(--medical-blue)',
  Apply: 'var(--medical-orange)',
  Analyze: 'var(--medical-red)',
}

export function QuizPlayer({ questions, onFinish, onReset }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<OptionKey | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([])

  const q = questions[currentIdx]
  const total = questions.length
  const isLast = currentIdx === total - 1
  const isCorrect = selected === q.answer

  const handleSelect = useCallback((key: OptionKey) => {
    if (showFeedback) return
    setSelected(key)
    setShowFeedback(true)
    setAnswers((prev) => [
      ...prev,
      {
        questionId: q.id,
        selected: key,
        correctAnswer: q.answer,
        isCorrect: key === q.answer,
        module: q.module,
        level: q.level,
      },
    ])
    if (key === q.answer) setScore((s) => s + 1)
  }, [showFeedback, q.answer, q.id, q.level, q.module])

  const handleNext = useCallback(() => {
    if (isLast) {
      onFinish({ score, total, answers })
      return
    }
    setCurrentIdx((i) => i + 1)
    setSelected(null)
    setShowFeedback(false)
  }, [answers, isLast, onFinish, score, total])

  const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D']

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Progress header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-600">
            第 {currentIdx + 1} 題 / 共 {total} 題
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">得分 {score}</span>
            <Badge
              className="text-[10px]"
              style={{ backgroundColor: `${levelColor[q.level]}20`, color: levelColor[q.level] }}
            >
              {q.level}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {q.module}
            </Badge>
          </div>
        </div>
        <Progress value={((currentIdx) / total) * 100} className="h-1.5" />
      </div>

      {/* Question */}
      <div
        className="rounded-xl border-2 p-5 md:p-6"
        style={{ borderColor: 'var(--medical-navy)' }}
      >
        <p className="text-base font-semibold leading-relaxed text-gray-800 md:text-lg">
          {q.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {optionKeys.map((key, i) => {
          const text = q.options[i]
          const isSelected = selected === key
          const isAnswer = key === q.answer

          let bg = 'bg-white'
          let border = 'border-gray-200'
          let textColor = 'text-gray-700'

          if (showFeedback) {
            if (isAnswer) {
              bg = 'bg-green-50'
              border = 'border-green-500'
              textColor = 'text-green-800'
            } else if (isSelected && !isAnswer) {
              bg = 'bg-red-50'
              border = 'border-red-400'
              textColor = 'text-red-700'
            } else {
              bg = 'bg-gray-50'
              textColor = 'text-gray-400'
            }
          } else if (isSelected) {
            border = 'border-blue-400'
            bg = 'bg-blue-50'
          }

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              disabled={showFeedback}
              className={cn(
                'flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition-all md:text-base',
                bg, border, textColor,
                !showFeedback && 'hover:border-blue-300 hover:bg-blue-50 cursor-pointer',
                showFeedback && 'cursor-default',
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  showFeedback && isAnswer && 'bg-green-500 text-white',
                  showFeedback && isSelected && !isAnswer && 'bg-red-400 text-white',
                  (!showFeedback || (!isSelected && !isAnswer)) && 'border border-current',
                )}
              >
                {key}
              </span>
              <span className="leading-snug">{text}</span>
            </button>
          )
        })}
      </div>

      {/* Feedback panel */}
      {showFeedback && (
        <div
          className={cn(
            'animate-in fade-in slide-in-from-top-2 duration-300 rounded-xl border-2 p-4 md:p-5',
            isCorrect ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50',
          )}
        >
          <div className="flex items-center gap-2">
            <span className={cn('text-lg font-bold', isCorrect ? 'text-green-700' : 'text-red-600')}>
              {isCorrect ? '✓ 正確！' : `✗ 正確答案是 ${q.answer}`}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            {q.explanation}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={onReset}>
          重新選擇
        </Button>
        {showFeedback && (
          <Button onClick={handleNext}>
            {isLast ? '查看結果' : '下一題 →'}
          </Button>
        )}
      </div>
    </div>
  )
}
