import type { Scenario } from "../types";

export const S03: Scenario = {
  id: "S03",
  title: "過敏性休克",
  subtitle: "蜂螫後嚴重過敏反應（Anaphylaxis）",
  duration: "10 分鐘",
  pumpPipeTank: "pipe",
  color: "#F39C12",
  stages: [
    {
      id: "S03-T0",
      label: "T0 — 到場評估",
      narrative:
        "45 歲女性，登山時遭多隻蜜蜂螫傷約 10 分鐘前。全身潮紅、蕁麻疹廣泛分佈。嘴唇和舌頭明顯腫脹，說話含糊。呼吸急促伴有吸氣性喘鳴（stridor）。四肢溫暖但脈搏快速跳動（bounding pulse）。血壓偏低，但皮膚是溫暖潮紅的 — 和 S02 的蒼白冰冷完全相反。",
      vitals: {
        hr: 118,
        bp: "88/52",
        spo2: 93,
        rr: 28,
        rhythm: "Sinus Tachycardia",
        gcs: "E4V5M6",
        temp: 37.2,
      },
      findings: [
        "全身潮紅、廣泛蕁麻疹",
        "嘴唇及舌頭明顯腫脹",
        "吸氣性喘鳴（stridor）",
        "四肢溫暖、bounding pulse",
        "說話含糊但意識清楚",
      ],
      decision: {
        question:
          "這位病人也是低血壓（BP 88/52），但和 S02（腹部穿刺傷）的低血壓有什麼根本差異？",
        options: [
          {
            id: "S03-T0-A",
            text: "分佈性休克（Warm + Flushed）vs 低血容休克（Cold + Pale）— 管路太鬆 vs 水箱太空",
            correct: true,
            feedback:
              "正確！關鍵鑑別點是末梢灌流。S02 蒼白冰冷 = 血管收縮代償（Tank 空了，拼命擠）。S03 溫暖潮紅 = 血管擴張失控（Pipe 太鬆，血液分佈到周邊，有效循環容量不足）。同樣是低血壓，機轉完全不同，治療也不同。",
          },
          {
            id: "S03-T0-B",
            text: "沒有差異 — 低血壓就是低血壓，處理方式一樣",
            correct: false,
            feedback:
              "大錯！低血壓的機轉決定了治療方向。低血容休克需要補液 + 止血；分佈性休克需要血管收縮劑（Epinephrine）。用錯治療可能致命。",
          },
          {
            id: "S03-T0-C",
            text: "這其實是心因性休克 — 蜂毒可能損傷心肌",
            correct: false,
            feedback:
              "蜂毒極少造成直接心肌損傷。溫暖潮紅的末梢 + bounding pulse 明確指向分佈性休克（血管擴張），不是心因性休克（心臟收縮力不足）。",
          },
          {
            id: "S03-T0-D",
            text: "主要差異是過敏有蕁麻疹，出血沒有",
            correct: false,
            feedback:
              "蕁麻疹確實是過敏的特徵，但更重要的鑑別是「血行動力學的表現型」— 溫暖 vs 冰冷、潮紅 vs 蒼白。這直接反映了休克的機轉（Pipe 太鬆 vs Tank 太空），並決定治療方向。",
          },
        ],
      },
      teachingPoint:
        "分佈性休克 = Pipe 太鬆。過敏反應中，組織胺和其他介質造成全身血管擴張，血液跑到周邊微血管床，核心有效循環容量不足。所以病人皮膚溫暖潮紅（血管擴張）但血壓低（有效循環不足）。和 S02 低血容（Tank 空）的冰冷蒼白形成鮮明對比。",
    },
    {
      id: "S03-T3",
      label: "T+3 min — 氣道危機",
      narrative:
        "病人聲音幾乎聽不到了，舌頭嚴重腫脹，stridor 加劇合併 wheeze。SpO₂ 持續下降。血壓更低了。這是同時面臨氣道 + 循環的雙重危機。此刻第一線藥物是什麼？",
      vitals: {
        hr: 130,
        bp: "76/42",
        spo2: 87,
        rr: 32,
        rhythm: "Sinus Tachycardia",
        gcs: "E4V4M6",
      },
      findings: [
        "聲音幾乎消失",
        "舌頭嚴重腫脹",
        "Stridor + Wheeze 同時存在",
        "SpO₂ 持續下降",
        "血壓更低",
      ],
      decision: {
        question: "過敏性休克的第一線藥物是什麼？",
        options: [
          {
            id: "S03-T3-A",
            text: "Epinephrine 0.3mg IM（大腿外側）",
            correct: true,
            feedback:
              "正確！Epinephrine 是過敏性休克唯一的第一線藥物，沒有替代品。IM 給藥（大腿外側）是院前標準路徑。Epi 的作用：(1) Alpha-1 → 血管收縮（修復 Pipe 鬆弛）(2) Beta-1 → 增強心臟收縮 (3) Beta-2 → 支氣管擴張（解除氣道痙攣）(4) 抑制肥大細胞脫顆粒。一針解決所有問題。",
          },
          {
            id: "S03-T3-B",
            text: "Diphenhydramine（抗組織胺）IV",
            correct: false,
            feedback:
              "抗組織胺是輔助治療，不是第一線！它只能阻止新的組織胺作用，無法逆轉已經發生的血管擴張和氣道水腫。在嚴重過敏性休克中，等抗組織胺起效的時間可能就是病人死亡的時間。先給 Epi！",
          },
          {
            id: "S03-T3-C",
            text: "Methylprednisolone（類固醇）IV",
            correct: false,
            feedback:
              "類固醇需要 4-6 小時才會起效！在急性期完全沒有用。類固醇的角色是預防雙相反應（biphasic reaction），是後續處理，不是急救藥物。",
          },
          {
            id: "S03-T3-D",
            text: "Albuterol 噴霧吸入",
            correct: false,
            feedback:
              "Albuterol 只能處理下呼吸道的支氣管痙攣（wheeze），無法解決上呼吸道水腫（stridor）和低血壓。此病人同時有氣道 + 循環問題，只有 Epinephrine 能同時處理兩者。",
          },
        ],
      },
      teachingPoint:
        "Epinephrine IM 是過敏性休克的神藥 — 一針同時解決氣道（Beta-2 支氣管擴張）+ 循環（Alpha-1 血管收縮）+ 免疫（抑制脫顆粒）。給藥位置：大腿外側（vastus lateralis），吸收最快。劑量：成人 0.3-0.5mg（1:1000 = 0.3-0.5mL）。不要猶豫，不要延遲，不要先給其他藥再給 Epi。",
    },
    {
      id: "S03-T5",
      label: "T+5 min — Epi 起效",
      narrative:
        "給予 Epinephrine 0.3mg IM 後 2 分鐘。病人說話聲音恢復了一些，stridor 減輕。SpO₂ 開始回升，血壓改善。但還沒有完全恢復正常。接下來怎麼辦？",
      vitals: {
        hr: 122,
        bp: "92/58",
        spo2: 91,
        rr: 26,
        rhythm: "Sinus Tachycardia",
        gcs: "E4V5M6",
      },
      findings: [
        "說話聲音部分恢復",
        "Stridor 減輕但未消失",
        "蕁麻疹仍廣泛存在",
        "SpO₂ 緩慢回升",
        "血壓改善但仍偏低",
      ],
      decision: {
        question: "Epi 有效果但病人尚未完全穩定，接下來該怎麼做？",
        options: [
          {
            id: "S03-T5-A",
            text: "5-15 分鐘後可重複 Epi IM + 建立 IV + 輸液 + 持續監測",
            correct: true,
            feedback:
              "正確！Epi IM 的效果約 5-15 分鐘達高峰，之後會消退。若症狀持續或復發，可每 5-15 分鐘重複一次。同時：(1) 建立 IV line (2) NS bolus 500-1000mL（補充因血管擴張而再分佈的容量）(3) 高流量 O₂ (4) 持續心電圖監測。",
          },
          {
            id: "S03-T5-B",
            text: "已經有改善，不需要再做任何處置",
            correct: false,
            feedback:
              "危險！Epi IM 效果只持續 5-15 分鐘，之後可能反彈。而且過敏反應可能有雙相反應。必須持續監測並準備好重複給藥。",
          },
          {
            id: "S03-T5-C",
            text: "立刻給第二劑 Epi",
            correct: false,
            feedback:
              "太早了。第一劑 Epi 正在起效中（SpO₂ 回升、血壓改善），應該等 5-15 分鐘評估完整效果。過早追加可能造成不必要的心跳過速或高血壓。但如果 5-15 分鐘後仍未改善或再度惡化，就要追加。",
          },
          {
            id: "S03-T5-D",
            text: "改用 Epi IV drip 持續輸注",
            correct: false,
            feedback:
              "Epi IV drip 是在 IM 給藥反覆無效、或初始就是嚴重休克時才使用。目前 IM 有反應，應先觀察完整效果並準備重複 IM，而非直接升級到 IV drip。在院前環境中，IV Epi 的劑量控制更困難且風險更高。",
          },
        ],
      },
      teachingPoint:
        "Epi IM 起效後的管理：(1) 不要放鬆警覺 — Epi 效果會消退 (2) 準備好 5-15 分鐘後可能需要追加 (3) 同時進行輸液（NS 500-1000mL）補充有效循環容量 (4) O₂ + 持續監測。過敏性休克的治療不是「打一針 Epi 就結束了」，而是持續的動態管理。",
    },
    {
      id: "S03-T10",
      label: "T+10 min — 穩定後的警覺",
      narrative:
        "經過第一劑 Epi + 輸液 + O₂，病人明顯改善。可以正常說話，呼吸平穩，血壓回升。團隊鬆了一口氣。但醫療指導醫師提醒：「30 分鐘到數小時後，可能發生什麼？」",
      vitals: {
        hr: 104,
        bp: "102/66",
        spo2: 96,
        rr: 22,
        rhythm: "Sinus Tachycardia",
        gcs: "E4V5M6",
      },
      findings: [
        "說話清晰、意識完全恢復",
        "Stridor 消失",
        "蕁麻疹開始消退",
        "末梢灌流改善",
        "血壓穩定回升",
      ],
      decision: {
        question:
          "病人改善後 30 分鐘到數小時內，可能面臨什麼風險？",
        options: [
          {
            id: "S03-T10-A",
            text: "雙相反應（Biphasic Reaction）— 症狀可能再次發作",
            correct: true,
            feedback:
              "正確！約 5-20% 的過敏反應會出現雙相反應，通常在初次反應後 1-72 小時（最常見 8-10 小時）。第二波可能和第一波一樣嚴重甚至更嚴重，且不需要再次接觸過敏原。這就是為什麼過敏性休克的病人即使改善也需要留院觀察至少 4-6 小時。",
          },
          {
            id: "S03-T10-B",
            text: "Epi 副作用 — 心律不整風險",
            correct: false,
            feedback:
              "IM Epi 0.3mg 的心律不整風險非常低。Epi 的好處遠大於風險。在過敏性休克中，不給 Epi 的風險（死亡）遠大於給 Epi 的副作用。這不是此時最需要警覺的事。",
          },
          {
            id: "S03-T10-C",
            text: "不會有進一步風險 — 過敏原已經離開身體",
            correct: false,
            feedback:
              "過敏原是否離開身體不影響雙相反應的發生！雙相反應是免疫系統的延遲性第二波攻擊，與過敏原的持續存在無關。蜂毒已注入體內且無法取出。",
          },
          {
            id: "S03-T10-D",
            text: "傷口感染 — 蜂螫處可能化膿",
            correct: false,
            feedback:
              "傷口感染是長期的考量（數天後），不是「30 分鐘到數小時內」的急性風險。此刻最需要警覺的是雙相反應。",
          },
        ],
      },
      teachingPoint:
        "雙相反應（Biphasic Reaction）是過敏性休克的隱藏殺手。第一波被成功治療後，免疫系統可能在數小時後發動第二波攻擊，嚴重度可能等同或超過第一波。預防策略：(1) 類固醇（雖然證據有限，但仍建議給予）(2) 留院觀察至少 4-6 小時（嚴重案例 12-24 小時）(3) 出院時開立 EpiPen 處方。",
    },
  ],
  criticalActions: [
    {
      id: "S03-CA1",
      text: "辨識分佈性休克 + 氣道威脅 — 溫暖潮紅 + 低血壓 + stridor",
      isCritical: true,
      stageId: "S03-T0",
    },
    {
      id: "S03-CA2",
      text: "立即給予 Epinephrine 0.3mg IM — 不要猶豫、不要先給其他藥",
      isCritical: true,
      stageId: "S03-T3",
    },
    {
      id: "S03-CA3",
      text: "評估是否需要追加 Epi — 5-15 分鐘後效果不足則重複",
      isCritical: true,
      stageId: "S03-T5",
    },
    {
      id: "S03-CA4",
      text: "併行處置 — 高流量 O₂ + IV access + NS bolus",
      isCritical: false,
      stageId: "S03-T5",
    },
    {
      id: "S03-CA5",
      text: "警覺雙相反應 — 即使改善也需持續監測與留院觀察",
      isCritical: true,
      stageId: "S03-T10",
    },
  ],
};
