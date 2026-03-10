export type CognitiveLevel = "Remember" | "Apply" | "Analyze";
export type QuizModule = "M01" | "M02";
export type QuizUsage = "Pre" | "Post";

export interface Question {
  id: number;
  module: QuizModule;
  level: CognitiveLevel;
  usage: QuizUsage[];
  question: string;
  options: [string, string, string, string];
  answer: "A" | "B" | "C" | "D";
  explanation: string;
}

export const questions: Question[] = [
  // ── M01 ALS 病生理學 ──────────────────────────────────
  {
    id: 1, module: "M01", level: "Apply", usage: ["Pre"],
    question: "一位肺炎併發呼吸衰竭的患者，SpO₂ 85%，RR 35/min。給予 NRM 15L/min 後 SpO₂ 升至 98%，但 RR 仍維持 35/min，且意識逐漸昏沉。請問此時生理機轉最可能為？",
    options: [
      "Oxygenation Failure (Type 1 Respiratory Failure) 已改善，病情穩定",
      "Ventilation Failure (Type 2 Respiratory Failure) 持續惡化，CO₂ 蓄積",
      "Metabolic Acidosis 代償反應",
      "Shock 造成的腦部灌流不足",
    ],
    answer: "B",
    explanation: "給氧改善了 SpO₂ (Oxygenation)，但 RR 快且意識變差（CO₂ Narcosis）提示通氣衰竭（Ventilation failure），CO₂ 排不出去。此時單純給氧不夠，需輔助通氣 (BVM/CPAP/Intubation)。",
  },
  {
    id: 2, module: "M01", level: "Remember", usage: ["Post"],
    question: "關於休克（Shock）的病生理進程，下列敘述何者正確？",
    options: [
      "血壓下降 (Hypotension) 是休克早期的敏感指標",
      "代償期 (Compensated) 休克時，心跳通常會變慢以節省氧氣",
      "失代償期 (Decompensated) 會出現乳酸堆積 (Lactic Acidosis)",
      "只要給予足夠輸液，任何階段的休克都能逆轉",
    ],
    answer: "C",
    explanation: "A 錯，低血壓是晚期；B 錯，代償期交感興奮 HR 會快；C 對，細胞缺氧轉無氧代謝產生乳酸；D 錯，不可逆休克期無法逆轉。",
  },
  {
    id: 3, module: "M01", level: "Apply", usage: ["Pre"],
    question: "嚴重創傷休克病人，周邊脈搏摸不到，意識躁動。此時最優先的處置目標是？",
    options: [
      "插管 (Intubation) 以確保呼吸道",
      "給予鎮靜劑 (Sedation) 讓病人安靜",
      "文獻回顧顯示需維持 SBP > 140 mmHg",
      "恢復組織灌流 (Fluid/Blood/Stop bleeding)",
    ],
    answer: "D",
    explanation: "休克優先處理循環 (Stop the bleed / Volume)。插管 (RSI) 的藥物會導致血管擴張，且正壓通氣會減少回心血流，可能導致病人當場 OHCA。",
  },
  {
    id: 4, module: "M01", level: "Analyze", usage: ["Pre"],
    question: "在監測休克病人時，End-tidal CO₂ (EtCO₂) 數值由 35 mmHg 驟降至 15 mmHg，且波形仍規律，最可能代表？",
    options: [
      "氣管內管滑脫 (Extubation)",
      "嚴重低灌流 (Severe Hypoperfusion) 或心跳停止 (Cardiac Arrest)",
      "呼吸性酸中毒 (Respiratory Acidosis)",
      "病人換氣過度 (Hyperventilation)",
    ],
    answer: "B",
    explanation: "EtCO₂ 反映心輸出量 (Cardiac Output)。當循環衰竭，肺部血流減少，無法將 CO₂ 帶到肺泡排出，導致 EtCO₂ 驟降。這是即將或已經 Cardiac Arrest 的重要警訊。",
  },
  {
    id: 5, module: "M01", level: "Remember", usage: ["Post"],
    question: "下列哪一項生命徵象組合最符合「神經性休克 (Neurogenic Shock)」的特徵？",
    options: [
      "BP↓, HR↑, Skin Cold/Clammy",
      "BP↓, HR↓, Skin Warm/Dry",
      "BP↑, HR↓, Breathing Irregular (Cushing triad)",
      "BP↓, HR↑, Skin Warm/Flushed (Early sepsis)",
    ],
    answer: "B",
    explanation: "脊髓損傷導致交感神經阻斷，血管擴張 (BP↓, Skin Warm)，且無法以心跳代償 (HR 正常或慢)。A 是低血容/心因性休克表現。",
  },
  {
    id: 6, module: "M01", level: "Remember", usage: ["Post"],
    question: "一位 DKA (糖尿病酮酸中毒) 病人，呼吸深快 (Kussmaul breathing)。此生理機制的目的是？",
    options: [
      "增加氧氣攝取 (Increase Oxygenation)",
      "排除 CO₂ 以代償代謝性酸中毒 (Respiratory Compensation)",
      "因高血糖導致腦部受損的異常呼吸",
      "這是瀕死呼吸 (Agonal respiration)",
    ],
    answer: "B",
    explanation: "代謝性酸中毒 (pH↓) 會刺激呼吸中樞增加通氣量 (RR↑, TV↑)，排出 CO₂ (酸) 來拉升 pH。",
  },
  {
    id: 7, module: "M01", level: "Apply", usage: ["Post"],
    question: "針對上述 DKA 病人，若您決定插管，呼吸器設定（或 BVM 擠壓）應注意什麼？",
    options: [
      "維持正常呼吸次數 (12-16/min) 即可",
      "需維持較高的通氣量 (Hyperventilation) 以匹配其代償需求",
      "應給予較低的通氣量以避免肺高壓",
      "插管後應立即給予 NaHCO₃",
    ],
    answer: "B",
    explanation: "若將呼吸次數降回正常，會導致 CO₂ 瞬間堆積，pH 驟降，可能引發心律不整或 Cardiac arrest。",
  },
  {
    id: 8, module: "M01", level: "Remember", usage: ["Pre"],
    question: "下列何者是組織灌流 (Perfusion) 的最佳臨床指標？",
    options: [
      "收縮壓 (Systolic BP)",
      "SpO₂",
      "意識狀態 (Conscious Level) 與末梢循環 (CRT/Skin)",
      "呼吸次數 (RR)",
    ],
    answer: "C",
    explanation: "大腦和皮膚對灌流最敏感。血壓正常但意識不清/皮膚濕冷，通常代表處於代償性休克。",
  },
  {
    id: 9, module: "M01", level: "Remember", usage: ["Post"],
    question: "關於氧氣解離曲線 (Oxyhemoglobin Dissociation Curve)，當病人發燒、酸中毒 (Acidosis) 時，曲線會如何變化？",
    options: [
      "向左位移，Hb 抓氧力變強，組織缺氧",
      "向右位移，Hb 釋放氧氣能力變強，有利組織獲氧",
      "不改變",
      "變為直線",
    ],
    answer: "B",
    explanation: "Bohr Effect。酸/熱/高 CO₂ 會讓曲線右移 (Right Shift)，讓血紅素更容易把氧氣丟給組織使用。",
  },
  {
    id: 10, module: "M01", level: "Apply", usage: ["Post"],
    question: "OHCA 病人 ROSC 後 2 分鐘，SpO₂ 100%（BVM + 100% O₂）、BP 78/46、EtCO₂ 22。下列何者最符合 post-ROSC 前 5 分鐘的處置目標？",
    options: [
      "維持 SpO₂ 100%，並把 EtCO₂ 壓到 <25 以降低腦壓",
      "將氧氣滴定至 SpO₂ 90-98%，避免過度通氣、支持 MAP ≥ 65，並完成 12-lead ECG / 後續 coronary evaluation",
      "繼續 Epi 1 mg q3-5 min，直到收縮壓回到 120 以上",
      "先給 Furosemide 20 mg IV，預防 CPR 後肺水腫",
    ],
    answer: "B",
    explanation: "Post-ROSC 是第二階段 resuscitation。目標包含：SpO₂ 90-98%、避免 hyperventilation（PaCO₂ 35-45 或 EtCO₂ 接近正常）、MAP ≥ 65、以及盡快完成 12-lead ECG 並依病因安排 coronary evaluation。過度通氣與持續 arrest dosing 的 Epi 都可能帶來傷害。",
  },
  {
    id: 11, module: "M01", level: "Analyze", usage: ["Post"],
    question: "老年人跌倒，BP 110/70，HR 70。但他平時有服用 Beta-blocker。我們應如何解讀其生命徵象？",
    options: [
      "生命徵象穩定，可排除休克",
      "Beta-blocker 可能掩蓋休克時的心跳過速 (Tachycardia) 反應",
      "這是神經性休克",
      "這是過敏性休克",
    ],
    answer: "B",
    explanation: "服用 Beta-blocker 或鈣離子阻斷劑的老人，即使休克流血，心跳也可能快不起來，容易誤判為穩定。",
  },
  {
    id: 12, module: "M01", level: "Remember", usage: ["Post"],
    question: "關於脈壓差 (Pulse Pressure, SBP - DBP)，下列何者正確？",
    options: [
      "脈壓差變窄 (Narrowing) 是休克早期徵兆，反映 SVR 上升與 Stroke Volume 下降",
      "脈壓差變寬 (Widening) 常見於低血容性休克",
      "脈壓差與灌流無關",
      "脈壓差變窄通常見於腦壓升高 (IICP)",
    ],
    answer: "A",
    explanation: "休克早期，舒張壓因血管收縮維持或上升，收縮壓因心輸出量降而平或降，導致差距變小（窄）。D 是 Cushing triad，脈壓會變寬。",
  },
  {
    id: 13, module: "M01", level: "Apply", usage: ["Pre"],
    question: "在創傷急救現場，若您懷疑張力性氣胸 (Tension Pneumothorax)，哪個徵象最支持此診斷？",
    options: [
      "SpO₂ 94%",
      "呼吸費力",
      "嚴重低血壓 (Shock) 伴隨單側呼吸音消失與頸靜脈怒張 (JVD)",
      "傷口疼痛",
    ],
    answer: "C",
    explanation: "單純氣胸不會導致嚴重休克。張力性氣胸是因為胸內壓壓迫上/下腔靜脈，導致回心血流受阻 → 休克。這是 Obstructive Shock。",
  },
  {
    id: 14, module: "M01", level: "Remember", usage: ["Post"],
    question: "關於乳酸 (Lactate) 的敘述，何者錯誤？",
    options: [
      "是無氧代謝的產物",
      "大於 2 mmol/L (or 4 mmol/L) 提示組織灌流不足",
      "只有敗血症會高，創傷病人不會高",
      "乳酸清除率 (Lactate clearance) 可作為急救復甦的指標",
    ],
    answer: "C",
    explanation: "任何原因導致的組織缺氧（創傷、心因性、敗血性休克）都會導致乳酸升高。",
  },
  {
    id: 15, module: "M01", level: "Remember", usage: ["Post"],
    question: "嚴重低體溫 (Severe Hypothermia, <30°C) 病人的脈搏檢查，指引建議至少需檢查多久？",
    options: [
      "10 秒",
      "30–45 秒",
      "1 分鐘",
      "不用摸，直接壓胸",
    ],
    answer: "B",
    explanation: "極度低體溫心跳極慢且微弱，太快判定無脈搏可能導致不必要的壓胸引發 VF。AHA 建議 30-45 秒，甚至到 60 秒。",
  },

  // ── M02 藥物動力學/藥效學 ─────────────────────────────
  {
    id: 16, module: "M02", level: "Remember", usage: ["Pre"],
    question: "關於給藥途徑的 Onset 時間，由快至慢排列何者正確？",
    options: [
      "IV > IO > IM",
      "IO > IV > IM",
      "IV = IO > IN > IM",
      "IM > IN > IV",
    ],
    answer: "C",
    explanation: "IV 與 IO 都屬快速 route，IN 次之，IM 最慢。成人 cardiac arrest 依 2025 AHA 應先嘗試 IV；若 IV 延遲、失敗或不可行，再改 IO。",
  },
  {
    id: 17, module: "M02", level: "Apply", usage: ["Pre"],
    question: "在休克 (Shock) 病人身上，為何不建議使用 IM (肌肉注射) 給予鎮靜藥物？",
    options: [
      "因為會導致肌肉壞死",
      "因為周邊血管收縮，肌肉血流灌流不足，吸收極差",
      "因為 IM 比較痛",
      "因為 IM 會導致出血不止",
    ],
    answer: "B",
    explanation: "休克時血流集中至核心，肌肉層血流極少，藥物無法吸收。等休克好轉血流恢復時，積存的藥物一次釋放，可能造成二次過量危險。",
  },
  {
    id: 18, module: "M02", level: "Apply", usage: ["Post"],
    question: "您要對一位 80 歲、體重 50 公斤的躁動阿嬤給予 Midazolam 鎮靜。相較於 30 歲壯年人，您的考量是？",
    options: [
      "劑量不變",
      "劑量加倍，因為老人對痛覺敏感",
      "劑量減半或更少，因為老人代謝慢、分布體積改變，容易呼吸抑制",
      "改用 Ketamine",
    ],
    answer: "C",
    explanation: "Start low, go slow。老人對 BZD 類藥物敏感度高且代謝慢。",
  },
  {
    id: 19, module: "M02", level: "Apply", usage: ["Post"],
    question: "IO (Intraosseous) 建立後，推藥前必須先做什麼動作以確保藥物能快速進入循環（尤其是 Conscious IO）？",
    options: [
      "抽吸看有無骨髓",
      "直接推藥",
      "施打 Lidocaine (止痛) 並用 NS 快速沖洗 (Flush) 衝開骨髓腔",
      "旋轉針頭確認深度",
    ],
    answer: "C",
    explanation: "Tibial IO 內有 Fibrin mesh，需 Flush 衝開才能建立流暢通道。清醒病人推 Flush 會非常痛，故建議先給 Lidocaine。",
  },
  {
    id: 20, module: "M02", level: "Remember", usage: ["Pre"],
    question: "Epinephrine 用於治療過敏性休克 (Anaphylactic Shock) 的濃度與途徑首選為？",
    options: [
      "1:10,000 (1mg/10ml) IV push",
      "1:1,000 (1mg/1ml) IM 肌肉注射",
      "1:1,000 (1mg/1ml) IV push",
      "1:10,000 (1mg/10ml) IM 肌肉注射",
    ],
    answer: "B",
    explanation: "過敏性休克首選 IM (大腿外側)，濃度用原液 1:1000。IV push 對心臟風險太大，通常用於已 Cardiac arrest 或極端嚴重且 Monitor 監測下的休克。",
  },
  {
    id: 21, module: "M02", level: "Apply", usage: ["Pre"],
    question: "關於 Push-dose Epinephrine 的泡製，下列何者正確？",
    options: [
      "直接抽 1:1000 原液 1ml 打入",
      "取 1ml 的 1:10,000 Epinephrine (0.1mg) 加水稀釋至 10ml → 濃度變為 10mcg/ml",
      "取 1ml 的 1:1000 Epinephrine 加水稀釋至 10ml",
      "用 D5W 泡製",
    ],
    answer: "B",
    explanation: "標準泡法是將 Cardiac arrest 用的 Epi (1mg/10ml) 抽 1ml 出來，再加 9ml NS，變成 10mcg/ml。",
  },
  {
    id: 22, module: "M02", level: "Remember", usage: ["Post"],
    question: "Amiodarone 若採快速 IV 推注 (IV push)，最常見且顯著的副作用是？",
    options: [
      "高血壓 (Hypertension)",
      "低血壓 (Hypotension)",
      "癲癇 (Seizure)",
      "支氣管痙攣",
    ],
    answer: "B",
    explanation: "Amiodarone 的溶劑 Polysorbate 80 或 Benzyl alcohol 會造成血管擴張與心肌抑制，導致低血壓。故活人建議 Drip 慢滴。",
  },
  {
    id: 23, module: "M02", level: "Remember", usage: ["Post"],
    question: "鼻內給藥 (IN) 的限制，下列何者正確？",
    options: [
      "每個鼻孔給藥體積不宜超過 1ml，否則會流出無法吸收",
      "任何藥物都能 IN",
      "休克病人首選 IN",
      "IN 需要無菌技術",
    ],
    answer: "A",
    explanation: "IN 靠黏膜吸收，體積過大會流到喉嚨變成口服 (PO)，效果變差。",
  },
  {
    id: 24, module: "M02", level: "Remember", usage: ["Post"],
    question: "Fentanyl 相較於 Morphine，在急救現場的優勢為？",
    options: [
      "藥效比較長",
      "較不會引起組織胺釋放 (Histamine release)，較不影響血壓",
      "比較便宜",
      "不會抑制呼吸",
    ],
    answer: "B",
    explanation: "Morphine 易引發組織胺釋放導致血管擴張 (Low BP)，Fentanyl 對血流動力學影響較小 (Hemodynamic stable)。但兩者都會抑制呼吸。",
  },
  {
    id: 25, module: "M02", level: "Remember", usage: ["Post"],
    question: "關於 Adenosine 的給藥方式，何者關鍵？",
    options: [
      "慢慢推以減少副作用",
      "必須用 D5W 稀釋",
      "快速推注 (IV rapid push) 並立即抬高肢體與 Flush，因為半衰期極短",
      "可以 IM 注射",
    ],
    answer: "C",
    explanation: "Adenosine 半衰期 < 10 秒，推太慢在血管內就被 RBC 代謝光了，到不了心臟。",
  },
  {
    id: 26, module: "M02", level: "Apply", usage: ["Pre"],
    question: "在心跳停止 (Cardiac Arrest) 急救中，為何我們給藥後要推 20ml NS 並抬手？",
    options: [
      "因為藥物很黏稠",
      "為了減少靜脈炎",
      "為了縮短 Circulation time，將藥物推入中心循環",
      "為了稀釋藥物濃度",
    ],
    answer: "C",
    explanation: "CPR 時血流極慢，不推沖洗液，藥物會滯留在周邊血管，無法到達心臟發揮作用。",
  },
  {
    id: 27, module: "M02", level: "Apply", usage: ["Post"],
    question: "為什麼低體溫 (Hypothermia) 病人在 ROSC 後，對於鎮靜藥物的需求可能較低？",
    options: [
      "低體溫會麻痺神經",
      "酵素活性下降，藥物代謝 (Metabolism) 變慢，藥效延長",
      "腦細胞已經死亡",
      "腎臟排泄增加",
    ],
    answer: "B",
    explanation: "體溫每降 1 度，代謝率約降 6–7%。低體溫時肝臟酵素代謝藥物能力大幅下降，容易蓄積。",
  },
  {
    id: 28, module: "M02", level: "Remember", usage: ["Post"],
    question: "關於成人 cardiac arrest 的血管通路策略，下列何者正確？",
    options: [
      "IO 應固定優先於 IV，因為一定更快",
      "應先嘗試 IV；若 IV 延遲、失敗或不可行，IO 是合理替代",
      "Tibial IO 在所有情境都比 Humeral IO 更快到達中心循環",
      "建立 IO 後不需要 flush 或加壓輸液",
    ],
    answer: "B",
    explanation: "2025 AHA 建議成人 cardiac arrest 優先嘗試 IV access；若 IV 失敗、延遲或不可行，IO 是合理替代。Humeral IO 常較快接近中心循環，但不是無條件定論；重點是最快建立可用 route，且 IO 後仍需 flush，Tibial 常需加壓輸液。",
  },
  {
    id: 29, module: "M02", level: "Analyze", usage: ["Post"],
    question: "哪一類休克病人對 Vasopressor (升壓劑) 的反應可能最差？",
    options: [
      "敗血性休克",
      "心因性休克",
      "末期失代償性休克 (酸中毒嚴重)",
      "神經性休克",
    ],
    answer: "C",
    explanation: "嚴重酸中毒 (Acidosis) 會導致血管平滑肌對 Catecholamine (如 Epi/Norepi) 的敏感度下降 (Refractory to pressors)。需先矯正容積與酸中毒。",
  },
  {
    id: 30, module: "M02", level: "Analyze", usage: ["Post"],
    question: "懷孕末期創傷孕婦的急救用藥考量，下列何者正確？",
    options: [
      "所有藥物劑量都要減半",
      "優先考量母體穩定 (Resuscitate the mother = Resuscitate the fetus)",
      "絕對不可以使用 Epinephrine，會造成胎盤血管收縮",
      "應該先幫孕婦剖腹產再給藥",
    ],
    answer: "B",
    explanation: "母體休克是胎兒死亡最大主因。雖 Epi 可能收縮胎盤血管，但若母體死亡胎兒必死，故仍依 ACLS/ATLS 原則優先搶救母體循環。",
  },

  // ── 心因性休克、APE、PseudoPEA（Q31-Q35）──────────────
  {
    id: 31, module: "M01", level: "Apply", usage: ["Post"],
    question: "65 歲男性，主訴胸痛合併呼吸困難。BP 180/110, HR 110, SpO₂ 88%，雙肺佈滿濕囉音，端坐呼吸，咳出粉紅泡沫痰。使用 Nohria-Stevenson 矩陣分類，此病人屬於？",
    options: [
      "Warm + Dry（A 象限）",
      "Warm + Wet（B 象限）",
      "Cold + Dry（L 象限）",
      "Cold + Wet（C 象限）",
    ],
    answer: "B",
    explanation: "四肢尚溫暖（Warm）+ 雙側囉音/肺水腫（Wet）= B 象限。高血壓 + 急性肺水腫 + 呼吸窘迫 = SCAPE。處置方向：NTG + CPAP/BiPAP。",
  },
  {
    id: 32, module: "M01", level: "Analyze", usage: ["Post"],
    question: "承 Q31，給予 NTG SL + CPAP 後 5 分鐘，病人突然惡化：BP 75/50, HR 130, 皮膚冰冷濕黏，囉音加重。此時的最佳處置是？",
    options: [
      "加大 NTG 劑量（加強降壓）",
      "給予 Furosemide 20 mg IV（利尿排水）",
      "停止 NTG，給予 Push-dose Epinephrine 10–20 mcg IV",
      "快速輸注 NS 1000 mL",
    ],
    answer: "C",
    explanation: "從 Warm+Wet 轉為 Cold+Wet（C 象限）—— forward failure 加劇。NTG 在 SBP < 90 禁用；Furosemide 在低灌流時無效；大量輸液加重肺水腫。正確：停 NTG → 升壓（push-dose epi）。",
  },
  {
    id: 33, module: "M01", level: "Analyze", usage: ["Post"],
    question: "OHCA 急救中，電擊後 ECG 轉為 sinus tachycardia，但頸動脈脈搏仍摸不到。POCUS 顯示心臟有收縮。此狀態最可能是？",
    options: [
      "True PEA（真無脈搏電氣活動）",
      "Asystole（心跳停止）",
      "PseudoPEA（假無脈搏電氣活動）",
      "VF（心室顫動）",
    ],
    answer: "C",
    explanation: "ECG 有 organized rhythm + 無脈搏 + POCUS 有心臟收縮 = PseudoPEA。心臟還在跳但心輸出量極低。管理方式是升壓（push-dose epi 10-20 mcg），而非標準 ACLS Epi 1 mg。",
  },
  {
    id: 34, module: "M02", level: "Apply", usage: ["Pre"],
    question: "關於 Nitroglycerin (NTG) 在急性肺水腫的應用，下列何者正確？",
    options: [
      "NTG 是利尿劑，可幫助排除肺部多餘液體",
      "NTG 低劑量擴張靜脈（減前負荷），高劑量擴張動脈（減後負荷），是 SCAPE 首選",
      "SBP 60 mmHg 的休克病人仍可使用 NTG",
      "NTG 舌下吸收不受灌流狀態影響",
    ],
    answer: "B",
    explanation: "NTG 是血管擴張劑（非利尿劑）。低劑量靜脈擴張→減前負荷→減肺水腫；高劑量動脈擴張→減後負荷→減心臟負擔。SBP < 90 禁用。低灌流時 SL 吸收差。",
  },
  {
    id: 35, module: "M02", level: "Analyze", usage: ["Post"],
    question: "在 PseudoPEA 狀態下（POCUS 確認心臟有收縮），為什麼不能使用標準 ACLS 劑量 Epinephrine 1 mg IV？",
    options: [
      "因為 PseudoPEA 不需要任何 Epinephrine",
      "因為心臟還在跳，全量 Epi 會導致心肌過度興奮 → VF/VT",
      "因為 PseudoPEA 只能用 IM 給藥",
      "因為 1 mg 劑量太小不夠用",
    ],
    answer: "B",
    explanation: "PseudoPEA 的心臟仍有收縮能力，只是心輸出量極低。ACLS 劑量 1 mg = push-dose 劑量的 50–100 倍。對還在跳的心臟打全量 Epi → 心肌氧耗暴增 + 受體過度興奮 → 極易打成 VF/VT。正確：push-dose epi 10–20 mcg IV q1–2 min。",
  },
];

/** Pre-test subset (10 questions): Q1,3,4,8,13,16,17,20,21,34 */
export const preTestIds = [1, 3, 4, 8, 13, 16, 17, 20, 21, 34];

/** Post-test subset (20 questions): Q2,5,6,7,9,10,11,12,14,31,18,19,22,23,24,25,27,28,29,33 */
export const postTestIds = [2, 5, 6, 7, 9, 10, 11, 12, 14, 31, 18, 19, 22, 23, 24, 25, 27, 28, 29, 33];

export function getQuiz(type: "pre" | "post" | "all"): Question[] {
  if (type === "pre") return questions.filter((q) => preTestIds.includes(q.id));
  if (type === "post") return questions.filter((q) => postTestIds.includes(q.id));
  return questions;
}
