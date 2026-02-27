import type { Quadrant } from '@/data/types'

export const nohriaStevensonData: Quadrant[] = [
  {
    id: 'A',
    label: 'Profile A — Warm & Dry',
    perfusion: 'warm',
    congestion: 'dry',
    clinicalPicture: '灌流正常、無鬱血。代償良好的心衰竭，可能是穩定期或輕度心衰。末梢溫暖、無水腫、無囉音。',
    treatment: [
      '口服藥物優化（ACEi/ARB, Beta-blocker）',
      '門診追蹤',
      '衛教：體重監測、限鹽、規律服藥',
    ],
    drugs: ['ACEi / ARB / ARNI', 'Beta-blocker', 'MRA', 'SGLT2i'],
  },
  {
    id: 'B',
    label: 'Profile B — Warm & Wet',
    perfusion: 'warm',
    congestion: 'wet',
    clinicalPicture: '灌流正常但有鬱血。最常見的急性心衰竭表現。端坐呼吸、雙下肺囉音、下肢水腫、JVD。',
    treatment: [
      'IV 利尿劑（Furosemide）',
      '氧氣 / NIPPV（若呼吸窘迫）',
      'Nitroglycerin（若 SBP > 110）',
      '限水限鹽',
    ],
    drugs: ['Furosemide 40-80mg IV', 'NTG drip', 'Morphine（謹慎使用）'],
    danger: '若 SBP 下降 → 轉為 Profile C（最危險）',
    scenarioLink: 'S01',
  },
  {
    id: 'L',
    label: 'Profile L — Cold & Dry',
    perfusion: 'cold',
    congestion: 'dry',
    clinicalPicture: '灌流不足但無鬱血。可能過度利尿或脫水。末梢冰冷、低血壓、無囉音、無水腫。',
    treatment: [
      '謹慎輸液挑戰（250mL bolus，觀察反應）',
      '減少或停止利尿劑',
      '考慮強心劑',
    ],
    drugs: ['NS 250mL bolus', 'Dobutamine（若需強心）'],
  },
  {
    id: 'C',
    label: 'Profile C — Cold & Wet',
    perfusion: 'cold',
    congestion: 'wet',
    clinicalPicture: '灌流不足且有鬱血。最危險的血流動力學狀態 = 心因性休克。末梢冰冷、低血壓、肺水腫、意識改變。',
    treatment: [
      '升壓劑 / 強心劑',
      '避免過度輸液',
      '考慮機械循環支持（IABP, ECMO）',
      '緊急處理根本原因（PCI, 手術）',
    ],
    drugs: ['Norepinephrine', 'Dobutamine', 'Milrinone'],
    danger: '死亡率最高，需 ICU 照護',
    scenarioLink: 'S01',
  },
]

export const axisLabels = {
  horizontal: { left: 'Warm（灌流正常）', right: 'Cold（灌流不足）' },
  vertical: { top: 'Dry（無鬱血）', bottom: 'Wet（有鬱血）' },
}
