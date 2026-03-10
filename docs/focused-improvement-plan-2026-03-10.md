# 聚焦版課程優化計畫（2026-03-10）

> 目的：從 `course-improvement-review-2026-03-06.md` 收斂出本輪真正要做的範圍，不再平均處理所有建議。

## 本輪聚焦範圍

1. **Cardiac arrest 血管通路表述更新**
2. **ROSC 後前 5 分鐘框架整合**
3. **Scenario 開頭加入 Assessment Pathway**
4. **Debrief 標準化落地**
5. **Blind spots 獨立規劃為 M03**
6. **Web instructor mode 的資料架構與是否需要 Supabase**

## 目前判讀：哪些已做，哪些還沒做

### 1. IV-first / IO-as-alternative

這塊**已部分完成，但還沒有完全清乾淨**。

- 已更新：
  - `docs/modules/M02_ALS-pharmacokinetics.md` 已寫入「先嘗試 IV，IV 失敗或不可行時才用 IO」
- 仍需清理：
  - `docs/modules/M02_ALS-pharmacokinetics.md` 仍有「Humeral IO 優於 Tibial IO」的強主張
  - `web/slides/M02.md` 仍保留「若需 IO → 優先選肱骨」等較強語氣
  - `docs/assessments/post-test.md` 與 `web/src/data/questions.ts` 仍把 Humeral IO 描述得接近定論
  - 若要完全一致，`docs/teaching/student-handout.md` 的 route 表述也要再做一次全檢

**本輪建議定稿語氣**：

- 成人 cardiac arrest 給藥：**先嘗試 IV**
- `IO`：IV 延遲、失敗、或不可行時的合理替代
- `Humeral IO`：**常較快接近 central circulation，但不是無條件定論**
- `Tibial IO`：仍是可接受位置，重點在可行性、熟悉度、情境與時間

### 2. ROSC 後前 5 分鐘

這塊**其實已經有內容，但還沒有真正進到課程主流程**。

- 已有：
  - `docs/teaching/student-handout.md` 已有 `ROSC 後前 5 分鐘 Pocket Card`
  - `web/slides/M01.md` 已有 ROSC 後前 5 分鐘投影片
- 仍不足：
  - `S04` 的 scenario / web 情境還沒有把 ROSC 後的 **SpO₂ 90–98%、MAP >= 65、12-lead ECG / coronary evaluation / handoff priorities** 變成明確決策點
  - 題庫與 post-test 對 ROSC aftercare 的比重仍偏低

**本輪建議**：

- 不再新增更多散落內容
- 改為把既有 pocket card **真正嵌入 S04 與測驗**
- 目標是讓學員知道：`ROSC 不是結束，而是第二段 resuscitation 的開始`

### 3. Assessment Pathway

這塊目前**幾乎還沒落地**。

- 現有 scenario 設計很強調病生理推理
- 但在情境開頭，還缺少 `scene size-up -> first impression -> focused exam -> differential diagnosis`

**本輪建議標準格式**：

每個 scenario 開頭先加一個固定小框：

1. `Scene size-up`：先看到什麼危險/情境線索？
2. `First impression`：最先覺得這病人正在壞哪裡？
3. `Focused exam`：你現在最想補哪 2-3 個關鍵資料？
4. `Leading DDx`：目前最可能的 2-3 個方向是什麼？
5. `Discriminator`：哪個線索會讓你偏向 A 而不是 B？

**落地順序**：

- 先做 `docs/scenarios/*.md`
- 再決定是否把同樣結構加入 web scenario pre-brief card

### 4. Debrief 標準化

這塊**文件上已完成，接下來不是重寫，而是落地**。

- `docs/teaching/instructor-notes.md` 已有固定四問：
  - What changed?
  - What physiology failed?
  - What action matched that failure?
  - What would make you switch strategy?
- 已有時間控制原則

**所以這一項的下一步不是再寫一版文字**，而是：

- 把 rubric / timing 變成講師現場可直接拿來用的格式
- 若做 web instructor mode，直接內建：
  - `8 min / 7 min` debrief timer
  - 固定四問提示卡
  - critical actions 勾選結果輸出

### 5. Blind Spots 改列 M03

這是本輪明確決策：**不把 blind spots 硬塞回 M01/M02，而是獨立成 M03。**

建議定位：

- **M03：High-Risk, Low-Frequency Blind Spots**
- 時長：`10-15 分鐘`
- 形式：`4 個 microcases 或 quiz blocks`

建議內容：

- `sepsis`
- `endocrine / metabolic`
- `stroke / neuro`
- `tox`

這樣做的好處：

- 不破壞目前 M01/M02 的主軸完整性
- 保留 refresher 課程需要的廣度保護網
- 後續若要擴寫，可單獨迭代 M03，不會牽動主模組

### 6. Web instructor mode 與 Supabase

你的問題是對的，但**答案不是「現在就一定要上 Supabase」**。

先分需求看：

#### 不需要後端就能做的功能

- `debrief 提問計時`
- `QR 快速進題`
- `critical actions 勾選後匯出 JSON / CSV / PDF`
- 單一裝置上的講師模式

這些都可以先做 **frontend-only**：

- URL query params / QR code deep links
- local state / localStorage / sessionStorage
- browser 端輸出檔案

#### 真的需要 Supabase 的門檻

當你要做到以下任一項，就值得上後端：

- 多組學員用各自手機/平板輸入
- 講師端需要**即時看到各組作答**
- 想保留課後資料，做 cohort / session 回顧
- 同一場課要有 `session code`、`team code`、即時同步與跨裝置接續

**建議採分階段架構**：

##### Phase 1：先不接後端

- Instructor mode
- Debrief timer
- QR 快速進題
- Critical actions checklist 匯出

##### Phase 2：確認教學現場真的需要多人同步後，再接 Supabase

最小資料模型可以是：

- `sessions`
- `teams`
- `responses`
- `critical_action_events`

**結論**：

- 若目標是「讓講師現場更好帶」：**先不要急著上 Supabase**
- 若目標是「多組同時輸入、講師即時總覽、課後保留紀錄」：**Supabase 是合理選項**

## 建議實作順序

### 第一包：先把教材說法與教學主線收斂

1. 清理 IV/IO wording
2. 把 ROSC aftercare 真正嵌入 S04 / 題庫 / web scenario
3. 為各 scenario 新增 Assessment Pathway 小框

### 第二包：把講師帶課流程做得更穩

4. 將 debrief 四問做成講師卡 / rubric / timer
5. 規劃 M03 microcases

### 第三包：再決定 web 是否進入多人同步

6. 先做 instructor mode 的無後端版本
7. 若現場測試確認需要多組同步，再導入 Supabase

## 建議對應檔案

### 內容層

- `docs/modules/M02_ALS-pharmacokinetics.md`
- `docs/teaching/student-handout.md`
- `docs/assessments/question-bank.md`
- `docs/assessments/post-test.md`
- `docs/scenarios/S01_tension-pneumothorax.md`
- `docs/scenarios/S02_hypovolemic-shock.md`
- `docs/scenarios/S03_anaphylactic-shock.md`
- `docs/scenarios/S04_OHCA-VF.md`
- `docs/scenarios/S05_cardiogenic-shock-APE.md`
- `docs/teaching/instructor-notes.md`

### Web 層

- `web/slides/M02.md`
- `web/src/data/questions.ts`
- `web/src/data/scenarios/*.ts`
- `web/src/data/types.ts`
- `web/src/components/scenario/ScenarioPlayer.tsx`
- `web/src/pages/ScenarioPage.tsx`

## 本輪不優先處理

- Web quiz pass threshold：已與 blueprint 對齊為 `80%`，此項關閉
- 為 blind spots 直接擴寫成完整主模組：先不要，先以 `M03 microcases` 規劃即可

