# M01 ALS 病生理學：決策導向的瀕死生理

本模組不談艱澀的細胞機轉，而是聚焦在 **「臨床監測數據（Vital Signs）背後的生理意義」**，以及當這些數據崩壞時，我們該如何介入。

## 1. 核心觀念：生命徵象是生理代償的結果

> **Critical Concept**: 
> 當你看到病人 BP 80/40, HR 130 時，你不只是看到「休克」，你是看到身體正在 **「拚命代償以維持灌流」** 的結果。
> 我們的介入（給水、給藥、插管）必須順應或矯正這個代償過程，而不是只看數字治療。

### 瀕死生理的四大支柱
1. **氧合 (Oxygenation)**: O2 進入血液的效率 --> **SpO2**
2. **通氣 (Ventilation)**: CO2 排出的效率 --> **EtCO2**
3. **灌流 (Perfusion)**:  O2/養分 運送到組織的效率 --> **BP, Pulse, CRT, Conscious**, Lactate
4. **代謝 (Metabolism)**: 組織利用氧氣產能的狀態 --> **pH, Base Excess**

---

## 2. 氧合 (Oxygenation) vs 通氣 (Ventilation)

這是 ALS 最常混淆的兩個觀念，也是決定 **「給氧 (O2 therapy)」** 還是 **「輔助呼吸 (Ventilatory support)」** 的關鍵。

| 比較項目 | 氧合 (Oxygenation) | 通氣 (Ventilation) |
| :--- | :--- | :--- |
| **定義** | 氧氣從肺泡進入血液的過程 | 空氣進出肺部（移除 CO2）的過程 |
| **主要指標** | **SpO2**, PaO2 | **EtCO2**, PaCO2, RR, Tidal Volume |
| **常見問題** | Hypoxemia (缺氧) | Hypercapnia (高碳酸血症), Hypoventilation |
| **生理機制** | V/Q mismatch, Shunt, Diffusion defect | Respiratory drive, Muscle strength, Airway patency |
| **處置邏輯** | **給氧 (O2)**<br>Nasal, Mask, NRM | **通氣支持 (Push Air)**<br>BVM, CPAP, ETT + Ventilator |

### 臨床決策點 (Decision Points)
- **SpO2 掉且 RR 快**：可能是 Oxygenation 問題（肺炎、肺水腫）→ 先給高濃度氧。
- **SpO2 掉且 RR 慢/淺**：這是 Ventilation 問題（OHCA, Drug overdose, Head injury）→ **單純給氧無效，必須 BVM/插管幫忙換氣**。
- **SpO2 正常但意識改變/嗜睡**：小心 **CO2 retention** (Ventilatory failure)，看 EtCO2 是否過高。

---

## 3. 循環與灌流 (Perfusion)：休克的動態進程

休克不是「低血壓」，休克是 **「組織灌流不足 (Inadequate Tissue Perfusion)」**。血壓下降通常是休克的 **晚期 (Decompensated)** 徵兆。

### Shock Cycle (休克惡性循環)
1. **Compensated Shock (代償期)**
   - **機制**：交感神經興奮 (Catecholamine surge)
   - **徵象**：HR↑, SVR↑ (周邊濕冷), BP 維持正常或微升, Anxiety
   - **處置**：這是搶救黃金期！早期識別 Fluid/Pressor 介入。

2. **Decompensated Shock (失代償期)**
   - **機制**：代償機制耗竭，細胞缺氧改行無氧代謝 (Anaerobic metabolism) → 乳酸堆積 (Lactic Acidosis)
   - **徵象**：**BP↓**, HR↑↑ (or ↓ if pre-terminal), 意識不清, Oliguria
   - **影響**：酸中毒抑制心肌收縮力，血管對升壓藥反應變差。

3. **Irreversible Shock (不可逆期)**
   - **機制**：多重器官衰竭, DIC, 細胞壞死
   - **結局**：即使血壓拉回來，病人仍會死亡。

### 灌流評估三角 (Perfusion Triangle)
- **Pump (心臟)**: Rate, Rhythm, Contractility
  - Contractility 評估：脈壓差窄（Narrow Pulse Pressure）、心音低沉、末梢冰冷+濕
- **Pipe (血管)**: Tone (SVR) - 看脈壓差 (Pulse Pressure), CRT, 皮膚溫度
- **Tank (容量)**: Preload
  - Tank 空的徵象：JVD(-), 黏膜乾, 聽診乾淨, 脈搏微弱 → 輸液
  - Tank 滿的徵象：**JVD(+), 雙側肺囉音 (crackles), 下肢水腫** → 不能輸液！
  - **陷阱**：Tank 空 vs Tank 滿 vs Pump 不力，三者都可能低血壓，但處置完全不同

### 鑑別決策樹：同樣低血壓，該輸液還是升壓？

```
低血壓 (SBP < 90)
  │
  ├─ 皮膚冰冷 + JVD(-) + 肺音乾淨 → Tank 空 → 輸液 (S02 低血容性)
  │
  ├─ 皮膚溫暖 + JVD(-) + ±wheeze → Pipe 鬆 → Epi (S03 過敏性)
  │
  ├─ 皮膚冰冷 + JVD(+) + 肺音乾淨 → Tank 被擋 → 減壓 (S01 張力性氣胸)
  │
  └─ 皮膚冰冷 + JVD(±) + 雙側囉音 → Pump 不力 → 升壓/強心 (S05 心因性)
```

---

## 3.5 心因性休克與急性肺水腫 (Cardiogenic Shock & APE)

> **Critical Concept**:
> 心因性休克是 Pump 壞了——心臟打不出去。它常常同時產生兩個方向的問題：
> - **Forward failure（前向衰竭）**：心輸出量不足 → 全身低灌流 → Cold
> - **Backward failure（後向衰竭）**：血液回堵到肺 → 肺水腫 → Wet
>
> 當兩者同時出現 = **Cold + Wet** = 最難處理的急重症之一。

### 心因性休克的常見成因
- **收縮力不全**：急性心肌梗塞（AMI）、心肌炎 → 最常見
- **後負荷過高**：高血壓危象 → 交感風暴 → SCAPE
- **心律不整**：快速心房顫動、VT → Pump 效率崩潰（連結 S04）
- **阻塞性重疊**：心包填塞、大面積 PE → Pump 被外力壓住（連結 S01）

### 急性肺水腫 (Acute Pulmonary Edema) 的病生理

```
左心衰竭 → 左心室舒張末壓↑ → 肺靜脈壓↑ → 肺微血管靜水壓↑
  ↓
超過 Starling 平衡 → 血漿滲入肺間質/肺泡
  ↓
肺泡氣體交換面積↓ → SpO2↓ + 呼吸困難 + 雙側囉音 (crackles)
```

**SCAPE（Sympathetic Crashing Acute Pulmonary Edema）**：
- 交感風暴 → 血壓飆高 → 後負荷暴增 → 左心室打不過去 → 急性肺水腫
- 特徵：**高血壓 + 呼吸窘迫 + 粉紅泡沫痰** → 惡化極快（分鐘級）
- 處置：**NTG（減後負荷）+ CPAP/BiPAP（減少回心血量+改善氧合）+ 坐姿**
- **不要急著插管**：NIV 往往在 5-10 分鐘內顯著改善

### Nohria-Stevenson 矩陣：一張圖搞定心衰處置方向

```
                    灌流 (Perfusion)
                  Warm（溫暖）    Cold（冰冷）
              ┌──────────────┬──────────────┐
  Dry（乾）   │  A: 穩定       │  L: 低灌流     │
  無肺水腫    │  觀察          │  輸液試探       │
  Congestion ├──────────────┼──────────────┤
  Wet（濕）   │  B: 肺水腫     │  C: 心因性休克  │
  有肺水腫    │  NTG + NIV    │  升壓 + 強心    │
              └──────────────┴──────────────┘
```

| 象限 | 臨床表現 | 處置方向 |
|------|---------|---------|
| **A (Warm+Dry)** | 穩定代償，生命徵象正常 | 口服藥調整，不需急處置 |
| **B (Warm+Wet)** | 呼吸困難+囉音+SpO₂↓，但四肢溫暖，BP 正常或偏高 | **NTG + CPAP/BiPAP**（SCAPE 即屬此類） |
| **L (Cold+Dry)** | 低血壓+末梢冰冷，肺音乾淨 | 小量輸液試探（注意：可能是右心衰或 PE） |
| **C (Cold+Wet)** | 低血壓+末梢冰冷+囉音+SpO₂↓ | **最棘手**：不能輸液（會更濕）、不能 NTG（會更低）→ 升壓 + 強心 |

### PseudoPEA — 休克的終點站

> **Critical Concept**:
> PseudoPEA 不是心跳停了——是心臟還在跳，但打出來的血壓太低（SBP < 40-50 mmHg），低到你摸不到脈搏。
> 它不是 cardiac arrest，它是 **extreme shock**。處置方式完全不同。

**為何重要**：
- 42-86% 的 PEA cardiac arrest 可能其實是 pseudoPEA
- True PEA 存活率 < 1%；pseudoPEA（有心臟收縮）ROSC 率可達 70-94%
- **POCUS 是唯一可靠鑑別**：超音波看到心臟有收縮 = pseudoPEA

**處置差異**：

| 項目 | True PEA | PseudoPEA |
|------|----------|-----------|
| 心臟狀態 | 無有效收縮 | 有收縮但極弱 |
| 處置 | ACLS：CPR + Epi 1 mg + 找可逆原因 | **當作重度休克**：push-dose epi 10-20 mcg + 升壓藥 drip + 找原因 |
| Epi 劑量 | 1 mg（標準 ACLS） | **10-20 mcg**（全量 1 mg 會打垮還在跳的心臟 → VF） |
| CPR | 持續壓胸 | 若 POCUS 確認有收縮，**考慮暫停壓胸**，改用升壓支持 |

**休克→心搏停止的連續體**：

```
正常 → 代償休克 → 失代償休克 → PseudoPEA → True PEA → Asystole
                                    ↑
                              最後的逆轉窗口
                          （所有 S01-S05 的惡化終點）
```

---

## 4. 酸鹼與代謝 (Metabolism)

雖院前沒有 ABG，但 **EtCO2** 是酸中毒的間接指標。

- **Metabolic Acidosis (代謝性酸中毒)**: 
  - 原因：組織缺氧 (Lactate), DKA, 腎衰竭
  - 代償反應：**Respiratory Compensation** (Kussmaul breathing) → RR↑, TV↑ 以排出 CO2。
  - **EtCO2 應用**：若病人休克/DKA，你會看到 **EtCO2 偏低 (e.g., < 25 mmHg)**，這是代償結果，**不要刻意把它 BVM 到正常值 (35-45)**，否則會破壞代償導致酸中毒惡化。

---

## 5. 常見 ALS 藥物與處置的生理效應

| 藥物/處置 | 作用目標 (Physiological Target) | 預期效應 (Desired Effect) | 風險/副作用 (Risk) |
| :--- | :--- | :--- | :--- |
| **Fluids** (NS/LR) | Tank (Preload) | 增加 SV → 增加 CO → 改善 BP | Fluid overload (肺水腫), 稀釋凝血因子。**Cold+Wet 禁大量輸液！** |
| **Epinephrine** | Alpha-1 (Vessel), Beta-1 (Heart) | 增加 SVR (BP↑), 增加 Contractility | 增加心肌耗氧 (Myocardial O2 demand), 導致心律不整 |
| **Nitroglycerin** | 靜脈（低劑量）/ 動脈（高劑量）擴張 | 減前負荷 → 減肺水腫；減後負荷 → 減心臟負擔 | **SBP < 90 禁用。右心梗禁用。** 低灌流時 SL 吸收差 |
| **Amiodarone** | K+ Channel, Beta, Ca++, Na+ | 延長動作電位 (Repolarization), 抑制異位放電 | **Hypotension (血管擴張)**, Bradycardia |
| **Intubation** (RSI) | Airway/Ventilation | 確保通氣, 防止吸入 | **PPV (正壓通氣) 減少回心血流 (Preload↓) → 可能導致剛插管後 Cardiac Arrest** |
| **CPAP/BiPAP** | Oxygenation + Preload | 正壓撐開肺泡 + 減少回心血量 | 肺水腫首選！**比插管侵入性低，效果快（5-10 min）** |

### 關鍵決策示警 (Red Flags)
- 🚑 **插管前低血壓**：正壓通氣 (PPV) 會進一步降低血壓。**務必先 Fluid resuscitation 或先上 Vasopressor (Push-dose epi / Norepi) 把 BP 拉住再插管。**
- 🚑 **Acidosis 病人插管**：病人靠 hyperventilation 維持 pH，插管後若由機器接手且設定一般 rate，通氣量可能不足以代償酸中毒 → pH 驟降 → Cardiac Arrest。

---

## 6. 模組總結：從生理到決策

1. **區分 Oxygenation vs Ventilation 問題**：SpO2 低給氧，EtCO2 高/意識差給通氣。
2. **休克識別在血壓掉之前**：看 HR, CRT, 皮膚, 意識。
3. **Pump-Pipe-Tank 定位休克類型**：Tank 空（輸液）vs Pipe 鬆（Epi）vs Pump 不力（升壓/強心）→ 處置方向完全不同。
4. **Nohria-Stevenson 分四象限**：Warm+Wet（NTG+NIV）、Cold+Wet（升壓+強心）、Cold+Dry（輸液試探）。
5. **PseudoPEA ≠ 心搏停止**：心臟還在跳但脈搏摸不到 → 當重度休克治療，不是 ACLS protocol。
6. **Resuscitation 優先於 Intubation**：不要對一個休克瀕死的病人直接插管（HOP: Hypotension, Oxygenation, pH），先穩定循環再插管。肺水腫優先用 CPAP/BiPAP，而非插管。
