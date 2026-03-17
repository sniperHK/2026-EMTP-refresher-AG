import { useState } from 'react'
import { nohriaStevensonData, axisLabels } from '@/data/trees/nohria-stevenson'
import type { Quadrant } from '@/data/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const quadrantColors: Record<string, { bg: string; border: string; text: string }> = {
  A: { bg: '#e8f5e9', border: '#27AE60', text: '#1b5e20' },
  B: { bg: '#fff3e0', border: '#F39C12', text: '#e65100' },
  L: { bg: '#e3f2fd', border: '#2980B9', text: '#0d47a1' },
  C: { bg: '#fce4ec', border: '#C0392B', text: '#b71c1c' },
}

export function NohriaStevensonMatrix() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<Quadrant | null>(null)

  // Order: A (warm/dry), L (cold/dry), B (warm/wet), C (cold/wet)
  const quadrantMap = Object.fromEntries(nohriaStevensonData.map((q) => [q.id, q]))

  const renderQuadrantCell = (id: 'A' | 'B' | 'L' | 'C') => {
    const q = quadrantMap[id]
    if (!q) return null
    const colors = quadrantColors[id]
    const isSelected = selectedQuadrant?.id === id

    return (
      <button
        onClick={() => setSelectedQuadrant(isSelected ? null : q)}
        className={cn(
          'flex flex-col items-center justify-center rounded-xl border-3 p-4 text-center transition-all hover:shadow-lg md:p-6',
          isSelected && 'ring-2 ring-offset-2 shadow-xl scale-[1.02]'
        )}
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}
      >
        <span
          className="text-2xl font-bold md:text-3xl"
          style={{ color: colors.text }}
        >
          {id}
        </span>
        <span className="mt-1 text-xs font-medium text-gray-600 md:text-sm">
          {q.perfusion === 'warm' ? 'Warm' : 'Cold'} & {q.congestion === 'dry' ? 'Dry' : 'Wet'}
        </span>
      </button>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2
          className="text-2xl font-bold md:text-3xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          Nohria-Stevenson 分類
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          急性心衰竭血流動力學分類 — 點選象限查看詳細資訊
        </p>
      </div>

      {/* Warm/Cold/Dry/Wet 定義 */}
      <div className="mx-auto max-w-lg rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="font-semibold" style={{ color: '#27AE60' }}>Warm（溫暖）= 灌流足夠</p>
            <p className="mt-0.5 text-xs text-gray-600">四肢溫暖、CRT 正常、意識清楚</p>
          </div>
          <div>
            <p className="font-semibold" style={{ color: '#C0392B' }}>Cold（冰冷）= 灌流不足</p>
            <p className="mt-0.5 text-xs text-gray-600">末梢濕冷、CRT 延長、脈壓差窄、意識變差</p>
          </div>
          <div>
            <p className="font-semibold" style={{ color: '#2980B9' }}>Dry（乾）= 無肺充血</p>
            <p className="mt-0.5 text-xs text-gray-600">肺音清、無囉音、JVD(-)、可平躺</p>
          </div>
          <div>
            <p className="font-semibold" style={{ color: '#F39C12' }}>Wet（濕）= 有肺充血</p>
            <p className="mt-0.5 text-xs text-gray-600">雙側囉音、端坐呼吸、JVD(+)、SpO₂↓</p>
          </div>
        </div>
      </div>

      {/* 2x2 Matrix */}
      <div className="mx-auto max-w-lg">
        {/* Column headers */}
        <div className="mb-2 grid grid-cols-[60px_1fr_1fr] gap-2">
          <div />
          <div className="text-center text-xs font-semibold text-gray-500 md:text-sm">
            {axisLabels.horizontal.left}
          </div>
          <div className="text-center text-xs font-semibold text-gray-500 md:text-sm">
            {axisLabels.horizontal.right}
          </div>
        </div>

        {/* Row 1: Dry */}
        <div className="mb-2 grid grid-cols-[60px_1fr_1fr] gap-2">
          <div className="flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-500 [writing-mode:vertical-lr] rotate-180 md:text-sm">
              {axisLabels.vertical.top}
            </span>
          </div>
          {renderQuadrantCell('A')}
          {renderQuadrantCell('L')}
        </div>

        {/* Row 2: Wet */}
        <div className="grid grid-cols-[60px_1fr_1fr] gap-2">
          <div className="flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-500 [writing-mode:vertical-lr] rotate-180 md:text-sm">
              {axisLabels.vertical.bottom}
            </span>
          </div>
          {renderQuadrantCell('B')}
          {renderQuadrantCell('C')}
        </div>

        {/* Transition arrow: B → C */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-xs text-gray-500">Profile B</span>
          <span className="text-lg text-red-500">&#8594;</span>
          <span className="text-xs font-semibold text-red-600">SBP 下降時轉為 Profile C</span>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedQuadrant && (
        <div
          className="animate-in slide-in-from-top-4 fade-in duration-400 rounded-xl border-2 p-5 md:p-6"
          style={{
            borderColor: quadrantColors[selectedQuadrant.id].border,
            backgroundColor: quadrantColors[selectedQuadrant.id].bg,
          }}
        >
          <h3
            className="text-lg font-bold md:text-xl"
            style={{ color: quadrantColors[selectedQuadrant.id].text }}
          >
            {selectedQuadrant.label}
          </h3>

          {/* Clinical picture */}
          <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-600">臨床表現</h4>
            <p className="mt-1 text-sm text-gray-700">
              {selectedQuadrant.clinicalPicture}
            </p>
          </div>

          {/* Treatment */}
          <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-600">治療策略</h4>
            <ul className="mt-1 space-y-1">
              {selectedQuadrant.treatment.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Drugs */}
          <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-600">藥物</h4>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {selectedQuadrant.drugs.map((d, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {d}
                </Badge>
              ))}
            </div>
          </div>

          {/* Danger warning */}
          {selectedQuadrant.danger && (
            <div className="mt-3 rounded-md border border-red-300 bg-red-50 p-3">
              <p className="text-sm font-semibold text-red-700">
                &#9888; {selectedQuadrant.danger}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
