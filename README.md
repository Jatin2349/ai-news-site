# AI Briefings – Phase 0 (No-backend Static)

**Goal:** Get a site online without installing anything locally. Vercel will build it server-side.

## Deploy (no local install)
1. Create a new GitHub repo and upload these files, **or** import the ZIP directly on Vercel (Add New Project → Import).
2. Click *Deploy*. That's it.

## Edit content (no CMS yet)
- `data/news.json` – add your own links/summaries.
- `data/guides.json` – add guides (placeholder body).
- `data/glossary.json` – glossary terms.

## Upgrade path (later)
- Replace static data with DB (Prisma/Postgres).
- Add cron ingestion + LLM summaries.
- Add Sanity CMS for guides/glossary.
- Add search (Meilisearch) and newsletter double opt-in.
