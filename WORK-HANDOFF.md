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

The Vercel Admin project and `nap-admin-assets` Edge Function are retirement candidates, but should remain until the final functional check below is completed.

Do **not** delete the `public.app_assets` table as part of Admin retirement. Audit on 2026-10-02 found 49 rows in the table, only 6 of which are `admin_live_*` assets. Other NAP/test/SG snapshots are stored there and `public.get_tracker_bundle()` still reads `tracker_gzip_b64` from this table.

## Audit completed 2026-10-02
- GitHub Pages deploy from `main`: successful.
- Current GitHub source: no `nap-admin-assets` reference.
- Current GitHub source: no `app_assets` dependency.
- Old Vercel HTML: still loads its five CSS/JS resources from `nap-admin-assets`.
- Checked seven-day Supabase runtime-log window: 0 requests to `nap-admin-assets`.
- No cron job references `nap-admin-assets`.

## Final verification before retirement
1. Admin login works on GitHub Pages.
2. Alliance usage loads.
3. Laws load.
4. Activity log loads.
5. One safe admin mutation path is confirmed (for example a non-destructive law/password workflow if appropriate).
6. Then retire the Vercel Admin project.
7. After Vercel retirement, remove `nap-admin-assets` in a separate archived Supabase cleanup step.
8. Keep `public.app_assets` unless a separate table-wide dependency audit proves it can be retired.
