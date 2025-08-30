-- profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  display_name text,
  avatar_url text,
  role text not null default 'user',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

-- insert profile on auth.users insert
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (new.id, new.email, split_part(new.email,'@',1), 'user')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_on_auth_user_created on auth.users;
create trigger trg_on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id);

drop policy if exists "Super admin can view all" on public.profiles;
create policy "Super admin can view all"
on public.profiles for select
using (exists (
  select 1 from public.profiles p
  where p.id = auth.uid() and p.role = 'super_admin'
));

drop policy if exists "Super admin can update all" on public.profiles;
create policy "Super admin can update all"
on public.profiles for update
using (exists (
  select 1 from public.profiles p
  where p.id = auth.uid() and p.role = 'super_admin'
));

-- Promote super admin (edit email if needed)
update public.profiles
set role = 'super_admin'
where email = 'devesh.pillewan@amla.io';
