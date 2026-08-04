-- AFS Developers — Supabase schema
-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query)

-- 1. Enable the extension used to auto-generate UUIDs
create extension if not exists "pgcrypto";

-- 2. Applications table
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  full_name text not null,
  email text not null,
  whatsapp text not null,
  city text not null,

  course text not null check (course in ('full-stack', 'app-dev')),
  experience_level text not null check (experience_level in ('none', 'some', 'comfortable')),
  has_laptop boolean not null default false,
  motivation text not null,
  heard_from text,

  -- admin workflow fields (used later by the admin dashboard)
  status text not null default 'new' check (status in ('new', 'contacted', 'accepted', 'rejected')),
  admin_notes text
);

-- 3. Helpful indexes for the future admin dashboard
create index if not exists applications_created_at_idx on public.applications (created_at desc);
create index if not exists applications_course_idx on public.applications (course);
create index if not exists applications_status_idx on public.applications (status);

-- 4. Row Level Security
alter table public.applications enable row level security;

-- Allow anyone (the public "anon" key used by the website) to submit an application.
create policy "Public can submit applications"
  on public.applications
  for insert
  to anon
  with check (true);

-- Explicitly block anon from reading, updating or deleting applications.
-- (No select/update/delete policy for `anon` = access denied by default with RLS on.)

-- Admin access: any authenticated Supabase user (i.e. an account you create
-- yourself for the 3 founders in Authentication -> Users) can read, update
-- and delete applications. There is no public sign-up on this project, so
-- "authenticated" effectively means "an AFS founder logged into /admin".

create policy "Admins can read applications"
  on public.applications
  for select
  to authenticated
  using (true);

create policy "Admins can update applications"
  on public.applications
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins can delete applications"
  on public.applications
  for delete
  to authenticated
  using (true);

-- 6. Create admin accounts:
-- Supabase Dashboard -> Authentication -> Users -> Add user
-- Create one login per founder (email + password). They will use these
-- credentials to sign in at /admin on the website. Public sign-up is not
-- exposed anywhere on the site, so this is the only way to get an account.

-- 7. (Optional) quick check query for the Supabase dashboard
-- select * from public.applications order by created_at desc;
