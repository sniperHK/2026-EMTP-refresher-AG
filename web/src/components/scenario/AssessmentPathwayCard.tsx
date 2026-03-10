import type { AssessmentPathway } from '@/data/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AssessmentPathwayCardProps {
  pathway: AssessmentPathway
  accentColor: string
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 text-sm text-gray-700">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function AssessmentPathwayCard({
  pathway,
  accentColor,
}: AssessmentPathwayCardProps) {
  return (
    <Card className="gap-4 border-gray-200 bg-white">
      <CardHeader className="gap-1 border-b pb-4">
        <CardTitle
          className="text-base md:text-lg"
          style={{ color: accentColor }}
        >
          Assessment Pathway
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Scene Size-up
          </p>
          <BulletList items={pathway.sceneSizeUp} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            First Impression
          </p>
          <p className="text-sm text-gray-700">{pathway.firstImpression}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Focused Exam
          </p>
          <BulletList items={pathway.focusedExam} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Leading DDx
          </p>
          <BulletList items={pathway.leadingDdx} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Discriminator
          </p>
          <p className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">
            {pathway.discriminator}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
