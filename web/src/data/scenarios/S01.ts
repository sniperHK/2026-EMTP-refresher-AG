import type { Scenario } from "../types";

export const S01: Scenario = {
  id: "S01",
  title: "張力性氣胸",
  subtitle: "機車車禍 — 右側胸部撞擊",
  duration: "13 分鐘",
  pumpPipeTank: "pipe",
  color: "#2980B9",
  assessmentPathway: {
    sceneSizeUp: [
      "高能量胸部鈍傷，先假設存在單側胸腔機械性問題",
      "轉送途中快速惡化的呼吸困難，比單純疼痛更危險",
    ],
    firstImpression:
      "單側胸部外傷合併機械性呼吸障礙，優先排除 tension physiology。",
    focusedExam: [
      "雙側呼吸音與胸壁起伏是否對稱",
      "叩診音、氣管位置、JVD 與末梢灌流變化",
      "給氧後 SpO₂ / HR / BP 的趨勢是否持續惡化",
    ],
    leadingDdx: [
      "張力性氣胸",
      "單純氣胸",
      "血胸或肺挫傷",
    ],
    discriminator:
      "單側呼吸音消失 + hyperresonance + JVD / hypotension = 張力性氣胸直到證明不是。",
  },
  debrief: {
    minutes: 8,
    focus: "把呼吸問題一路串到阻塞性休克，避免只停在 needle decompression 技巧。",
  },
  stages: [
    {
      id: "S01-T0",
      label: "T0 — 到場評估",
      narrative:
        "28 歲男性，機車自撞電線桿，安全帽完整但右側胸壁有明顯擦傷與瘀青。病人清醒可對話，主訴右胸劇痛、呼吸困難。呼吸淺快，右胸起伏較左側小。",
      vitals: {
        hr: 110,
        bp: "128/82",
        spo2: 92,
        rr: 28,
        rhythm: "Sinus Tachycardia",
        gcs: "E4V5M6",
      },
      findings: [
        "右側胸壁擦傷瘀青",
        "呼吸淺快，右胸起伏減少",
        "病人可對話但明顯喘",
        "頸靜脈未明顯怒張",
        "氣管居中",
      ],
      decision: {
        question: "這位病人的呼吸問題屬於哪一類？",
        options: [
          {
            id: "S01-T0-A",
            text: "氧合問題（Oxygenation）— 肺泡層面的氣體交換障礙",
            correct: false,
            feedback:
              "氧合問題通常是肺泡積水或塌陷（如肺炎、肺水腫），此病人的問題在於胸廓結構，空氣無法有效進出肺部。",
          },
          {
            id: "S01-T0-B",
            text: "通氣問題（Ventilation）— CO₂ 排出障礙",
            correct: false,
            feedback:
              "通氣問題多見於呼吸驅動力不足（如藥物過量、頭部外傷），此病人意識清楚且努力呼吸，呼吸驅動力正常。",
          },
          {
            id: "S01-T0-C",
            text: "機械性問題（Mechanical）— 胸廓或氣道的物理性阻礙",
            correct: true,
            feedback:
              "正確！右側胸部外傷造成結構性問題，空氣無法正常進入右肺，屬於機械性呼吸障礙。需進一步評估是否有氣胸。",
          },
          {
            id: "S01-T0-D",
            text: "心因性問題 — 心臟衰竭導致肺水腫",
            correct: false,
            feedback:
              "28 歲且明確外傷機轉，心因性肺水腫的可能性極低。應優先考慮與外傷相關的機械性問題。",
          },
        ],
      },
      teachingPoint:
        "呼吸窘迫的鑑別三大類：氧合（O₂ 進不去）、通氣（CO₂ 出不來）、機械性（空氣進出的物理性阻礙）。外傷病人出現單側胸痛 + 呼吸困難，要高度懷疑氣胸。",
    },
    {
      id: "S01-T5",
      label: "T+5 min — 惡化徵兆",
      narrative:
        "給予高濃度氧氣後，SpO₂ 不升反降。病人更喘，焦躁不安。聽診發現右側呼吸音消失，叩診呈過度共鳴音（hyperresonance）。",
      vitals: {
        hr: 126,
        bp: "118/78",
        spo2: 85,
        rr: 34,
        rhythm: "Sinus Tachycardia",
        gcs: "E4V5M6",
      },
      findings: [
        "高濃度 O₂ 無效，SpO₂ 持續下降",
        "右側呼吸音完全消失",
        "右側叩診過度共鳴（hyperresonance）",
        "病人焦躁不安、冒冷汗",
      ],
      decision: {
        question: "給氧後 SpO₂ 為何持續下降？最可能的診斷是什麼？",
        options: [
          {
            id: "S01-T5-A",
            text: "單純氣胸（Simple Pneumothorax）",
            correct: false,
            feedback:
              "單純氣胸雖然可能出現呼吸音消失，但通常不會進展這麼快。且血壓開始偏低，需警覺是否正在轉變為張力性氣胸。",
          },
          {
            id: "S01-T5-B",
            text: "張力性氣胸（Tension Pneumothorax）",
            correct: true,
            feedback:
              "正確！呼吸音消失 + 過度共鳴 + 給氧無效 + 快速惡化，高度符合張力性氣胸。空氣持續進入胸腔卻無法排出，造成正壓壓迫縱膈腔。",
          },
          {
            id: "S01-T5-C",
            text: "血胸（Hemothorax）",
            correct: false,
            feedback:
              "血胸的叩診應該是「鈍音（dullness）」而非過度共鳴。過度共鳴代表胸腔內充滿空氣，不是血液。",
          },
          {
            id: "S01-T5-D",
            text: "肺挫傷（Pulmonary Contusion）",
            correct: false,
            feedback:
              "肺挫傷不會造成單側呼吸音完全消失及過度共鳴。肺挫傷的影響通常較緩慢，且聽診可能聽到濕囉音。",
          },
        ],
      },
      teachingPoint:
        "張力性氣胸是臨床診斷，不需要等 X 光！經典三徵：(1) 呼吸音消失 (2) 叩診過度共鳴 (3) 給氧無效且快速惡化。一旦懷疑就要準備處置，不要等到血壓崩潰。",
    },
    {
      id: "S01-T10",
      label: "T+10 min — 休克表現",
      narrative:
        "病人意識變差，只能發出含糊聲音。頸靜脈明顯怒張（JVD），氣管偏向左側。末梢冰冷、脈搏微弱。這是什麼類型的休克？",
      vitals: {
        hr: 140,
        bp: "78/50",
        spo2: 72,
        rr: 40,
        rhythm: "Sinus Tachycardia",
        gcs: "E3V4M5",
      },
      findings: [
        "GCS 下降至 E3V4M5",
        "頸靜脈怒張（JVD）",
        "氣管偏向左側",
        "末梢冰冷、CRT > 4 秒",
        "脈搏微弱快速",
      ],
      decision: {
        question: "用 Pump-Pipe-Tank 模型分析：這是哪一類休克？",
        options: [
          {
            id: "S01-T10-A",
            text: "阻塞性休克（Obstructive）— Pipe 管路阻塞",
            correct: true,
            feedback:
              "正確！張力性氣胸壓迫縱膈腔，阻礙靜脈回流（SVC/IVC 被壓扁），心臟無法充盈。JVD 是關鍵線索 — 血液回不了心臟，堆積在頸靜脈。這是 Pipe（管路）被外力壓迫的問題。",
          },
          {
            id: "S01-T10-B",
            text: "低血容休克（Hypovolemic）— Tank 水箱空了",
            correct: false,
            feedback:
              "低血容休克的 JVD 應該是扁的（血管內容量不足），但此病人 JVD 怒張。Tank 空了不會讓頸靜脈鼓起來。",
          },
          {
            id: "S01-T10-C",
            text: "心因性休克（Cardiogenic）— Pump 幫浦壞了",
            correct: false,
            feedback:
              "心因性休克是心臟本身收縮力不足（如心肌梗塞），但此病人的心臟本身沒問題，是外力壓迫導致心臟無法充盈。Pump 本身是好的，問題在 Pipe。",
          },
          {
            id: "S01-T10-D",
            text: "分佈性休克（Distributive）— Pipe 管路太鬆",
            correct: false,
            feedback:
              "分佈性休克（如過敏、敗血症）的特徵是血管擴張、皮膚溫暖潮紅。此病人末梢冰冷且 JVD 怒張，完全不符合血管擴張的表現。",
          },
        ],
      },
      teachingPoint:
        "張力性氣胸 = 阻塞性休克（Pipe Blocked）。胸腔正壓 → 壓迫 SVC/IVC → 靜脈回流受阻 → JVD + 低血壓。記住：JVD + 低血壓 + 單側呼吸音消失 = 張力性氣胸，直到證明並非如此。",
    },
    {
      id: "S01-T10b",
      label: "T+10 min — 緊急處置",
      narrative:
        "已確認為張力性氣胸造成的阻塞性休克。病人持續惡化中，再不處理 2-3 分鐘內將心跳停止（PEA arrest）。此刻最優先的處置是什麼？",
      vitals: {
        hr: 140,
        bp: "78/50",
        spo2: 72,
        rr: 40,
        rhythm: "Sinus Tachycardia",
        gcs: "E3V4M5",
      },
      findings: [
        "張力性氣胸已確認",
        "阻塞性休克進行中",
        "預計 2-3 分鐘內將進展至 PEA arrest",
      ],
      decision: {
        question: "此刻最優先的緊急處置是什麼？",
        options: [
          {
            id: "S01-T10b-A",
            text: "針刺減壓（Needle Decompression）— 釋放胸腔壓力",
            correct: true,
            feedback:
              "正確！針刺減壓是張力性氣胸的第一線急救處置。在鎖骨中線第 2 肋間或腋中線第 4-5 肋間插入大口徑針頭，釋放胸腔正壓，立即恢復靜脈回流。",
            consequence:
              "針刺減壓後：SpO₂ 回升至 90%，BP 改善至 100/68，JVD 消退。病人暫時穩定，準備快速後送。",
          },
          {
            id: "S01-T10b-B",
            text: "氣管插管（Intubation）— 確保呼吸道",
            correct: false,
            feedback:
              "插管無法解決問題！胸腔內的正壓不會因為插管而消失。而且正壓通氣（PPV）會讓張力性氣胸更惡化 — 每次送氣都把更多空氣打入已經高壓的胸腔。",
            consequence:
              "正壓通氣加劇張力性氣胸，病人在插管後 1 分鐘內進入 PEA arrest。",
          },
          {
            id: "S01-T10b-C",
            text: "大量輸液（Fluid Bolus）— 提升血壓",
            correct: false,
            feedback:
              "輸液無法解決問題！問題不是血管內容量不足（Tank 空），而是靜脈回流的通路被壓迫（Pipe 塞住）。給再多液體也過不了被壓扁的 SVC/IVC。",
          },
          {
            id: "S01-T10b-D",
            text: "Epinephrine 1mg IV — ACLS 流程",
            correct: false,
            feedback:
              "病人還沒有心跳停止！目前還有脈搏和血壓（雖然很低）。ACLS 劑量的 Epinephrine 用在有脈搏的病人會造成嚴重高血壓和心律不整。必須先解決根本原因（釋放胸腔壓力）。",
          },
        ],
      },
      teachingPoint:
        "張力性氣胸的治療是「解除阻塞」而非「支持循環」。針刺減壓 = 打開被壓扁的 Pipe。這個概念適用於所有阻塞性休克：找到阻塞點並解除它，而不是一味地給藥或輸液。未處理的張力性氣胸最終會導致 PEA arrest — 那時才開始 CPR 已經太遲了。",
    },
  ],
  criticalActions: [
    {
      id: "S01-CA1",
      text: "辨識阻塞性休克（Obstructive Shock）— JVD + 低血壓 + 單側呼吸音消失",
      isCritical: true,
      stageId: "S01-T10",
    },
    {
      id: "S01-CA2",
      text: "不要誤判為單純呼吸困難而只給氧氣 — 張力性氣胸給氧無效",
      isCritical: true,
      stageId: "S01-T5",
    },
    {
      id: "S01-CA3",
      text: "及時執行針刺減壓 — 不要等到 PEA arrest 才處理",
      isCritical: true,
      stageId: "S01-T10b",
    },
    {
      id: "S01-CA4",
      text: "持續監測生命徵象變化趨勢 — 早期發現惡化並重新評估",
      isCritical: false,
      stageId: "S01-T0",
    },
    {
      id: "S01-CA5",
      text: "避免對未減壓的張力性氣胸執行正壓通氣（PPV）",
      isCritical: true,
      stageId: "S01-T10b",
    },
  ],
};
