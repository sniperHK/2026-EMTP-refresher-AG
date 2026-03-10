import { useEffect, useState } from 'react'
import type { DebriefGuide } from '@/data/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const debriefQuestions = [
  'What changed?',
  'What physiology failed?',
  'What action matched that failure?',
  'What would make you switch strategy?',
]

interface DebriefCardProps {
  debrief?: DebriefGuide
  interactive?: boolean
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remaining = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`
}

export function DebriefCard({ debrief, interactive = false }: DebriefCardProps) {
  const totalSeconds = (debrief?.minutes ?? 0) * 60
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setRemainingSeconds(totalSeconds)
    setIsRunning(false)
    setFinished(false)
  }, [totalSeconds])

  useEffect(() => {
    if (!interactive || !isRunning) return

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer)
          setIsRunning(false)
          setFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [interactive, isRunning])

  const elapsedSeconds = totalSeconds - remainingSeconds
  const progress = totalSeconds > 0 ? Math.round((elapsedSeconds / totalSeconds) * 100) : 0
  const activeQuestionIndex = interactive && elapsedSeconds > 0
    ? Math.min(
        debriefQuestions.length - 1,
        Math.floor((elapsedSeconds / Math.max(totalSeconds, 1)) * debriefQuestions.length)
      )
    : 0

  if (!debrief) return null

  return (
    <Card className="gap-4 border-gray-200 bg-white">
      <CardHeader className="gap-1 border-b pb-4">
        <CardTitle className="text-base">Debrief Script</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {interactive && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Debrief Timer
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {formatTime(remainingSeconds)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isRunning ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => setIsRunning((prev) => !prev)}
                >
                  {isRunning ? '暫停' : remainingSeconds === totalSeconds ? '開始' : '續跑'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setRemainingSeconds(totalSeconds)
                    setIsRunning(false)
                    setFinished(false)
                  }}
                >
                  重置
                </Button>
              </div>
            </div>
            <Progress value={progress} className="mt-3 h-2" />
            <p className="mt-2 text-xs text-slate-600">
              {finished ? '時間到，收束成一句生理診斷與下一步。' : '計時會依四問節奏自動高亮當前題目。'}
            </p>
          </div>
        )}

        {debrief.focus && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {debrief.focus}
          </p>
        )}

        <ol className="space-y-2 text-sm text-gray-700">
          {debriefQuestions.map((question, index) => (
            <li
              key={question}
              className={cn(
                'flex gap-3 rounded-md px-2 py-1.5 transition-colors',
                interactive && index === activeQuestionIndex ? 'bg-blue-50 text-blue-900' : ''
              )}
            >
              <span className="font-semibold text-gray-500">{index + 1}.</span>
              <span>{question}</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
