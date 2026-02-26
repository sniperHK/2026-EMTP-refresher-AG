# v2 匯出清單（2026-02-26）

> Phase 2 優化：含心因性休克/APE/pseudoPEA/NTG 新增內容

## 檔案清單

| 檔案 | 說明 | 規格 |
|---|---|---|
| `M01_ALS病生理學_v2.pptx` | M01 投影片 | 27 slides, 16:9 |
| `M02_藥物動力學PK-PD_v2.pptx` | M02 投影片 | 29 slides, 16:9 |
| `student-handout.pdf` | 學員講義 | A4, 4 頁 |
| `student-handout.typ` | 講義 Typst 原始碼 | 可重新編譯 |

## v1 → v2 差異

### M01 新增（+9 slides vs v1）
- Pump-Pipe-Tank 強化決策樹
- 心因性休克成因 + Forward/Backward failure
- APE 病生理 + SCAPE
- Nohria-Stevenson 矩陣
- PseudoPEA 概念 + 處置差異表
- 休克→arrest 連續體

### M02 新增（+4 slides vs v1）
- NTG 完整藥理
- 血管擴張劑段落（含 SCAPE 高劑量策略）
- Furosemide/Dobutamine 速查
- PseudoPEA push-dose epi 應用

### Student Handout 新增（v1: 2 頁 → v2: 4 頁）
- Nohria-Stevenson 2×2 矩陣（彩色表格）
- SCAPE 處置速查（步驟表）
- PseudoPEA 辨識流程（流程圖 + 比較表）
- S02 vs S05 鑑別表
- NTG / Furosemide / Dobutamine 藥物速查
- Push-dose Epi 適應症說明

## 產出工具
- PPTX: `scripts/generate_pptx_v2.py`（python-pptx 1.0.2）
- PDF: Typst 0.14.2
