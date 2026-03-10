grant usage on schema public to anon, authenticated;

grant insert on table public.quiz_submissions to anon;
grant select, delete on table public.quiz_submissions to authenticated;
