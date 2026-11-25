# axe2

Next.js application with a homepage, a Saint-Louis district map, and hostel,
restaurant, and book-detail pages.

## Repository layout

- `app/` contains the root App Router pages, layouts, and book API routes.
- `components/` contains shared UI and adapters for the catalog pages.
- `public/` contains static assets and the proverb data used by the site.
- `components/hostelandresto/`, `lib/hostelandresto/`, and
  `state/hostelandresto/` contain the shared catalog UI, data, and state.
- `app/hostel/`, `app/resto/`, `app/catalog/`, `app/cart/`, and `app/book/`
  are routes in the root App Router app; there is no separate nested Next.js app.
- `resources/` contains design/source snippets and is not required at runtime.

## Requirements

- Node.js 18.17 or newer.
- npm.

The root `package-lock.json` is the lockfile for the root app. Use npm from the
repository root for development and deployment.

## Environment variables

No application-specific environment variables are currently required. The
book API uses local mock data. `NODE_ENV` is set by Next.js and does not need
to be configured manually.

Copy `.env.example` to `.env.local` if you later add local environment
variables. Keep real credentials in `.env.local` or your deployment provider's
environment-variable settings; never commit them.

## Local development

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and run

```sh
npm run build
npm run start
```

The repository currently has no lint or test scripts.

## Import into Vercel

1. Push the repository and all required source files to GitHub.
2. In Vercel, choose **Add New → Project** and import this repository.
3. Keep the **Root Directory** set to the repository root to deploy the
   current App Router app.
4. Let Vercel detect Next.js. Use `npm` and the existing `package-lock.json`;
   the default install and build commands (`npm install` and `npm run build`)
   are sufficient.
5. No environment variables are required for the current app. Deploy from the
   Vercel dashboard when ready.
