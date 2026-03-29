# Verification Checklist

## What is already verified

These checks already pass against the current codebase:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run verify:routes`

`npm run verify:routes` expects the production app to already be running locally, for example:

```bash
npm run build
npm run start
npm run verify:routes
```

## What is blocked by external environment

These checks are intentionally still pending:

- OpenSpec `2.2`: apply the Prisma schema to a real database
- OpenSpec `3.4`: validate live Auth.js sign-in and role-protected access

Current missing environment variables:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`

You can confirm the current environment state with:

```bash
npm run verify:env
```

You can also generate a local development `AUTH_SECRET` with:

```bash
npm run setup:env
```

The checker distinguishes three states:

- `missing`: no value is set
- `placeholder`: the default example value is still in use
- `present`: a non-placeholder value is set

## Final handoff steps

1. Copy `.env.example` to `.env.local`.
2. Fill in a reachable PostgreSQL `DATABASE_URL`.
3. Set `AUTH_SECRET`.
4. Set GitHub and Google OAuth credentials.
5. Run:

```bash
npx prisma migrate dev
npx prisma generate
npm run prisma:seed
```

6. Start the app and validate the auth flow manually:
   - anonymous access to `/zh/modules` redirects to `/zh/login`
   - anonymous access to `/zh/dashboard` redirects to `/zh/login`
   - GitHub sign-in succeeds
   - Google sign-in succeeds
   - a non-admin user is redirected away from `/zh/dashboard`
   - an admin user can access `/zh/dashboard`

## Completion rule

Only mark OpenSpec tasks `2.2` and `3.4` complete after the real database and live OAuth checks above have succeeded.
