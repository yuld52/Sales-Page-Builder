# Vercel Deployment Checklist

Use this checklist before deploying to Vercel.

## Pre-Deployment

- [ ] All code is committed and pushed to GitHub
- [ ] Branch is protected and has CI/CD checks passing
- [ ] `pnpm install` runs successfully locally
- [ ] `pnpm run build` completes without errors
- [ ] `pnpm --filter @workspace/landing-page run build:vercel` succeeds
- [ ] Environment variables are documented in `.env.example`
- [ ] No sensitive data in `.env` files (only use `.env.development.local` for local development)

## Vercel Configuration

- [ ] GitHub repository is connected to Vercel
- [ ] Project is created in Vercel dashboard
- [ ] Build settings are configured correctly:
  - [ ] Build Command: `pnpm install && pnpm run build`
  - [ ] Output Directory: `artifacts/landing-page/dist`
  - [ ] Install Command: `pnpm install`
- [ ] Environment variables are added to Production environment:
  - [ ] `NODE_ENV=production`
  - [ ] `LOG_LEVEL=info`
  - [ ] `PORT=3000`
  - [ ] `VITE_API_URL=<your-deployment-url>/api`
  - [ ] Any database connection strings
  - [ ] Any API keys or secrets

## Frontend Optimization

- [ ] Landing page builds under 3 minutes
- [ ] No console errors in browser
- [ ] Images are optimized
- [ ] API calls point to correct `VITE_API_URL`
- [ ] Responsive design tested on mobile

## API Server Optimization

- [ ] API endpoints tested locally
- [ ] Health check endpoint (`/api/healthz`) works
- [ ] Error handling is in place
- [ ] Logging is configured appropriately
- [ ] Database migrations run successfully (if applicable)
- [ ] CORS headers are correct for your frontend domain

## Post-Deployment

- [ ] Preview deployment loads correctly
- [ ] Frontend displays without errors
- [ ] API endpoints respond correctly
- [ ] Environment variables work as expected
- [ ] Custom domain is configured (if applicable)
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Monitoring is set up

## Testing

- [ ] Test main user flow in production environment
- [ ] Test API endpoints in production
- [ ] Check logs for any errors
- [ ] Monitor initial metrics (performance, errors)

## Rollback Plan

- [ ] Previous deployment can be reverted from Vercel dashboard
- [ ] Database migrations have rollback procedures (if applicable)
- [ ] Communicate deployment status to team

## Documentation

- [ ] README.md mentions deployment on Vercel
- [ ] Environment variables are documented
- [ ] Common issues and solutions are noted
- [ ] Team members know the deployment process

## Monitoring & Alerts

- [ ] Error tracking is set up (optional: Sentry, etc.)
- [ ] Performance monitoring is enabled
- [ ] Team is notified of deployment status
