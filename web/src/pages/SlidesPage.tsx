import { useParams, Link } from 'react-router-dom'

const slideMeta: Record<string, { title: string; desc: string }> = {
  M01: { title: 'M01 病生理學', desc: '休克、呼吸衰竭、心因性休克' },
  M02: { title: 'M02 藥物動力學', desc: 'PK/PD、給藥途徑、現場用藥決策' },
}

export function SlidesPage() {
  const { slideId = 'M01' } = useParams<{ slideId: string }>()
  const meta = slideMeta[slideId]

  if (!meta) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-500">找不到投影片：{slideId}</p>
        <Link to="/" className="text-sm text-blue-600 hover:underline">← 返回首頁</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold md:text-2xl"
            style={{ color: 'var(--medical-navy)' }}
          >
            {meta.title}
          </h1>
          <p className="text-xs text-gray-500">{meta.desc}</p>
        </div>
        <div className="flex gap-2">
          {Object.keys(slideMeta).map((id) => (
            <Link
              key={id}
              to={`/slides/${id}`}
              className={[
                'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                id === slideId
                  ? 'bg-gray-900 text-white'
                  : 'border border-gray-200 text-gray-600 hover:border-gray-400',
              ].join(' ')}
            >
              {id}
            </Link>
          ))}
          <a
            href={`/slides/${slideId}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:border-gray-400 transition-colors"
            title="在新視窗開啟（全螢幕）"
          >
            &#x26F6; 全螢幕
          </a>
        </div>
      </div>

      {/* Slidev iframe */}
      <div
        className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
        style={{ height: 'calc(100vh - 10rem)' }}
      >
        <iframe
          key={slideId}
          src={`/slides/${slideId}/`}
          title={meta.title}
          className="w-full h-full"
          allow="fullscreen"
        />
      </div>
    </div>
  )
}
