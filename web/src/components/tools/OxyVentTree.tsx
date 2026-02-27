import { useState, useCallback } from 'react'
import { oxyVentTree, oxyVentRootId } from '@/data/trees/oxy-vent'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function OxyVentTree() {
  const [expandedPath, setExpandedPath] = useState<string[]>([oxyVentRootId])
  const [activeNodeId, setActiveNodeId] = useState<string>(oxyVentRootId)

  const handleNodeClick = useCallback((nodeId: string) => {
    const idx = expandedPath.indexOf(nodeId)
    if (idx >= 0) {
      setExpandedPath(expandedPath.slice(0, idx + 1))
      setActiveNodeId(nodeId)
      return
    }
    setExpandedPath((prev) => [...prev, nodeId])
    setActiveNodeId(nodeId)
  }, [expandedPath])

  const handleReset = useCallback(() => {
    setExpandedPath([oxyVentRootId])
    setActiveNodeId(oxyVentRootId)
  }, [])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2
          className="text-2xl font-bold md:text-3xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          Oxygenation vs Ventilation 決策樹
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          鑑別呼吸問題類型：氧合衰竭（Type I）vs 通氣衰竭（Type II）
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--medical-red)' }} />
          <span className="text-xs text-gray-600">危急 — 需立即處置</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--medical-orange)' }} />
          <span className="text-xs text-gray-600">注意 — 需排除危急原因</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--medical-green)' }} />
          <span className="text-xs text-gray-600">穩定 — 持續監測</span>
        </div>
      </div>

      {/* Tree */}
      <div className="space-y-2">
        {expandedPath.map((nodeId, pathIdx) => {
          const node = oxyVentTree[nodeId]
          if (!node) return null
          const isActive = nodeId === activeNodeId
          const isResult = node.type === 'result'

          let edgeLabel = ''
          if (pathIdx > 0) {
            const prevNode = oxyVentTree[expandedPath[pathIdx - 1]]
            if (prevNode?.children) {
              const edge = prevNode.children.find((e) => e.targetId === nodeId)
              edgeLabel = edge?.label || ''
            }
          }

          return (
            <div key={nodeId} className="animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Connector + edge label */}
              {pathIdx > 0 && (
                <div className="flex flex-col items-center py-1">
                  <div className="h-3 w-0.5 bg-gray-300" />
                  {edgeLabel && (
                    <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600">
                      {edgeLabel}
                    </span>
                  )}
                  <div className="h-3 w-0.5 bg-gray-300" />
                </div>
              )}

              {/* Node */}
              <div
                className={cn(
                  'rounded-xl border-2 p-4 transition-all md:p-5',
                  isActive && 'shadow-lg',
                  isResult && 'shadow-md'
                )}
                style={{
                  borderColor: node.color || 'var(--medical-navy)',
                  backgroundColor: isResult ? `${node.color}10` : 'white',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: node.color || 'var(--medical-navy)' }}
                  >
                    {isResult ? '!' : '?'}
                  </span>
                  <h3
                    className="text-base font-bold md:text-lg"
                    style={{ color: node.color }}
                  >
                    {node.label}
                  </h3>
                </div>

                {node.description && (
                  <p className="mt-2 text-sm text-gray-600 md:text-base">
                    {node.description}
                  </p>
                )}

                {node.children && node.children.length > 0 && isActive && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {node.children.map((edge) => (
                      <button
                        key={edge.targetId}
                        onClick={() => handleNodeClick(edge.targetId)}
                        className={cn(
                          'rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:shadow-md',
                          expandedPath.includes(edge.targetId)
                            ? 'border-gray-400 bg-gray-100'
                            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                        )}
                      >
                        {edge.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Reset */}
      <div className="flex justify-center">
        <Button variant="outline" onClick={handleReset}>
          重新開始
        </Button>
      </div>

      {/* Quick reference */}
      <div className="rounded-xl border bg-white p-4 md:p-6">
        <h3
          className="mb-3 text-lg font-bold"
          style={{ color: 'var(--medical-navy)' }}
        >
          快速參考
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-3" style={{ borderColor: 'var(--medical-red)' }}>
            <h4 className="text-sm font-bold" style={{ color: 'var(--medical-red)' }}>
              Type I 呼吸衰竭（氧合）
            </h4>
            <ul className="mt-2 space-y-1 text-xs text-gray-600">
              <li>- SpO2 低，PaO2 低</li>
              <li>- PaCO2 正常或低</li>
              <li>- 原因：肺炎、ARDS、肺栓塞、肺水腫</li>
              <li>- 治療：高流量 O2、NIPPV、插管</li>
            </ul>
          </div>
          <div className="rounded-lg border p-3" style={{ borderColor: 'var(--medical-blue)' }}>
            <h4 className="text-sm font-bold" style={{ color: 'var(--medical-blue)' }}>
              Type II 呼吸衰竭（通氣）
            </h4>
            <ul className="mt-2 space-y-1 text-xs text-gray-600">
              <li>- ETCO2 / PaCO2 升高</li>
              <li>- SpO2 可能正常或低</li>
              <li>- 原因：COPD、藥物過量、神經肌肉</li>
              <li>- 治療：輔助通氣、BVM、NIPPV、插管</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
