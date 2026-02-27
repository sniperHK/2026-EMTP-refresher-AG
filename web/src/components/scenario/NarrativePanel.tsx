import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface NarrativePanelProps {
  narrative: string
  findings: string[]
  className?: string
  accentColor?: string
}

export function NarrativePanel({
  narrative,
  findings,
  className,
  accentColor = 'var(--medical-blue)',
}: NarrativePanelProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white p-4 md:p-5',
        className
      )}
      style={{ borderLeftWidth: '4px', borderLeftColor: accentColor }}
    >
      {/* 臨床敘述 */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
          臨床情境
        </h3>
        <p className="text-sm leading-relaxed text-gray-800 md:text-base">
          {narrative}
        </p>
      </div>

      {/* 理學檢查發現 */}
      {findings.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
            評估發現
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {findings.map((finding, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs font-normal"
              >
                {finding}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
