import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getQuiz } from '@/data/questions'
import { QuizPlayer } from '@/components/quiz/QuizPlayer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type QuizType = 'pre' | 'post' | 'all'

const quizMeta: Record<QuizType, { title: string; description: string; count: number; color: string }> = {
  pre: {
    title: '前測（Pre-test）',
    description: '課前評估基礎知識，10 題，涵蓋 M01 & M02 重點。',
    count: 10,
    color: 'var(--medical-blue)',
  },
  post: {
    title: '後測（Post-test）',
    description: '課後驗收學習成效，20 題，強調臨床應用與分析。',
    count: 20,
    color: 'var(--medical-orange)',
  },
  all: {
    title: '完整題庫（35 題）',
    description: '所有題目混合練習，適合課後複習或自我評估。',
    count: 35,
    color: 'var(--medical-navy)',
  },
}

type Phase = 'select' | 'playing' | 'result'

export function QuizPage() {
  const { type } = useParams<{ type?: QuizType }>()
  const [phase, setPhase] = useState<Phase>(type ? 'playing' : 'select')
  const [activeType, setActiveType] = useState<QuizType>(type ?? 'pre')
  const [finalScore, setFinalScore] = useState<{ score: number; total: number } | null>(null)

  const questions = getQuiz(activeType)
  const meta = quizMeta[activeType]

  const handleStart = (t: QuizType) => {
    setActiveType(t)
    setFinalScore(null)
    setPhase('playing')
  }

  const handleFinish = (score: number, total: number) => {
    setFinalScore({ score, total })
    setPhase('result')
  }

  const handleReset = () => {
    setFinalScore(null)
    setPhase('select')
  }

  // ── Select phase ────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="text-center">
          <h1
            className="text-2xl font-bold md:text-3xl"
            style={{ color: 'var(--medical-navy)' }}
          >
            評量測驗
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            選擇測驗類型，每題作答後立即顯示解析
          </p>
        </div>

        <div className="grid gap-4">
          {(Object.entries(quizMeta) as [QuizType, typeof meta][]).map(([key, m]) => (
            <button
              key={key}
              onClick={() => handleStart(key)}
              className="group rounded-xl border-2 p-5 text-left transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ borderColor: m.color }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold" style={{ color: m.color }}>
                    {m.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">{m.description}</p>
                </div>
                <Badge
                  className="ml-4 shrink-0 text-sm font-bold"
                  style={{ backgroundColor: `${m.color}15`, color: m.color }}
                >
                  {m.count} 題
                </Badge>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-lg border bg-gray-50 p-4 text-xs text-gray-500">
          <strong>說明：</strong>所有題目出自 2026 北市 EMTP 複訓題庫（Q1-Q35）。
          題目分類：M01 病生理學 / M02 藥物動力學・PK-PD。
          認知層級：Remember / Apply / Analyze。
        </div>
      </div>
    )
  }

  // ── Result phase ────────────────────────────────────────
  if (phase === 'result' && finalScore) {
    const pct = Math.round((finalScore.score / finalScore.total) * 100)
    const passed = pct >= 70

    return (
      <div className="mx-auto max-w-xl space-y-6 py-8 text-center">
        <div
          className={cn(
            'rounded-2xl border-4 p-8',
            passed ? 'border-green-400 bg-green-50' : 'border-orange-400 bg-orange-50',
          )}
        >
          <div className={cn('text-6xl font-black', passed ? 'text-green-600' : 'text-orange-500')}>
            {pct}%
          </div>
          <div className="mt-2 text-lg font-semibold text-gray-700">
            {finalScore.score} / {finalScore.total} 題答對
          </div>
          <div className={cn('mt-2 text-sm font-medium', passed ? 'text-green-700' : 'text-orange-600')}>
            {passed ? '通過！' : '需要複習'}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            {meta.title}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => handleStart(activeType)}>
            再做一次
          </Button>
          <Button variant="outline" onClick={handleReset}>
            選擇其他測驗
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">返回首頁</Link>
          </Button>
        </div>
      </div>
    )
  }

  // ── Playing phase ───────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-xl font-bold md:text-2xl" style={{ color: meta.color }}>
          {meta.title}
        </h1>
      </div>
      <QuizPlayer
        questions={questions}
        onFinish={handleFinish}
        onReset={handleReset}
      />
    </div>
  )
}
