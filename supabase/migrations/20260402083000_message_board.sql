create extension if not exists pgcrypto;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  nickname text not null default '匿名',
  content text not null check (char_length(trim(content)) > 0),
  image_url text,
  likes integer not null default 0 check (likes >= 0),
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);

create index if not exists messages_pinned_created_at_idx
  on public.messages (pinned desc, created_at desc);

create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  nickname text not null default '匿名',
  content text not null check (char_length(trim(content)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists replies_message_id_created_at_idx
  on public.replies (message_id, created_at asc);

alter table public.messages enable row level security;
alter table public.replies enable row level security;

drop policy if exists "messages are readable by everyone" on public.messages;
create policy "messages are readable by everyone"
  on public.messages
  for select
  to anon, authenticated
  using (true);

drop policy if exists "messages can be created by everyone" on public.messages;
create policy "messages can be created by everyone"
  on public.messages
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "messages can be deleted by teachers" on public.messages;
create policy "messages can be deleted by teachers"
  on public.messages
  for delete
  to authenticated
  using (true);

drop policy if exists "replies are readable by everyone" on public.replies;
create policy "replies are readable by everyone"
  on public.replies
  for select
  to anon, authenticated
  using (true);

drop policy if exists "replies can be created by everyone" on public.replies;
create policy "replies can be created by everyone"
  on public.replies
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "replies can be deleted by teachers" on public.replies;
create policy "replies can be deleted by teachers"
  on public.replies
  for delete
  to authenticated
  using (true);

grant usage on schema public to anon, authenticated;
grant select, insert on table public.messages to anon, authenticated;
grant delete on table public.messages to authenticated;
grant select, insert on table public.replies to anon, authenticated;
grant delete on table public.replies to authenticated;

create or replace function public.increment_message_likes(target_message_id uuid, delta integer default 1)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  next_likes integer;
begin
  update public.messages
  set likes = greatest(coalesce(likes, 0) + coalesce(delta, 0), 0)
  where id = target_message_id
  returning likes into next_likes;

  if next_likes is null then
    raise exception 'message % not found', target_message_id;
  end if;

  return next_likes;
end;
$$;

grant execute on function public.increment_message_likes(uuid, integer) to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'message-board-images',
  'message-board-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

grant usage on schema storage to anon, authenticated;
grant select, insert on table storage.objects to anon, authenticated;
grant select on table storage.buckets to anon, authenticated;

drop policy if exists "message images public read" on storage.objects;
create policy "message images public read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'message-board-images');

drop policy if exists "message images public upload" on storage.objects;
create policy "message images public upload"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'message-board-images');
