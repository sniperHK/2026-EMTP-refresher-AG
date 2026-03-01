import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { scenarios } from '@/data/scenarios'

const tools = [
  {
    id: 'pump-pipe-tank',
    title: 'Pump-Pipe-Tank',
    description: '休克分類決策樹 — 從低血壓鑑別到休克類型',
    color: 'var(--medical-navy)',
  },
  {
    id: 'nohria-stevenson',
    title: 'Nohria-Stevenson',
    description: '急性心衰竭 2x2 血流動力學分類',
    color: 'var(--medical-red)',
  },
  {
    id: 'pseudopea',
    title: 'Pseudo-PEA 鑑別',
    description: 'True PEA vs Pseudo-PEA 流程與比較',
    color: 'var(--medical-purple)',
  },
  {
    id: 'oxygenation',
    title: 'Oxygenation vs Ventilation',
    description: '呼吸衰竭分類：Type I 氧合 vs Type II 通氣',
    color: 'var(--medical-teal)',
  },
]

const pptLabels: Record<string, string> = {
  pump: 'Pump',
  pipe: 'Pipe',
  tank: 'Tank',
}

export function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      {/* Hero */}
      <section className="text-center py-8 md:py-12">
        <h1
          className="text-3xl font-bold md:text-4xl lg:text-5xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          2026 北市 EMTP 複訓
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-gray-600 md:text-lg">
          互動式情境模擬與決策工具，強化院前緊急救護臨床判斷能力
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="text-xs" style={{ borderColor: 'var(--medical-red)', color: 'var(--medical-red)' }}>
            Pump
          </Badge>
          <Badge variant="outline" className="text-xs" style={{ borderColor: 'var(--medical-blue)', color: 'var(--medical-blue)' }}>
            Pipe
          </Badge>
          <Badge variant="outline" className="text-xs" style={{ borderColor: 'var(--medical-orange)', color: 'var(--medical-orange)' }}>
            Tank
          </Badge>
        </div>
      </section>

      {/* 情境模擬 */}
      <section>
        <h2
          className="mb-4 text-xl font-bold md:text-2xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          情境模擬
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((s) => (
            <Link key={s.id} to={`/scenario/${s.id}`} className="group">
              <Card className="h-full transition-all hover:shadow-lg group-hover:-translate-y-0.5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: s.color }}
                    >
                      {s.id.slice(1)}
                    </span>
                    <div>
                      <CardTitle className="text-base">{s.title}</CardTitle>
                      <CardDescription className="text-xs">{s.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="text-[10px]"
                      style={{ backgroundColor: `${s.color}15`, color: s.color }}
                    >
                      {pptLabels[s.pumpPipeTank]}
                    </Badge>
                    <span className="text-xs text-gray-400">{s.duration}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {s.stages.length} 階段 / {s.criticalActions.length} 關鍵動作
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 決策工具 */}
      <section>
        <h2
          className="mb-4 text-xl font-bold md:text-2xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          決策工具
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <Link key={t.id} to={`/tools/${t.id}`} className="group">
              <Card className="h-full transition-all hover:shadow-lg group-hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle
                    className="text-base"
                    style={{ color: t.color }}
                  >
                    {t.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {t.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 課程模組 */}
      <section>
        <h2
          className="mb-4 text-xl font-bold md:text-2xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          課程模組
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { id: 'M01', title: 'M01 病生理學', desc: '休克、呼吸衰竭、心因性休克病生理決策導向', color: 'var(--medical-blue)' },
            { id: 'M02', title: 'M02 藥物動力學', desc: 'PK/PD 原則、給藥途徑、現場用藥決策', color: 'var(--medical-purple)' },
            { id: 'M02-dosing', title: 'M02 劑量對接表', desc: '在地協議劑量速查與關鍵警示', color: 'var(--medical-teal)' },
          ].map((m) => (
            <Link key={m.id} to={`/content/${m.id}`} className="group">
              <Card className="h-full transition-all hover:shadow-lg group-hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="text-base" style={{ color: m.color }}>
                    {m.title}
                  </CardTitle>
                  <CardDescription className="text-xs">{m.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 學員資源 */}
      <section>
        <h2
          className="mb-4 text-xl font-bold md:text-2xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          學員資源
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/handout" className="group">
            <Card className="h-full transition-all hover:shadow-lg group-hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--medical-navy)' }}>
                  學員講義
                </CardTitle>
                <CardDescription className="text-xs">
                  快速參考卡 — Pump-Pipe-Tank、Nohria-Stevenson、SCAPE、PseudoPEA 速查
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/quiz" className="group">
            <Card className="h-full transition-all hover:shadow-lg group-hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--medical-red)' }}>
                  評量測驗
                </CardTitle>
                <CardDescription className="text-xs">
                  前測（10 題）、後測（20 題）、完整題庫（35 題）互動作答，即時解析
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}
