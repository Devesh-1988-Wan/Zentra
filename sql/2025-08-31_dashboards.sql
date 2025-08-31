
-- Create dashboards table (id uses uuid, adjust as per your project)
create table if not exists public.dashboards (
  id uuid primary key default gen_random_uuid(),
  org_id uuid null,
  title text not null,
  config jsonb not null default '{}'::jsonb,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Update trigger for updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists dashboards_set_updated_at on public.dashboards;
create trigger dashboards_set_updated_at
before update on public.dashboards
for each row execute function public.set_updated_at();

-- Enable RLS
alter table public.dashboards enable row level security;

-- Example profiles table guard (adjust if your schema differs)
-- Assumes a profiles table with columns: id uuid (pk), role text, email text
-- and a membership table user_orgs(user_id uuid, org_id uuid)

-- Read policy: org members or super_admins can read
create policy if not exists "org members can read dashboards"
  on public.dashboards for select
  to authenticated
  using (
    (
      org_id is null -- global dashboards
      or org_id in (
        select uo.org_id from public.user_orgs uo where uo.user_id = auth.uid()
      )
    )
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'super_admin'
    )
  );

-- Insert policy: creator must be member of org (if provided)
create policy if not exists "org members can insert dashboards"
  on public.dashboards for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and (
      org_id is null or org_id in (
        select uo.org_id from public.user_orgs uo where uo.user_id = auth.uid()
      )
    )
  );

-- Update policy: author or super_admin and within org
create policy if not exists "owners or super_admin can update dashboards"
  on public.dashboards for update
  to authenticated
  using (
    (created_by = auth.uid())
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'super_admin'
    )
  )
  with check (
    (created_by = auth.uid())
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'super_admin'
    )
  );

-- Delete policy: super_admins only (adjust if needed)
create policy if not exists "super_admins can delete dashboards"
  on public.dashboards for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'super_admin'
    )
  );
