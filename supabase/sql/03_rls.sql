-- Enable RLS
alter table public.profiles enable row level security;
alter table public.dashboards enable row level security;
alter table public.dashboard_widgets enable row level security;
alter table public.dashboard_versions enable row level security;
alter table public.dashboard_permissions enable row level security;

-- Profiles: user can see/update self; admins can see all
create policy "profiles self select" on public.profiles for select to authenticated using ( id = auth.uid() or (auth.jwt()->>'user_role') in ('admin','super_admin') );
create policy "profiles self update" on public.profiles for update to authenticated using ( id = auth.uid() or (auth.jwt()->>'user_role') in ('admin','super_admin') );

-- Dashboards: admins can all; viewers need permission; owners can all
create policy "dashboards admin full" on public.dashboards for all to authenticated using ( (auth.jwt()->>'user_role') in ('admin','super_admin') );
create policy "dashboards owner full" on public.dashboards for all to authenticated using ( owner_id = auth.uid() );
create policy "dashboards viewer select" on public.dashboards for select to authenticated using ( exists (select 1 from public.dashboard_permissions p where p.dashboard_id = id and p.user_id = auth.uid() and p.can_view = true) );

-- Widgets follow dashboard
create policy "widgets admin full" on public.dashboard_widgets for all to authenticated using ( (auth.jwt()->>'user_role') in ('admin','super_admin') );
create policy "widgets by dashboard" on public.dashboard_widgets for all to authenticated using ( exists(select 1 from public.dashboards d where d.id = dashboard_id and (d.owner_id = auth.uid() or (auth.jwt()->>'user_role') in ('admin','super_admin') or exists(select 1 from public.dashboard_permissions p where p.dashboard_id = d.id and p.user_id = auth.uid() and (p.can_view or p.can_edit)))) );

-- Versions: readable by viewers; writable by admins/owners
create policy "versions select" on public.dashboard_versions for select to authenticated using ( exists(select 1 from public.dashboards d where d.id = dashboard_id and ((auth.jwt()->>'user_role') in ('admin','super_admin') or d.owner_id = auth.uid() or exists(select 1 from public.dashboard_permissions p where p.dashboard_id = d.id and p.user_id = auth.uid() and p.can_view = true))) );
create policy "versions insert" on public.dashboard_versions for insert to authenticated with check ( exists(select 1 from public.dashboards d where d.id = dashboard_id and ((auth.jwt()->>'user_role') in ('admin','super_admin') or d.owner_id = auth.uid())) );

-- Permissions: admins and owners manage; users can view their rows
create policy "perms admin manage" on public.dashboard_permissions for all to authenticated using ( (auth.jwt()->>'user_role') in ('admin','super_admin') );
create policy "perms owner manage" on public.dashboard_permissions for all to authenticated using ( exists(select 1 from public.dashboards d where d.id = dashboard_id and d.owner_id = auth.uid()) );
create policy "perms self read" on public.dashboard_permissions for select to authenticated using ( user_id = auth.uid() );
