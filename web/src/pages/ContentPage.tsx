import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import m01Raw from '../../../docs/modules/M01_ALS-pathophysiology.md?raw'
import m02Raw from '../../../docs/modules/M02_ALS-pharmacokinetics.md?raw'
import m02DosingRaw from '../../../docs/modules/M02_protocol-dosing-map.md?raw'

const modules: Record<string, { title: string; content: string; color: string }> = {
  M01: {
    title: 'M01 ALS 病生理學',
    content: m01Raw,
    color: 'var(--medical-blue)',
  },
  M02: {
    title: 'M02 藥物動力學 / PK-PD',
    content: m02Raw,
    color: 'var(--medical-purple)',
  },
  'M02-dosing': {
    title: 'M02 附錄：在地劑量對接表',
    content: m02DosingRaw,
    color: 'var(--medical-teal)',
  },
}

export function ContentPage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const mod = moduleId ? modules[moduleId] : undefined

  if (!mod) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <p className="text-gray-500">找不到模組：{moduleId}</p>
        <Link to="/" className="mt-4 inline-block text-sm text-blue-600 underline">
          返回首頁
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div
        className="mb-6 rounded-xl px-6 py-5"
        style={{ backgroundColor: `${mod.color}12`, borderLeft: `4px solid ${mod.color}` }}
      >
        <h1 className="text-2xl font-bold md:text-3xl" style={{ color: mod.color }}>
          {mod.title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">課程模組講義 — 點選各節標題可快速定位</p>
      </div>

      {/* Markdown content */}
      <div className="prose prose-gray max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:pb-2 prose-h3:text-base prose-table:text-sm prose-th:bg-gray-100 prose-td:border prose-th:border prose-td:px-3 prose-td:py-2 prose-th:px-3 prose-th:py-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {mod.content}
        </ReactMarkdown>
      </div>

      {/* Navigation between modules */}
      <div className="mt-10 flex flex-wrap gap-3 border-t pt-6">
        {Object.entries(modules).map(([id, m]) => (
          <Link
            key={id}
            to={`/content/${id}`}
            className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
            style={{
              borderColor: id === moduleId ? m.color : undefined,
              color: id === moduleId ? m.color : 'var(--text-muted, #6b7280)',
              fontWeight: id === moduleId ? 600 : undefined,
            }}
          >
            {m.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
