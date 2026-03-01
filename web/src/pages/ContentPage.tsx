import type { ComponentProps } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import m01Raw from '../../../docs/modules/M01_ALS-pathophysiology.md?raw'
import m02Raw from '../../../docs/modules/M02_ALS-pharmacokinetics.md?raw'
import m02DosingRaw from '../../../docs/modules/M02_protocol-dosing-map.md?raw'

const modules: Record<string, { title: string; content: string; color: string }> = {
  M01: { title: 'M01 ALS 病生理學', content: m01Raw, color: 'var(--medical-blue)' },
  M02: { title: 'M02 藥物動力學 / PK-PD', content: m02Raw, color: 'var(--medical-purple)' },
  'M02-dosing': { title: 'M02 附錄：在地劑量對接表', content: m02DosingRaw, color: 'var(--medical-teal)' },
}

function makeMdComponents(accentColor: string): ComponentProps<typeof ReactMarkdown>['components'] {
  return {
    h1: ({ children }) => (
      <h1 className="mb-6 text-2xl font-bold md:text-3xl" style={{ color: accentColor }}>
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2
        className="mt-8 mb-3 flex items-center gap-2 border-b-2 pb-2 text-lg font-bold"
        style={{ color: accentColor, borderColor: accentColor }}
      >
        <span className="inline-block h-4 w-1 rounded-full" style={{ backgroundColor: accentColor }} />
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-5 mb-2 text-sm font-bold uppercase tracking-wide text-gray-600">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="mt-4 mb-1.5 text-sm font-semibold text-gray-700">{children}</h4>
    ),

    table: ({ children }) => (
      <div className="my-4 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),

    thead: ({ children }) => (
      <thead style={{ backgroundColor: accentColor }}>{children}</thead>
    ),

    th: ({ children }) => (
      <th className="border-r border-white/20 px-3 py-2 text-left text-xs font-semibold text-white last:border-r-0">
        {children}
      </th>
    ),

    tbody: ({ children }) => <tbody className="divide-y divide-gray-100">{children}</tbody>,

    tr: ({ children, ...props }) => (
      <tr className="transition-colors hover:bg-blue-50" {...props as object}>
        {children}
      </tr>
    ),

    td: ({ children }) => (
      <td className="border-r border-gray-100 px-3 py-2 text-sm text-gray-700 last:border-r-0">
        {children}
      </td>
    ),

    pre: ({ children }) => (
      <pre
        className="my-3 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-xs leading-relaxed text-gray-700 whitespace-pre"
        style={{ fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace' }}
      >
        {children}
      </pre>
    ),

    code: ({ children, className }) => {
      if (!className) {
        return (
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-800">
            {children}
          </code>
        )
      }
      return <code>{children}</code>
    },

    blockquote: ({ children }) => (
      <blockquote
        className="my-3 rounded-r-lg border-l-4 bg-amber-50 py-2 pl-4 pr-3 text-sm text-amber-900"
        style={{ borderLeftColor: '#F39C12' }}
      >
        {children}
      </blockquote>
    ),

    hr: () => (
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
        <div className="h-px flex-1 bg-gray-200" />
      </div>
    ),

    ul: ({ children }) => <ul className="my-2 space-y-1.5 pl-1">{children}</ul>,

    li: ({ children }) => (
      <li className="flex items-start gap-2 text-sm text-gray-700">
        <span
          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <span>{children}</span>
      </li>
    ),

    ol: ({ children }) => (
      <ol className="my-2 list-decimal space-y-1.5 pl-5 text-sm text-gray-700">{children}</ol>
    ),

    p: ({ children }) => (
      <p className="my-2 text-sm leading-relaxed text-gray-700">{children}</p>
    ),

    strong: ({ children }) => (
      <strong className="font-bold" style={{ color: accentColor }}>
        {children}
      </strong>
    ),
  }
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

  const components = makeMdComponents(mod.color)

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div
        className="mb-6 rounded-xl px-6 py-5"
        style={{ backgroundColor: `color-mix(in srgb, ${mod.color} 8%, white)`, borderLeft: `4px solid ${mod.color}` }}
      >
        <h1 className="text-2xl font-bold md:text-3xl" style={{ color: mod.color }}>
          {mod.title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">課程模組講義</p>
      </div>

      {/* Markdown content */}
      <div className="space-y-0">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
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
              borderColor: id === moduleId ? m.color : '#e5e7eb',
              color: id === moduleId ? m.color : '#6b7280',
              fontWeight: id === moduleId ? 600 : undefined,
            }}
          >
            {m.title}
          </Link>
        ))}
      </div>

      <div className="h-16" />
    </div>
  )
}
