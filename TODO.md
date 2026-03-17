# 2026 北市 TP 複訓課程 — 未來內容擴充藍圖 (TODO)

> 本課程目前架構聚焦於「呼吸與循環衰竭」（AMLS Ch.4 心血管、Ch.5 休克、Ch.2 藥理的精華深潛版）。
> 以下為未來依據 **AMLS (Advanced Medical Life Support) 16 小時架構**，延續「機轉導向、拒絕死背」教學特色所建議的 **四個擴增象限**：

---

## 🚀 擴增方向一：神經與代謝急症（橫向擴展疾病庫）
*目標：補足意識改變與核心神經/內分泌急症，對接現有 Midazolam 等藥物機轉。*

- [ ] **策劃模組：`M03_ALS-Neuro-Metabolic`**
  - **神經急症 (Neurologic)**：
    - 大血管阻塞型中風 (LVO) 的辨識與初階神經學評估 (LAMS)。
    - 癲癇重積狀態 (Status Epilepticus) 的給藥策略。
    - *機轉連結：BZD 藥動力學——為什麼癲癇要大劑量？休克狀態外 IM 吸收速度？*
  - **內分泌與代謝 (Endocrine/Metabolic)**：
    - DKA (糖尿病酮酸中毒)、HHS、低血糖機轉。
    - *機轉連結：探討 Kussmaul breathing 與 EtCO₂ 代償的實戰觀察。*
- [ ] **新增情境：`S06_status-epilepticus`** (癲癇重積狀態與氣道保護)。

---

## 🚀 擴增方向二：呼吸與毒物急症（深化現有機轉）
*目標：從單純的「肺水腫/氣胸」往氣道阻力病理及常見中毒邁進。*

- [ ] **策劃模組：`M04_ALS-Toxidrome-Respiratory`**
  - **進階呼吸道阻塞 (Respiratory)**：
    - 氣喘 (Asthma) 與 COPD 急性發作的聽診與波形鑑別。
    - *機轉連結：動態肺部過度充氣 (Auto-PEEP) 的致命性，呼應「插管三殺」；Albuterol 的 Beta-2 效應。*
  - **毒物學 (Toxicology)**：
    - 鴉片類中毒 (Opioid Toxidrome) / 抗膽鹼毒性 (Anticholinergic)。
    - *機轉連結：Naloxone 的 PK/PD（半衰期短於毒品導致的 Late dump 昏迷陷阱）。*
- [ ] **新增情境：`S07_COPD-autoPEEP`** (Auto-PEEP 與正壓通氣陷阱)。

---

## 🚀 擴增方向三：心血管進階（擴大 ECG 應用）
*目標：從 Arrest / SCAPE 衍生至不穩定心律與缺血性心臟病。*

- [ ] **致死性心律不整 (Cardiovascular)**：
  - Bradycardia（心搏過緩）、VT（有脈搏。
  - *機轉連結：探討「Unstable」的血流動力學界定；Atropine 限制與 Epi/Norepi Drip 在過緩合併休克時的應用。*
- [ ] **急性冠心症 (ACS)**：
  - 12 導程 ECG 院前進階應用（OMI / 致命性等同 STEMI 波形）。
  - *機轉連結：右心梗塞 (RV Infarct) 的流體力學，深化「為何 NTG 在右心梗塞禁用（Preload-dependent）」。*

---

## 🚀 擴增方向四：導入 AMLS「Assessment Pathway」（臨床推理升級）
*目標：從現有「演繹法（先教框架後驗證）」升級為「歸納法（從案例梳理框架）」。*

- [ ] **Sick vs Not Sick 第一印象訓練**：
  - 建立快速視覺診斷 (Gestalt) 題庫。限制 15 秒內給出膚色、姿勢、呼吸，要求學員說出 Sick/Not Sick 及最致命懷疑。
- [ ] **Cardinal Presentation 鑑別診斷站**：
  - 設計「未給定診斷」的綜合情境（如：「主訴：喘 + 意識不清」）。
  - 訓練學員運用「生理四柱 (Oxygenation → Ventilation → Perfusion → Metabolism)」動態抓錯並進行 DDx。

---

## 🔧 基礎建設與維護 (Infrastructure)
- [ ] **教材更新與版本控制**：持續同步台北市最新醫療指導醫師核准之 Protocol。
- [ ] **Web 部署與互動**：評估講師模式 (Instructor mode) Phase 2，導入後端資料庫 (如 Supabase) 以記錄多組學員決策軌跡。
