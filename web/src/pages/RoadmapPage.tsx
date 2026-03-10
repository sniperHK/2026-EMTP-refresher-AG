import { Link } from 'react-router-dom'

/* ------------------------------------------------------------------ */
/*  Data: 課程時間軸                                                    */
/* ------------------------------------------------------------------ */

interface TimeBlock {
  time: string
  clock: string
  title: string
  duration: string
  type: 'lecture' | 'interactive' | 'assessment' | 'break' | 'report' | 'wrap'
  notes?: string[]
  links?: { label: string; to: string }[]
  group?: string
  slides?: string
}

const blocks: TimeBlock[] = [
  {
    time: '0–10',
    clock: '08:30–08:40',
    title: '開場 + 分 5 組',
    duration: '10 min',
    type: 'wrap',
    notes: ['自我介紹、課程目標、發講義', '宣布分組、預告休息後案例任務'],
  },
  {
    time: '10–20',
    clock: '08:40–08:50',
    title: 'Pre-test',
    duration: '10 min',
    type: 'assessment',
    notes: ['10 題（休克分類、判讀框架、給藥路徑）', '不公布答案：「答案藏在今天的課裡」', '完成後會自動送到教師儀表板'],
    links: [
      { label: 'Pre-test', to: '/quiz/pre' },
      { label: '教師儀表板', to: '/teacher-dashboard' },
    ],
  },
  {
    time: '20–55',
    clock: '08:50–09:25',
    title: 'Lecture 1：M01 核心概念',
    duration: '35 min',
    type: 'lecture',
    slides: 'M01 全部投影片',
    notes: [
      '四大支柱（Oxygenation → Ventilation → Perfusion → Metabolism）',
      'Oxy vs Vent 快速決策 + Oxy-Vent 決策樹',
      '休克三階段：代償→失代償→不可逆',
      '插管三殺：低血氧+低血壓+酸中毒',
      'Pump-Pipe-Tank 模型 + 決策樹',
      'Nohria-Stevenson 矩陣（4 象限）',
      'SCAPE 識別 + PseudoPEA 概念帶過',
    ],
    links: [
      { label: 'M01 投影片', to: '/slides/M01' },
      { label: 'M01 講義', to: '/content/M01' },
      { label: 'Pump-Pipe-Tank', to: '/tools/pump-pipe-tank' },
      { label: 'Nohria-Stevenson', to: '/tools/nohria-stevenson' },
      { label: 'Oxy vs Vent', to: '/tools/oxygenation' },
    ],
  },
  {
    time: '55–85',
    clock: '09:25–09:55',
    title: 'Lecture 2：M02 核心概念',
    duration: '30 min',
    type: 'lecture',
    slides: 'M02 全部投影片',
    notes: [
      'PK 四步驟（ADME）+ 休克中的 PK 變化',
      '給藥途徑比較（IV > IO > IN > IM）',
      'Epi 三濃度 + Push-dose Epi 泡製',
      'NTG + ACLS 藥物速查',
      'OHCA VF 關鍵節奏',
      '高風險錯誤防呆 5 條',
    ],
    links: [
      { label: 'M02 投影片', to: '/slides/M02' },
      { label: 'M02 講義', to: '/content/M02' },
      { label: 'PseudoPEA 鑑別', to: '/tools/pseudopea' },
    ],
  },
  {
    time: '85–95',
    clock: '09:55–10:05',
    title: '休息',
    duration: '10 min',
    type: 'break',
    notes: ['講師可趁此時看 Pre-test 統計，掌握學員弱點'],
    links: [{ label: '教師儀表板', to: '/teacher-dashboard' }],
  },
  {
    time: '95–105',
    clock: '10:05–10:15',
    title: '分組任務說明',
    duration: '10 min',
    type: 'wrap',
    notes: [
      '發任務卡：每組拿到指定情境',
      '說明報告格式（5 題固定框架）與時間',
      '用紙本/白板整理即可，不需正式簡報',
    ],
  },
  {
    time: '105–135',
    clock: '10:15–10:45',
    title: '5 組案例分析',
    duration: '30 min',
    type: 'interactive',
    notes: [
      '各組用手機/平板跑網站上的指定情境',
      '組內討論、整理 5 題答案',
      '講師巡場觀察，用「壞掉的是 Pump、Pipe 還是 Tank？」引導',
    ],
    group: 'G1→S01 / G2→S02 / G3→S05 / G4→S03 / G5→S04',
    links: [
      { label: 'S01 張力性氣胸', to: '/scenario/S01' },
      { label: 'S02 低血容休克', to: '/scenario/S02' },
      { label: 'S05 心因性+SCAPE', to: '/scenario/S05' },
      { label: 'S03 過敏性休克', to: '/scenario/S03' },
      { label: 'S04 OHCA VF', to: '/scenario/S04' },
    ],
  },
  {
    time: '135–170',
    clock: '10:45–11:20',
    title: '小組報告',
    duration: '35 min',
    type: 'report',
    notes: [
      '每組 5 分鐘報告 + 2 分鐘講師回饋',
      '報告順序：G1(S01) → G2(S02) → G3(S05) → G4(S03) → G5(S04)',
    ],
    group: '每組固定回答 5 題',
  },
  {
    time: '170–185',
    clock: '11:20–11:35',
    title: '講師總整',
    duration: '15 min',
    type: 'lecture',
    notes: [
      '對比 1：S01 vs S02 — Pipe 問題 vs Tank 問題',
      '對比 2：S02 vs S05 — Tank 空 vs Pump 壞（全課精華）',
      '對比 3：S03 vs S04 — Epi 在三種場景的不同用法',
    ],
    links: [
      { label: 'Pump-Pipe-Tank', to: '/tools/pump-pipe-tank' },
      { label: 'Nohria-Stevenson', to: '/tools/nohria-stevenson' },
    ],
  },
  {
    time: '185–195',
    clock: '11:35–11:45',
    title: 'Post-test',
    duration: '10 min',
    type: 'assessment',
    notes: ['課後驗證學習成效', '完成後會自動送到教師儀表板'],
    links: [
      { label: 'Post-test', to: '/quiz/post' },
      { label: '教師儀表板', to: '/teacher-dashboard' },
    ],
  },
  {
    time: '195–200',
    clock: '11:45–11:50',
    title: '收尾',
    duration: '5 min',
    type: 'wrap',
    notes: [
      '(1) Pump-Pipe-Tank 是你的決策 GPS',
      '(2) 休克不要 IM — Push-dose Epi 用於有心跳的嚴重低血壓',
      '(3) SCAPE 先 NTG + CPAP，不先 Lasix',
    ],
    links: [{ label: '學員講義', to: '/handout' }],
  },
]

const reportQuestions = [
  { num: 1, text: '這個案例主要壞在哪個環節：Pump / Pipe / Tank？' },
  { num: 2, text: '前 5 分鐘最重要的 3 個處置是什麼？' },
  { num: 3, text: '最關鍵的藥物或操作是什麼，時機怎麼抓？' },
  { num: 4, text: '最容易犯的 1 個錯誤是什麼？' },
  { num: 5, text: '如果第一步無效，下一步怎麼調整？' },
]

const groupAssignments = [
  { group: '第 1 組', scenario: 'S01', label: '張力性氣胸', ppt: 'Pipe Blocked', color: '#dc2626' },
  { group: '第 2 組', scenario: 'S02', label: '低血容休克', ppt: 'Tank Empty', color: '#ea580c' },
  { group: '第 3 組', scenario: 'S05', label: '心因性+SCAPE', ppt: 'Pump Failure', color: '#7c3aed' },
  { group: '第 4 組', scenario: 'S03', label: '過敏性休克', ppt: 'Pipe Loose', color: '#0891b2' },
  { group: '第 5 組', scenario: 'S04', label: 'OHCA VF', ppt: '五案匯流', color: '#4f46e5' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const typeStyles: Record<TimeBlock['type'], { bg: string; border: string; dot: string; label: string }> = {
  lecture:     { bg: 'bg-blue-50',   border: 'border-blue-200',  dot: 'bg-blue-500',   label: '講授' },
  interactive: { bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500', label: '互動' },
  assessment:  { bg: 'bg-red-50',    border: 'border-red-200',   dot: 'bg-red-500',    label: '評量' },
  break:       { bg: 'bg-gray-50',   border: 'border-gray-200',  dot: 'bg-gray-400',   label: '休息' },
  report:      { bg: 'bg-amber-50',  border: 'border-amber-200', dot: 'bg-amber-500',  label: '報告' },
  wrap:        { bg: 'bg-slate-50',  border: 'border-slate-200', dot: 'bg-slate-500',  label: '行政' },
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RoadmapPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-2xl font-bold md:text-3xl" style={{ color: 'var(--medical-navy)' }}>
          課程地圖
        </h1>
        <p className="mt-2 text-sm text-gray-500 md:text-base">
          08:30–11:50 ｜ 210 分鐘 ｜ Lecture → 分組案例 → 報告 → 總整
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {Object.entries(typeStyles).map(([key, s]) => (
            <span key={key} className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs text-gray-600">
              <span className={`h-2 w-2 rounded-full ${s.dot}`} />
              {s.label}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        {[
          { label: '開前測', to: '/quiz/pre', hint: '學員個別作答', tone: 'border-blue-200 bg-blue-50 text-blue-700' },
          { label: '開後測', to: '/quiz/post', hint: '課後成效驗證', tone: 'border-orange-200 bg-orange-50 text-orange-700' },
          { label: '教師儀表板', to: '/teacher-dashboard', hint: '看班級結果與進步', tone: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
          { label: '學員講義', to: '/handout', hint: '課堂速查表', tone: 'border-slate-200 bg-slate-50 text-slate-700' },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${item.tone}`}
          >
            <div className="text-sm font-bold">{item.label}</div>
            <div className="mt-1 text-xs opacity-80">{item.hint}</div>
          </Link>
        ))}
      </section>

      {/* 分組配置 */}
      <section className="rounded-xl border bg-white p-4 md:p-6">
        <h2 className="mb-4 text-lg font-semibold" style={{ color: 'var(--medical-navy)' }}>
          分組配置
        </h2>
        <div className="grid gap-2 sm:grid-cols-5">
          {groupAssignments.map((g) => (
            <Link
              key={g.scenario}
              to={`/scenario/${g.scenario}`}
              className="group rounded-lg border p-3 text-center transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ borderColor: g.color + '40' }}
            >
              <div className="text-xs font-medium text-gray-400">{g.group}</div>
              <div className="mt-1 text-sm font-bold" style={{ color: g.color }}>
                {g.scenario}
              </div>
              <div className="mt-0.5 text-xs text-gray-600">{g.label}</div>
              <div className="mt-1 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
                {g.ppt}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="mb-4 text-lg font-semibold" style={{ color: 'var(--medical-navy)' }}>
          詳細時間軸
        </h2>
        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute left-[39px] top-4 bottom-4 w-px bg-gray-200 md:left-[79px]" />

          {blocks.map((block, i) => {
            const style = typeStyles[block.type]
            return (
              <div key={i} className="relative flex gap-3 pb-6 md:gap-4">
                {/* Time column */}
                <div className="w-[60px] shrink-0 pt-3 text-right md:w-[100px]">
                  <div className="text-xs font-bold text-gray-700 md:text-sm">{block.clock.split('–')[0]}</div>
                  <div className="text-[10px] text-gray-400">{block.duration}</div>
                </div>

                {/* Dot on timeline */}
                <div className="relative flex shrink-0 items-start pt-3.5">
                  <div className={`z-10 h-3 w-3 rounded-full border-2 border-white ${style.dot}`} />
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-xl border ${style.border} ${style.bg} p-3 md:p-4`}>
                  {/* Title row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${style.dot}`}>
                      {style.label}
                    </span>
                    <h3 className="text-sm font-bold text-gray-800 md:text-base">{block.title}</h3>
                  </div>

                  {/* Slides reference */}
                  {block.slides && (
                    <div className="mt-1 text-xs text-gray-500">
                      {block.slides}
                    </div>
                  )}

                  {/* Group assignment */}
                  {block.group && (
                    <div className="mt-2 rounded-md bg-white/70 px-2.5 py-1.5 text-xs font-medium text-gray-600 border border-gray-200/50">
                      {block.group}
                    </div>
                  )}

                  {/* Notes */}
                  {block.notes && block.notes.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {block.notes.map((note, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs text-gray-600 md:text-sm">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Links */}
                  {block.links && block.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {block.links.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="inline-flex items-center gap-1 rounded-md border bg-white px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <span className="text-[10px]">&#10140;</span>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 報告格式 */}
      <section className="rounded-xl border bg-white p-4 md:p-6">
        <h2 className="mb-4 text-lg font-semibold" style={{ color: 'var(--medical-navy)' }}>
          小組報告格式（每組固定回答 5 題）
        </h2>
        <div className="space-y-2">
          {reportQuestions.map((q) => (
            <div key={q.num} className="flex items-start gap-3 rounded-lg border bg-gray-50 px-3 py-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                {q.num}
              </span>
              <span className="text-sm text-gray-700">{q.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 講師總整對比 */}
      <section className="rounded-xl border bg-white p-4 md:p-6">
        <h2 className="mb-4 text-lg font-semibold" style={{ color: 'var(--medical-navy)' }}>
          講師總整：3 組對比
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-3">
            <div className="text-xs font-bold text-red-700">S01 vs S02</div>
            <div className="mt-1 text-xs text-gray-600">
              Pipe 問題（阻塞→減壓）vs Tank 問題（失血→輸液止血）
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-purple-400 bg-purple-50 p-3">
            <div className="text-xs font-bold text-purple-700">S02 vs S05 — 全課精華</div>
            <div className="mt-1 text-xs text-gray-600">
              同為低血壓 + 冰冷末梢，Tank 空→輸液 vs Pump 壞→NTG+CPAP。差別在 JVD 和肺音
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-3">
            <div className="text-xs font-bold text-blue-700">S03 vs S04</div>
            <div className="mt-1 text-xs text-gray-600">
              Epi 三種場景：IM 0.3-0.5mg（過敏）/ IV 1mg（arrest）/ Push-dose 10-20mcg（PseudoPEA）
            </div>
          </div>
        </div>
      </section>

      {/* 3 個帶走重點 */}
      <section className="rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 p-4 md:p-6">
        <h2 className="mb-3 text-lg font-semibold text-amber-800">
          3 個帶走重點
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">1</span>
            <div>
              <div className="text-sm font-bold text-gray-800">Pump-Pipe-Tank 是你的決策 GPS</div>
              <div className="text-xs text-gray-600">先搞清楚壞掉的是哪個，再決定修什麼</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">2</span>
            <div>
              <div className="text-sm font-bold text-gray-800">休克不要 IM</div>
              <div className="text-xs text-gray-600">灌流差時 IM 吸收不可預期；Push-dose Epi 用於有心跳的嚴重低血壓</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">3</span>
            <div>
              <div className="text-sm font-bold text-gray-800">SCAPE 先 NTG + CPAP，不先 Lasix</div>
              <div className="text-xs text-gray-600">SCAPE 是血管痙攣不是水太多</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
