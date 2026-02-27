import { useState, useCallback } from 'react'
import { pumpPipeTankTree, rootNodeId } from '@/data/trees/pump-pipe-tank'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function PumpPipeTank() {
  const [expandedPath, setExpandedPath] = useState<string[]>([rootNodeId])
  const [activeNodeId, setActiveNodeId] = useState<string>(rootNodeId)

  const handleNodeClick = useCallback((nodeId: string) => {
    const node = pumpPipeTankTree[nodeId]
    if (!node) return

    // 已在路徑中就跳到那個位置
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
    setExpandedPath([rootNodeId])
    setActiveNodeId(rootNodeId)
  }, [])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2
          className="text-2xl font-bold md:text-3xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          Pump-Pipe-Tank 休克分類
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          點選節點逐步展開決策路徑
        </p>
      </div>

      {/* Tree visualization */}
      <div className="space-y-3">
        {expandedPath.map((nodeId, pathIdx) => {
          const node = pumpPipeTankTree[nodeId]
          if (!node) return null
          const isActive = nodeId === activeNodeId
          const isResult = node.type === 'result'

          return (
            <div key={nodeId} className="animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Connector */}
              {pathIdx > 0 && (
                <div className="flex justify-center py-1">
                  <div className="h-6 w-0.5 bg-gray-300" />
                </div>
              )}

              {/* Node */}
              <div
                className={cn(
                  'rounded-xl border-2 p-4 transition-all md:p-5',
                  isActive && !isResult && 'shadow-lg',
                  isResult && 'shadow-md'
                )}
                style={{
                  borderColor: node.color || 'var(--medical-navy)',
                  backgroundColor: isResult
                    ? `${node.color}10`
                    : isActive
                    ? 'white'
                    : '#fafafa',
                }}
              >
                {/* Node header */}
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: node.color || 'var(--medical-navy)' }}
                  >
                    {isResult ? '\u2605' : node.type === 'question' ? '?' : '\u2192'}
                  </span>
                  <h3 className="text-base font-bold md:text-lg" style={{ color: node.color }}>
                    {node.label}
                  </h3>
                </div>

                {/* Description */}
                {node.description && (
                  <p className="mt-2 text-sm text-gray-600 md:text-base">
                    {node.description}
                  </p>
                )}

                {/* Children buttons */}
                {node.children && node.children.length > 0 && isActive && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {node.children.map((edge) => {
                      const isInPath = expandedPath.includes(edge.targetId)
                      return (
                        <button
                          key={edge.targetId}
                          onClick={() => handleNodeClick(edge.targetId)}
                          className={cn(
                            'rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:shadow-md',
                            isInPath
                              ? 'border-gray-400 bg-gray-100 text-gray-700'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                          )}
                        >
                          {edge.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Reset */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={handleReset}>
          重新開始
        </Button>
      </div>
    </div>
  )
}
