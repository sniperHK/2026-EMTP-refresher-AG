import { useParams, Link } from 'react-router-dom'
import { PumpPipeTank } from '@/components/tools/PumpPipeTank'
import { NohriaStevensonMatrix } from '@/components/tools/NohriaStevensonMatrix'
import { PseudoPEAFlow } from '@/components/tools/PseudoPEAFlow'
import { OxyVentTree } from '@/components/tools/OxyVentTree'

const toolComponents: Record<string, React.ComponentType> = {
  'pump-pipe-tank': PumpPipeTank,
  'nohria-stevenson': NohriaStevensonMatrix,
  pseudopea: PseudoPEAFlow,
  oxygenation: OxyVentTree,
}

export function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>()
  const ToolComponent = toolId ? toolComponents[toolId] : undefined

  if (!ToolComponent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1
          className="text-2xl font-bold md:text-3xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          找不到工具
        </h1>
        <p className="mt-2 text-gray-500">
          工具 ID "{toolId}" 不存在
        </p>
        <Link
          to="/"
          className="mt-4 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: 'var(--medical-blue)' }}
        >
          返回首頁
        </Link>
      </div>
    )
  }

  return <ToolComponent />
}
