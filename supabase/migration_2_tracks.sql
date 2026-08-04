-- AFS Developers — migration: drop the third course + re-check admin access
-- Run this in Supabase SQL Editor. Safe to run even if some steps were
-- already applied (uses IF EXISTS / drop-then-create everywhere).

-- 1. If anyone already applied under the removed "ai-integrated" track,
--    move them onto full-stack so the new check constraint doesn't fail.
--    (Skip/adjust this if you'd rather handle those rows manually.)
update public.applications
set course = 'full-stack'
where course = 'ai-integrated';

-- 2. Swap the course check constraint to only allow the two remaining tracks.
alter table public.applications
  drop constraint if exists applications_course_check;

alter table public.applications
  add constraint applications_course_check
  check (course in ('full-stack', 'app-dev'));

-- 3. Re-assert the admin RLS policies. This is almost certainly why you
--    can't see applicants in the dashboard: if the earlier part of the
--    original schema.sql ran but these last few "create policy" statements
--    didn't (a common issue when pasting long scripts into the SQL editor
--    in one go, or when the editor stops at the first error), RLS is left
--    ON with an INSERT policy for anon but NO SELECT policy for
--    authenticated users — so admin queries silently return 0 rows instead
--    of an error.

drop policy if exists "Admins can read applications" on public.applications;
create policy "Admins can read applications"
  on public.applications
  for select
  to authenticated
  using (true);

drop policy if exists "Admins can update applications" on public.applications;
create policy "Admins can update applications"
  on public.applications
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins can delete applications" on public.applications;
create policy "Admins can delete applications"
  on public.applications
  for delete
  to authenticated
  using (true);

-- 4. The application form no longer asks for coding experience or laptop
--    ownership, so new submissions won't include them. Both columns are
--    currently NOT NULL, which would make every new insert fail. Relax
--    that (has_laptop already has a default of false, so only
--    experience_level strictly needs this):
alter table public.applications
  alter column experience_level drop not null;

alter table public.applications
  alter column has_laptop drop not null;

-- 5. Verify: this should list exactly 4 policies (insert/select/update/delete).
select polname, polcmd, polroles::regrole[]
from pg_policy
where polrelid = 'public.applications'::regclass;

-- 6. Verify you actually have rows and can see them as admin:
--    run this while logged in as the SQL editor's postgres role (bypasses
--    RLS) just to confirm data exists at all:
select id, full_name, email, course, status, created_at
from public.applications
order by created_at desc;
