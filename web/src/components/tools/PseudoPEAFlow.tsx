import { useState, useCallback } from 'react'
import { pseudoPEATree, pseudoPEARootId, comparisonTable } from '@/data/trees/pseudopea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function PseudoPEAFlow() {
  const [expandedPath, setExpandedPath] = useState<string[]>([pseudoPEARootId])
  const [activeNodeId, setActiveNodeId] = useState<string>(pseudoPEARootId)

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
    setExpandedPath([pseudoPEARootId])
    setActiveNodeId(pseudoPEARootId)
  }, [])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2
          className="text-2xl font-bold md:text-3xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          Pseudo-PEA vs True PEA 鑑別流程
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          逐步點選以跟隨決策流程
        </p>
      </div>

      {/* Flow visualization */}
      <div className="space-y-2">
        {expandedPath.map((nodeId, pathIdx) => {
          const node = pseudoPEATree[nodeId]
          if (!node) return null
          const isActive = nodeId === activeNodeId
          const isResult = node.type === 'result'
          const isAction = node.type === 'action'

          // Find the edge label that led to this node
          let edgeLabel = ''
          if (pathIdx > 0) {
            const prevNode = pseudoPEATree[expandedPath[pathIdx - 1]]
            if (prevNode?.children) {
              const edge = prevNode.children.find((e) => e.targetId === nodeId)
              edgeLabel = edge?.label || ''
            }
          }

          return (
            <div key={nodeId} className="animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Edge label + connector */}
              {pathIdx > 0 && (
                <div className="flex flex-col items-center py-1">
                  <div className="h-4 w-0.5 bg-gray-300" />
                  {edgeLabel && (
                    <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600">
                      {edgeLabel}
                    </span>
                  )}
                  <div className="h-4 w-0.5 bg-gray-300" />
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
                  backgroundColor: isResult || isAction ? `${node.color}10` : 'white',
                }}
              >
                {/* Type badge */}
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white',
                    )}
                    style={{ backgroundColor: node.color || 'var(--medical-navy)' }}
                  >
                    {node.type === 'question'
                      ? '評估'
                      : node.type === 'action'
                      ? '處置'
                      : '結果'}
                  </span>
                  <h3
                    className="text-base font-bold md:text-lg"
                    style={{ color: node.color }}
                  >
                    {node.label}
                  </h3>
                </div>

                {node.description && (
                  <p className="text-sm text-gray-600 md:text-base">
                    {node.description}
                  </p>
                )}

                {/* Children */}
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

      {/* Comparison Table */}
      <div className="rounded-xl border bg-white p-4 md:p-6">
        <h3
          className="mb-4 text-lg font-bold md:text-xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          True PEA vs Pseudo-PEA 比較
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {comparisonTable.headers.map((h, i) => (
                  <th
                    key={i}
                    className={cn(
                      'border-b-2 px-3 py-2 text-left font-semibold',
                      i === 0 && 'w-[30%]',
                      i === 1 && 'text-red-700',
                      i === 2 && 'text-green-700'
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonTable.rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-gray-100">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={cn(
                        'px-3 py-2',
                        cIdx === 0 && 'font-medium text-gray-700',
                        cIdx === 1 && 'text-red-600',
                        cIdx === 2 && 'text-green-600'
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
