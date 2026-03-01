import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import handoutRaw from '../../../docs/teaching/student-handout.md?raw'

export function HandoutPage() {
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
          href="/exports/2026-02-26_v2/student-handout.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white"
          style={{ borderColor: 'var(--medical-navy)', color: 'var(--medical-navy)' }}
        >
          &#8659; 下載 PDF 版（A4 4 頁）
        </a>
      </div>

      {/* Markdown content */}
      <div className="prose prose-gray max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:pb-2 prose-h3:text-base prose-table:text-sm prose-th:bg-gray-100 prose-td:border prose-th:border prose-td:px-3 prose-td:py-2 prose-th:px-3 prose-th:py-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {handoutRaw}
        </ReactMarkdown>
      </div>
    </div>
  )
}
