# 2026 北市 TP 複訓課程規劃 TODO

## 現況同步（與 `docs/roadmap.md` 對齊）

- [x] M01 病生理學模組（lecture-ready）
- [x] M02 藥物動力學模組（lecture-ready）
- [x] 題庫 / pre-post / answer key / blueprint / mini-OSCE
- [x] 學員講義與課程執行腳本
- [x] PowerPoint 簡報（M01、M02）

## 近期待辦（收尾與在地化）

- [ ] **定案課名**：重探病生理-瀕死案例討論 (Revisiting Pathophysiology: Near-Death Case Discussions)
  - 歸類：1.5 人體基本解剖生理學（生命徵象與神經、呼吸及循環相關生理）
  - 課程目標：用瀕死案例連結臨床徵象與基礎生理，聚焦代償與衰竭機制
- [ ] 對齊台北市在地 protocol：更新 `docs/modules/M02_protocol-dosing-map.md`，並同步 M02 與題庫相關劑量/流程
- [ ] 視需要建立 A/B 平行題卷（目前 pre/post 固定卷）

## 補強素材（Optional）

- [ ] 補充典型 OHCA/Shock 案例心電圖與生命徵象數據（供教學圖像化）
- [ ] 整理氧氣運輸、休克循環、酸鹼/CO2 生理機轉圖表
- [ ] 視需要撰寫講師詳細教案（Instructor Notes）
- [ ] 視需要建立課後回饋問卷

## 部署與網站優化 (Web / Deployment)

- [x] 針對 Netlify 部署修復 SPA 路由 404 問題（`web/public/_redirects` 已建立，`/* /index.html 200`）
