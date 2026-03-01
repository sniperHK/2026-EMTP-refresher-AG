import type { Quadrant } from "../types";

export const nohriaStevensonData: Quadrant[] = [
  {
    id: "A",
    label: "Warm + Dry",
    perfusion: "warm",
    congestion: "dry",
    clinicalPicture: "穩定代償，生命徵象正常",
    treatment: ["觀察", "口服藥物調整"],
    drugs: [],
    scenarioLink: undefined,
  },
  {
    id: "B",
    label: "Warm + Wet",
    perfusion: "warm",
    congestion: "wet",
    clinicalPicture:
      "高血壓 + 雙側囉音 + 端坐呼吸 + 粉紅泡沫痰（SCAPE）",
    treatment: [
      "NTG SL 0.4mg q3-5min",
      "CPAP 10 cmH\u2082O",
      "坐姿 + 高流量 O\u2082",
    ],
    drugs: ["NTG"],
    danger: "SBP<90 \u2192 立即停 NTG \u2192 轉 C 象限",
    scenarioLink: "S05",
  },
  {
    id: "L",
    label: "Cold + Dry",
    perfusion: "cold",
    congestion: "dry",
    clinicalPicture: "低灌流、肺音乾淨、末梢冰冷",
    treatment: ["小量輸液試探"],
    drugs: ["NS 250mL bolus"],
    scenarioLink: undefined,
  },
  {
    id: "C",
    label: "Cold + Wet",
    perfusion: "cold",
    congestion: "wet",
    clinicalPicture: "低灌流 + 肺水腫（最危險）",
    treatment: ["升壓藥", "強心藥", "禁止大量輸液"],
    drugs: [
      "Push-dose Epi 10-20 mcg",
      "Norepinephrine drip",
      "Dobutamine",
    ],
    danger: "最危險！不能輸液！",
    scenarioLink: "S05",
  },
];

export const axisLabels = {
  horizontal: { left: "Warm", right: "Cold" },
  vertical: { top: "Dry", bottom: "Wet" },
};
