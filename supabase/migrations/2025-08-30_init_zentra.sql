-- 1. Roles
create type public.app_role as enum ('super_admin','admin','editor','viewer');

-- 2. Profiles (mirror of auth.users)
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role public.app_role not null default 'viewer',
  created_at timestamptz not null default now()
);

-- 3. Dashboards
create table public.dashboards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references public.profiles(user_id) on delete cascade,
  is_private boolean not null default true,
  created_at timestamptz not null default now()
);

-- 4. Widgets + configuration
create table public.widgets (
  id uuid primary key default gen_random_uuid(),
  kind text not null, -- e.g., 'kpi','line','bar','table','richtext'
  title text,
  description text,
  created_by uuid not null references public.profiles(user_id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.dashboard_widgets (
  id uuid primary key default gen_random_uuid(),
  dashboard_id uuid not null references public.dashboards(id) on delete cascade,
  widget_id uuid not null references public.widgets(id) on delete cascade,
  layout jsonb not null default '{}'::jsonb,     -- {x,y,w,h}
  config jsonb not null default '{}'::jsonb,     -- widget-specific options
  idx int not null default 0
);

-- 5. Theme tokens (AMLA)
create table public.theme_tokens (
  id uuid primary key default gen_random_uuid(),
  name text unique not null default 'amla',
  tokens jsonb not null,
  updated_by uuid references public.profiles(user_id),
  updated_at timestamptz not null default now()
);

-- 6. Icon registry + storage note
create table public.icons (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  category text,
  tags text[],
  size int default 24,
  file_path text not null, -- storage path in bucket 'icons'
  uploaded_by uuid references public.profiles(user_id),
  created_at timestamptz not null default now()
);

-- 7. Helpers to elevate super admin by email
create or replace function public.is_super_admin()
returns boolean
language sql
stable
as $$
  select (auth.jwt() ->> 'email') = 'devesh.pillewan@amla.io';
$$;

-- 8. RLS
alter table public.profiles enable row level security;
alter table public.dashboards enable row level security;
alter table public.widgets enable row level security;
alter table public.dashboard_widgets enable row level security;
alter table public.theme_tokens enable row level security;
alter table public.icons enable row level security;

-- Profiles
create policy "profiles self + admins read"
on public.profiles for select
using (
  public.is_super_admin()
  or role in ('admin','editor','viewer')  -- anyone logged-in with a profile
  or user_id = auth.uid()
);

create policy "profiles self update"
on public.profiles for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Dashboards
create policy "dashboards read"
on public.dashboards for select
using (
  public.is_super_admin()
  or not is_private
  or owner_id = auth.uid()
);

create policy "dashboards owner crud"
on public.dashboards for all
using (public.is_super_admin() or owner_id = auth.uid())
with check (public.is_super_admin() or owner_id = auth.uid());

-- Widgets
create policy "widgets read"
on public.widgets for select
using (true); -- all authenticated users can read widget definitions

create policy "widgets create by editors+"
on public.widgets for insert
to authenticated
with check (public.is_super_admin() or exists(
  select 1 from public.profiles p where p.user_id = auth.uid() and p.role in ('admin','editor')
));

create policy "widgets update/delete by creator or super"
on public.widgets for update using (public.is_super_admin() or created_by = auth.uid())
with check (public.is_super_admin() or created_by = auth.uid());
create policy "widgets delete by creator or super"
on public.widgets for delete using (public.is_super_admin() or created_by = auth.uid());

-- Dashboard Widgets
create policy "dashboard_widgets read if can read dashboard"
on public.dashboard_widgets for select
using (exists(select 1 from public.dashboards d where d.id = dashboard_id and (
  public.is_super_admin() or d.owner_id = auth.uid() or not d.is_private
)));

create policy "dashboard_widgets modify if owner or super"
on public.dashboard_widgets for all
using (exists(select 1 from public.dashboards d where d.id = dashboard_id and (
  public.is_super_admin() or d.owner_id = auth.uid()
)))
with check (exists(select 1 from public.dashboards d where d.id = dashboard_id and (
  public.is_super_admin() or d.owner_id = auth.uid()
)));

-- Theme tokens
create policy "theme tokens read"
on public.theme_tokens for select
using (true);

create policy "theme tokens upsert by admin+ or super"
on public.theme_tokens for all
using (public.is_super_admin() or exists(
  select 1 from public.profiles p where p.user_id = auth.uid() and p.role in ('admin','editor')
))
with check (public.is_super_admin() or exists(
  select 1 from public.profiles p where p.user_id = auth.uid() and p.role in ('admin','editor')
));

-- Icons
create policy "icons read"
on public.icons for select using (true);

create policy "icons manage by editor+ or super"
on public.icons for all
using (public.is_super_admin() or exists(
  select 1 from public.profiles p where p.user_id = auth.uid() and p.role in ('admin','editor')
))
with check (public.is_super_admin() or exists(
  select 1 from public.profiles p where p.user_id = auth.uid() and p.role in ('admin','editor')
));

-- 9. Storage bucket for icons
insert into storage.buckets (id, name, public) values ('icons','icons', true)
on conflict (id) do nothing;

-- Public read, editor+ write
create policy "public read icons"
on storage.objects for select
to public
using (bucket_id = 'icons');

create policy "editors manage icons"
on storage.objects for all
to authenticated
using (bucket_id = 'icons' and (
  public.is_super_admin() or exists(
    select 1 from public.profiles p where p.user_id = auth.uid() and p.role in ('admin','editor')
  )
))
with check (bucket_id = 'icons');

-- 10. Ensure a profile row exists on first sign-in
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (user_id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name',
          case when new.email = 'devesh.pillewan@amla.io' then 'super_admin' else 'viewer' end)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();