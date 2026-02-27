import type { TreeNode } from '@/data/types'

export const oxyVentTree: Record<string, TreeNode> = {
  start: {
    id: 'start',
    type: 'question',
    label: '呼吸問題鑑別',
    description: '先評估氧合（Oxygenation）與通氣（Ventilation）',
    color: 'var(--medical-navy)',
    children: [
      { label: '評估 SpO2', targetId: 'spo2-check' },
    ],
  },
  'spo2-check': {
    id: 'spo2-check',
    type: 'question',
    label: 'SpO2 評估',
    description: '使用脈搏血氧儀測量 SpO2',
    color: 'var(--medical-blue)',
    children: [
      { label: 'SpO2 < 94%（低血氧）', targetId: 'low-spo2' },
      { label: 'SpO2 ≥ 94%（正常）', targetId: 'normal-spo2' },
    ],
  },
  'low-spo2': {
    id: 'low-spo2',
    type: 'question',
    label: '低血氧 — 氧合問題',
    description: 'Oxygenation failure：O2 無法進入血液',
    color: 'var(--medical-red)',
    children: [
      { label: '評估呼吸速率', targetId: 'low-spo2-rr' },
    ],
  },
  'low-spo2-rr': {
    id: 'low-spo2-rr',
    type: 'question',
    label: '呼吸速率評估',
    description: '低血氧狀態下的呼吸速率',
    color: 'var(--medical-red)',
    children: [
      { label: 'RR 快（> 20）', targetId: 'oxy-fail-tachypnea' },
      { label: 'RR 慢（< 12）或正常', targetId: 'oxy-fail-normal-rr' },
    ],
  },
  'oxy-fail-tachypnea': {
    id: 'oxy-fail-tachypnea',
    type: 'result',
    label: '氧合衰竭（Type I）+ 代償性呼吸快',
    description: '常見原因：肺炎、肺水腫、ARDS、肺栓塞。處置：高流量 O2（NRM 15L）→ 若無改善考慮 NIPPV / 插管。',
    color: 'var(--medical-red)',
  },
  'oxy-fail-normal-rr': {
    id: 'oxy-fail-normal-rr',
    type: 'result',
    label: '氧合 + 通氣雙重衰竭',
    description: '呼吸中樞抑制或肌肉疲勞。常見原因：藥物過量、神經肌肉疾病、呼吸衰竭末期。處置：BVM 輔助通氣 + 高流量 O2 → 準備插管。',
    color: 'var(--medical-purple)',
  },
  'normal-spo2': {
    id: 'normal-spo2',
    type: 'question',
    label: 'SpO2 正常 — 評估 ETCO2 / RR',
    description: '氧合正常不代表通氣正常。需評估 ETCO2 和呼吸速率。',
    color: 'var(--medical-green)',
    children: [
      { label: 'RR 快（> 20）+ ETCO2 低', targetId: 'vent-hypervent' },
      { label: 'RR 慢（< 12）+ ETCO2 高', targetId: 'vent-hypovent' },
      { label: 'RR 正常 + ETCO2 正常', targetId: 'vent-normal' },
    ],
  },
  'vent-hypervent': {
    id: 'vent-hypervent',
    type: 'result',
    label: '過度換氣',
    description: '可能原因：焦慮 / 代謝性酸中毒代償（DKA）/ 早期 PE / 疼痛。先排除危急原因，若為焦慮：coaching breathing。ETCO2 偏低但 SpO2 正常。',
    color: 'var(--medical-orange)',
  },
  'vent-hypovent': {
    id: 'vent-hypovent',
    type: 'result',
    label: '通氣衰竭（Type II）',
    description: 'Ventilation failure：CO2 無法排出。常見原因：COPD 急性惡化、藥物過量、肥胖低通氣。ETCO2 升高 > 45 mmHg。處置：輔助通氣（BVM/NIPPV）→ 視情況插管。',
    color: 'var(--medical-red)',
  },
  'vent-normal': {
    id: 'vent-normal',
    type: 'result',
    label: '氧合與通氣皆正常',
    description: '持續監測。考慮其他原因造成的呼吸不適（胸痛、焦慮、貧血等）。',
    color: 'var(--medical-green)',
  },
}

export const oxyVentRootId = 'start'
