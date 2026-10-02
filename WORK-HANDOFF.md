# WORK HANDOFF — NAP Event Tracker Admin

Last updated: 2026-10-02

## Current state
The Admin UI was previously split across:
- HTML hosted by Vercel project `nap-event-tracker-admin`
- CSS/JS stored in Supabase `public.app_assets`
- Edge Function `nap-admin-assets` serving those assets

The current live frontend was copied into this repository without changing admin behavior.

## Imported live assets
- `admin_live_css_v3` -> `styles.css`
- `admin_live_js0_v3` -> `admin-core.js`
- `admin_live_usage_v3` -> `admin-usage.js`
- `admin_live_js1_v3` -> `admin-laws.js`
- `admin_live_js2_v3` -> `admin-bootstrap.js`

`index.html` is the current live Vercel HTML with only the asset references changed from the Supabase Edge Function to local repository files.

## Safety
Do not expose the Supabase service-role key. The frontend uses the existing publishable key and authenticated admin RPCs.

Do not remove:
- Vercel Admin project
- `nap-admin-assets` Edge Function
- `app_assets` rows

until the GitHub Pages site has been verified to log in and perform the required admin actions.

## Next verification
1. GitHub Pages deploy succeeds.
2. Admin login works.
3. Alliance usage loads.
4. Laws load.
5. Activity log loads.
6. Password/alliance/law mutation actions remain available.
7. Only then retire legacy frontend hosting if desired.
