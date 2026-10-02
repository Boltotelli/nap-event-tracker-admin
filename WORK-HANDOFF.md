# WORK HANDOFF — NAP Event Tracker Admin

Last updated: 2026-10-02

## Current state
The Admin UI now runs as a standalone GitHub Pages application from:
`Boltotelli/nap-event-tracker-admin`

The previous Vercel / Supabase app-assets delivery path is retired.

## Rebuild completed 2026-10-02
The Admin Center was redesigned to match the visual language of the main NAP Tracker more closely and simplified around operational tasks.

### Current modules
- Dashboard / alliance overview
- Account control
- Full audit log
- Support Center

### Removed from Admin UI
- NAP Laws editor
- legacy inline usage/activity extension modules
- “create alliance” card from the primary workflow

The old files `admin-laws.js` and `admin-usage.js` were removed after the rebuild.

## Backend additions
New admin-only Supabase RPCs:
- `get_admin_accounts()`
- `admin_set_account_locked(text, boolean)`
- `get_admin_activity_log(...)`
- `get_admin_support_tickets(...)`
- `get_admin_support_ticket_messages(uuid)`
- `get_admin_support_ticket_evidence(uuid)`
- `admin_set_support_ticket_status(uuid, text)`

All functions check `public.is_admin_user()`.

A Storage SELECT policy named `support evidence read admin` allows authenticated admin users to read screenshots from the existing `support-evidence` bucket. The normal alliance-scoped Storage policy remains unchanged.

## Support model
The regular NAP app remains privacy-scoped:
- `get_my_support_tickets`
- `get_my_support_ticket_messages`
- `get_my_support_ticket_evidence`

Those functions were not weakened or converted into global endpoints.

The Admin Center uses separate admin-only support RPCs to read all tickets.

Existing ticket status values:
- `new`
- `reviewing`
- `awaiting_user`
- `resolved`

## Account locking
Alliance account lock state uses `auth.users.banned_until`.

When an account is locked, existing rows in `auth.sessions` for that user are removed and the change is written to `public.audit_log`.

Password resets and account lock/unlock operations are audit logged.

## Logs
The new `get_admin_activity_log` endpoint supports:
- alliance
- category
- action
- entity type
- UTC from/to date
- free text
- pagination

The Admin UI displays full audit detail JSON instead of only a shortened summary.

## Safety
- Never expose the Supabase service-role key.
- Do not weaken the alliance-scoped support RPCs.
- Do not bypass `is_admin_user()` in Admin RPCs.
- Keep GitHub as the source of truth for frontend code.
- Do not delete `public.app_assets` as part of Admin cleanup.

## Legacy retirement already completed
- old Vercel Admin project deleted
- `nap-admin-assets` Edge Function deleted
- GitHub Pages Admin verified before retirement
