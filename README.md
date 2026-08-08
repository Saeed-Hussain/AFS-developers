# AFS Developers

Marketing + application website for **AFS Developers** — a three-founder studio in Bhakkar,
Pakistan running cohorts in Full-Stack Web Development, Flutter App Development, and
AI-Integrated Development.

Built with **Next.js (App Router, plain JavaScript — no TypeScript)**, **Tailwind CSS**,
**Framer Motion**, and **Supabase** for storing applications. There's no login/authentication —
"Enroll Now" / "Apply Now" opens an animated modal application form right on the page.

## 1. Install

```bash
npm install
```

## 2. Set up Supabase

1. Create a free project at https://supabase.com.
2. Open **SQL Editor** in your project and run the contents of `supabase/schema.sql`.
   This creates the `applications` table with Row Level Security so the public site can
   only **insert** applications — never read, edit or delete them.
3. Go to **Project Settings -> API** and copy your **Project URL** and **anon public key**.
4. Copy the env file and fill in your values:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
```

## 3. Run locally

```bash
npm run dev
```

Visit http://localhost:3000

## 4. Build for production

```bash
npm run build
npm run start
```

Deploys cleanly to **Vercel** — just add the two `NEXT_PUBLIC_SUPABASE_*` env vars in the
project settings there.

## Project structure

```
app/
  layout.js         Root layout, fonts, metadata, wraps app in ApplyModalProvider
  page.js            Home page — assembles all sections
  globals.css        Design tokens, grid backgrounds, corner-frame signature, focus states
  admin-login/       Public login page for founders (Supabase email/password auth)
  admin/             Protected dashboard (layout.js guards it, page.js is the UI)
components/
  Navbar.js          Sticky glass navbar
  Hero.js            Hero section with animated headline + terminal
  TerminalWindow.js  Signature typewriter terminal animation
  Founders.js         "Built by three developers" trust section
  Courses.js / CourseCard.js   The three course tracks
  Process.js         5-step enrollment → portfolio timeline
  WhyUs.js           Feature grid (mentorship, projects, AI, etc.)
  FAQ.js             Accordion FAQ
  CTABanner.js       Final "Enroll now" banner
  Footer.js
  ApplyModal.js / ApplyForm.js   The animated application modal + form, wired to Supabase
  admin/             StatusBadge.js, ApplicationRow.js — used by app/admin/page.js
lib/
  supabaseClient.js     Supabase client (uses env vars above)
  ApplyModalContext.js  Global context so any "Apply" button opens the modal, optionally
                        pre-selecting a course
  courses.js            Single source of truth for course copy/content
supabase/
  schema.sql         Run this in Supabase's SQL editor
```

## Editing course content

All course copy (name, description, stack, outcomes, weeks) lives in one place:
`lib/courses.js`. Edit it there and both the course cards and the application form's
track picker update automatically.

## Editing contact info

The WhatsApp number and social links live in `components/Footer.js`, `components/CTABanner.js`,
and `components/ApplyForm.js` (the WhatsApp link on the success screen), plus
`components/admin/ApplicationRow.js` (used for messaging applicants directly). Every link
opens a WhatsApp chat with a pre-filled message — never a phone call. Search for
`923334534520` to update the number everywhere.

## Admin dashboard

The site includes a built-in admin dashboard at **`/admin`** — no public sign-up, no link to
it anywhere on the public site. Only people you personally create accounts for can log in.

### Set it up

1. In Supabase, go to **Authentication -> Users -> Add user** and create one login per
   founder (email + password, "Auto Confirm User" on). That's it — no extra table needed.
2. The `supabase/schema.sql` file already includes the RLS policies that let any logged-in
   ("authenticated") user read, update and delete rows in `applications`. Public visitors
   (the "anon" role used by the application form) can still only ever *insert*.
3. Visit `/admin-login`, sign in with one of the accounts you created, and you're in.

### What you can do from `/admin`

- See live stats: total applications, and counts by status (New / Contacted / Accepted /
  Rejected).
- Search by name/email, and filter by track and status.
- Expand any application to see full details — motivation, experience level, laptop
  availability, WhatsApp (opens a pre-filled chat) — and change its status inline.
- Add private admin notes per applicant (interview notes, decisions, reminders).
- Delete spam or duplicate applications (asks for confirmation first).

### Notes on security

- Admin auth uses Supabase's own email/password auth — no custom backend needed.
- The `anon` key used by the public site can never read, update or delete applications;
  it can only insert new ones. Only signed-in accounts (created by you in the Supabase
  dashboard) can access `/admin`.
- If you'd rather not manage passwords yourself, Supabase also supports magic-link/email
  OTP sign-in — ask and this can be swapped in.


