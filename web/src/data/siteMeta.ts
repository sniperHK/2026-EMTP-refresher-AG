export const courseTitle = '2026 北市 EMTP 複訓'

export const moduleOrder = ['M01', 'M02', 'M03', 'M09'] as const
export type ModuleId = (typeof moduleOrder)[number]

export const moduleMeta: Record<
  ModuleId,
  { title: string; desc: string; color: string }
> = {
  M01: {
    title: 'M01 ALS 病生理學',
    desc: '決策導向的瀕死生理與休克/呼吸衰竭判讀',
    color: 'var(--medical-blue)',
  },
  M02: {
    title: 'M02 藥物動力學/藥效學',
    desc: 'PK/PD、給藥途徑與現場用藥決策',
    color: 'var(--medical-purple)',
  },
  M03: {
    title: 'M03 高風險低頻盲點',
    desc: '4 個 microcases 補齊複訓最容易漏掉的盲點',
    color: 'var(--medical-orange)',
  },
  M09: {
    title: 'M09 在地劑量參考表',
    desc: '在地協議劑量速查與關鍵警示',
    color: 'var(--medical-teal)',
  },
}

export const slideOrder = ['M01', 'M02'] as const
export type SlideId = (typeof slideOrder)[number]

export const slideMeta: Record<SlideId, { title: string; desc: string }> = {
  M01: {
    title: moduleMeta.M01.title,
    desc: '決策導向的瀕死生理',
  },
  M02: {
    title: moduleMeta.M02.title,
    desc: 'PK/PD、給藥途徑、現場用藥決策',
  },
}

export const toolOrder = [
  'pump-pipe-tank',
  'nohria-stevenson',
  'pseudopea',
  'oxygenation',
] as const
export type ToolId = (typeof toolOrder)[number]

export const toolMeta: Record<
  ToolId,
  { title: string; description: string; color?: string }
> = {
  'pump-pipe-tank': {
    title: 'Pump-Pipe-Tank',
    description: '休克分類決策樹，從低血壓鑑別到休克類型',
    color: 'var(--medical-navy)',
  },
  'nohria-stevenson': {
    title: 'Nohria-Stevenson',
    description: '急性心衰竭 2x2 血流動力學分類',
    color: 'var(--medical-red)',
  },
  pseudopea: {
    title: 'PseudoPEA 鑑別',
    description: 'True PEA vs PseudoPEA 的判讀與處置分流',
    color: 'var(--medical-purple)',
  },
  oxygenation: {
    title: 'Oxy vs Vent',
    description: '呼吸衰竭分類：Type I 氧合 vs Type II 通氣',
    color: 'var(--medical-teal)',
  },
}

export const studentHandoutPdfFile = 'student-handout.pdf'
