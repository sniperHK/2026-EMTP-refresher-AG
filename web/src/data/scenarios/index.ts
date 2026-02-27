import type { Scenario } from '@/data/types'

// 示範情境：心因性休克
const S01: Scenario = {
  id: 'S01',
  title: '心因性休克',
  subtitle: 'Cardiogenic Shock — AMI 後泵衰竭',
  duration: '15 分鐘',
  pumpPipeTank: 'pump',
  color: 'var(--medical-red)',
  stages: [
    {
      id: 'S01-1',
      label: '到場評估',
      narrative:
        '68 歲男性，胸痛約 40 分鐘，冷汗、呼吸困難。家屬表示有高血壓、糖尿病病史。你到場時患者坐在沙發上，面色蒼白，呼吸急促。',
      vitals: { hr: 112, bp: '82/54', spo2: 89, rr: 28, rhythm: 'Sinus Tachycardia', gcs: 'E3V4M6' },
      findings: ['胸痛放射至左臂', '冷汗淋漓', '頸靜脈怒張', '雙下肺囉音', '周邊末梢冰冷'],
      decision: {
        question: '根據初步評估，你首先應該執行什麼？',
        options: [
          { id: 'A', text: '立即給予 NTG 舌下含片', correct: false, feedback: '收縮壓 < 90 mmHg，NTG 為禁忌症，可能加重低血壓。' },
          { id: 'B', text: '高流量氧氣 + 12 導程心電圖', correct: true, feedback: '正確！低血氧需先矯正，12-lead ECG 可確認 STEMI 並啟動心導管團隊。' },
          { id: 'C', text: '快速輸液 500 mL challenge', correct: false, feedback: '患者已有肺水腫跡象（囉音、JVD），大量輸液會加重肺水腫。' },
          { id: 'D', text: '給予 Morphine 止痛', correct: false, feedback: 'Morphine 可能抑制呼吸及血壓，在休克狀態下非首選。' },
        ],
      },
      teachingPoint: 'Pump failure 的特徵：低血壓 + 肺水腫（JVD、囉音）。處置優先順序：Airway/Breathing 先穩定，再做鑑別診斷。',
    },
    {
      id: 'S01-2',
      label: '12-Lead 判讀',
      narrative: '12 導程心電圖顯示 V1-V4 ST 段抬高 > 2mm，符合前壁 STEMI。患者意識稍微下降，持續低血壓。',
      vitals: { hr: 118, bp: '78/50', spo2: 92, rr: 26, etco2: 28, rhythm: 'Sinus Tachycardia with PVCs', gcs: 'E3V3M6' },
      findings: ['前壁 STEMI', 'PVC 頻發', 'Killip Class IV', '末梢充填時間 > 4 秒'],
      decision: {
        question: '確認 STEMI 合併心因性休克，下一步最重要的處置？',
        options: [
          { id: 'A', text: '現場給予血栓溶解劑', correct: false, feedback: '心因性休克時血栓溶解效果差，應優先考慮 PCI。' },
          { id: 'B', text: '啟動心導管室 + 升壓劑支持轉送', correct: true, feedback: '正確！STEMI + cardiogenic shock 需緊急 PCI。轉送途中以升壓劑維持灌流。' },
          { id: 'C', text: '先觀察 30 分鐘再決定', correct: false, feedback: '延遲再灌流時間會增加死亡率，door-to-balloon time 每分鐘都重要。' },
          { id: 'D', text: '使用 Amiodarone 控制 PVC', correct: false, feedback: 'PVC 是休克的次發現象，治療根本原因（再灌流）比抗心律不整更重要。' },
        ],
      },
      teachingPoint: 'STEMI + cardiogenic shock：死亡率 > 50%。緊急 PCI 是唯一被證實可降低死亡率的治療。院前啟動 cath lab 可節省寶貴時間。',
    },
    {
      id: 'S01-3',
      label: '轉送途中',
      narrative: '轉送途中，患者突然意識喪失，心電圖顯示 VF。',
      vitals: { hr: 0, bp: '0/0', spo2: 0, rr: 0, rhythm: 'Ventricular Fibrillation', gcs: 'E1V1M1' },
      findings: ['VF 心律', '無脈搏', '瞳孔散大'],
      decision: {
        question: 'VF 心律，你的首要處置？',
        options: [
          { id: 'A', text: '立即給予 Epinephrine 1mg IV', correct: false, feedback: 'VF/pVT 的第一步是電擊，Epinephrine 在第一次電擊後才考慮。' },
          { id: 'B', text: '開始 CPR 2 分鐘後再電擊', correct: false, feedback: '當場已有 monitor 顯示 VF，應立即電擊，不需先 CPR。' },
          { id: 'C', text: '立即雙相電擊 200J', correct: true, feedback: '正確！VF 為可電擊心律，第一時間電擊是首要處置。' },
          { id: 'D', text: '給予 Amiodarone 300mg IV', correct: false, feedback: 'Amiodarone 是在第三次電擊後才使用的輔助藥物。' },
        ],
      },
      teachingPoint: 'VF/pVT 處置：電擊優先。記住 ACLS 流程 — 可電擊心律第一步永遠是 defibrillation。',
    },
  ],
  criticalActions: [
    { id: 'CA01', text: '給予高流量氧氣', isCritical: true, stageId: 'S01-1' },
    { id: 'CA02', text: '執行 12-Lead ECG', isCritical: true, stageId: 'S01-1' },
    { id: 'CA03', text: '辨識 STEMI', isCritical: true, stageId: 'S01-2' },
    { id: 'CA04', text: '啟動心導管室', isCritical: true, stageId: 'S01-2' },
    { id: 'CA05', text: '給予升壓劑', isCritical: false, stageId: 'S01-2' },
    { id: 'CA06', text: 'VF 立即電擊', isCritical: true, stageId: 'S01-3' },
  ],
}

// 示範情境：張力性氣胸
const S02: Scenario = {
  id: 'S02',
  title: '張力性氣胸',
  subtitle: 'Tension Pneumothorax — Pipe 阻塞',
  duration: '12 分鐘',
  pumpPipeTank: 'pipe',
  color: 'var(--medical-blue)',
  stages: [
    {
      id: 'S02-1',
      label: '到場評估',
      narrative:
        '22 歲男性，機車對撞車禍。主訴右胸痛、呼吸困難。你到場時患者躺在路邊，呼吸急促，明顯使用輔助呼吸肌。',
      vitals: { hr: 130, bp: '88/60', spo2: 84, rr: 34, rhythm: 'Sinus Tachycardia', gcs: 'E4V4M6' },
      findings: ['右胸壁挫傷', '右側呼吸音減弱', '頸靜脈怒張', '氣管偏左', '皮下氣腫'],
      decision: {
        question: '這些發現最符合哪個診斷？',
        options: [
          { id: 'A', text: '肋骨骨折合併血胸', correct: false, feedback: '血胸通常不會有氣管偏移和皮下氣腫。' },
          { id: 'B', text: '張力性氣胸', correct: true, feedback: '正確！低血壓 + JVD + 氣管偏移 + 患側呼吸音消失 = 張力性氣胸經典表現。' },
          { id: 'C', text: '心包膜填塞', correct: false, feedback: '心包膜填塞有 Beck\'s triad（低血壓、JVD、心音遙遠），但不會有氣管偏移。' },
          { id: 'D', text: '大量氣血胸', correct: false, feedback: '部分特徵吻合，但氣管偏移 + 皮下氣腫指向張力性氣胸。' },
        ],
      },
      teachingPoint: '張力性氣胸是臨床診斷，不需等影像。經典五徵：低血壓、JVD、氣管偏移、患側呼吸音消失、皮下氣腫。Pipe 問題：胸腔內壓增加阻礙靜脈回流。',
    },
    {
      id: 'S02-2',
      label: '緊急處置',
      narrative: '你判斷為張力性氣胸，患者血壓持續下降，意識開始模糊。',
      vitals: { hr: 140, bp: '72/40', spo2: 78, rr: 38, rhythm: 'Sinus Tachycardia', gcs: 'E3V3M5' },
      findings: ['意識變差', '末梢發紺', '呼吸窘迫加劇'],
      decision: {
        question: '最緊急的處置是什麼？',
        options: [
          { id: 'A', text: '等待到院後胸管置入', correct: false, feedback: '張力性氣胸是即刻致命的急症，不能等待。' },
          { id: 'B', text: '針刺減壓（Needle Decompression）', correct: true, feedback: '正確！院前針刺減壓是張力性氣胸的救命處置。在右側鎖骨中線第二肋間或腋中線第五肋間執行。' },
          { id: 'C', text: '快速輸液 2L', correct: false, feedback: '輸液無法解決氣胸造成的阻塞性休克，根本問題是胸腔壓力。' },
          { id: 'D', text: '氣管內插管', correct: false, feedback: '在未減壓前正壓通氣會加重張力性氣胸，可能導致心跳停止。' },
        ],
      },
      teachingPoint: '針刺減壓位置：鎖骨中線第二肋間（傳統）或腋中線第五肋間（成功率較高）。使用 14G 以上針頭。聽到氣體逸出聲 = 成功。',
    },
  ],
  criticalActions: [
    { id: 'CA07', text: '辨識張力性氣胸', isCritical: true, stageId: 'S02-1' },
    { id: 'CA08', text: '執行針刺減壓', isCritical: true, stageId: 'S02-2' },
    { id: 'CA09', text: '高流量氧氣', isCritical: true, stageId: 'S02-1' },
    { id: 'CA10', text: '快速轉送創傷中心', isCritical: false, stageId: 'S02-2' },
  ],
}

// 示範情境：過敏性休克
const S03: Scenario = {
  id: 'S03',
  title: '過敏性休克',
  subtitle: 'Anaphylactic Shock — Tank 問題',
  duration: '10 分鐘',
  pumpPipeTank: 'tank',
  color: 'var(--medical-orange)',
  stages: [
    {
      id: 'S03-1',
      label: '到場評估',
      narrative:
        '35 歲女性，在餐廳用餐後約 10 分鐘出現全身蕁麻疹、嘴唇腫脹、呼吸困難。朋友表示她對蝦子過敏但不小心吃到。',
      vitals: { hr: 125, bp: '76/42', spo2: 91, rr: 30, rhythm: 'Sinus Tachycardia', gcs: 'E4V4M6' },
      findings: ['全身蕁麻疹', '嘴唇及舌頭腫脹', '喘鳴音 (Stridor)', '雙側 Wheezing', '皮膚潮紅溫熱'],
      decision: {
        question: '最優先的處置是什麼？',
        options: [
          { id: 'A', text: 'Epinephrine 0.3mg IM（大腿外側）', correct: true, feedback: '正確！過敏性休克第一線治療就是 Epinephrine IM，不需猶豫。' },
          { id: 'B', text: 'Diphenhydramine 50mg IV', correct: false, feedback: '抗組織胺是輔助治療，無法逆轉嚴重過敏反應，不能取代 Epinephrine。' },
          { id: 'C', text: 'Methylprednisolone 125mg IV', correct: false, feedback: '類固醇作用緩慢（數小時），無法救急。是預防二次反應的輔助用藥。' },
          { id: 'D', text: 'Albuterol 霧化吸入', correct: false, feedback: 'Albuterol 只處理支氣管痙攣，無法處理全身性過敏反應。' },
        ],
      },
      teachingPoint: 'Anaphylaxis = Epinephrine first！Tank 問題：血管擴張 → 相對性血容量不足。Epi 收縮血管、擴張支氣管、抑制肥大細胞。',
    },
    {
      id: 'S03-2',
      label: '用藥後評估',
      narrative: '給予 Epinephrine IM 後 5 分鐘，患者仍低血壓，呼吸困難未完全緩解。',
      vitals: { hr: 115, bp: '84/52', spo2: 93, rr: 26, rhythm: 'Sinus Tachycardia', gcs: 'E4V5M6' },
      findings: ['蕁麻疹稍改善', '仍有 Wheezing', '血壓略升但仍低'],
      decision: {
        question: '下一步處置？',
        options: [
          { id: 'A', text: '等待觀察，不再給藥', correct: false, feedback: '患者仍有休克徵象，需要積極處置。' },
          { id: 'B', text: '重複 Epinephrine IM + 快速輸液', correct: true, feedback: '正確！Epi 可每 5-15 分鐘重複。同時輸液補充因血管擴張流失的有效循環量。' },
          { id: 'C', text: '改用 Epinephrine IV push', correct: false, feedback: '院前不建議 Epi IV push（除非心跳停止），風險過高。' },
          { id: 'D', text: '只給 IV fluid 不再給 Epi', correct: false, feedback: '輸液是輔助，Epi 仍是核心治療，應重複使用。' },
        ],
      },
      teachingPoint: 'Epi IM 可重複 q5-15min。同時建立大口徑 IV，快速輸液 1-2L（成人）。難治型過敏考慮 Epi drip。',
    },
  ],
  criticalActions: [
    { id: 'CA11', text: '給予 Epinephrine IM', isCritical: true, stageId: 'S03-1' },
    { id: 'CA12', text: '確保呼吸道通暢', isCritical: true, stageId: 'S03-1' },
    { id: 'CA13', text: '重複 Epinephrine', isCritical: true, stageId: 'S03-2' },
    { id: 'CA14', text: '建立 IV 輸液', isCritical: false, stageId: 'S03-2' },
  ],
}

// S04: 敗血性休克
const S04: Scenario = {
  id: 'S04',
  title: '敗血性休克',
  subtitle: 'Septic Shock — Tank + Pipe 複合',
  duration: '15 分鐘',
  pumpPipeTank: 'tank',
  color: 'var(--medical-purple)',
  stages: [
    {
      id: 'S04-1',
      label: '到場評估',
      narrative:
        '75 歲女性，護理之家通報發燒、意識改變。照護人員表示 3 天前開始尿液混濁、食慾差。今晨體溫 39.2°C，叫不太醒。',
      vitals: { hr: 108, bp: '86/48', spo2: 94, rr: 24, temp: 39.2, rhythm: 'Sinus Tachycardia', gcs: 'E3V4M5' },
      findings: ['皮膚溫熱潮紅', '意識混亂', '下腹壓痛', '尿液混濁惡臭', '末梢溫暖（warm shock）'],
      decision: {
        question: '這位患者最可能的診斷？',
        options: [
          { id: 'A', text: '泌尿道感染引發敗血性休克', correct: true, feedback: '正確！UTI source + SIRS criteria + 低血壓 + 意識改變 = 敗血性休克。' },
          { id: 'B', text: '單純泌尿道感染', correct: false, feedback: '已有低血壓和意識改變，超越單純 UTI，已進展到休克。' },
          { id: 'C', text: '中風', correct: false, feedback: '發燒 + 感染源 + 低血壓更指向敗血症。' },
          { id: 'D', text: '心因性休克', correct: false, feedback: '皮膚溫熱（warm shock）不符合心因性休克的冷汗、末梢冰冷。' },
        ],
      },
      teachingPoint: 'Septic shock = 感染 + SIRS + 低血壓（對輸液無反應）。Warm shock 特徵：皮膚溫暖潮紅（血管擴張）。後期才轉為 cold shock。',
    },
  ],
  criticalActions: [
    { id: 'CA15', text: '辨識敗血性休克', isCritical: true, stageId: 'S04-1' },
    { id: 'CA16', text: '快速輸液 30 mL/kg', isCritical: true, stageId: 'S04-1' },
    { id: 'CA17', text: '監測意識變化', isCritical: false, stageId: 'S04-1' },
  ],
}

// S05: 急性肺栓塞
const S05: Scenario = {
  id: 'S05',
  title: '急性肺栓塞',
  subtitle: 'Acute Pulmonary Embolism — Pipe 阻塞',
  duration: '12 分鐘',
  pumpPipeTank: 'pipe',
  color: 'var(--medical-teal)',
  stages: [
    {
      id: 'S05-1',
      label: '到場評估',
      narrative:
        '45 歲女性，長途飛行後 2 天突發胸痛、嚴重呼吸困難、差點暈倒。BMI 32，目前服用口服避孕藥。',
      vitals: { hr: 128, bp: '90/58', spo2: 85, rr: 32, etco2: 18, rhythm: 'Sinus Tachycardia + S1Q3T3', gcs: 'E4V5M6' },
      findings: ['突發性呼吸困難', '胸膜性胸痛', '右下肢腫脹', 'ETCO2 偏低 (18)', '低血壓'],
      decision: {
        question: '根據臨床表現，最可能的診斷？',
        options: [
          { id: 'A', text: '急性肺栓塞', correct: true, feedback: '正確！風險因子（長途飛行、OCP、肥胖）+ 突發呼吸困難 + 低 ETCO2 + 低血壓 = 高度懷疑 massive PE。' },
          { id: 'B', text: '急性心肌梗塞', correct: false, feedback: 'AMI 通常不會有單側下肢腫脹，且 ETCO2 不會明顯降低。' },
          { id: 'C', text: '自發性氣胸', correct: false, feedback: '氣胸不會有下肢腫脹（DVT 徵象），且 ETCO2 表現不同。' },
          { id: 'D', text: '過度換氣症候群', correct: false, feedback: '過度換氣不會有低血壓和低血氧。' },
        ],
      },
      teachingPoint: 'Massive PE 線索：突發呼吸困難 + 低 ETCO2（死腔增加）+ 低血壓 + DVT 風險因子。ETCO2 在 PE 中下降是因為 V/Q mismatch（有通氣但無灌流）。',
    },
  ],
  criticalActions: [
    { id: 'CA18', text: '辨識急性肺栓塞', isCritical: true, stageId: 'S05-1' },
    { id: 'CA19', text: '高流量氧氣', isCritical: true, stageId: 'S05-1' },
    { id: 'CA20', text: '快速轉送', isCritical: true, stageId: 'S05-1' },
  ],
}

export const scenarios: Scenario[] = [S01, S02, S03, S04, S05]

export const scenarioMap: Record<string, Scenario> = Object.fromEntries(
  scenarios.map((s) => [s.id, s])
)
