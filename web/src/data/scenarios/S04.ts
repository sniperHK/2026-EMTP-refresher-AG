import type { Scenario } from "../types";

export const S04: Scenario = {
  id: "S04",
  title: "OHCA — 心室纖維顫動",
  subtitle: "58 歲男性公園目擊心跳停止",
  duration: "9 分鐘（含初始 post-ROSC 穩定化）",
  pumpPipeTank: "pump",
  color: "#8E44AD",
  assessmentPathway: {
    sceneSizeUp: [
      "運動中胸痛後倒地、目擊者 CPR、AED 在場，是典型 OHCA 高存活情境",
      "shockable rhythm 的時間敏感度極高，先把 CPR / defib 節奏做對",
    ],
    firstImpression:
      "最可能是 ACS-related VF/pVT，但整個 resuscitation 過程都要同步思考 H's and T's。",
    focusedExam: [
      "旁觀者 CPR 品質、downtime、電擊時機與節律變化",
      "電擊後是否迅速恢復高品質 CPR 並建立藥物通路",
      "ROSC 後的 SpO₂、通氣、MAP 與 12-lead / coronary evaluation 需求",
    ],
    leadingDdx: [
      "急性冠心症導致的 VF/pVT",
      "未處理可逆原因導致的 PEA / pseudoPEA",
      "其他心搏停止原因（低氧、張力性氣胸、低血容、toxins）",
    ],
    discriminator:
      "『抓胸後倒地 + VF + ROSC 後低血壓』會把重心放在 ischemic arrest 的第二階段 resuscitation，而不只停在演算法本身。",
  },
  debrief: {
    minutes: 10,
    focus: "回顧 VF 處理流程，思考 Hs & Ts 可逆原因、PseudoPEA 鑑別、以及 Post-ROSC 前 5 分鐘的目標設定。",
  },
  stages: [
    {
      id: "S04-T0",
      label: "T0 — 到場",
      narrative:
        "58 歲男性，在公園運動時突然倒地。旁人目擊倒下過程，已執行旁觀者 CPR 約 4 分鐘。到場時病人無反應、無呼吸、無脈搏。AED 貼片顯示心室纖維顫動（VF）。這是一個可電擊的心律。",
      vitals: {
        hr: 0,
        bp: "—/—",
        spo2: 0,
        rr: 0,
        rhythm: "Ventricular Fibrillation (VF)",
        gcs: "E1V1M1",
      },
      findings: [
        "無反應、無呼吸、無脈搏",
        "監視器顯示 VF",
        "旁觀者 CPR 已進行約 4 分鐘",
        "AED 建議電擊",
      ],
      decision: {
        question: "什麼是心室纖維顫動（VF）？為什麼它致命但又是「最好的」心跳停止心律？",
        options: [
          {
            id: "S04-T0-A",
            text: "心室肌肉混亂放電、無協調收縮、無脈搏輸出 — 但可以電擊終止",
            correct: true,
            feedback:
              "正確！VF 是心室肌肉的混亂電氣活動（chaotic electrical activity），每個肌肉細胞各自亂跳，無法產生有效的收縮和血液輸出。但好消息是：電擊可以「重置」這些混亂的電氣活動，讓正常的傳導系統重新接管。VF 的存活率（如果及時處理）遠高於其他心跳停止心律。",
          },
          {
            id: "S04-T0-B",
            text: "心臟跳太快所以無法有效泵血",
            correct: false,
            feedback:
              "這更像是 VT（心室頻脈）的描述。VF 不是「跳太快」— 它根本就不是在「跳」。VF 是完全混亂的電氣活動，沒有任何協調的收縮。就像一堆蟲在蠕動，不是在有節奏地跳動。",
          },
          {
            id: "S04-T0-C",
            text: "心臟完全停止了所有電氣活動",
            correct: false,
            feedback:
              "這是心臟停搏（Asystole）的描述，不是 VF。VF 其實有大量的電氣活動（所以在監視器上看到波動），只是這些活動完全混亂、無法產生有效收縮。Asystole（平線）才是真正的「沒有電氣活動」。",
          },
          {
            id: "S04-T0-D",
            text: "心房和心室之間的傳導中斷",
            correct: false,
            feedback:
              "這是房室傳導阻滯（AV Block）的描述。VF 的問題不是傳導中斷，而是心室肌肉本身的混亂放電。VF 時房室結的傳導已經不重要了，因為整個心室都在混亂放電。",
          },
        ],
      },
      teachingPoint:
        "VF = 心室肌肉的「電氣風暴」。每個心肌細胞各自放電，沒有協調，所以心臟只是在「顫抖」而非「收縮」。電擊（defibrillation）的原理：同時去極化所有心肌細胞，讓它們「歸零重啟」，然後由正常的竇房結重新掌控節律。時間就是一切 — 每延遲 1 分鐘，存活率下降 7-10%。",
    },
    {
      id: "S04-T1",
      label: "T+1 min — 第一次電擊",
      narrative:
        "執行第一次電擊（Biphasic 200J）。電擊後監視器短暫出現混亂波形，然後 VF 仍然持續。立即恢復 CPR。為什麼電擊後要立刻恢復 CPR，而不是先看心律？",
      vitals: {
        hr: 0,
        bp: "—/—",
        spo2: 0,
        rr: 0,
        rhythm: "VF persists",
        gcs: "E1V1M1",
      },
      findings: [
        "第一次電擊 Biphasic 200J",
        "VF 仍然持續",
        "立即恢復高品質 CPR",
      ],
      decision: {
        question: "為什麼電擊後要立刻恢復 CPR，而不是先暫停確認心律？",
        options: [
          {
            id: "S04-T1-A",
            text: "需要重建冠狀動脈灌流壓（Coronary Perfusion Pressure）",
            correct: true,
            feedback:
              "正確！CPR 的核心目的是維持冠狀動脈灌流壓（CPP）。CPP 需要至少 15-20 mmHg 才能讓心肌獲得氧氣和養分。每次暫停 CPR，CPP 會立刻歸零，重新建立需要數個壓胸週期。電擊後心肌處於「電擊後暈眩」狀態，更需要良好的冠狀動脈灌流才能恢復功能。",
          },
          {
            id: "S04-T1-B",
            text: "電擊後心臟需要 2 分鐘才能恢復跳動",
            correct: false,
            feedback:
              "不完全正確。有些病人電擊後可以立即恢復心律，有些則不行。重點不是「等待恢復」，而是「在等待期間不能讓冠狀動脈灌流中斷」。即使心律已經恢復，剛恢復的心臟也需要 CPP 來維持功能。",
          },
          {
            id: "S04-T1-C",
            text: "怕監視器讀數不準，等一下再看",
            correct: false,
            feedback:
              "現代監視器在電擊後可以很快顯示心律。暫停原因不是技術問題，而是生理學問題 — CPP 在暫停時會迅速歸零。ACLS 指南明確建議：電擊後立即恢復 CPR 2 分鐘，然後再暫停檢查心律。",
          },
          {
            id: "S04-T1-D",
            text: "其實不需要立刻恢復 — 應該先確認心律再決定",
            correct: false,
            feedback:
              "錯誤！這正是過去舊版 ACLS 的做法（電擊 → 停下來看心律 → 再電擊），已被證實會降低存活率。現在的標準是：電擊 → 立刻 CPR 2 分鐘 → 再暫停檢查心律。最小化暫停時間（hands-off time）是高品質 CPR 的核心。",
          },
        ],
      },
      teachingPoint:
        "冠狀動脈灌流壓（CPP）是 ROSC 的關鍵決定因素。CPP = 主動脈舒張壓 - 右心房壓。CPR 壓胸就是在維持這個壓力梯度。每次暫停 > 10 秒，CPP 幾乎歸零，重建需要多次壓胸。所以：(1) 盡量減少暫停（< 10 秒）(2) 電擊後立刻恢復 CPR (3) 換手壓胸不要太常停下來休息。",
    },
    {
      id: "S04-T3",
      label: "T+3 min — 第二次電擊 + Epi",
      narrative:
        "CPR 2 分鐘後檢查心律 — 仍是 VF。執行第二次電擊（200J），同時給予 Epinephrine 1mg IV。有人問：「Epi 在心跳停止時是怎麼發揮作用的？是讓心臟重新跳動嗎？」",
      vitals: {
        hr: 0,
        bp: "—/—",
        spo2: 0,
        rr: 0,
        rhythm: "VF persists",
        gcs: "E1V1M1",
      },
      findings: [
        "第二次電擊 Biphasic 200J",
        "VF 仍然持續",
        "給予 Epinephrine 1mg IV/IO",
        "持續高品質 CPR",
      ],
      decision: {
        question: "Epinephrine 在心跳停止時的主要作用機轉是什麼？",
        options: [
          {
            id: "S04-T3-A",
            text: "Alpha-1 血管收縮 → 提升冠狀動脈灌流壓（CPP）",
            correct: true,
            feedback:
              "正確！Epi 在 cardiac arrest 中的主要作用是 Alpha-1 血管收縮效應 — 收縮周邊動脈，提升主動脈舒張壓，進而提升 CPP。它不是「讓心臟重新跳動的電擊藥」，而是「讓 CPR 壓胸更有效的輔助藥」。把血管收緊，讓壓胸產生的血流更集中地灌注冠狀動脈和大腦。",
          },
          {
            id: "S04-T3-B",
            text: "Beta-1 心臟刺激 → 直接讓心臟重新跳動",
            correct: false,
            feedback:
              "Epi 確實有 Beta-1 效應（增加心肌收縮力和心率），但在 cardiac arrest 中這不是主要目的。心臟已經停了，Beta-1 刺激一個完全沒有電氣活動的心臟效果有限。真正的價值在 Alpha-1：收緊血管 → 提升 CPP → 讓心肌獲得更多氧氣 → 增加電擊成功的機率。",
          },
          {
            id: "S04-T3-C",
            text: "讓 VF 波形變大，更容易被電擊終止",
            correct: false,
            feedback:
              "有些研究確實發現 Epi 可能讓 VF 波形振幅增大（fine VF → coarse VF），但這不是主要機轉，而且證據不一致。核心機轉仍然是 Alpha-1 血管收縮 → CPP 提升。",
          },
          {
            id: "S04-T3-D",
            text: "打開冠狀動脈的血管 — 像 NTG 一樣擴張冠狀動脈",
            correct: false,
            feedback:
              "完全相反！Epi 的作用是收縮周邊血管（Alpha-1），不是擴張冠狀動脈。冠狀動脈的灌流是被動的（靠 CPP 壓力梯度），不是靠血管擴張。NTG 在心跳停止時不但無效，還會因為降低血管張力而降低 CPP。",
          },
        ],
      },
      teachingPoint:
        "Epi 在 cardiac arrest 中的作用：不是「電擊心臟」，而是「提升 CPP」。Alpha-1 → 周邊血管收縮 → 主動脈舒張壓上升 → CPP 上升 → 心肌和腦部灌流改善。這就是為什麼 Epi 要配合高品質 CPR 使用 — 如果不壓胸，Epi 無法被有效循環到全身。先壓胸再推藥，不是推藥等它自己跑。",
    },
    {
      id: "S04-T5",
      label: "T+5 min — 第三次電擊 + Amiodarone",
      narrative:
        "第三次電擊後 VF 仍然持續（refractory VF）。給予 Amiodarone 300mg IV。團隊成員問：「Amiodarone 和電擊有什麼不同？它能直接終止 VF 嗎？」",
      vitals: {
        hr: 0,
        bp: "—/—",
        spo2: 0,
        rr: 0,
        rhythm: "VF persists (refractory)",
        gcs: "E1V1M1",
      },
      findings: [
        "第三次電擊 Biphasic 200J",
        "Refractory VF — 三次電擊後仍持續",
        "給予 Amiodarone 300mg IV/IO",
        "持續高品質 CPR",
      ],
      decision: {
        question: "Amiodarone 在 VF/pVT 中的作用是什麼？",
        options: [
          {
            id: "S04-T5-A",
            text: "電氣穩定化 — 中斷再入迴路（reentry circuits），提高下次電擊的成功率",
            correct: true,
            feedback:
              "正確！Amiodarone 是 Class III 抗心律不整藥物，延長心肌的不反應期（refractory period），中斷維持 VF 的再入迴路。它不能直接終止 VF（那是電擊的工作），而是讓心肌的電氣狀態更穩定，使得下次電擊更有可能成功將心律轉為正常竇性節律。把它想像成「電氣環境的穩定劑」。",
          },
          {
            id: "S04-T5-B",
            text: "和電擊一樣 — 直接去極化心肌終止 VF",
            correct: false,
            feedback:
              "Amiodarone 不能取代電擊！它是藥物性的電氣穩定化，不是電氣性的去極化。你仍然需要電擊來終止 VF，Amiodarone 的角色是讓電擊更有效。",
          },
          {
            id: "S04-T5-C",
            text: "增強心肌收縮力 — 讓心臟跳得更有力",
            correct: false,
            feedback:
              "Amiodarone 不是強心劑。事實上，Amiodarone 有輕微的負性肌力作用（降低收縮力）。它的價值純粹在電氣層面 — 穩定心肌的電氣環境，中斷異常的再入迴路。",
          },
          {
            id: "S04-T5-D",
            text: "擴張冠狀動脈 — 改善心肌血供",
            correct: false,
            feedback:
              "Amiodarone 確實有輕微的冠狀動脈擴張效應，但這不是在 cardiac arrest 中使用它的理由。在心跳停止時，冠狀動脈灌流完全靠 CPR 產生的壓力梯度（CPP），不是靠血管擴張。",
          },
        ],
      },
      teachingPoint:
        "ACLS 藥物的角色分工：Epi = 提升 CPP（讓 CPR 更有效）；Amiodarone = 穩定電氣環境（讓電擊更有效）；電擊 = 終止 VF/pVT 的唯一確定方法。三者協同工作：高品質 CPR + 及時電擊 + Epi 維持 CPP + Amiodarone 穩定電氣 = 最佳 ROSC 機率。Amiodarone 劑量：首劑 300mg IV/IO，必要時追加 150mg。",
    },
    {
      id: "S04-T7",
      label: "T+7 min — ROSC",
      narrative:
        "第四次電擊後，監視器出現 sinus tachycardia！觸摸頸動脈 — 有脈搏！BP 72/48，SpO₂ 88%。病人仍無意識（GCS E1V1M3）。ROSC 成功！但如果此時監視器顯示有組織性心律，卻摸不到脈搏 — 該怎麼判斷？",
      vitals: {
        hr: 108,
        bp: "72/48",
        spo2: 88,
        rr: 6,
        rhythm: "Sinus Tachycardia",
        gcs: "E1V1M3",
      },
      findings: [
        "ROSC — 自發性循環恢復",
        "頸動脈脈搏可觸及",
        "血壓偏低但可量測",
        "自發呼吸微弱",
        "意識未恢復",
      ],
      decision: {
        question:
          "假設此刻監視器顯示有組織性心律（organized rhythm），但你摸不到脈搏 — 這是 True PEA 還是 PseudoPEA？如何區分？",
        options: [
          {
            id: "S04-T7-A",
            text: "用 POCUS（超音波）看心臟是否有收縮 — 有收縮 = PseudoPEA，無收縮 = True PEA",
            correct: true,
            feedback:
              "正確！PEA 的定義是「心電圖有組織性電氣活動但無可觸知的脈搏」。但這分兩種：True PEA（心臟完全沒有機械性收縮 — 電跟機械完全脫鉤）和 PseudoPEA（心臟其實有收縮，只是太弱摸不到脈搏）。POCUS 是區分兩者的最佳工具。PseudoPEA 的治療重點是升壓（push-dose epi 10-20 mcg），而非 ACLS 的 epi 1mg + CPR。",
          },
          {
            id: "S04-T7-B",
            text: "無法區分 — 摸不到脈搏就是 PEA，按照 ACLS 流程處理",
            correct: false,
            feedback:
              "這是傳統做法，但可能錯過了救命的機會。PseudoPEA 的心臟其實在跳，只是太弱。如果對它做 CPR（壓在正在跳的心臟上），可能反而有害。而給予 ACLS 劑量的 Epi 1mg 可能造成 ROSC 後的劇烈高血壓。用 POCUS 快速確認心臟是否有收縮，可以改變處置方向。",
          },
          {
            id: "S04-T7-C",
            text: "看血壓 — 有血壓就不是 PEA",
            correct: false,
            feedback:
              "摸不到脈搏時通常也量不到常規血壓（NIBP）。但 PseudoPEA 的病人可能在動脈線（A-line）上看到微弱的波形。在院前環境中沒有 A-line，所以 POCUS 是最實用的鑑別工具。",
          },
          {
            id: "S04-T7-D",
            text: "看心率 — 心率正常就是 PseudoPEA",
            correct: false,
            feedback:
              "心率（ECG 上的電氣活動速率）無法告訴你心臟是否真的在收縮。True PEA 也可以有看起來「正常」的心電圖。關鍵是「電氣活動」和「機械收縮」是否匹配，而這只能靠 POCUS 或 A-line 確認。",
          },
        ],
      },
      teachingPoint:
        "PEA 不是一個疾病，而是一個臨床狀態的描述。分辨 True PEA vs PseudoPEA 至關重要：\n- True PEA：心臟完全沒有機械性收縮 → 標準 ACLS（CPR + Epi 1mg + 找可逆原因 H's & T's）\n- PseudoPEA：心臟有微弱收縮但產生的血壓太低以至於摸不到脈搏 → Push-dose Epi 10-20 mcg + 輸液 + 找原因\n兩者的治療方向截然不同。POCUS 是鑑別的最佳工具。",
    },
    {
      id: "S04-T9",
      label: "T+9 min — Post-ROSC 穩定化",
      narrative:
        "ROSC 後 2 分鐘，病人仍無意識。BVM 接 100% O₂ 時 SpO₂ 100%，但 ETCO₂ 只有 22 mmHg，血壓 84/52。團隊問：現在最重要的不是再背一次 ACLS，而是把 post-ROSC 前 5 分鐘做對。你會怎麼設定目標？",
      vitals: {
        hr: 102,
        bp: "84/52",
        spo2: 100,
        rr: 16,
        etco2: 22,
        rhythm: "Sinus Tachycardia with PVCs",
        gcs: "E1V1M3",
      },
      findings: [
        "ROSC 後仍昏迷",
        "SpO₂ 100%（仍在 100% FiO₂）",
        "ETCO₂ 22 mmHg，提示可能過度通氣",
        "MAP 仍低於 65",
        "需盡快完成 12-lead ECG 並思考 coronary evaluation",
      ],
      decision: {
        question:
          "下列何者最符合 ROSC 後前 5 分鐘的整體目標？",
        options: [
          {
            id: "S04-T9-A",
            text: "維持 SpO₂ 100%，把 ETCO₂ 壓到 < 25，以降低腦壓並增加氧輸送",
            correct: false,
            feedback:
              "這是常見錯誤。ROSC 後應避免 hyperoxia 與 hyperventilation。ETCO₂ / PaCO₂ 太低會造成腦血管收縮，反而減少腦灌流。",
          },
          {
            id: "S04-T9-B",
            text: "將氧氣滴定至 SpO₂ 90–98%，避免過度通氣，支持 MAP ≥ 65，完成 12-lead ECG 並安排後續 coronary evaluation",
            correct: true,
            feedback:
              "正確！Post-ROSC 的第一段目標是第二階段 resuscitation：避免 hypoxia / hyperoxia、避免 hyperventilation（PaCO₂ 35–45 或 ETCO₂ 接近正常）、維持 MAP ≥ 65，並盡快用 12-lead ECG 與臨床資料評估 ACS / PCI 需求。",
          },
          {
            id: "S04-T9-C",
            text: "繼續 Epi 1mg q3-5 min，直到收縮壓回到 120 以上再說",
            correct: false,
            feedback:
              "ROSC 後不應再沿用 arrest dosing。此時更重要的是精準 hemodynamic support，例如 norepinephrine，而不是機械式繼續給 ACLS 劑量 Epi。",
          },
          {
            id: "S04-T9-D",
            text: "先送走，不需要 12-lead；腦部 CT 或 echo 也都可以到院後再說",
            correct: false,
            feedback:
              "Post-ROSC 不是『穩了再評估』。若是 ischemic arrest，12-lead ECG 和後續 coronary evaluation 需要盡早啟動；若病因不明或昏迷持續，也要在到院流程中準備 CT / echo 評估。",
          },
        ],
      },
      teachingPoint:
        "ROSC 後前 5 分鐘 = 第二階段 resuscitation。\n- Oxygenation：SpO₂ 90–98%\n- Ventilation：避免 hyperventilation，PaCO₂ 35–45 或 ETCO₂ 接近正常\n- Hemodynamics：MAP ≥ 65，必要時以 norepinephrine 支持\n- Diagnostics：12-lead ECG；依病因考慮 coronary evaluation / echo / CT\n不要把『有脈搏』誤認成『已完成急救』。",
    },
  ],
  criticalActions: [
    {
      id: "S04-CA1",
      text: "高品質 CPR — 深度 5-6cm、速率 100-120、完全回彈、最小化暫停",
      isCritical: true,
      stageId: "S04-T0",
    },
    {
      id: "S04-CA2",
      text: "及時電擊 — VF/pVT 辨識後盡速電擊，不要浪費時間",
      isCritical: true,
      stageId: "S04-T0",
    },
    {
      id: "S04-CA3",
      text: "正確使用 Epi — 理解是 CPP 提升（Alpha-1），非直接心臟刺激",
      isCritical: false,
      stageId: "S04-T3",
    },
    {
      id: "S04-CA4",
      text: "正確使用 Amiodarone — 電氣穩定化，非取代電擊",
      isCritical: false,
      stageId: "S04-T5",
    },
    {
      id: "S04-CA5",
      text: "思考 H's and T's — 尋找可逆原因並針對性處理",
      isCritical: true,
      stageId: "S04-T3",
    },
    {
      id: "S04-CA6",
      text: "區分 True PEA vs PseudoPEA — 使用 POCUS 鑑別，調整處置方向",
      isCritical: true,
      stageId: "S04-T7",
    },
    {
      id: "S04-CA7",
      text: "Post-ROSC 前 5 分鐘：SpO₂ 90-98、避免過度通氣、MAP ≥ 65、盡快 12-lead / coronary evaluation",
      isCritical: true,
      stageId: "S04-T9",
    },
  ],
};
