
-- Core tables
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'user', -- 'user' | 'admin' | 'super_admin'
  created_at timestamptz default now()
);

create table if not exists public.widgets (
  id uuid primary key default gen_random_uuid(),
  owner uuid references auth.users(id) on delete cascade,
  name text not null,
  config jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.icons (
  id serial primary key,
  name text unique not null,
  svg text not null,
  created_at timestamptz default now()
);
