# Tratamento do CORRIMENTO — Landing Page

A sales landing page for a digital guide on treating vaginal discharge, targeting women in Mozambique. Fully frontend-only; no backend or database required.

## Run & Operate

- `pnpm run typecheck` — full typecheck across all packages
- Landing page runs via the `artifacts/landing-page: web` workflow

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Vite + React 19, Tailwind CSS v4, Framer Motion
- UI: shadcn/ui (Radix primitives), Lucide icons
- Font: Poppins (Google Fonts)

## Where things live

- `artifacts/landing-page/src/App.tsx` — entire landing page (single-page, no routing needed)
- `artifacts/landing-page/src/index.css` — theme (rose/pink color system, Poppins font)
- `artifacts/landing-page/public/images/` — product and testimonial images
- `artifacts/landing-page/index.html` — SEO metadata, OG tags, Google Fonts preconnect

## Product

One-page sales site for "Tratamento do CORRIMENTO" (99 MT digital guide). Features: countdown timer, hero, how-to-buy steps, benefits, testimonials, 7-day guarantee, pricing card, FAQ, and footer. Checkout links to an external payment processor (meteorfy.com).

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- This is a purely frontend app — no API server or database needed.
- Checkout and WhatsApp links in `App.tsx` point to external services (meteorfy.com, wa.me).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
