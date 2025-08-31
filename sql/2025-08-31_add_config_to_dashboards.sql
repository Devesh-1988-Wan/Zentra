
-- Ensure the dashboards table has a JSONB `config` column.
-- Idempotent: safe to run multiple times.

-- UUID generator extension (if not already available via the Supabase template)
create extension if not exists pgcrypto;

-- Create table if it does not exist (keeps your existing table intact)
create table if not exists public.dashboards (
  id uuid primary key default gen_random_uuid(),
  org_id uuid null,
  title text not null,
  config jsonb not null default '{}'::jsonb,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add the missing column if needed
alter table if exists public.dashboards
  add column if not exists config jsonb not null default '{}'::jsonb;

-- updated_at trigger
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

-- Policies (adjust to your schema as needed)
create policy if not exists "org members can read dashboards"
  on public.dashboards for select to authenticated
  using (
    (
      org_id is null
      or org_id in (
        select uo.org_id from public.user_orgs uo where uo.user_id = auth.uid()
      )
    )
    or exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.role = 'super_admin'
    )
  );

create policy if not exists "org members can insert dashboards"
  on public.dashboards for insert to authenticated
  with check (
    created_by = auth.uid()
    and (
      org_id is null or org_id in (
        select uo.org_id from public.user_orgs uo where uo.user_id = auth.uid()
      )
    )
  );

create policy if not exists "owners or super_admin can update dashboards"
  on public.dashboards for update to authenticated
  using (
    (created_by = auth.uid())
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'super_admin')
  )
  with check (
    (created_by = auth.uid())
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'super_admin')
  );

create policy if not exists "super_admins can delete dashboards"
  on public.dashboards for delete to authenticated
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'super_admin')
  );
