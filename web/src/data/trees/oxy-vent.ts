import type { TreeNode } from "../types";

const _ovNodes: TreeNode[] = [
  {
    id: "ov-root",
    type: "question",
    label: "呼吸窘迫評估",
    description:
      "病人出現呼吸困難。先評估 SpO\u2082 和呼吸速率（RR），快速分類問題屬於氧合、通氣、還是機械性障礙",
    color: "#2980B9",
    children: [
      { label: "SpO\u2082 偏低（< 94%）", targetId: "ov-spo2-low" },
      { label: "SpO\u2082 正常（\u2265 94%）", targetId: "ov-spo2-normal" },
    ],
  },
  {
    id: "ov-spo2-low",
    type: "branch",
    label: "SpO\u2082 偏低 — 氧氣進入有問題",
    description: "血氧飽和度下降，表示肺泡氣體交換或氧氣輸送出了問題",
    children: [
      { label: "RR 快（> 24）+ 呼吸費力", targetId: "ov-low-fast" },
      { label: "RR 慢/淺（< 12 或淺弱）", targetId: "ov-low-slow" },
      { label: "RR 正常但持續低 SpO\u2082", targetId: "ov-low-normal-rr" },
    ],
  },
  {
    id: "ov-spo2-normal",
    type: "branch",
    label: "SpO\u2082 正常 — 但病人仍呼吸困難",
    description:
      "血氧飽和度正常不代表沒事！可能是通氣問題（CO\u2082 排不出去）或代償性呼吸",
    children: [
      { label: "RR 正常/偏慢 + 意識改變", targetId: "ov-normal-slow" },
      { label: "RR 快 + 深大呼吸", targetId: "ov-normal-fast" },
      { label: "機械性阻礙徵兆", targetId: "ov-mechanical" },
    ],
  },
  {
    id: "ov-low-fast",
    type: "result",
    label: "氧合問題（Oxygenation Failure）",
    description:
      "SpO\u2082 低 + RR 快 = 肺泡層面的氣體交換障礙。病人在努力呼吸但氧氣就是進不去。\n\n常見原因：肺炎、肺水腫（APE）、ARDS、肺栓塞\n\n處置：\n\u2022 高濃度氧（NRM 15L/min）\n\u2022 CPAP/BiPAP（若適合）\n\u2022 坐姿\n\u2022 治療根本原因",
    color: "#E74C3C",
    children: [
      { label: "高濃度氧 + CPAP", targetId: "ov-action-o2-cpap" },
    ],
  },
  {
    id: "ov-low-slow",
    type: "result",
    label: "通氣問題（Ventilation Failure）",
    description:
      "SpO\u2082 低 + RR 慢/淺 = 呼吸驅動力不足或呼吸肌衰竭。病人沒有在有效呼吸，CO\u2082 堆積且 O\u2082 也進不去。\n\n常見原因：藥物過量（opioid）、頭部外傷、神經肌肉疾病、呼吸肌疲勞\n\n處置：\n\u2022 BVM 輔助通氣\n\u2022 考慮 Naloxone（若疑 opioid）\n\u2022 準備插管",
    color: "#8E44AD",
    children: [
      { label: "BVM / 插管", targetId: "ov-action-bvm" },
    ],
  },
  {
    id: "ov-low-normal-rr",
    type: "result",
    label: "氧合問題 — 安靜型低氧",
    description:
      "SpO\u2082 低但 RR 正常 = 肺內分流（shunt）或擴散障礙。病人可能看起來「沒那麼喘」但血氧持續低。\n\n常見原因：肺栓塞、右到左分流、肺纖維化\n\n處置：\n\u2022 高濃度氧\n\u2022 若對 O\u2082 反應差 → 考慮嚴重分流\n\u2022 評估根本原因",
    color: "#E67E22",
  },
  {
    id: "ov-normal-slow",
    type: "branch",
    label: "通氣衰竭前兆 — 看 EtCO\u2082",
    description:
      "SpO\u2082 正常但 RR 偏慢 + 意識改變 → CO\u2082 可能正在堆積。用 EtCO\u2082 確認",
    children: [
      { label: "EtCO\u2082 > 45 mmHg（高）", targetId: "ov-etco2-high" },
      { label: "EtCO\u2082 正常（35-45）", targetId: "ov-etco2-normal" },
    ],
  },
  {
    id: "ov-normal-fast",
    type: "result",
    label: "代償性過度換氣",
    description:
      "SpO\u2082 正常 + RR 快 + 深大呼吸 = 可能是代謝性酸中毒的呼吸代償（Kussmaul breathing）。\n\n常見原因：DKA、敗血症、腎衰竭、中毒（methanol、ethylene glycol）\n\n處置：\n\u2022 不要試圖壓制呼吸速率！\n\u2022 治療根本原因\n\u2022 補充 O\u2082\n\u2022 注意：插管可能危險（拿掉代償機制 → 酸中毒加劇）",
    color: "#F39C12",
  },
  {
    id: "ov-mechanical",
    type: "result",
    label: "機械性呼吸障礙",
    description:
      "氣道或胸廓的物理性阻礙。SpO\u2082 可能正常（初期）或偏低（進展後）。\n\n常見原因：\n\u2022 上呼吸道：異物、血管性水腫、喉痙攣\n\u2022 下呼吸道：嚴重氣喘\n\u2022 胸廓：氣胸、連枷胸（flail chest）\n\n處置：針對病因 — 移除異物、Epi（血管性水腫）、針刺減壓（氣胸）",
    color: "#2980B9",
    children: [
      { label: "對應 S01 張力性氣胸", targetId: "ov-link-S01" },
    ],
  },
  {
    id: "ov-etco2-high",
    type: "result",
    label: "通氣衰竭 — CO\u2082 堆積",
    description:
      "EtCO\u2082 升高確認通氣不足。CO\u2082 堆積會造成意識改變（CO\u2082 narcosis）並最終導致呼吸停止。\n\n處置：\n\u2022 輔助通氣（BVM）\n\u2022 準備插管\n\u2022 若疑 opioid → Naloxone\n\u2022 持續監測 EtCO\u2082",
    color: "#8E44AD",
    children: [
      { label: "BVM / 插管", targetId: "ov-action-bvm" },
    ],
  },
  {
    id: "ov-etco2-normal",
    type: "result",
    label: "非呼吸性原因 — 考慮其他病因",
    description:
      "SpO\u2082 正常、EtCO\u2082 正常、但有意識改變 → 問題可能不在呼吸系統。\n\n考慮：低血糖、中風、癲癇後（postictal）、中毒",
    color: "#95A5A6",
  },
  {
    id: "ov-action-o2-cpap",
    type: "action",
    label: "高濃度 O\u2082 + CPAP",
    description:
      "NRM 15L/min 或 CPAP 10 cmH\u2082O。CPAP 可將肺泡內液體推回血管（適用於 APE），並增加功能殘餘容量（FRC）",
  },
  {
    id: "ov-action-bvm",
    type: "action",
    label: "BVM 輔助通氣 / 準備插管",
    description:
      "BVM 速率 10-12 次/min，每次送氣時間 1 秒。避免過度通氣。準備 RSI 插管所需設備",
  },
  {
    id: "ov-link-S01",
    type: "action",
    label: "\u2192 S01 張力性氣胸情境",
    color: "#2980B9",
  },
];

export const oxyVentTree: Record<string, TreeNode> = Object.fromEntries(
  _ovNodes.map((n) => [n.id, n])
);

export const oxyVentRootId = "ov-root";
