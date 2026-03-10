import type { TreeNode } from "../types";

const _peaNodes: TreeNode[] = [
  {
    id: "pea-root",
    type: "question",
    label: "ECG organized rhythm + 脈搏摸不到",
    description:
      "心電圖顯示有組織性電氣活動（非 VF/Asystole），但觸診無脈搏。這是 PEA — 但需要進一步鑑別",
    color: "#8E44AD",
    children: [
      { label: "有 POCUS", targetId: "pea-pocus" },
      { label: "沒有 POCUS", targetId: "pea-no-pocus" },
    ],
  },
  {
    id: "pea-pocus",
    type: "branch",
    label: "POCUS 評估心臟收縮",
    description:
      "若有受訓操作者且不延長 rhythm-check 暫停，可用超音波觀察是否有機械性收縮（wall motion）。這是重要輔助資訊，但不是唯一依據。",
    children: [
      { label: "心臟有收縮（wall motion +）", targetId: "pea-pseudo" },
      { label: "心臟無收縮（wall motion −）", targetId: "pea-true" },
    ],
  },
  {
    id: "pea-pseudo",
    type: "result",
    label: "PseudoPEA — 心臟有微弱收縮",
    description:
      "心臟可能仍有微弱收縮，代表極低流量（extreme low-flow / shock physiology）。\n\n處置重點：\n\u2022 不要為了鑑別而延長 CPR 暫停\n\u2022 若已快速確認有收縮，優先找 reversible causes 並以小量升壓支持\n\u2022 Push-dose Epi 10-20 mcg IV q1-2min（依反應重評）\n\u2022 考慮 Norepinephrine drip\n\u2022 避免直接套用 ACLS 劑量 Epi 1mg",
    color: "#E67E22",
    children: [
      { label: "Push-dose Epi", targetId: "pea-action-push-epi" },
      { label: "找根本原因", targetId: "pea-action-cause" },
    ],
  },
  {
    id: "pea-true",
    type: "result",
    label: "True PEA — 心臟完全無機械收縮",
    description:
      "電氣活動和機械收縮完全脫鉤。心臟沒有在跳。\n\n處置：\n\u2022 標準 ACLS：高品質 CPR + Epi 1mg IV/IO q3-5min\n\u2022 不可電擊（PEA 非 shockable rhythm）\n\u2022 積極尋找並治療可逆原因（H's and T's）\n\u2022 考慮超音波引導的心包穿刺（若疑似心包填塞）",
    color: "#C0392B",
    children: [
      { label: "ACLS 流程", targetId: "pea-action-acls" },
      { label: "H's and T's", targetId: "pea-action-ht" },
    ],
  },
  {
    id: "pea-no-pocus",
    type: "branch",
    label: "無 POCUS — 臨床判斷",
    description:
      "沒有超音波時，只能依 low-flow 線索輔助判斷。若無法快速確認，不要為了 pseudoPEA 假設而打亂標準 resuscitation 節奏。",
    children: [
      {
        label: "有些許生命徵象（微弱呼吸、瞳孔反應、EtCO\u2082 > 20）",
        targetId: "pea-clinical-pseudo",
      },
      {
        label: "完全無生命徵象",
        targetId: "pea-clinical-true",
      },
    ],
  },
  {
    id: "pea-clinical-pseudo",
    type: "result",
    label: "疑似 PseudoPEA — 考慮升壓藥",
    description:
      "臨床線索支持可能仍有微弱收縮：\n\u2022 微弱的呼吸動作\n\u2022 瞳孔對光反應存在\n\u2022 EtCO\u2082 > 20 mmHg（提示仍有一定程度循環）\n\n處置：不要延長節律檢查；優先找 reversible causes。若整體情境強烈支持 pseudoPEA，可依在地 protocol 小量升壓；若無法快速確認，回到標準 PEA 流程。",
    color: "#E67E22",
  },
  {
    id: "pea-clinical-true",
    type: "result",
    label: "疑似 True PEA — 標準 ACLS",
    description:
      "無任何殘餘生命徵象，假定為 True PEA。\n執行標準 ACLS 流程：CPR + Epi 1mg + 找可逆原因",
    color: "#C0392B",
  },
  {
    id: "pea-action-push-epi",
    type: "action",
    label: "Push-dose Epi 10-20 mcg IV",
    description:
      "製備：Epi 1mg/10mL 取 1mL + NS 9mL = 10 mcg/mL。推 1-2 mL（10-20 mcg），每 1-2 分鐘依反應重評。",
    color: "#E67E22",
  },
  {
    id: "pea-action-cause",
    type: "action",
    label: "尋找根本原因",
    description:
      "PseudoPEA 的常見原因：\n\u2022 嚴重低血容（出血、脫水）\n\u2022 心肌梗塞（STEMI → PCI）\n\u2022 心包填塞\n\u2022 張力性氣胸\n\u2022 嚴重電解質異常",
    color: "#3498DB",
  },
  {
    id: "pea-action-acls",
    type: "action",
    label: "標準 ACLS — CPR + Epi 1mg",
    description:
      "高品質 CPR（深度 5-6cm、速率 100-120）+ Epi 1mg IV/IO q3-5min + 不電擊 + 找可逆原因",
    color: "#C0392B",
  },
  {
    id: "pea-action-ht",
    type: "action",
    label: "H's and T's — 可逆原因",
    description:
      "H's：Hypovolemia、Hypoxia、H+ (Acidosis)、Hypo/Hyperkalemia、Hypothermia\nT's：Tension pneumothorax、Tamponade、Toxins、Thrombosis (PE/MI)",
    color: "#3498DB",
  },
];

export const pseudoPEATree: Record<string, TreeNode> = Object.fromEntries(
  _peaNodes.map((n) => [n.id, n])
);

export const pseudoPEARootId = "pea-root";

export const comparisonTable = {
  headers: ["項目", "True PEA", "PseudoPEA"],
  rows: [
    ["心臟收縮", "無（POCUS wall motion −）", "有微弱收縮（wall motion +）"],
    ["Epi 劑量", "1 mg IV/IO q3-5min", "10-20 mcg push-dose q1-2min"],
    ["CPR", "立即高品質 CPR", "不延長暫停；若已快速確認有收縮，優先處理 low-flow shock"],
    ["EtCO₂", "可能極低（< 10）", "可能 > 20 mmHg"],
    ["處置重點", "CPR + 找 H's & T's", "升壓藥 + 找根本原因"],
    ["常見原因", "嚴重缺氧、電解質、心包填塞", "低血容、心肌梗塞、張力性氣胸"],
  ],
};
