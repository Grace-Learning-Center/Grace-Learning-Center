
-- Run this in Supabase SQL editor

create extension if not exists "uuid-ossp";

create table if not exists site_content (
  id uuid primary key default uuid_generate_v4(),
  section text not null,
  title text,
  content text,
  image_url text,
  updated_at timestamp default now()
);

create table if not exists admins (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  role text default 'admin'
);

-- add your admin email
insert into admins (email) values ('tobiadesanwo0@gmail.com') on conflict (email) do nothing;

-- RLS and policies
alter table site_content enable row level security;
create policy "public_read" on site_content for select using (true);
create policy "admins_modify" on site_content for insert, update, delete using (
  auth.role() = 'authenticated' and auth.email() in (select email from admins)
) with check (
  auth.role() = 'authenticated' and auth.email() in (select email from admins)
);
