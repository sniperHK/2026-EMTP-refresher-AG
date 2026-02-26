# Export Manifest

> Folder: `exports/2026-02-24_v1/`
> Exported at: `2026-02-24 07:12 +0800` (based on local file timestamps)
> Maintainer: `Codex` (structure cleanup on 2026-02-26)

## Purpose

- 初版課程輸出整理（M01/M02 投影片 + 學員講義）
- 作為後續授課修正版的基準版次（v1）

## Source Inputs

- `docs/modules/M01_ALS-pathophysiology.md`
- `docs/modules/M02_ALS-pharmacokinetics.md`
- `docs/teaching/student-handout.md`

## Generated Files

| File | Type | Source | Notes |
|------|------|--------|-------|
| `M01_ALS-pathophysiology.pptx` | PowerPoint | `docs/modules/M01_ALS-pathophysiology.md` | M01 講師投影片 |
| `M02_ALS-pharmacokinetics.pptx` | PowerPoint | `docs/modules/M02_ALS-pharmacokinetics.md` | M02 講師投影片 |
| `student-handout.pdf` | PDF | `docs/teaching/student-handout.md` / Typst export | 學員講義 PDF |
| `student-handout.typ` | Typst source/export artifact | `docs/teaching/student-handout.md` | 轉檔用 Typst 檔 |

## Changes Since Previous Version

- Initial export batch (retroactively organized into date-version subfolder during structure cleanup on 2026-02-26)

## Validation Checklist

- [x] 檔案可正常列出並存在於版次資料夾
- [ ] 開啟檔案內容人工抽查（必要時再執行）
- [x] 版次命名採 `YYYY-MM-DD_vN`
- [x] `exports/` 根目錄已清空輸出檔（僅保留說明檔）
