import { useParams, Link } from 'react-router-dom'
import { scenarioMap } from '@/data/scenarios'
import { ScenarioPlayer } from '@/components/scenario/ScenarioPlayer'

export function ScenarioPage() {
  const { id } = useParams<{ id: string }>()
  const scenario = id ? scenarioMap[id] : undefined

  if (!scenario) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1
          className="text-2xl font-bold md:text-3xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          找不到情境
        </h1>
        <p className="mt-2 text-gray-500">
          情境 ID "{id}" 不存在
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

  return <ScenarioPlayer scenario={scenario} />
}
