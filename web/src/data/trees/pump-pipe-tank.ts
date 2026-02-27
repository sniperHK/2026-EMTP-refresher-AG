import type { TreeNode } from '@/data/types'

export const pumpPipeTankTree: Record<string, TreeNode> = {
  root: {
    id: 'root',
    type: 'question',
    label: '低血壓鑑別',
    description: '系統性血壓 < 90 mmHg 或 MAP < 65 mmHg',
    color: 'var(--medical-navy)',
    children: [
      { label: '評估心臟功能', targetId: 'pump-check' },
      { label: '評估管路通暢', targetId: 'pipe-check' },
      { label: '評估容積狀態', targetId: 'tank-check' },
    ],
  },
  'pump-check': {
    id: 'pump-check',
    type: 'question',
    label: 'Pump — 心臟功能',
    description: '心臟是否有效收縮？JVD？肺水腫？',
    color: 'var(--medical-red)',
    children: [
      { label: 'JVD (+)、肺囉音 (+)、末梢冰冷', targetId: 'pump-cardiogenic' },
      { label: '心率極快/極慢', targetId: 'pump-rate' },
      { label: '心音遙遠、JVD、低血壓', targetId: 'pump-tamponade' },
    ],
  },
  'pump-cardiogenic': {
    id: 'pump-cardiogenic',
    type: 'result',
    label: '心因性休克',
    description: 'Cardiogenic Shock — 泵衰竭。治療：升壓劑、避免過度輸液、緊急 PCI（若 STEMI）。',
    color: 'var(--medical-red)',
  },
  'pump-rate': {
    id: 'pump-rate',
    type: 'result',
    label: '心律不整性休克',
    description: '過快（SVT/VT）→ 同步電擊。過慢（高度 AV block）→ TCP/Atropine。',
    color: 'var(--medical-red)',
  },
  'pump-tamponade': {
    id: 'pump-tamponade',
    type: 'result',
    label: '心包膜填塞',
    description: "Beck's Triad：低血壓 + JVD + 心音遙遠。治療：心包穿刺引流。",
    color: 'var(--medical-red)',
  },
  'pipe-check': {
    id: 'pipe-check',
    type: 'question',
    label: 'Pipe — 管路通暢',
    description: '血液回流是否受阻？是否有阻塞性原因？',
    color: 'var(--medical-blue)',
    children: [
      { label: '氣管偏移、患側呼吸音消失', targetId: 'pipe-tension' },
      { label: '突發呼吸困難、低 ETCO2、DVT 風險', targetId: 'pipe-pe' },
    ],
  },
  'pipe-tension': {
    id: 'pipe-tension',
    type: 'result',
    label: '張力性氣胸',
    description: 'Tension Pneumothorax — 胸腔內壓增加阻礙回流。治療：針刺減壓。',
    color: 'var(--medical-blue)',
  },
  'pipe-pe': {
    id: 'pipe-pe',
    type: 'result',
    label: '急性肺栓塞',
    description: 'Massive PE — 肺動脈阻塞。低 ETCO2 是關鍵線索。治療：抗凝/溶栓。',
    color: 'var(--medical-blue)',
  },
  'tank-check': {
    id: 'tank-check',
    type: 'question',
    label: 'Tank — 容積狀態',
    description: '有效循環血量是否不足？血管擴張或出血？',
    color: 'var(--medical-orange)',
    children: [
      { label: '外傷出血、消化道出血', targetId: 'tank-hemorrhagic' },
      { label: '過敏反應、蕁麻疹', targetId: 'tank-anaphylactic' },
      { label: '感染 + 發燒 + 意識改變', targetId: 'tank-septic' },
      { label: '脊髓損傷、四肢癱瘓', targetId: 'tank-neurogenic' },
    ],
  },
  'tank-hemorrhagic': {
    id: 'tank-hemorrhagic',
    type: 'result',
    label: '出血性休克',
    description: 'Hemorrhagic Shock — 絕對性血量不足。治療：止血 + 大量輸液/輸血。',
    color: 'var(--medical-orange)',
  },
  'tank-anaphylactic': {
    id: 'tank-anaphylactic',
    type: 'result',
    label: '過敏性休克',
    description: 'Anaphylactic Shock — 血管擴張致相對性血量不足。治療：Epinephrine IM + 輸液。',
    color: 'var(--medical-orange)',
  },
  'tank-septic': {
    id: 'tank-septic',
    type: 'result',
    label: '敗血性休克',
    description: 'Septic Shock — 感染致血管擴張 + 通透性增加。治療：輸液 30mL/kg + 升壓劑 + 抗生素。',
    color: 'var(--medical-orange)',
  },
  'tank-neurogenic': {
    id: 'tank-neurogenic',
    type: 'result',
    label: '神經性休克',
    description: 'Neurogenic Shock — 交感神經失調致血管擴張。特徵：低血壓 + 心搏過緩。治療：輸液 + 升壓劑。',
    color: 'var(--medical-orange)',
  },
}

export const rootNodeId = 'root'
