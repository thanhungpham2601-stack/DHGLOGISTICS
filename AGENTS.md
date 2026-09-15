# AGENTS.md

## Project overview

This repo is a Vite + React + TypeScript marketing and admin app for DHG Transport. The public site is a single-page experience built from reusable sections under `src/components`, while admin functionality lives under `src/admin` and relies on Supabase auth/data.

## Architecture and key locations

- `src/App.tsx`: public homepage composition and section ordering.
- `src/components/`: reusable UI sections like hero, services, fleet, quote form, footer, floating action buttons.
- `src/data/companyData.ts`: canonical company content, service definitions, fleet specs, and CTAs.
- `src/lib/`: shared auth and Supabase setup (`AuthContext.tsx`, `supabaseClient.ts`).
- `src/admin/`: protected admin screens for menu, projects, and quotes.
- `src/types.ts`: shared TypeScript models used across sections and admin data.
- `supabase/migrations/`: database schema migrations for permissions, menu, projects, and quote requests.

## Working conventions

- Prefer TypeScript functional components and keep new UI logic colocated with related sections.
- Reuse existing patterns from `src/components` and `src/data/companyData.ts` instead of introducing duplicate content schemas.
- Keep marketing copy and service metadata in `src/data/companyData.ts` when it is content-driven; avoid hard-coding copy in component files unless it is local UI text.
- Use Tailwind utility classes for styling; match the established color palette and spacing conventions used in the current site.
- When building admin features, respect permission checks and the existing auth flow in `src/lib/AuthContext.tsx`.
- Preserve the public site’s visual identity: strong blue branding, rounded/industrial look, and large sectioned layout.

## Commands

- Install dependencies: `npm install`
- Run UI locally: `npm run dev`
- Type-check: `npm run lint`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Environment and config

- This app expects a local `.env` file with:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- If those values are missing, `src/lib/supabaseClient.ts` will throw during app startup.
- Vite config includes custom HMR behavior in `vite.config.ts`; do not change the existing `DISABLE_HMR` handling without a strong reason.

## Project-specific pitfalls

- The site is content-heavy and section-driven; do not flatten the page structure or move sections without updating the homepage composition in `src/App.tsx`.
- Admin routes are permission-gated; changes that affect access or role checks should stay consistent with the `hasPermission(...)` checks already used in `src/admin/AdminLayout.tsx`.
- Keep imports and component naming consistent with the current project; this app uses explicit named exports and direct component composition.
- The app uses an existing static asset library in `src/assets/images` and `public`; prefer those assets over downloading new images unless required.

## Contribution guidance

- Prefer small, targeted edits that match the current component boundaries.
- Validate with `npm run lint` before considering a change done.
- If you add new public-facing content or service data, update the relevant type definitions and the corresponding section definitions together.
- For Supabase-related work, keep table/column names aligned with the migration files in `supabase/migrations/`.
