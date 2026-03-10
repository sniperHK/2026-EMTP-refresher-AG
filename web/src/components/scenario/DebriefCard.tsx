import type { DebriefGuide } from '@/data/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const debriefQuestions = [
  'What changed?',
  'What physiology failed?',
  'What action matched that failure?',
  'What would make you switch strategy?',
]

interface DebriefCardProps {
  debrief?: DebriefGuide
}

export function DebriefCard({ debrief }: DebriefCardProps) {
  if (!debrief) return null

  return (
    <Card className="gap-4 border-gray-200 bg-white">
      <CardHeader className="gap-1 border-b pb-4">
        <CardTitle className="text-base">Debrief Script</CardTitle>
        <p className="text-sm text-gray-500">
          建議 debrief {debrief.minutes} 分鐘，固定四問，順序不變。
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {debrief.focus && (
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {debrief.focus}
          </p>
        )}

        <ol className="space-y-2 text-sm text-gray-700">
          {debriefQuestions.map((question, index) => (
            <li key={question} className="flex gap-3">
              <span className="font-semibold text-gray-500">{index + 1}.</span>
              <span>{question}</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
