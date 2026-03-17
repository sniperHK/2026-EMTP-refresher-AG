# 文件導覽（Docs Index）

本頁是 `docs/` 的協作入口，讓多位 AI / 人類協作者快速找到教材主體與維護順序。

## 建議閱讀順序（第一次接手）

1. `docs/roadmap.md`：掌握課程定位、交付物清單、缺口與下一步
2. `docs/teaching/session-flow.md`：理解 4 小時課程節奏與教學配置
3. `docs/modules/`：閱讀 M01 / M02 主模組與 M03 blind spots microcases
4. `docs/assessments/`：確認 pre/post、題庫、評量藍圖與答案
5. `docs/scenarios/`：查看案例設計與 debrief 重點

## 目錄導覽

### `docs/`
- `course-improvement-review-2026-03-06.md`：本輪專案盤點與課程改進建議（含外部依據）
- `focused-improvement-plan-2026-03-10.md`：依使用者實際優先順序收斂的執行版改善計畫

### `docs/modules/`
- `M01_ALS-pathophysiology.md`：病生理學主模組
- `M02_ALS-pharmacokinetics.md`：PK/PD 主模組
- `M02_protocol-dosing-map.md`：台北市 ALS / 休克流程對接表（需持續維護）
- `M03_high-risk-blind-spots.md`：10-15 分鐘 blind spots microcases（sepsis / endocrine-metabolic / stroke-neuro / tox）

### `docs/assessments/`
- `question-bank.md`：題庫主檔（含標籤）
- `pre-test.md` / `post-test.md`：分卷
- `answer-key.md`：答案與解析
- `blueprint.md`：評量藍圖
- `mini-osce.md`：口頭演練評量

### `docs/scenarios/`
- `S01` 到 `S04`：課堂案例與 debrief
- `critical-actions-checklist.md`：共用評分表
- `scenario-template.md`：新增案例模板

### `docs/teaching/`
- `session-flow.md`：授課流程腳本
- `student-handout.md`：學員講義（Markdown 原始稿）

### `docs/templates/`
- `module-template.md`：模組模板

## 協作維護規則（摘要）

- 課程進度狀態以 `docs/roadmap.md` 為主（避免和 `TODO.md` 漂移）
- 原始素材放 `inputs/` 或 `references/raw/`，不要放根目錄
- 輸出檔放 `exports/`，建議使用日期版次子資料夾（例如 `exports/2026-02-26/`）
- 變更完成後執行 `scripts/audit_project.sh` 做快速結構檢查
