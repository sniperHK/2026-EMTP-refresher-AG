# 4 小時課程執行腳本（Session Flow）

## 課程目標

- 讓學員用病生理思維解讀生命徵象，不只背流程
- 在高壓情境下做出安全且可解釋的用藥決策（PK/PD）

## 時間配置（240 分鐘）

| 時間 | 模組 | 教學方法 | 產出 |
|---|---|---|---|
| 0-10 分 | 開場 + 目標對齊 | 問答 | 統一學習目標 |
| 10-25 分 | Pre-test（10 題） | 個人作答 | 基線能力資料 |
| 25-70 分 | M01 核心概念（**含心因性休克/APE/Nohria-Stevenson**） | 短講 + 即時提問 | Oxygenation/Ventilation/Perfusion + Pump-Pipe-Tank 框架 |
| 70-100 分 | 情境 S01 + S02 | 小組討論 + 全班 debrief | 阻塞性/低血容性休克辨識 |
| 100-115 分 | **情境 S05（精實版）** | 快速案例 + 討論 | 心因性休克/SCAPE/pseudoPEA |
| 115-125 分 | Break |  |  |
| 125-170 分 | M02 核心概念（**新增 NTG + pseudoPEA push-dose epi**） | 短講 + 計算演練 | Route/Onset/Duration 與用藥風險 |
| 170-210 分 | 情境 S03 + S04（**S04 含 pseudoPEA 轉折**） | 小組討論 + 全班 debrief | Epi/Amiodarone/CPR + pseudoPEA 辨識 |
| 210-225 分 | Post-test（20 題） | 個人作答 | 學習成效驗證 |
| 225-230 分 | Mini OSCE 口頭快速演練 | 抽情境卡 + 3 題問答（含 S05） | 驗證 critical actions |
| 230-240 分 | 收尾 | 講師總結 | 3 個帶走重點 |

> **時間調整說明**：S01+S02 壓縮至 30 分鐘（原 45→30），騰出 15 分鐘給 S05。M01 整合心因性休克/APE 進 Pump-Pipe-Tank 段落，M02 新增 NTG 講解。

## 五案例串接順序（建議）

1. `S01_tension-pneumothorax.md`：機械性通氣與阻塞性休克
2. `S02_hypovolemic-shock.md`：代償崩潰與復甦優先順序
3. `S05_cardiogenic-shock-APE.md`：**心因性休克 + SCAPE + pseudoPEA**（S02 對比案例：同為低血壓，Tank 空 vs Pump 不力）
4. `S03_anaphylactic-shock.md`：分布性休克與 Epi 藥理
5. `S04_OHCA-VF.md`：前述病生理最終共同路徑與 ACLS 介入（含 pseudoPEA 轉折）

## 時間管理指引（Fallback Flow）

> 240 分鐘排程緊湊，以下提供超時應對策略。

### Check-in 時間點

| 時間點 | 應完成 | 落後處理 |
|--------|--------|---------|
| **70 分** | M01 結束 | 若已 75 分 → S01+S02 壓到 25 min |
| **115 分** | S05 結束 | 若已 120 分 → Break 縮至 5 min |
| **170 分** | M02 結束 | 若已 175 分 → S03 壓到 12 min |

### 各段壓縮空間

| 段落 | 正常 | 最短 | 壓縮方法 | 不可跳過 |
|------|------|------|---------|---------|
| 開場 | 10 min | 5 min | 直接進 pre-test | |
| Pre-test | 15 min | 15 min | — | Yes |
| M01 核心 | 45 min | 40 min | §4 酸鹼指向講義自讀 | |
| S01+S02 | 30 min | 25 min | S01 壓到 10 min | |
| S05 | 15 min | 12 min | Debrief 聚焦 2 問 | Yes |
| Break | 10 min | 5 min | 縮短休息 | |
| M02 核心 | 45 min | 40 min | Furosemide/Dobutamine 不口述 | |
| S03+S04 | 40 min | 35 min | S03 壓到 12 min | S04 不可壓 |
| Post-test | 15 min | 15 min | — | Yes |
| Mini OSCE | 5 min | 0 min | 時間不足→「口頭快問 1 題」 | |
| 收尾 | 10 min | 5 min | 3 個帶走重點不能省 | |

### 超時應對決策

- **超時 ≤ 5 min**：壓縮下一段的「可壓縮」部分
- **超時 5-15 min**：Break 縮至 5 min + 壓縮 2 段
- **超時 > 15 min**：跳過 Mini OSCE + 收尾壓至 5 min
- **底線**：Pre-test + Post-test + S04 + S05 **不能跳**（核心評量 + 新教學內容）

### 講師引導筆記

每個情境的 Socratic 提問、常見迷思、debrief 時間控制，請參考：
`docs/teaching/instructor-notes.md`

---

## 評量與評分檔案

- Pre-test：`docs/assessments/pre-test.md`
- Post-test：`docs/assessments/post-test.md`
- Answer Key：`docs/assessments/answer-key.md`
- 情境評分：`docs/scenarios/critical-actions-checklist.md`
- Mini OSCE：`docs/assessments/mini-osce.md`

## 講師提醒（避免教學失焦）

- 每個案例都要回到同一問題：
  1) 現在壞掉的是哪個生理環節？（Pump / Pipe / Tank）
  2) 你選的處置在修正哪個環節？
  3) 若處置失敗，下一步怎麼調整？
- 不在課堂上強行背在地劑量，先把「決策框架」講清楚，再導入 protocol 細節。
- **S05 是 S02 的對比案例**：同樣低血壓 + 末梢冰冷，但「Tank 空 vs Pump 不力」→ 處置完全相反。務必引導比較。
- **PseudoPEA 分散教學**：S04 debrief 提問引入概念 → S05 實際操作。不要在 M01 花太多時間單獨講，留到情境中體驗。
- **Furosemide/Dobutamine 不口頭講解**，放學員講義速查表即可。
- 課堂結束前，至少完成一次 `critical actions` 回饋（每組 1 次）。
