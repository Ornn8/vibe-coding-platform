# Production Deployment

This project is intended to deploy on Vercel with PostgreSQL and Auth.js OAuth providers.

## 1. Prerequisites

- A GitHub repository that contains this project
- A Vercel account with access to that GitHub repository
- A production PostgreSQL database
  - Vercel Postgres, or
  - Supabase Postgres
- GitHub OAuth app
- Google OAuth client

## 2. Required Environment Variables

Set the following in Vercel Project Settings -> Environment Variables:

- `DATABASE_URL`
- `AUTH_URL`
- `AUTH_SECRET`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`

Recommended values:

- `AUTH_URL=https://<your-production-domain>`
- `AUTH_SECRET=<32+ byte random secret>`

## 3. Vercel Project Setup

1. Import the GitHub repository into Vercel.
2. Set the framework preset to `Next.js`.
3. Add the environment variables above for Production.
4. If you use a custom domain, assign it before testing OAuth.

## 4. Database Setup

### Option A: Vercel Postgres

1. Create a Postgres store in Vercel.
2. Copy the generated connection string into `DATABASE_URL`.

### Option B: Supabase

1. Create a production project in Supabase.
2. Copy the pooled Postgres connection string into `DATABASE_URL`.

## 5. Production Prisma Commands

Run these after the production environment variables are available:

```bash
npx prisma migrate deploy
npx prisma db seed
```

Or with npm scripts:

```bash
npm run prisma:migrate:deploy
npm run prisma:seed
```

## 6. OAuth Callback URLs

Update both providers after the production domain is known.

### GitHub OAuth App

Homepage URL:

```text
https://<your-production-domain>
```

Authorization callback URL:

```text
https://<your-production-domain>/api/auth/callback/github
```

### Google OAuth Client

Authorized JavaScript origins:

```text
https://<your-production-domain>
```

Authorized redirect URIs:

```text
https://<your-production-domain>/api/auth/callback/google
```

## 7. Post-deploy Verification

- [ ] `/zh` renders Chinese content
- [ ] `/en` renders English content
- [ ] GitHub login completes successfully
- [ ] Google login completes successfully
- [ ] M1-M8 lesson pages render correctly
- [ ] Lesson exercise submission works
- [ ] Module project submission works
- [ ] Tool reference pages work
- [ ] Admin pages are accessible for admin users
- [ ] Mobile layout is usable on key routes
