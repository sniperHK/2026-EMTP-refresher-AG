# 2026 台北市 EMTP 複訓（ALS 病生理學 & 藥物動力學）

本專案用來整理與產出台北市 EMTP 複訓教材，主軸為 ALS（Advanced Life Support）病生理學與藥物動力學/藥效學（PK/PD），對應到臨床決策點與前線用藥風險控管。

## 快速入口

- 文件導覽（docs index）：`docs/index.md`
- 專案路線圖：`docs/roadmap.md`
- 模組模板：`docs/templates/module-template.md`
- 情境模板：`docs/scenarios/scenario-template.md`
- 題庫：`docs/assessments/question-bank.md`
- Pre-test：`docs/assessments/pre-test.md`
- Post-test：`docs/assessments/post-test.md`
- Answer key：`docs/assessments/answer-key.md`
- 情境評分表：`docs/scenarios/critical-actions-checklist.md`
- M02 在地劑量對接表：`docs/modules/M02_protocol-dosing-map.md`
- 課程執行腳本：`docs/teaching/session-flow.md`
- 結構稽核腳本：`scripts/audit_project.sh`

## 專案結構（重點）

- `docs/`：教材與大綱（可直接投影片化）
- `inputs/`：外部原始檔（不進 Git；保留 `README.md` 說明用途）
- `references/`：參考文獻與連結；原始檔建議放 `references/raw/`（不進 Git）
- `exports/`：輸出檔（不進 Git；保留 `README.md` 與版本化資料夾慣例）

## 注意事項

- 本 repo 以教學用途為主；實際劑量、適應症、禁忌症、給藥途徑與流程請以現行 protocol/醫療指導為準。
- 目前「ALS」預設為 Advanced Life Support；若你要講的是 amyotrophic lateral sclerosis，告訴我我會立刻調整模組與案例。
- 題庫正式檔名固定為 `question-bank.md`（避免 `question_bank.md` 與 `question-bank.md` 並存）。
- 根目錄避免放原始 PDF/PPTX；請移至 `inputs/` 或 `references/raw/`，再於對應 `README.md` 補註來源與用途。
