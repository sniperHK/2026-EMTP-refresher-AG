# Supabase Quiz Backend Setup

## 目的

- 學員在 `Quiz` 頁面完成前測 / 後測後，資料直接寫入 Supabase。
- 教師在 `教師儀表板` 以 Supabase Auth 帳號登入後，可查看全班成績、匯出 CSV、清空紀錄。

## 必要環境變數

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

本機可寫入 `web/.env.local` 或根目錄 `.env.local`。
GitHub Pages 則在 repo secrets 設定同名變數。

## Hosted Project（2026-03-10）

- Supabase project ref: `lwtnznalgxgvrkzfxjbv`
- Region: `ap-northeast-1` (Tokyo)
- GitHub repo secrets 已設定：
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- 教師登入帳號已建立於 Supabase Auth。

## CLI 流程

1. 連結目標 Supabase 專案

```bash
supabase link --project-ref <your-project-ref>
```

2. 推送 schema / RLS policy

```bash
supabase db push
```

3. 在 Supabase Dashboard 建立教師帳號

- `Authentication` -> `Users` -> `Add user`
- 建議建立完成後，關閉公開 sign-up

## 本次建立的資料表

- `public.quiz_submissions`

欄位重點：
- `quiz_type`
- `participant_name`
- `participant_group`
- `score / total / percent`
- `started_at / submitted_at / duration_seconds`
- `answers` (`jsonb`)

## RLS 設計

- `anon` / `authenticated`：可 `insert`
- `authenticated`：可 `select`
- `authenticated`：可 `delete`

## 實作注意

- 只寫 RLS policy 不夠，還要補 table privilege `GRANT`，否則 PostgREST 仍會拒絕前台寫入。
- 這個 repo 目前已用第二支 migration 補上：
  - `grant insert on public.quiz_submissions to anon`
  - `grant select, delete on public.quiz_submissions to authenticated`
- 若本機網路不支援 IPv6，`supabase db push` 可能要改走 transaction pooler 的 `db-url`。

## GitHub Pages 部署

GitHub Actions 已在 build step 注入：

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

只要 repo secrets 設好，前端 build 後就會直接連到 Supabase。
