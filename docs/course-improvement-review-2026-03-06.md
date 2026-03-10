# 課程改進檢視（2026-03-06）

> 目的：先盤點本專案現況，再根據 2025-2026 可取得的官方/一手資料，整理出下一輪課程優化的優先順序。

## 1. 專案現況摘要

### 已完成的教學包

- 核心模組 2 份：M01 病生理學、M02 藥物動力學/藥效學
- 情境 5 案：S01-S05，含 debrief 與 critical actions
- 評量完整：pre-test、post-test、題庫、blueprint、mini OSCE
- 授課支援：session flow、teacher guide、instructor notes、student handout
- Web 層已上線：模組閱讀、互動測驗、情境播放器、決策工具、Slidev 投影片

### 目前最強的地方

- 主軸非常清楚：不是背 ACLS，而是用病生理推理決策。
- `Pump / Pipe / Tank`、`Nohria-Stevenson`、`SCAPE`、`PseudoPEA` 之間的串接有辨識度。
- `docs/`、`web/`、`slides/` 已經不是分離資產，而是同一套教材的多種載體。
- 與一般 refresher 相比，PK/PD 深度是本專案最有差異化的優勢。

## 2. 盤點後看到的主要問題

### P0：少數核心內容已和最新官方表述不完全同步

1. **Cardiac arrest 血管通路表述偏舊**

   - 目前多處把 `IO` 寫成「休克/OHCA 首選」，甚至把 `Humeral IO > Tibial IO` 寫成接近定論。
   - 但 2025 AHA Adult ALS 已明確改成：成人 cardiac arrest 給藥時，**先嘗試 IV；IV 不可行或失敗時，IO 是合理替代**。
   - 受影響檔案：
     - `docs/modules/M02_ALS-pharmacokinetics.md`
     - `docs/teaching/student-handout.md`
     - `web/slides/M02.md`
     - 題庫與 post-test 的 IO 題目
2. **PseudoPEA / POCUS 被寫得比官方建議更肯定**

   - 現在教材多處把 `POCUS` 寫成接近「唯一可靠鑑別」，並把 pseudoPEA 處置寫成核心標準答案。
   - 2025 AHA 對 intra-arrest POCUS 的表述仍偏保守：**用於診斷 reversible causes 的價值尚未完全建立**。
   - 這不代表要拿掉 pseudoPEA，而是應改成：
     - `advanced / optional skill`
     - `限受過訓練、且不延長 rhythm check / CPR pause 的情境`
     - `必須綁定 local protocol 與 device availability`
3. **課程幾乎講到 ROSC 前，缺少 ROSC 後 5 分鐘框架**

   - 目前內容很強調 arrest 前與 arrest 中，但 post-ROSC 只零散出現在題目或案例裡。
   - 2025 AHA Post-Cardiac Arrest Care 已把 `SpO2 90-98%`、`MAP >= 65 mmHg`、以及 ROSC 後的 CT / echo / coronary evaluation 講得更清楚。
   - 建議補一張 `ROSC 後前 5 分鐘` 的 pocket card 或 1-2 張 slide。

### P1：教學法已強，但還可以再「成人學習化」

4. **目前是機轉導向強，診斷不確定性訓練較弱**

   - 現有課程很擅長教「如果你已經知道這是 S02 / S05，該怎麼想」。
   - 但 AMLS 4th edition 的強項在於：`scene size-up -> first impression -> history -> focused exam -> differential diagnosis`。
   - 建議在每個 scenario 開頭加一個 `Assessment Pathway` 小框，讓學員先列出 2-3 個可能方向，再回到 Pump/Pipe/Tank。
5. **Debrief 已有內容，但缺少統一 script / timing / rubric**

   - 專案已有 instructor notes，但不同講師之間仍可能帶出不同深度。
   - 2025 AHA Resuscitation Education Science 對 `scripted debriefing`、`teamwork/leadership training`、`cognitive aids`、`booster training` 都更明確。
   - 建議把現有 Socratic 問題再壓成固定格式：
     - `What changed?`
     - `What physiology failed?`
     - `What action matched that failure?`
     - `What would make you switch strategy?`

### P2：內容結構聚焦明確，但 refresher 的廣度仍可加一層保護網

6. **目前主軸聚焦 shock + arrest，很深，但對 refresher 的廣度略窄**
   - 這是刻意設計，不是錯。
   - 但若定位是「台北市 TP 複訓」，可考慮在不破壞主線下，外掛 10-15 分鐘 `blind spots`：
     - sepsis
     - endocrine / metabolic
     - stroke / neuro
     - tox
   - 形式不要變成完整新模組，而是 4 個 microcases 或 quiz blocks。

### P1：Web 與評量層已有基礎，但與課程規格仍有幾個落差

7. **Web 測驗通過門檻和 blueprint 不一致**

   - blueprint 寫 `Post-test >= 80%`
   - 但 Web Quiz 先前用 `70%`
   - 這次已同步修正為：
     - `Pre-test` 只當基線，不顯示 pass/fail
     - `Post-test / all` 以 `80%` 為通過
8. **Web 互動層尚未完全利用現有 scenario/debrief 資產**

   - 現有能力已經很多，但比較偏「單人自學」。
   - 下一步最值得做的是 instructor-facing features，而不是再堆新的展示頁：
     - 組別作答紀錄
     - debrief 提問計時
     - critical actions 勾選後輸出
     - QR 快速進題

## 3. 建議的優先執行順序

### 第一輪（先做，低風險高收益）

1. **Evidence sync**

   - 把 M02 / handout / slides / 題庫中的 `IO 首選` 改成 `IV first, IO if IV delayed or not feasible`
   - 把 `Humeral > Tibial` 改成較保守表述
2. **PseudoPEA 降階為進階加值內容**

   - 保留概念
   - 但加註 `若有 POCUS 能力與 protocol 支持`
   - 避免在 core exam 把它做成過度絕對化題目
3. **補 ROSC aftercare 小節**

   - 1 張 handout + 1-2 張 slide + 2 題 post-test
   - 重點：oxygen、MAP、12-lead / coronary suspicion、handoff priorities
4. **統一 debrief script**

   - 把 instructor notes 再壓縮成每案固定 3-4 問
   - 讓不同講師的輸出更一致

### 第二輪（課程成熟化）

5. **把 AMLS Assessment Pathway 微型嵌入現有案例**

   - 不必整套改版
   - 只要在每案開頭加 `scene / first impression / DDx`
6. **做 booster package**

   - 10 題課後追蹤 quiz
   - 2 週後 QR code 回收
   - 對應 2025 AHA 的 booster / spaced learning 概念
7. **增加 blind spots microcases**

   - sepsis / endocrine / neuro / tox
   - 每題 2-3 分鐘，不破壞 4 小時主線

## 4. 具體檔案修改建議

| 類別              | 優先檔案                                        | 建議動作                                                  |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------- |
| guideline sync    | `docs/modules/M02_ALS-pharmacokinetics.md`    | 更新 IV/IO 表述、弱化 IO 位置定論                         |
| guideline sync    | `docs/teaching/student-handout.md`            | 修正 route table 與高風險提醒                             |
| guideline sync    | `web/slides/M02.md`                           | 同步 route slide、IO 細節 slide、結語 slide               |
| pseudoPEA framing | `docs/modules/M01_ALS-pathophysiology.md`     | 改寫 POCUS/pseudoPEA 段落為 advanced conditional content  |
| pseudoPEA framing | `docs/scenarios/S04_OHCA-VF.md`               | 改成「若有 POCUS 能力」分支，而非唯一標準流程             |
| pseudoPEA framing | `docs/scenarios/S05_cardiogenic-shock-APE.md` | 同步調整語氣，避免過度絕對化                              |
| post-ROSC         | `docs/teaching/student-handout.md`            | 新增 ROSC 後前 5 分鐘小卡                                 |
| post-ROSC         | `web/slides/M01.md` 或 `web/slides/M02.md`  | 加 1-2 張 ROSC 後照護 slide                               |
| teaching design   | `docs/teaching/instructor-notes.md`           | 固定 debrief script + timing                              |
| assessment        | `docs/assessments/question-bank.md`           | 新增 ROSC / post-arrest 題與移除過度絕對化 pseudoPEA 題幹 |
| web assessment    | `web/src/pages/QuizPage.tsx`                  | 已修正通過門檻邏輯與 pre-test baseline 呈現               |

## 5. 外部依據（2026-03-06 查核）

1. **AHA 2025 Part 9: Adult Advanced Life Support**

   - 成人 cardiac arrest 給藥時，建議先嘗試 `IV access`；`IO` 作為 IV 失敗或不可行時的合理替代。
   - POCUS 在成人 cardiac arrest 中用來診斷 reversible causes，官方表述仍是 `not well established`。
   - Source:
     - https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support
2. **AHA 2025 Part 11: Post-Cardiac Arrest Care**

   - ROSC 後建議避免 hypoxemia / hyperoxemia，`SpO2 90%-98%`
   - 應避免 hypotension，`MAP >= 65 mmHg`
   - Source:
     - https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/post-cardiac-arrest-care
3. **AHA 2025 Part 12: Resuscitation Education Science**

   - 支持 `feedback devices`、`booster sessions`、`spaced learning`、`teamwork training`、`cognitive aids`、`in situ training`、`scripted debriefing`、`blended learning`
   - Source:
     - https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/resuscitation-education-science
4. **NAEMT AMLS 4th edition**

   - 強調 `AMLS Assessment Pathway`
   - 以 case-based scenarios、interactive differential diagnosis、75+ patient simulations 建構臨床推理
   - Source:
     - https://www.naemt.org/education/medical-education/amls
     - https://www.naemt.org/education/medical-education/amls/amls-courses
5. **NREMT / NCCP 2025**

   - National component 強調 evidence-based medicine、scope changes、以及 `low frequency but high criticality` patient presentations
   - 這支持 refresher 課程保留主軸的同時，加上 blind spots microcases
   - Source:
     - https://www.nremt.org/document/nccp
     - https://www.nremt.org/Document/Recertification

## 6. 總結

這個專案目前最大的問題不是「內容不夠」，而是：

1. 少數核心表述要和 2025 AHA 做 evidence sync
2. pseudoPEA/POCUS 要從「強主張」改成「高階條件式能力」
3. 教學法可以再往 `AMLS-style uncertainty` 與 `AHA-style education science` 前進
4. Web / assessment 要更精準對齊課程 blueprint

如果只做一輪最值得的優化，我會建議先做：

1. `IV vs IO` 更新
2. `PseudoPEA/POCUS` 重寫
3. `ROSC 後前 5 分鐘` 小卡
4. `Debrief script` 標準化
5. -
