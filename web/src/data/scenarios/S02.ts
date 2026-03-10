import type { Scenario } from "../types";

export const S02: Scenario = {
  id: "S02",
  title: "低血容休克",
  subtitle: "腹部穿刺傷 — 代償性休克到失代償",
  duration: "14 分鐘",
  pumpPipeTank: "tank",
  color: "#C0392B",
  assessmentPathway: {
    sceneSizeUp: [
      "穿刺傷合併腹部疼痛與持續出血，先假設有內出血",
      "看起來還能對話，不代表沒有進入代償性休克",
    ],
    firstImpression:
      "高風險的 compensated hemorrhagic shock，重點在辨識 Tank 正在持續漏水。",
    focusedExam: [
      "皮膚溫度、CRT、脈搏品質與意識變化",
      "腹部膨隆、壓痛、外部可控制出血與機轉",
      "HR / BP / pulse pressure 是否正在失代償前夕",
    ],
    leadingDdx: [
      "腹腔內出血導致低血容性休克",
      "合併骨盆或大血管損傷",
      "其他創傷性低灌流狀態",
    ],
    discriminator:
      "蒼白冰冷 + CRT 延長 + 腹部膨隆，比『目前血壓正常』更能定義他已在代償性失血。",
  },
  debrief: {
    minutes: 8,
    focus: "讓學員記住『正常血壓不等於穩定』，以及 hemorrhage control 優先於補液。",
  },
  stages: [
    {
      id: "S02-T0",
      label: "T0 — 到場評估",
      narrative:
        "32 歲男性，酒後與人衝突遭刀刺傷，左側腹部可見約 3 公分穿刺傷口，少量滲血。病人清醒可對話，主訴腹痛。皮膚蒼白、四肢冰冷、CRT 3 秒。血壓看起來「還好」，但真的穩定嗎？",
      vitals: {
        hr: 108,
        bp: "122/88",
        spo2: 98,
        rr: 22,
        rhythm: "Sinus Tachycardia",
        gcs: "E4V5M6",
      },
      findings: [
        "左側腹部穿刺傷約 3 cm，少量滲血",
        "皮膚蒼白、四肢冰冷",
        "CRT 3 秒（延長）",
        "腹部輕度膨隆、壓痛",
        "意識清楚，可正常對話",
      ],
      decision: {
        question: "血壓 122/88，心率 108 — 這位病人目前穩定嗎？",
        options: [
          {
            id: "S02-T0-A",
            text: "穩定 — 血壓正常，暫時觀察即可",
            correct: false,
            feedback:
              "危險的判斷！血壓「正常」不代表穩定。年輕人可以透過代償機制（血管收縮 + 心跳加快）維持血壓，直到失去 30-40% 血量才會血壓下降。此時的 HR 108 + 蒼白冰冷 + CRT 延長就是代償性休克的證據。",
            consequence:
              "因為誤判為穩定而延遲處置，5 分鐘後病人突然血壓崩潰。",
          },
          {
            id: "S02-T0-B",
            text: "不穩定 — 已出現代償性休克的徵兆",
            correct: true,
            feedback:
              "正確！雖然血壓還撐住，但 HR 108（心跳代償）+ 蒼白冰冷（血管收縮代償）+ CRT 延長 = 代償性休克（Compensated Shock）。身體正在用盡全力維持血壓，但 Tank 正在持續漏水。",
          },
          {
            id: "S02-T0-C",
            text: "需要更多資訊才能判斷 — 先做完整身體檢查",
            correct: false,
            feedback:
              "在明確的穿刺傷 + 休克徵兆下，不需要更多資訊。過度評估會浪費寶貴時間。創傷病人的黃金時間有限，「Load and Go」比「Stay and Play」重要。",
          },
        ],
      },
      teachingPoint:
        "代償性休克（Compensated Shock）的陷阱：血壓可以是正常的！年輕人在失血 30% 之前，靠交感神經代償（血管收縮 + 心跳加快）可以維持 SBP > 90。你必須看「組織灌流」的指標：皮膚溫度、CRT、意識變化、心率，而非只看血壓數字。",
    },
    {
      id: "S02-T5",
      label: "T+5 min — 持續出血",
      narrative:
        "腹部更加膨隆、壓痛加劇，病人開始躁動不安。出血顯然在持續。團隊準備處置，此刻最該優先做什麼？",
      vitals: {
        hr: 124,
        bp: "110/80",
        spo2: 97,
        rr: 26,
        rhythm: "Sinus Tachycardia",
        gcs: "E4V5M6",
      },
      findings: [
        "腹部更加膨隆",
        "壓痛範圍擴大",
        "病人躁動不安",
        "末梢更冰冷、CRT 4 秒",
        "HR 持續攀升",
      ],
      decision: {
        question: "此刻最優先的處置是什麼？",
        options: [
          {
            id: "S02-T5-A",
            text: "止血為先 — 加壓傷口 + 立即後送手術止血",
            correct: true,
            feedback:
              "正確！「止血優先於輸液」是創傷出血的核心原則。腹腔內出血無法在現場控制，必須盡速後送至有手術能力的醫院。現場能做的：直接加壓、骨盆固定帶（若骨盆骨折）、TXA。Tank 漏水時，第一步是堵住洞，不是一直加水。",
          },
          {
            id: "S02-T5-B",
            text: "大量輸液 — 先用 NS 1000mL 把血壓拉起來",
            correct: false,
            feedback:
              "大量輸液在未止血的情況下可能有害！過度輸液會：(1) 稀釋凝血因子 (2) 降低血液黏稠度 (3) 沖掉正在形成的血塊 (4) 升高血壓反而加速出血。這叫「pop the clot」效應。",
            consequence:
              "大量輸液後血壓暫時回升至 130/85，但出血加速，5 分鐘後血壓崩潰到 70/40。",
          },
          {
            id: "S02-T5-C",
            text: "氣管插管 — 先確保呼吸道安全",
            correct: false,
            feedback:
              "病人目前意識清楚、SpO₂ 97%、可以自行維持呼吸道。不需要插管。而且插管需要給予鎮靜藥物，會加劇低血壓。在出血未控制前，不必要的插管只會浪費時間和惡化血行動力學。",
          },
          {
            id: "S02-T5-D",
            text: "Epinephrine — 升壓維持灌流",
            correct: false,
            feedback:
              "升壓藥在低血容休克中幾乎無效！Tank 是空的，再怎麼收縮血管也擠不出血液。而且升壓藥會增加心臟耗氧量，在已經缺血的狀態下反而有害。低血容休克的治療是補充容量 + 止血，不是壓縮已經空的 Tank。",
          },
        ],
      },
      teachingPoint:
        "創傷出血的處置優先順序：止血 > 輸液 > 升壓藥。現場能做的止血有限（加壓、止血帶、骨盆固定），腹腔內出血只能靠手術。因此「快速後送」本身就是最重要的治療。輸液策略：小量維持（permissive hypotension），目標 SBP 80-90 即可，不要追求正常血壓。",
    },
    {
      id: "S02-T10",
      label: "T+10 min — 失代償",
      narrative:
        "後送途中，病人突然血壓驟降。意識變差，只能發出呻吟聲。橈動脈幾乎摸不到，股動脈脈搏微弱。HR 飆升至 138。剛剛還「穩定」的病人，怎麼突然崩潰了？",
      vitals: {
        hr: 138,
        bp: "82/60",
        spo2: 94,
        rr: 30,
        rhythm: "Sinus Tachycardia",
        gcs: "E3V4M6",
      },
      findings: [
        "血壓驟降（122 → 82）",
        "意識改變（GCS 下降）",
        "橈動脈幾乎摸不到",
        "末梢極度冰冷",
        "腹部明顯膨隆",
      ],
      decision: {
        question: "病人為何突然從「穩定」崩潰？",
        options: [
          {
            id: "S02-T10-A",
            text: "失代償 — 代償機制已用盡所有儲備",
            correct: true,
            feedback:
              "正確！這就是代償性休克轉為失代償性休克（Decompensated Shock）的經典過程。交感神經能收縮的血管都已經收縮到極限、心跳也已經快到極限。當失血量超過代償能力（通常 > 30-40% 血量），血壓會「懸崖式」暴跌，而非緩慢下降。",
          },
          {
            id: "S02-T10-B",
            text: "新的出血點 — 可能有另一處受傷",
            correct: false,
            feedback:
              "雖然不能排除，但最合理的解釋是持續的腹腔內出血已超過代償極限。不需要新的出血點來解釋這個崩潰。代償性休克的特性就是：看起來穩定 → 突然崩潰，中間幾乎沒有預警。",
          },
          {
            id: "S02-T10-C",
            text: "過敏反應 — 可能對輸液過敏",
            correct: false,
            feedback:
              "過敏性休克的表現是血管擴張（皮膚溫暖潮紅）+ 支氣管痙攣（喘鳴），此病人的表現是末梢冰冷 + 單純的低血壓，完全符合低血容休克失代償。",
          },
          {
            id: "S02-T10-D",
            text: "心臟問題 — 可能有心臟挫傷",
            correct: false,
            feedback:
              "腹部穿刺傷的機轉不太可能造成心臟挫傷。而且心因性休克通常會有肺水腫（濕囉音）和 JVD，此病人沒有這些表現。",
          },
        ],
      },
      teachingPoint:
        "代償性休克 → 失代償性休克的轉折是突然的、「懸崖式」的下墜。這就是為什麼不能被「正常血壓」騙了。當你在 T0 看到 HR 108 + 蒼白冰冷，就要知道這個病人正在出血，隨時可能崩潰。「在病人還能代償的時候積極處置」遠比「等到崩潰才急救」容易得多。",
    },
    {
      id: "S02-T14",
      label: "T+14 min — 瀕臨心跳停止",
      narrative:
        "病人意識幾乎喪失，呼吸變得緩慢且不規則。團隊討論是否應該在此刻插管。但等等 — 對一個正在大量出血的低血容休克病人，此時插管可能帶來什麼危險？",
      vitals: {
        hr: 150,
        bp: "56/—",
        spo2: 82,
        rr: 36,
        rhythm: "Sinus Tachycardia → PEA",
        gcs: "E2V2M4",
      },
      findings: [
        "意識近乎喪失",
        "呼吸緩慢不規則",
        "血壓幾乎量不到",
        "HR 150 且脈搏極微弱",
        "即將進入 PEA arrest",
      ],
      decision: {
        question: "為什麼在此刻對低血容休克病人插管可能極度危險？",
        options: [
          {
            id: "S02-T14-A",
            text: "正壓通氣（PPV）+ 低血量 = 心跳停止",
            correct: true,
            feedback:
              "正確！這是最重要的概念。正壓通氣會降低靜脈回流（增加胸腔內壓），對正常人影響不大，但對已經 Tank 快空的病人是致命的。加上 RSI 鎮靜藥物會消除僅存的交感神經代償，血壓會瞬間歸零。PPV + Empty Tank = Cardiac Arrest。",
          },
          {
            id: "S02-T14-B",
            text: "插管技術上太困難 — 嘔吐物會阻礙視野",
            correct: false,
            feedback:
              "技術困難是次要問題。真正致命的是血行動力學的影響：正壓通氣 + 鎮靜藥物會在低血量的狀態下直接導致心跳停止。即使插管技術上成功了，開始正壓通氣的那一刻病人就可能 arrest。",
          },
          {
            id: "S02-T14-C",
            text: "沒有危險 — 呼吸衰竭就該插管",
            correct: false,
            feedback:
              "「呼吸衰竭就該插管」在大多數情況下是對的，但低血容休克是例外！你必須先盡可能改善容量狀態（輸液、輸血），再考慮插管。或者至少準備好升壓藥和輸液 push，在插管的同時快速補液。",
          },
          {
            id: "S02-T14-D",
            text: "會讓病人痛覺更劇烈",
            correct: false,
            feedback:
              "此病人意識已經幾乎喪失，痛覺不是主要考量。真正的危險是血行動力學崩潰，不是疼痛。",
          },
        ],
      },
      teachingPoint:
        "低血容休克插管的致命陷阱：(1) RSI 鎮靜藥物消除交感代償 → 血壓歸零 (2) 正壓通氣降低靜脈回流 → Tank 已空的情況下更沒有前負荷 (3) 兩者加在一起 = peri-intubation cardiac arrest。若必須插管：先大量輸液/輸血、準備升壓藥、使用最低劑量鎮靜藥（ketamine 為首選）。",
    },
  ],
  criticalActions: [
    {
      id: "S02-CA1",
      text: "早期辨識代償性休克 — 不要被正常血壓欺騙",
      isCritical: true,
      stageId: "S02-T0",
    },
    {
      id: "S02-CA2",
      text: "止血優先於輸液 — Hemorrhage Control > IV Fluid",
      isCritical: true,
      stageId: "S02-T5",
    },
    {
      id: "S02-CA3",
      text: "合理輸液策略 — permissive hypotension（目標 SBP 80-90）",
      isCritical: false,
      stageId: "S02-T5",
    },
    {
      id: "S02-CA4",
      text: "快速後送 — Load and Go，腹腔內出血只能靠手術止血",
      isCritical: true,
      stageId: "S02-T5",
    },
    {
      id: "S02-CA5",
      text: "警覺 PPV + 低血量的致命組合 — 避免 peri-intubation arrest",
      isCritical: true,
      stageId: "S02-T14",
    },
  ],
};
