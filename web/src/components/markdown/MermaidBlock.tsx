import { useEffect, useId, useState } from 'react'

let mermaidLoader: Promise<typeof import('mermaid').default> | null = null

async function loadMermaid() {
  if (!mermaidLoader) {
    mermaidLoader = import('mermaid').then((module) => {
      const mermaid = module.default
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'neutral',
        fontFamily: 'Georgia, "Noto Serif TC", serif',
      })
      return mermaid
    })
  }

  return mermaidLoader
}

interface MermaidBlockProps {
  chart: string
}

export function MermaidBlock({ chart }: MermaidBlockProps) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(false)
  const id = useId().replace(/:/g, '-')

  useEffect(() => {
    let cancelled = false
    setSvg('')
    setError(false)

    loadMermaid()
      .then(async (mermaid) => {
        const { svg: renderedSvg } = await mermaid.render(`mermaid-${id}`, chart)

        if (!cancelled) {
          setSvg(renderedSvg)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [chart, id])

  if (error) {
    return (
      <div className="my-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs font-semibold tracking-wide text-amber-700 uppercase">
          Mermaid Render Failed
        </p>
        <pre
          className="mt-3 overflow-x-auto whitespace-pre rounded-md border border-amber-200 bg-white p-3 font-mono text-xs leading-relaxed text-gray-700"
          style={{ fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace' }}
        >
          {chart}
        </pre>
      </div>
    )
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b bg-slate-50 px-4 py-2">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Mermaid Flowchart
        </p>
      </div>

      {svg ? (
        <div
          className="overflow-x-auto px-3 py-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="px-4 py-6 text-center text-sm text-slate-500">
          轉譯流程圖中
        </div>
      )}
    </div>
  )
}
