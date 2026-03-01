import type { TreeNode } from "../types";

const _pptNodes: TreeNode[] = [
  {
    id: "ppt-root",
    type: "question",
    label: "SBP < 90 mmHg — 低血壓鑑別",
    description: "病人出現低血壓，用 Pump-Pipe-Tank 模型快速鑑別休克類型",
    color: "#E74C3C",
    children: [
      { label: "末梢冰冷（Cold）", targetId: "ppt-cold" },
      { label: "末梢溫暖（Warm）", targetId: "ppt-warm" },
    ],
  },
  {
    id: "ppt-cold",
    type: "branch",
    label: "末梢冰冷 — 血管收縮代償中",
    description: "交感神經啟動，周邊血管收縮 → 考慮 Pump 或 Tank 問題",
    children: [
      { label: "JVD 怒張", targetId: "ppt-cold-jvd" },
      { label: "JVD 扁平", targetId: "ppt-cold-flat" },
    ],
  },
  {
    id: "ppt-cold-jvd",
    type: "branch",
    label: "冰冷 + JVD 怒張 — 血液回不了心臟或心臟打不出去",
    description: "靜脈回流受阻或心臟充盈後無法有效排出",
    children: [
      { label: "肺音乾淨 + 單側呼吸音消失", targetId: "ppt-pipe-blocked" },
      { label: "雙側濕囉音", targetId: "ppt-pump-weak" },
    ],
  },
  {
    id: "ppt-cold-flat",
    type: "branch",
    label: "冰冷 + JVD 扁平 — 血管內容量不足",
    description: "血管收縮代償但靜脈充盈不足，典型低血容表現",
    children: [
      { label: "出血/外傷", targetId: "ppt-tank-empty" },
      { label: "脫水/燒傷", targetId: "ppt-tank-leak" },
    ],
  },
  {
    id: "ppt-warm",
    type: "branch",
    label: "末梢溫暖 — 血管擴張",
    description: "周邊血管擴張，血液再分佈到外周，有效循環容量不足",
    children: [
      { label: "蕁麻疹 + Stridor", targetId: "ppt-pipe-loose-anaphy" },
      { label: "發燒 + 感染源", targetId: "ppt-pipe-loose-sepsis" },
    ],
  },
  {
    id: "ppt-tank-empty",
    type: "result",
    label: "Tank Empty — 低血容休克（出血性）",
    description:
      "Tank 水箱漏光了。血管內容量嚴重不足。治療：止血 + 補液 + 快速後送手術止血。",
    color: "#C0392B",
    children: [{ label: "對應情境", targetId: "ppt-link-S02" }],
  },
  {
    id: "ppt-tank-leak",
    type: "result",
    label: "Tank Leak — 低血容休克（非出血性）",
    description:
      "Tank 水箱滲漏。脫水、燒傷、嚴重嘔吐/腹瀉造成的容量喪失。治療：補液。",
    color: "#C0392B",
  },
  {
    id: "ppt-pipe-blocked",
    type: "result",
    label: "Pipe Blocked — 阻塞性休克",
    description:
      "管路被壓住。張力性氣胸、心包填塞、大面積肺栓塞。靜脈回流受阻 → JVD + 低血壓。治療：解除阻塞（針刺減壓/心包穿刺）。",
    color: "#2980B9",
    children: [{ label: "對應情境", targetId: "ppt-link-S01" }],
  },
  {
    id: "ppt-pump-weak",
    type: "result",
    label: "Pump Weak — 心因性休克",
    description:
      "幫浦壞掉了。心肌梗塞、心肌炎、嚴重瓣膜病。心臟收縮力不足 → 肺水腫 + 低灌流。治療：升壓藥/強心劑，禁止大量輸液。",
    color: "#16A085",
    children: [{ label: "對應情境", targetId: "ppt-link-S05" }],
  },
  {
    id: "ppt-pipe-loose-anaphy",
    type: "result",
    label: "Pipe Loose — 分佈性休克（過敏性）",
    description:
      "管路太鬆了。過敏性休克：組織胺造成全身血管擴張。溫暖潮紅 + 低血壓 + 氣道水腫。治療：Epinephrine IM。",
    color: "#F39C12",
    children: [{ label: "對應情境", targetId: "ppt-link-S03" }],
  },
  {
    id: "ppt-pipe-loose-sepsis",
    type: "result",
    label: "Pipe Loose — 分佈性休克（敗血性）",
    description:
      "管路太鬆了。敗血性休克：感染引起的全身性發炎反應造成血管擴張。治療：抗生素 + 輸液 + 升壓藥。",
    color: "#F39C12",
  },
  {
    id: "ppt-link-S01",
    type: "action",
    label: "→ S01 張力性氣胸情境",
    color: "#2980B9",
  },
  {
    id: "ppt-link-S02",
    type: "action",
    label: "→ S02 低血容休克情境",
    color: "#C0392B",
  },
  {
    id: "ppt-link-S03",
    type: "action",
    label: "→ S03 過敏性休克情境",
    color: "#F39C12",
  },
  {
    id: "ppt-link-S05",
    type: "action",
    label: "→ S05 心因性休克情境",
    color: "#16A085",
  },
];

export const pumpPipeTankTree: Record<string, TreeNode> = Object.fromEntries(
  _pptNodes.map((n) => [n.id, n])
);

export const rootNodeId = "ppt-root";
