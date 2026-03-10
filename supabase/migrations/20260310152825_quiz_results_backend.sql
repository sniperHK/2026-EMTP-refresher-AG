create extension if not exists pgcrypto;

create table if not exists public.quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  quiz_type text not null check (quiz_type in ('pre', 'post', 'all')),
  participant_name text not null,
  participant_group text not null,
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  percent integer not null check (percent between 0 and 100),
  started_at timestamptz not null,
  submitted_at timestamptz not null,
  duration_seconds integer not null check (duration_seconds >= 0),
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists quiz_submissions_submitted_at_idx
  on public.quiz_submissions (submitted_at desc);

create index if not exists quiz_submissions_quiz_type_idx
  on public.quiz_submissions (quiz_type);

create index if not exists quiz_submissions_group_idx
  on public.quiz_submissions (participant_group);

alter table public.quiz_submissions enable row level security;

drop policy if exists "quiz submissions insert for everyone" on public.quiz_submissions;
create policy "quiz submissions insert for everyone"
  on public.quiz_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "quiz submissions select for teachers" on public.quiz_submissions;
create policy "quiz submissions select for teachers"
  on public.quiz_submissions
  for select
  to authenticated
  using (true);

drop policy if exists "quiz submissions delete for teachers" on public.quiz_submissions;
create policy "quiz submissions delete for teachers"
  on public.quiz_submissions
  for delete
  to authenticated
  using (true);
