# PROJECT — NAP Event Tracker Admin

## Purpose
Administrative interface for the Kingshot Server 1044 NAP Event Tracker.

## Hosting
Primary hosting: GitHub Pages
Target URL: https://boltotelli.github.io/nap-event-tracker-admin/

## Repository
`Boltotelli/nap-event-tracker-admin`

## Backend
Shared Supabase project:
- Name: Kingshot 1044 NAP
- Ref: `bdzlgirowutasrsycjfj`

The admin frontend authenticates against Supabase and uses existing admin RPCs. The frontend must never contain a service-role key.

## Source layout
- `index.html`
- `styles.css`
- `admin-core.js`
- `admin-usage.js`
- `admin-laws.js`
- `admin-bootstrap.js`

These files were reconstructed from the current live Vercel Admin deployment and the currently served Supabase `app_assets` records.

## Deployment
GitHub Pages deploys automatically from `main`.

Because there is only one admin user, there is currently no separate test branch/environment requirement. Changes should still be small, reviewed, and reversible.

## Legacy / retirement status
The old Vercel project `nap-event-tracker-admin` and Supabase Edge Function `nap-admin-assets` are now confirmed as legacy frontend infrastructure.

Audit on 2026-10-02:
- GitHub Pages deployment from `main` succeeded.
- Current repository source loads CSS/JS locally and has no runtime dependency on `nap-admin-assets` or `public.app_assets`.
- The old Vercel HTML still references `nap-admin-assets` for `style`, `js0`, `usage`, `js1`, and `js2`.
- No `nap-admin-assets` runtime request was observed in the checked seven-day Supabase log window.
- Final retirement still requires one manual functional check of the GitHub Pages Admin: login, usage/activity/laws loading, and at least one safe admin mutation path.

Important: `public.app_assets` is shared legacy/archive storage and must NOT be dropped when the Admin fallback is retired.
