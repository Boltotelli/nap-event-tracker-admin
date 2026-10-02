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

The admin frontend authenticates against Supabase and uses admin-only RPCs. The frontend must never contain a service-role key.

## Current Admin Center scope
The Admin Center was rebuilt on 2026-10-02 around four operational areas:

1. **Overview**
   - last login / recent usage per alliance
   - active violation counts
   - open support ticket count

2. **Account control**
   - compact login dropdown
   - password generation / reset
   - account lock / unlock
   - account status and last login

3. **Audit logs**
   - full audit details
   - server-side filters for alliance, category, action, entity type, date range and free text
   - pagination

4. **Support Center**
   - cross-alliance admin ticket view
   - filters for alliance, status and category
   - full message history
   - support evidence screenshots via signed Storage URLs
   - ticket status changes including resolved

NAP Laws are intentionally no longer managed from the Admin Center.

## Source layout
- `index.html`
- `styles.css`
- `admin-core.js`
- `admin-logs.js`
- `admin-support.js`
- `admin-bootstrap.js`

## Admin RPCs
Existing:
- `get_admin_usage`
- `admin_set_alliance_password`

Added for the rebuilt Admin Center:
- `get_admin_accounts`
- `admin_set_account_locked`
- `get_admin_activity_log`
- `get_admin_support_tickets`
- `get_admin_support_ticket_messages`
- `get_admin_support_ticket_evidence`
- `admin_set_support_ticket_status`

All newly added admin RPCs enforce `public.is_admin_user()`.

## Deployment
GitHub Pages deploys automatically from `main`.

Because there is only one admin user, there is currently no separate test branch/environment requirement. Changes should still be small, reviewed, and reversible.

## Legacy / retirement status
The old Vercel project `nap-event-tracker-admin` and Supabase Edge Function `nap-admin-assets` were retired on 2026-10-02 after successful functional verification of the GitHub Pages Admin.

`public.app_assets` is shared legacy/archive storage and must NOT be dropped merely because the old Admin asset fallback was retired.
