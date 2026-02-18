# M02 藥物動力學/藥效學 (PK/PD)：掌握「時間」與「情境」

在 EMS 現場，我們沒有時間慢慢等藥效，也沒有太多機會調整劑量。精準掌握 **Onset (起效時間)** 與 **Duration (持續時間)**，以及不同給藥途徑在 **休克/瀕死病人** 身上的巨大差異，是高級救護技術員 (EMTP) 的核心能力。

## 1. 核心觀念：時間軸就是生命線

> **Critical Concept**: 
> 藥物打進去不是馬上有效。
> "Epinephrine 1mg IV push" -> 你預期幾秒後血壓上升？ (Onset)
> "Midazolam 5mg IM" -> 你預期幾分鐘後病人鎮靜？ (Onset)
> "RSI Pumbing" -> 在插管前，你的 Sedative/Paralytic 撐得住嗎？ (Duration)

### PK/PD 四大步驟的臨床意義
1. **吸收 (Absorption)**: 
   - **IV/IO**: 100% Bioavailability (生物利用率)，零時差進入循環。
   - **IM**: 依賴肌肉血流。**休克病人周邊血管收縮 (Vasoconstriction)，IM 吸收極差且不穩定。**
   - **IN (Intranasal)**: 黏膜吸收快，但在鼻黏膜水腫/出血/分泌物多時失效。
2. **分布 (Distribution)**: 
   - 休克病人中央循環優先 (Centralization)，藥物會快速衝擊心腦，但周邊組織分不到。小心 **相對過量 (Relative Overdose)**。
3. **代謝 (Metabolism) & 排泄 (Excretion)**: 
   - **肝腎功能 (Liver/Kidney)**: 老人/洗腎病人代謝慢，Duration 延長，小心蓄積 (Stacking)。
   - **低體溫 (Hypothermia)**: 酵素活性下降，藥物代謝超級慢 (ROSC 後別急著追加鎮靜)。

---

## 2. 給藥途徑實戰：IV vs IO vs IM vs IN

| 途徑 | Onset (平均) | 適用情境 | 瀕死/休克病人注意事項 |
| :--- | :--- | :--- | :--- |
| **IV (Central/Upper limb)** | 10-30 sec | ALS 黃金標準 | 確保管路通暢，推藥後需 Flush。上肢優於下肢。 |
| **IO (Tibial/Humeral)** | 30-60 sec | 休克/OHCA 首選 | **Humeral IO (肱骨)** 到達心臟速度接近 Central line。**Tibial IO** 需加壓輸液 (Pressure bag/Push) 才能進入循環。**痛！清醒病人慎用 (Lidocaine pre-medication)。** |
| **IM (Muscle)** | 5-15 min | 躁動/無法 IV 時 (Ketamine/Midazolam) | **休克病人禁用 IM！** 血流不到肌肉，藥物積在肌肉裡，等休克改善後再一次釋放 (Late Dump) 造成危險。 |
| **IN (Mucosa)** | 3-5 min | 兒童/鎮靜/止痛 (Fentanyl/Midazolam) | 劑量限制 (體積不可太大，每孔 < 1ml)。鼻塞/鼻血無效。 |

---

## 3. 特殊情境 PK/PD 調整

### A. 休克 (Shock) / 低灌流 (Hypoperfusion)
- **問題**：心輸出量 (CO) 下降，肝腎血流減少。
- **對策**：
  - **Sedation/Analgesia**: 減量 (Start Low)，給藥速度放慢 (Go Slow)。
  - **Paralytics**: Onset 可能延遲 (circulation time 變長)，不要急著以為沒效又補藥。
  - **Pressors**: 反應可能劇烈，因為受體 (Receptor) 已由內源性 catecholamine 活化。

### B. 心搏停止 (Cardiac Arrest)
- **問題**：完全沒有循環，全靠 CPR 按壓推動血流。
- **對策**：
  - 藥物到達心臟時間延長 → **IV/IO 後務必 Flush 20ml + 抬高肢體**。
  - **Epinephrine 累積**：每 3-5 分鐘給一次，但在 ROSC 瞬間，體內可能積了 3-5mg Epinephrine，導致 ROSC 後血壓飆高/頻發心律不整 (Rebound Hypertension/Tachycardia)。

### C. 老年人 (Geriatric)
- **問題**：體脂增加 (脂溶性藥物分布廣/蓄積)，肌肉減少，肝腎衰退。
- **對策**：Midazolam/Fentanyl 劑量減半。

---

## 4. 常見藥物速查表 (待填入 Protocol 劑量)

> [!IMPORTANT]
> **請根據台北市醫療指導醫師核准之 Protocol 填寫劑量與適應症。以下僅由 AI 根據通用準則提供範例。**
>
> 在地版劑量整合請使用：`docs/modules/M02_protocol-dosing-map.md`

### 循環與強心 (Cardiovascular)
- **Epinephrine (Adrenaline)**
  - **用途**: Cardiac Arrest, Anaphylaxis, Severe Bradycardia/Shock (Push-dose/Drip)
  - **PK**: IV Onset 快 (1-2 min), Duration 短 (5-10 min) → 需持續輸注。
  - **陷阱**: 1:1000 (1mg/1ml) vs 1:10000 (1mg/10ml) 千萬別搞混。IM 用原液，IV 用稀釋液。

- **Amiodarone**
  - **用途**: VF/pVT, Stable VT
  - **PK**: IV Onset 數分鐘，但在脂肪組織蓄積久 (超長半衰期)。
  - **陷阱**: **推太快會掉血壓 (Hypotension)**。活人要用 Drip 滴注 (150mg/10-15min)，死人才 Push (300mg)。

### 鎮靜與止痛 (Sedation & Analgesia)
- **Midazolam (Dormicum)**
  - **用途**: Seizure, Sedation (Pacing/Cardioversion)
  - **PK**: 肝代謝。IV Onset 1-3 min。
  - **陷阱**: **呼吸抑制 (Respiratory Depression)**，尤其併用 Opioid 時。老人減量。

- **Fentanyl**
  - **用途**: Pain management
  - **PK**: IV Onset 1-2 min, Duration 30-60 min。不釋放組織胺 (Histamine)，比 Morphine 更不影響血壓。
  - **陷阱**: **胸壁僵硬 (Chest Wall Rigidity)** (罕見，但在極快推注大劑量時可能發生，導致無法 BVM)。

### 呼吸與過敏 (Respiratory/Allergy)
- **Albuterol (Combivent/Ventolin)**
  - **用途**: Bronchospasm (Asthma/COPD)
  - **PK**: Inhalation Onset 5-15 min。
  - **陷阱**: Side effect 是 Tachycardia, Tremor (Beta-2 selectivity 不是 100%)。

---

## 5. 藥物計算與泡製 (Practical Skills)

- **Push-dose Epinephrine (急救升壓)**:
  - 取 1ml (1:10,000) + 9ml NS = 10mcg/ml
  - 每次給 1-2ml (10-20mcg)，每 1-2 分鐘 titrate 直到 SBP > 90。

- **Dopamine/Norepi Drip Rate**:
  - 利用 Rule of 6 或鐘面法則 (Clock Method) 快速換算。
  - (需依照當地配方填寫)

---

## 6. 模組總結

1. **休克病人不要 IM**，請打 IO/IV。
2. **Humeral IO** 快於 Tibial IO。
3. **老人的鎮靜藥量要減半**。
4. **Push-dose Epinephrine** 是現代 EMS 處理休克的重要技能，比單純輸液更有效且避免水腫。

## 7. 在地 Protocol 對接（授課前檢查）

- [ ] 已確認 protocol 名稱、版次、日期
- [ ] 已完成 `M02_protocol-dosing-map.md` 藥物欄位
- [ ] 已將在地劑量同步到題庫（Q16-Q30）與 scenario debrief
