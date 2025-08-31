
-- Enable RLS
alter table public.profiles enable row level security;
alter table public.widgets enable row level security;
alter table public.icons enable row level security;

-- Profiles: read/update own
create policy if not exists profiles_read_own on public.profiles
for select to authenticated using (auth.uid() = id);

create policy if not exists profiles_update_own on public.profiles
for update to authenticated using (auth.uid() = id);

-- Super admin full access to profiles
create policy if not exists profiles_super_admin_full on public.profiles
for all to authenticated using (
  exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'super_admin'
  )
);

-- Widgets: owner can do all
create policy if not exists widgets_owner_all on public.widgets
for all to authenticated using (owner = auth.uid());

-- Icons: read for all authenticated; write for super_admin
create policy if not exists icons_read_all on public.icons
for select to authenticated using (true);

create policy if not exists icons_super_admin_write on public.icons
for all to authenticated using (
  exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'super_admin'
  )
);
