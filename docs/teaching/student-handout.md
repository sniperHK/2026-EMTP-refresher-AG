# 2026 台北市 EMTP 複訓 — 學員講義

> ALS 病生理學 & 藥物動力學 | 4 小時課程

---

## M01 瀕死生理四大支柱

| 支柱 | 監測指標 | 處置方向 |
|:---:|:---:|:---:|
| **氧合** Oxygenation | SpO2 | 給氧 (O2 therapy) |
| **通氣** Ventilation | EtCO2, RR | 輔助呼吸 (BVM/ETT) |
| **灌流** Perfusion | BP, HR, CRT, 意識 | 輸液/升壓藥 |
| **代謝** Metabolism | pH, Base Excess | 矯正根本原因 |

---

## 氧合 vs 通氣 — 快速決策

| 情境 | SpO2 | RR | 判斷 | 處置 |
|---|:---:|:---:|---|---|
| 肺炎/肺水腫 | 低 | 快 | **氧合問題** | 高濃度氧 |
| OD/頭部外傷 | 低 | 慢/淺 | **通氣問題** | BVM/插管 |
| CO2 蓄積 | 正常 | 正常/慢 | 通氣衰竭 | 看 EtCO2 |

---

## 休克三階段

```
代償期                    失代償期                  不可逆期
Compensated              Decompensated             Irreversible
─────────────────────────────────────────────────────────────→

HR↑ SVR↑ BP正常           BP↓ HR↑↑ 意識不清          多重器官衰竭
周邊濕冷 焦躁              乳酸堆積 尿量減少          即使BP回來仍死亡

★ 搶救黃金期！             酸中毒 → 升壓藥效果差      治療已無效
```

### 乳酸代謝：為什麼休克會酸？

| | 有氧代謝（正常灌流） | 無氧代謝（休克/缺氧） |
|---|---|---|
| **路徑** | 葡萄糖 → 丙酮酸 → 粒線體（TCA cycle） | 葡萄糖 → 丙酮酸 → **乳酸 + H⁺** |
| **ATP 產量** | **36 ATP** | **2 ATP**（效率剩 1/18） |
| **副產物** | CO₂ + H₂O（可正常排出） | **乳酸堆積 → pH↓** |

> **死亡螺旋**：乳酸堆積 → pH↓ → 心肌收縮力↓ + 血管對升壓藥反應↓ → 灌流更差 → 產生更多乳酸 → 循環惡化……
>
> **院前處置核心**：恢復灌流 = 清除乳酸的唯一途徑。EtCO₂ 從極低值回升可間接提示灌流改善。

---

## 灌流評估三角 (Pump / Pipe / Tank)

| 評估面向 | 檢查項目 | 異常提示 |
|:---:|---|---|
| **Pump** 心臟 | Rate, Rhythm, Contractility | 心因性休克 |
| **Pipe** 血管 | 脈壓差, CRT, 皮膚溫度 | 分布性/阻塞性休克 |
| **Tank** 容量 | JVD, 黏膜, 肺音 | 低血容性休克 |

---

## Nohria-Stevenson 矩陣（心衰/休克分類）

```
                灌流（Perfusion）
              Warm（溫暖）     Cold（冰冷）
         ┌──────────────┬──────────────┐
Dry      │  A 正常/穩定   │  L 低血容性    │
(乾)     │              │  休克 (S02)    │
Congestion├──────────────┼──────────────┤
Wet      │  B 肺水腫      │  C 心因性      │
(濕)     │  SCAPE → NTG  │  休克+APE (S05)│
         └──────────────┴──────────────┘
```

| 象限 | 特徵 | 處置方向 |
|:---:|---|---|
| **A** Warm+Dry | 穩定代償 | 觀察 |
| **B** Warm+Wet | 肺水腫為主、四肢溫暖 | **NTG + CPAP/BiPAP** |
| **L** Cold+Dry | 低灌流、肺音乾淨 | 輸液試探 |
| **C** Cold+Wet | 低灌流 + 肺水腫（最危險） | **升壓/強心（不能輸液！）** |

---

## SCAPE 處置速查

> SCAPE = Sympathetic Crashing Acute Pulmonary Edema

- **辨識**：高血壓 + 急性雙側囉音 + 端坐呼吸 + 粉紅泡沫痰
- **處置**：NTG SL 0.4 mg（可重複）+ CPAP 10 cmH₂O + 坐姿 + 高流量 O₂
- **注意**：SCAPE ≠ volume overload → Furosemide 不是首選

### NTG 在 SCAPE 的雙重機轉

| 效果 | 機轉 | 臨床意義 |
|:---:|---|---|
| **降前負荷 (Preload ↓)** | 低劑量即擴張靜脈 → 血液滯留於周邊靜脈 → 回心血量減少 | 降低肺靜脈壓 → **直接緩解肺充血與肺水腫** |
| **降後負荷 (Afterload ↓)** | 較高劑量時擴張動脈 → 全身血管阻力 (SVR) 下降 | 降低左心室射血阻力 → 改善心輸出量、降低心肌耗氧 |

> **記憶口訣**：低劑量「開靜脈水庫」→ 血從肺回流到周邊（解肺水腫）；高劑量「開動脈閘門」→ 心臟更容易打出去（降 SVR）。
>
> **禁忌**：SBP < 90 mmHg、右心室梗塞（RV infarct 依賴前負荷維持輸出）、近期使用 PDE5 抑制劑（如 Sildenafil）。

---

## PseudoPEA 辨識流程

```mermaid
flowchart TD
  A["ECG 有 organized rhythm<br/>+ 脈搏摸不到"] --> B{"有 POCUS 嗎？"}
  B -->|有| C{"心臟有收縮？"}
  B -->|無| D["依臨床 low-flow 狀態判斷<br/>考慮升壓與 reversible causes"]
  C -->|有| E["PseudoPEA"]
  C -->|無| F["True PEA"]
  E --> G["Push-dose Epi 10-20 mcg IV"]
  F --> H["ACLS Epi 1 mg + CPR"]
```

| 項目 | True PEA | PseudoPEA |
|---|---|---|
| 心臟 | 無有效收縮 | **有收縮但太弱** |
| POCUS | 不動/蠕動 | **可見收縮** |
| 處置 | CPR + Epi 1mg | **Push-dose epi 10-20 mcg** |
| 預後 | < 1% | **ROSC 70%+** |

> **提醒**：若無法在不延長 rhythm-check 暫停下快速確認 pseudoPEA，不要為了鑑別拖慢標準 resuscitation 節奏。

---

## 酸鹼與 EtCO2

- 休克/DKA 病人 → EtCO₂ 偏低（< 25 mmHg）= **代償性過度通氣**（吹掉 CO₂ 來代償酸中毒）
- **若 EtCO₂ 自行回升至 35–45** → 代表代償系統逐漸失敗 → 準備惡化
- **插管後避免通氣過快** → 須匹配病人原本的高 RR，維持代償

---

## 插管三殺 Red Flags（Peri-intubation Kill）

| 情境 | 風險 | 對策 |
|---|---|---|
| **插管前低血壓** | PPV 減少回心血流 → BP 更低 | 先 Fluid/Vasopressor 穩住 BP |
| **酸中毒病人插管** | 接管後 RR 不足以代償 → pH 驟降 | 匹配病人原本的 RR |

---

## M02 給藥途徑比較

| 途徑 | Onset | 適用 | 瀕死注意 |
|:---:|:---:|---|---|
| **IV** | 10-30 sec | ALS 黃金標準 | 推藥後 Flush, 上肢優於下肢 |
| **IO** | 30-60 sec | IV 失敗/延遲時合理替代 ⚠️ 非首選 | Humeral 常較快接近中心循環；Tibial 仍可接受；清醒病人痛；2025 AHA: IV first |
| **IM** | 5-15 min | 躁動/無法 IV | **休克禁用!** Late Dump 風險（灌流恢復後肌肉蓄積藥物突然釋出，造成藥效過量） |
| **IN** | 3-5 min | 兒童/止痛 | 每孔 < 1mL; 鼻血無效 |

---

## 特殊情境用藥調整

| 情境 | 原則 |
|---|---|
| **休克/低灌流** | Start Low, Go Slow; Paralytics onset 延遲 |
| **心搏停止** | IV/IO 後 Flush 20mL + 抬高; ROSC 後 Epi 蓄積注意 |
| **老年人** | Midazolam/Fentanyl 起始劑量減 25–50%（依體重、肝腎功能、意識狀態調整）; 脂溶性藥物分布容積大、排除慢 → 藥效延長 |

---

## 藥物速查表（ACLS 2020 通用劑量）

### 循環與強心

| 藥物 | 適應症 | 劑量 | 關鍵提醒 |
|---|---|---|---|
| **Epinephrine** | OHCA | IV/IO 1 mg q3-5min (1:1,000 原液一支) | 台灣只有 1:1,000! |
| **Epinephrine** | Anaphylaxis | IM 0.3-0.5 mg (1:1,000) q5-15min | 休克→改 IV |
| **Amiodarone** | VF/pVT | 1st 300mg bolus → 2nd 150mg | 活人慢滴! |
| **Adenosine** | SVT | 6mg rapid push → 12mg x2 + flush | 半衰期<10s |

### 血管擴張 & 利尿

| 藥物 | 適應症 | 劑量 | 關鍵提醒 |
|---|---|---|---|
| **NTG** | SCAPE/APE（Warm+Wet） | SL 0.4 mg q3-5min / IV 10-200 mcg/min | 低劑量降前負荷（擴靜脈）、高劑量降後負荷（擴動脈）; **SBP<90 禁用**; RV infarct 禁用 |
| **Furosemide** | Volume overload 肺水腫 | 20-80 mg IV | Flash APE ≠ volume overload → 非首選 |
| **Dobutamine** | Cold+Wet (SBP>70-80) | 2-20 mcg/kg/min IV drip | 強心; 不用於 SBP 極低 |

### 鎮靜止痛 & 呼吸

| 藥物 | 適應症 | 劑量 | 關鍵提醒 |
|---|---|---|---|
| **Midazolam** | Seizure/Sedation | IV 2-5mg / IM 5-10mg / IN 0.2mg/kg | 老人減半; 呼吸抑制 |
| **Fentanyl** | Analgesia | IV 1-2mcg/kg / IN 1.5mcg/kg | **不釋放組織胺 → 血壓穩定**; 胸壁僵硬(罕見) |
| **Morphine** | Analgesia | IV 2-4mg q5-15min | ⚠️ **組織胺釋放 → 低血壓**; 休克病人避免使用 |
| **Albuterol** | Bronchospasm | 2.5mg nebulizer q15-20min | Tachycardia |
| **Norepinephrine** | Shock | 0.1-0.5 mcg/kg/min IV drip | 外滲壞死風險 |

> **止痛選藥口訣**：休克/血壓不穩 → Fentanyl（不釋放組織胺）；避免 Morphine（組織胺釋放 → 血管擴張 → 加劇低血壓）

---

## Push-dose Epinephrine 泡製

```
Step 1: 取 Epi 1:1,000 (1mg/1mL) 一支
Step 2: 加入 NS 至總量 100 mL
Step 3: 最終濃度 = 10 mcg/mL

給藥: 每次 1-2 mL (10-20 mcg) IV push
      每 1-2 分鐘 titrate 至 SBP > 90
```

---

## RSI in Shock：劑量調整原則

| 藥物類別 | 調整 | 原因 |
|---|---|---|
| **鎮靜劑**（Ketamine, Midazolam 等） | **減半或更低** | CO↓ → 藥物集中中央循環 → 效果增強；低血壓副作用在休克更致命 |
| **肌鬆劑**（Succinylcholine, Rocuronium） | **維持標準劑量或略增** | 確保完全鬆弛、一次成功插管；休克時分布慢但需完整效果 |

> **口訣**：休克插管「鎮靜減半、肌鬆足量」
>
> Ref: Walls & Murphy, *Manual of Emergency Airway Management*, 6th Ed; NAEMSP/AMLS Guidelines

---

## 高風險錯誤防呆 5 條

1. **Epi 濃度混淆**: IM 用 1:1,000 原液 / IV push-dose 需稀釋至 10mcg/ml
2. **休克打 IM**: 血流不到肌肉 → 改用 IV/IO
3. **追藥太快**: 尊重 circulation time, 至少等 3 min
4. **IO 忘 Flush**: 每次給藥後 20 mL NS flush + 抬高肢體
5. **Amiodarone 活人快推**: 非 arrest → 10-15 min 慢滴

---

## 課堂筆記

_（請在此區記錄課堂重點）_

|  |  |
|---|---|
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

---

> **Protocol 聲明**: 藥物劑量依據 AHA ACLS 2020 通用準則。實際執行請以台北市醫療指導醫師核准之在地 Protocol 為準。
>
> 2026 台北市 EMTP 複訓 | ALS 病生理學 & 藥物動力學

---

## ROSC 後前 5 分鐘 Pocket Card

> 依據 AHA 2025 Part 11: Post-Cardiac Arrest Care

### 氧合目標（Oxygenation）

| 目標 | 說明 |
|:---:|---|
| **SpO₂ 90–98%** | 避免過度氧化（Hyperoxia）與缺氧（Hypoxia）皆有害 |
| FiO₂ 從 100% 開始 | 待 SpO₂ 穩定後滴定下調 FiO₂ |

### 通氣目標（Ventilation）

| 目標 | 說明 |
|:---:|---|
| **PaCO₂ 35–45 mmHg** | 若以 EtCO₂ 監測，目標接近正常，避免 hyperventilation |
| 不追求「吹更快」 | 過度通氣會增加胸內壓並造成腦血管收縮 |

### 血壓目標（Hemodynamics）

| 目標 | 說明 |
|:---:|---|
| **MAP ≥ 65 mmHg** | 避免低血壓（Hypotension）；必要時使用升壓藥 |
| 首選 Norepinephrine | ROSC 後若血壓低，繼續或啟動 Norepi drip |

### 注意 Epi 蓄積（Post-ROSC Surge）

- ROSC 前每 3–5 分鐘給 Epi → ROSC 後可能積累 3–5 mg
- 表現：突發高血壓 / 心搏過速 / 新發心律不整
- 處置：密切監測 12 導程 ECG；勿再追加 Epi

### 移交優先順序（Handoff Priorities）

1. **ECG 12 導程** — 排除 STEMI / acute coronary lesion
2. **血糖** — 避免低血糖；目標 140–180 mg/dL
3. **通報接收醫院** — 若懷疑 ACS，告知可能需 primary PCI
4. **體溫管理** — 避免發燒（> 37.7°C 有害）
5. **依病因安排後續檢查** — 依臨床情境考慮 coronary evaluation / echo / CT
