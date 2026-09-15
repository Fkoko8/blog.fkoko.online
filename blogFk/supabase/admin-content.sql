create table if not exists public.site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.site_content enable row level security;

create policy "Public can read site content"
  on public.site_content for select
  using (true);

create policy "Authenticated users can manage site content"
  on public.site_content for all
  to authenticated
  using (true)
  with check (true);
