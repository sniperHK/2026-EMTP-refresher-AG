import type { Scenario } from "../types";

export const S05: Scenario = {
  id: "S05",
  title: "心因性休克 + 急性肺水腫",
  subtitle: "65 歲男性 — SCAPE 到 Nohria-Stevenson 象限轉移",
  duration: "10 分鐘",
  pumpPipeTank: "pump",
  color: "#16A085",
  stages: [
    {
      id: "S05-T0",
      label: "T0 — 到場評估",
      narrative:
        "65 歲男性，有高血壓和糖尿病病史。太太描述半夜突然坐起來喘、咳出粉紅色泡沫痰。到場時病人坐在床緣，極度呼吸困難，無法平躺。雙側肺部瀰漫性濕囉音（bilateral crackles），粉紅泡沫痰從口鼻湧出。血壓極高（180/110），末梢溫暖。12 導程 ECG 顯示 V1-V4 ST elevation。",
      vitals: {
        hr: 110,
        bp: "180/110",
        spo2: 88,
        rr: 32,
        rhythm: "Sinus Tachycardia",
        gcs: "E4V4M6",
      },
      findings: [
        "端坐呼吸（orthopnea）— 無法平躺",
        "雙側瀰漫性濕囉音",
        "粉紅色泡沫痰",
        "血壓極高 180/110",
        "末梢溫暖",
        "ECG: V1-V4 ST elevation（前壁 STEMI）",
      ],
      decision: {
        question:
          "用 Nohria-Stevenson 模型分類：此病人目前在哪個象限？最佳處置策略是什麼？",
        options: [
          {
            id: "S05-T0-A",
            text: "B 象限（Warm + Wet）→ NTG 舌下 + CPAP — 這是 SCAPE",
            correct: true,
            feedback:
              "正確！末梢溫暖（灌流正常 = Warm）+ 肺水腫（充血 = Wet）= B 象限。高血壓 + 急性肺水腫 = SCAPE（Sympathetic Crashing Acute Pulmonary Edema）。治療核心是降低後負荷（NTG 擴張血管）+ CPAP（正壓通氣將肺水推回血管）。SCAPE 不是容量過多 — 是血管痙攣把血液擠進肺部。",
          },
          {
            id: "S05-T0-B",
            text: "C 象限（Cold + Wet）→ 升壓藥 + 強心劑",
            correct: false,
            feedback:
              "此時末梢是溫暖的（Warm），不是冰冷的（Cold）。C 象限的特徵是低灌流 + 肺水腫，但此病人目前灌流是正常的（暫時）。不過要注意：如果處理不當，B 象限可以轉移到 C 象限 — 這正是接下來會發生的事。",
          },
          {
            id: "S05-T0-C",
            text: "A 象限（Warm + Dry）→ 觀察即可",
            correct: false,
            feedback:
              "明顯有肺水腫（Wet），絕對不是 Dry。雙側囉音 + 粉紅泡沫痰 = 嚴重的肺充血。A 象限是穩定代償的心衰竭，此病人正在急性失代償。",
          },
          {
            id: "S05-T0-D",
            text: "低血容休克 — 先大量輸液",
            correct: false,
            feedback:
              "絕對禁忌！此病人血壓 180/110 + 肺已經充滿水了。大量輸液會讓肺水腫更嚴重，可能直接淹死病人。這是 SCAPE，需要的是減少容量負荷（NTG 擴張血管）和正壓通氣（CPAP 把水擠出肺泡），不是加水。",
          },
        ],
      },
      teachingPoint:
        "SCAPE（Sympathetic Crashing Acute Pulmonary Edema）= 交感神經風暴引起的急性肺水腫。機轉：交感神經過度活化 → 全身血管痙攣 → 後負荷劇增 → 左心無法排空 → 血液回堵到肺部 → 肺水腫。所以 SCAPE 的核心治療不是利尿劑（病人不是水太多），而是 NTG（擴張血管、降低後負荷）+ CPAP（正壓支持、減少呼吸做功、將肺水推回血管）。",
    },
    {
      id: "S05-T5",
      label: "T+5 min — 象限轉移",
      narrative:
        "給予 NTG 舌下 + CPAP 後，病人的呼吸似乎稍有改善，但突然血壓暴跌至 75/50！末梢從溫暖變成冰冷！病人意識變差。這是怎麼回事？需要立即做什麼？",
      vitals: {
        hr: 130,
        bp: "75/50",
        spo2: 85,
        rr: 28,
        rhythm: "Sinus Tachycardia",
        gcs: "E3V3M5",
      },
      findings: [
        "血壓從 180/110 暴跌至 75/50",
        "末梢從溫暖 → 冰冷",
        "意識改變（GCS 下降）",
        "肺部仍有廣泛囉音",
        "脈搏微弱快速",
      ],
      decision: {
        question:
          "血壓從 180 崩潰到 75 — 發生了什麼？該怎麼處置？",
        options: [
          {
            id: "S05-T5-A",
            text: "Warm+Wet → Cold+Wet 象限轉移！立即停 NTG，需要升壓藥",
            correct: true,
            feedback:
              "正確！這是 Nohria-Stevenson 象限轉移的經典案例。原本的前壁 STEMI 造成左心室功能急遽惡化，心輸出量驟降。從 B 象限（Warm+Wet：灌流正常+充血）轉為 C 象限（Cold+Wet：灌流不足+充血）。C 象限是最危險的！NTG 在 SBP < 90 時必須立即停止，因為它會讓已經不足的血壓更低。此刻需要升壓藥來維持灌流。",
          },
          {
            id: "S05-T5-B",
            text: "NTG 給太多了 — 但繼續觀察可能會回升",
            correct: false,
            feedback:
              "不能等！雖然 NTG 過量可能貢獻了部分低血壓，但根本原因是心肌梗塞導致的左心室功能衰竭。前壁 STEMI 損壞了大面積心肌，Pump 正在失能。等待只會讓灌流持續不足，器官開始缺氧壞死。",
          },
          {
            id: "S05-T5-C",
            text: "大量輸液 — 血壓低就該補液",
            correct: false,
            feedback:
              "C 象限（Cold + Wet）的核心禁忌就是大量輸液！肺部已經充滿水了（Wet），再加水只會讓肺水腫更嚴重。此病人需要的是升壓藥/強心劑，不是容量。Tank 不是空的 — Pump 打不動了。",
          },
          {
            id: "S05-T5-D",
            text: "這是過敏反應 — 可能對 NTG 過敏",
            correct: false,
            feedback:
              "NTG 過敏極為罕見，且不會表現為末梢冰冷。過敏性休克的特徵是溫暖潮紅 + 蕁麻疹 + 支氣管痙攣，此病人的表現是冰冷 + 肺水腫持續，完全符合心因性休克（Pump failure）。",
          },
        ],
      },
      teachingPoint:
        "Nohria-Stevenson 象限轉移是心衰急症中最需要警覺的現象。B→C 轉移（Warm+Wet → Cold+Wet）意味著心臟功能從「還能代償」直接跌到「Pump 衰竭」。關鍵動作：(1) 立即停止所有降壓藥物（NTG、ACEi 等）(2) 啟動升壓/強心藥物 (3) 禁止大量輸液。SBP < 90 是停 NTG 的硬性門檻。S05 vs S02 的差異：S02 是 Tank 空（出血 → 補液 + 止血）；S05 是 Pump 壞（心衰 → 升壓藥 + 強心劑）。",
    },
    {
      id: "S05-T10",
      label: "T+10 min — PseudoPEA",
      narrative:
        "病人意識幾乎喪失，呼吸極度淺弱。ECG 上仍然可以看到 sinus tachycardia（有組織性電氣活動），但脈搏幾乎摸不到，血壓量不出來。這不是 asystole，也不是 VF — 心電圖上心臟「還在跳」，但產生的機械收縮太弱了。",
      vitals: {
        hr: 120,
        bp: "—/—",
        spo2: 78,
        rr: 8,
        rhythm: "Sinus Tachycardia (ECG) — barely palpable pulse",
        gcs: "E1V1M3",
      },
      findings: [
        "ECG 顯示組織性心律（sinus tachycardia）",
        "脈搏幾乎無法觸知",
        "血壓無法量測",
        "意識幾乎喪失",
        "呼吸極淺弱",
      ],
      decision: {
        question:
          "ECG 有心律、但脈搏幾乎摸不到 — 這是什麼狀態？應該怎麼處置？",
        options: [
          {
            id: "S05-T10-A",
            text: "PseudoPEA — Push-dose Epi 10-20 mcg IV，不是 ACLS 的 1mg",
            correct: true,
            feedback:
              "正確！這是 PseudoPEA — 心臟有微弱的機械收縮但產生的血壓不足以觸知脈搏。治療方向和 True PEA 完全不同：用 Push-dose Epi 10-20 mcg IV（低劑量、精準升壓），而非 ACLS 流程的 Epi 1mg（那是給完全沒有心臟收縮的 True PEA 用的）。1mg Epi 對一個還在微弱跳動的心臟來說是劑量過大，可能造成劇烈高血壓和心律不整。",
          },
          {
            id: "S05-T10-B",
            text: "Cardiac Arrest — 立刻 CPR + Epi 1mg（標準 ACLS）",
            correct: false,
            feedback:
              "如果心臟還在收縮（PseudoPEA），CPR 可能反而有害 — 你在壓一個正在跳的心臟。而且 Epi 1mg 對一個還有微弱功能的心臟來說劑量太大。應該先用 POCUS 確認是否有心臟收縮，如果有（PseudoPEA），用 push-dose epi 精準升壓。",
          },
          {
            id: "S05-T10-C",
            text: "不需要處理 — ECG 有心律就代表循環還在",
            correct: false,
            feedback:
              "ECG 有心律不代表有效循環！PEA（無脈搏電氣活動）的定義就是「ECG 有電但脈搏摸不到」。不處理的話，微弱的收縮會持續惡化，最終真正心跳停止（True PEA → Asystole）。",
          },
          {
            id: "S05-T10-D",
            text: "給 Atropine — 可能是心率太慢",
            correct: false,
            feedback:
              "心率 120 並不慢！問題不是心率不足，而是每次收縮的力道太弱（心輸出量 = 心率 x 每搏量，此病人的每搏量接近零）。Atropine 只能加快心率，無法增強收縮力。此時需要的是升壓/強心（Epi 的 Alpha + Beta 效應）。",
          },
        ],
      },
      teachingPoint:
        "PseudoPEA 是介於「有脈搏」和「真正心跳停止」之間的灰色地帶。心臟還在跳，只是太弱了。治療邏輯：\n- Push-dose Epi：10-20 mcg IV q2-5min（製備方法：Epi 1mg/10mL 取 1mL + NS 9mL → 10 mcg/mL → 推 1-2 mL）\n- 同時考慮 Norepinephrine drip\n- 處理根本原因（此案例是 STEMI → 需要 PCI）\n\nS05 整體教學重點：從 Warm+Wet（SCAPE）→ Cold+Wet（心因性休克）→ PseudoPEA 的惡化過程，每個階段的處置都不同。認識 Nohria-Stevenson 象限轉移，才能在正確的時機做正確的事。",
    },
  ],
  criticalActions: [
    {
      id: "S05-CA1",
      text: "辨識 SCAPE — 高血壓 + 急性肺水腫 = Warm+Wet（B 象限）→ NTG + CPAP",
      isCritical: true,
      stageId: "S05-T0",
    },
    {
      id: "S05-CA2",
      text: "識別 Warm+Wet → Cold+Wet 象限轉移 — 末梢從溫暖變冰冷是關鍵線索",
      isCritical: true,
      stageId: "S05-T5",
    },
    {
      id: "S05-CA3",
      text: "SBP < 90 立即停 NTG — 轉為升壓策略",
      isCritical: true,
      stageId: "S05-T5",
    },
    {
      id: "S05-CA4",
      text: "區分 PseudoPEA vs True PEA — 影響 Epi 劑量（10-20 mcg vs 1 mg）",
      isCritical: true,
      stageId: "S05-T10",
    },
    {
      id: "S05-CA5",
      text: "理解 S05 vs S02 差異 — Pump 壞（禁輸液）vs Tank 空（需補液）",
      isCritical: false,
      stageId: "S05-T5",
    },
    {
      id: "S05-CA6",
      text: "C 象限禁止大量輸液 — 肺已充血，加水會更糟",
      isCritical: true,
      stageId: "S05-T5",
    },
  ],
};
