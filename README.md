# Admin Dashboard Pro

Professional dashboard built with `Next.js`, `Neon` and a custom API for multi-user authentication and user management.

## Stack

- `Next.js` with App Router
- `React 19`
- `Tailwind CSS`
- `Recharts`
- `Neon Serverless Postgres`
- Custom API routes in `app/api`

## Features

- User registration and login with secure `httpOnly` cookie session
- Protected dashboard, users and settings pages
- User CRUD backed by Postgres
- Dashboard charts by city and company
- Dark mode preference on the client

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
DATABASE_URL=
SESSION_SECRET=
```

## Development

```bash
npm install
npm run dev
```

## Production Notes

- Deploy the app to `Vercel`
- Create a free `Neon` database
- Add the environment variables in Vercel project settings
