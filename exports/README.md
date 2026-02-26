# exports/

本資料夾存放匯出成果（例如 `pptx`、`pdf`、`typ` 轉檔結果）。

## 規則

- `exports/` 內容預設不進 Git（避免版本噪音與大型二進位檔）
- 保留此 `README.md` 供協作者理解用途與輸出慣例
- 僅 `manifest.md` 會被 Git 追蹤（方便保留輸出版本紀錄），二進位輸出檔仍維持忽略
- 建議採日期版次子資料夾：
  - `exports/2026-02-26/`
  - `exports/2026-03-01-v2/`

## 建議紀錄（可選）

可在各日期資料夾放 `manifest.md`，記錄：
- 輸出日期
- 來源檔（例如 `docs/teaching/student-handout.md`）
- 目的（授課版、審閱版、學員版）
- 備註（修正版差異）

## 範本

- 可從 `docs/templates/export-manifest-template.md` 複製後填寫
