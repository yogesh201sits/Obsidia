# Obsidia

A collaborative notes app built with Next.js, Convex, and an Edgestore-backed file upload service.

This repository contains the web client (Next.js app router) and Convex functions/schema used by the app.

## Features

- Document editor with realtime updates via Convex
- Cover image upload and management (Edgestore)
- Icon picker, document listing, and simple publishing flow
- Accessible UI primitives and modal dialogs

## Tech stack

- Next.js (App Router)
- Convex for backend realtime & serverless functions
- Edgestore for public file uploads
- React, Zustand, Tailwind CSS

## Prerequisites

- Node.js 18+ (or your environment's required version)
- npm or pnpm
- A Convex project and credentials (for local development)

## Local setup

1. Install dependencies

```bash
npm install
```

2. Create `.env.local` with the required variables (examples):

- `CONVEX_URL` — Convex deployment or local dev URL
- `EDGESTORE_API_KEY` — Edgestore credentials

3. Run Convex dev (if developing locally):

```bash
npx convex dev
```

4. Start the Next.js dev server:

```bash
npm run dev
```

Notes:

- The app adds `files.edgestore.dev` to `next.config.ts` image remotePatterns. If you change upload hosts, update `next.config.ts`.
- Some images are rendered with `unoptimized` to avoid Next.js proxying when the remote host resolves to private IPs.

## Important files

- `app/` — Next.js routes and pages
- `components/` — UI components & modals
- `hooks/UseCoverImage.tsx` — local store for cover modal state
- `lib/edgestore.ts` — Edgestore client wrapper
- `convex/` — Convex schema and server functions
- `next.config.ts` — Next.js configuration

## Cover image flow

1. Click "Add cover" in the toolbar to open the `CoverImageModal`.
2. Upload sends the file to Edgestore and returns a public URL.
3. The Convex document record is updated with the URL and the `Cover` component displays it.

## Contributing

Create a branch, run the app and tests, then open a PR with a description of your changes.

## License

No license file is included. Add a `LICENSE` file if you wish to open-source this project.

---

If you'd like, I can add an `.env.local` template, README badges, or CI steps next.

