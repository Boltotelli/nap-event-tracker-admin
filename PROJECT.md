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

## Legacy
The old Vercel project `nap-event-tracker-admin` and Supabase Edge Function `nap-admin-assets` remain untouched until the GitHub Pages Admin is fully verified.
