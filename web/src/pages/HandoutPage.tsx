import { Children, isValidElement } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import handoutRaw from '../../../docs/teaching/student-handout.md?raw'
import { MermaidBlock } from '@/components/markdown/MermaidBlock'
import { studentHandoutPdfFile } from '@/data/siteMeta'

function extractMermaidChart(children: ReactNode): string | null {
  const [firstChild] = Children.toArray(children)

  if (!isValidElement<{ className?: string; children?: ReactNode }>(firstChild)) {
    return null
  }

  const className = firstChild.props.className ?? ''
  if (!className.includes('language-mermaid')) {
    return null
  }

  const chart = firstChild.props.children
  return typeof chart === 'string' ? chart.trim() : null
}

// ── Custom renderers for medical reference card styling ──────────────────

const mdComponents: ComponentProps<typeof ReactMarkdown>['components'] = {
  // Skip the H1 from markdown (we render our own header)
  h1: () => null,

  h2: ({ children }) => (
    <h2
      className="mt-8 mb-3 flex items-center gap-2 border-b-2 pb-2 text-lg font-bold first:mt-0"
      style={{ color: 'var(--medical-navy)', borderColor: 'var(--medical-navy)' }}
    >
      <span
        className="inline-block h-4 w-1 rounded-full"
        style={{ backgroundColor: 'var(--medical-navy)' }}
      />
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3
      className="mt-5 mb-2 text-sm font-bold uppercase tracking-wide"
      style={{ color: 'var(--medical-red)' }}
    >
      {children}
    </h3>
  ),

  // Tables — clean medical reference style
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),

  thead: ({ children }) => (
    <thead style={{ backgroundColor: 'var(--medical-navy)' }}>{children}</thead>
  ),

  th: ({ children }) => (
    <th className="border-r border-white/20 px-3 py-2 text-left text-xs font-semibold text-white last:border-r-0">
      {children}
    </th>
  ),

  tbody: ({ children }) => <tbody className="divide-y divide-gray-100">{children}</tbody>,

  tr: ({ children, ...props }) => (
    <tr
      className="transition-colors hover:bg-blue-50"
      {...props as object}
    >
      {children}
    </tr>
  ),

  td: ({ children }) => (
    <td className="border-r border-gray-100 px-3 py-2 text-gray-700 last:border-r-0">
      {children}
    </td>
  ),

  // Code blocks — monospace ASCII art box
  pre: ({ children }) => {
    const mermaidChart = extractMermaidChart(children)

    if (mermaidChart) {
      return <MermaidBlock chart={mermaidChart} />
    }

    return (
      <pre
        className="my-3 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-xs leading-relaxed text-gray-700 whitespace-pre"
        style={{ fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace' }}
      >
        {children}
      </pre>
    )
  },

  code: ({ children, className }) => {
    // inline code
    if (!className) {
      return (
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-800">
          {children}
        </code>
      )
    }
    return <code>{children}</code>
  },

  // Blockquotes — protocol disclaimer / notes
  blockquote: ({ children }) => (
    <blockquote
      className="my-3 rounded-r-lg border-l-4 bg-amber-50 py-2 pl-4 pr-3 text-sm text-amber-900"
      style={{ borderLeftColor: '#F39C12' }}
    >
      {children}
    </blockquote>
  ),

  // Horizontal rule — section separator
  hr: () => (
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-200" />
      <div
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: 'var(--medical-navy)' }}
      />
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  ),

  // Unordered lists
  ul: ({ children }) => (
    <ul className="my-2 space-y-1.5 pl-1">{children}</ul>
  ),

  li: ({ children }) => (
    <li className="flex items-start gap-2 text-sm text-gray-700">
      <span
        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: 'var(--medical-red)' }}
      />
      <span>{children}</span>
    </li>
  ),

  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1.5 pl-5 text-sm text-gray-700">{children}</ol>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="my-2 text-sm leading-relaxed text-gray-700">{children}</p>
  ),

  // Strong text — highlight drug names and warnings
  strong: ({ children }) => {
    const text = typeof children === 'string' ? children : ''
    const isWarning = text.includes('禁') || text.includes('注意') || text.includes('停') || text.includes('不能') || text.includes('禁用')
    return (
      <strong
        className="font-bold"
        style={{ color: isWarning ? 'var(--medical-red)' : 'var(--medical-navy)' }}
      >
        {children}
      </strong>
    )
  },
}

// ── Page ────────────────────────────────────────────────────────────────

export function HandoutPage() {
  const pdfHref = `${import.meta.env.BASE_URL}${studentHandoutPdfFile}`

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div
        className="mb-6 rounded-xl px-6 py-5"
        style={{ backgroundColor: 'rgba(27,42,74,0.06)', borderLeft: '4px solid var(--medical-navy)' }}
      >
        <h1 className="text-2xl font-bold md:text-3xl" style={{ color: 'var(--medical-navy)' }}>
          學員講義
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          快速參考卡 — 涵蓋 Pump-Pipe-Tank、Nohria-Stevenson、SCAPE、PseudoPEA 核心速查
        </p>
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white"
          style={{ borderColor: 'var(--medical-navy)', color: 'var(--medical-navy)' }}
        >
          &#8659; 下載 PDF 版（A4 4 頁）
        </a>
      </div>

      {/* Markdown content */}
      <div className="space-y-0">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={mdComponents}>
          {handoutRaw}
        </ReactMarkdown>
      </div>

      {/* Bottom padding for mobile */}
      <div className="h-16" />
    </div>
  )
}
