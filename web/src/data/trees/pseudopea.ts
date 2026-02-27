import type { TreeNode } from '@/data/types'

export const pseudoPEATree: Record<string, TreeNode> = {
  start: {
    id: 'start',
    type: 'question',
    label: 'PEA 心律',
    description: '心電圖有組織性電位活動，但無脈搏',
    color: 'var(--medical-navy)',
    children: [
      { label: '執行 POCUS', targetId: 'pocus' },
    ],
  },
  pocus: {
    id: 'pocus',
    type: 'question',
    label: 'POCUS 心臟超音波',
    description: '觀察心臟是否有收縮活動',
    color: 'var(--medical-blue)',
    children: [
      { label: '心臟有收縮活動', targetId: 'pseudo-pea' },
      { label: '心臟無收縮活動', targetId: 'true-pea' },
    ],
  },
  'pseudo-pea': {
    id: 'pseudo-pea',
    type: 'question',
    label: 'Pseudo-PEA（假性 PEA）',
    description: '心臟仍在收縮，但產生的壓力不足以觸摸到脈搏（SBP 通常 40-60 mmHg）',
    color: 'var(--medical-green)',
    children: [
      { label: '尋找可逆原因', targetId: 'pseudo-reversible' },
    ],
  },
  'pseudo-reversible': {
    id: 'pseudo-reversible',
    type: 'action',
    label: 'Pseudo-PEA 處置',
    description: '積極治療可逆原因（5H5T），預後較好。考慮：升壓劑（高劑量）、輸液（若低血容量）、針刺減壓（若張力性氣胸）、心包穿刺（若填塞）。ETCO2 通常 > 20 mmHg。',
    color: 'var(--medical-green)',
    children: [
      { label: 'ETCO2 > 20, 有改善機會', targetId: 'pseudo-outcome' },
    ],
  },
  'pseudo-outcome': {
    id: 'pseudo-outcome',
    type: 'result',
    label: '可能恢復自主循環（ROSC）',
    description: '積極處理可逆原因 + 升壓支持，ROSC 機率較高。存活率約 50-60%（若及時處理）。',
    color: 'var(--medical-green)',
  },
  'true-pea': {
    id: 'true-pea',
    type: 'question',
    label: 'True PEA（真性 PEA）',
    description: '心臟已無有效收縮活動，僅有電位活動。本質上接近 asystole。',
    color: 'var(--medical-red)',
    children: [
      { label: '標準 ACLS 流程', targetId: 'true-treatment' },
    ],
  },
  'true-treatment': {
    id: 'true-treatment',
    type: 'action',
    label: 'True PEA 處置',
    description: '標準 CPR + Epinephrine q3-5min。仍需排除可逆原因（5H5T），但預後差。ETCO2 通常 < 10 mmHg。',
    color: 'var(--medical-red)',
    children: [
      { label: 'ETCO2 < 10, 預後不佳', targetId: 'true-outcome' },
    ],
  },
  'true-outcome': {
    id: 'true-outcome',
    type: 'result',
    label: '預後不佳',
    description: '存活率 < 5%。若 ETCO2 持續 < 10 mmHg 超過 20 分鐘，考慮終止急救。',
    color: 'var(--medical-red)',
  },
}

export const pseudoPEARootId = 'start'

export const comparisonTable = {
  headers: ['特徵', 'True PEA', 'Pseudo-PEA'],
  rows: [
    ['心臟超音波', '無收縮', '有收縮活動'],
    ['ETCO2', '< 10 mmHg', '> 20 mmHg'],
    ['血壓（動脈導管）', '幾乎無', '40-60 mmHg'],
    ['可逆原因', '需排除但效果差', '積極處理效果好'],
    ['升壓劑反應', '差', '可能有效'],
    ['存活率', '< 5%', '50-60%'],
    ['預後', '極差', '取決於原因'],
  ],
}
