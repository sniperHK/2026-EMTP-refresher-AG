import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { scenarios } from '@/data/scenarios'
import { courseTitle, moduleMeta, moduleOrder, slideMeta, slideOrder, toolMeta, toolOrder } from '@/data/siteMeta'

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
          {courseTitle}
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

      {/* 課程模組（移至最前） */}
      <section>
        <h2
          className="mb-4 text-xl font-bold md:text-2xl"
          style={{ color: 'var(--medical-navy)' }}
        >
          課程模組
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {moduleOrder.map((id) => {
            const module = moduleMeta[id]
            return (
              <Link key={id} to={`/content/${id}`} className="group">
                <Card className="h-full transition-all hover:shadow-lg group-hover:-translate-y-0.5">
                  <CardHeader>
                    <CardTitle className="text-base" style={{ color: module.color }}>
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-xs">{module.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
        {/* 投影片（Slidev） */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {slideOrder.map((id) => {
            const slide = slideMeta[id]
            return (
              <Link key={id} to={`/slides/${id}`} className="group">
                <Card className="h-full transition-all hover:shadow-lg group-hover:-translate-y-0.5">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <span className="text-base">&#9654;</span>
                      <div>
                        <CardTitle className="text-sm" style={{ color: 'var(--medical-blue)' }}>
                          {slide.title} 投影片
                        </CardTitle>
                        <CardDescription className="text-xs">{slide.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
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
          {toolOrder.map((id) => {
            const tool = toolMeta[id]
            return (
              <Link key={id} to={`/tools/${id}`} className="group">
                <Card className="h-full transition-all hover:shadow-lg group-hover:-translate-y-0.5">
                  <CardHeader>
                    <CardTitle
                      className="text-base"
                      style={{ color: tool.color }}
                    >
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
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
