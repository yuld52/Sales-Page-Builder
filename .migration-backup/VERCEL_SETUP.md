# Vercel Setup Instructions

This guide will help you set up the Sales Page Builder on Vercel.

## Quick Start

### 1. Connect Your Repository

1. Go to [vercel.com](https://vercel.com)
2. Sign in or create an account
3. Click "Add New..." → "Project"
4. Select your GitHub repository (`yuld52/Sales-Page-Builder`)
5. Click "Import"

### 2. Configure Build Settings

In the import dialog, configure the following:

**Build & Development Settings:**
- **Framework Preset**: `Other`
- **Build Command**: `pnpm install && pnpm run build`
- **Output Directory**: `artifacts/landing-page/dist`
- **Install Command**: `pnpm install`

**Root Directory** (if prompted): Leave empty or use `/`

### 3. Set Environment Variables

Before deploying, add these environment variables:

#### Production Environment

```
NODE_ENV=production
LOG_LEVEL=info
PORT=3000
VITE_API_URL=https://<your-vercel-domain>.vercel.app/api
```

**To add environment variables:**

1. In the Vercel import dialog, click "Environment Variables"
2. Or after project creation: Settings → Environment Variables
3. Add each variable for the production environment
4. Click "Save"

### 4. Deploy

Click "Deploy" to build and deploy your project.

Vercel will automatically:
- Install dependencies with `pnpm install`
- Run the build command
- Deploy the frontend to Vercel's CDN
- Deploy API routes as serverless functions

## What Gets Deployed

### Frontend (React + Vite)
- Built from `artifacts/landing-page/`
- Served from Vercel's Edge Network
- Automatically cached and optimized
- Location: `/`

### Backend (Express API)
- Built from `artifacts/api-server/`
- Deployed as serverless functions
- Location: `/api/*`

## Environment Variables

### Required

| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | Environment name | `production` |
| `PORT` | Server port | `3000` |
| `VITE_API_URL` | API base URL | `https://my-app.vercel.app/api` |

### Optional

| Variable | Description | Example |
|----------|-------------|---------|
| `LOG_LEVEL` | Logging verbosity | `info`, `debug`, `warn`, `error` |
| `DATABASE_URL` | Database connection | PostgreSQL/MySQL connection string |

## Deployment Branches

By default, Vercel deploys:
- **Production**: Commits to your main branch
- **Preview**: Pull requests and other branches

## Monitoring Deployments

1. Go to your Vercel project dashboard
2. View **Deployments** tab for build history
3. Click any deployment to see:
   - Build logs
   - Function logs
   - Performance metrics
   - Environment variables used

## Troubleshooting

### Build Fails with "PORT not found"

This is fixed in the current version. If you still see this:

1. Make sure you're using the latest code
2. Check that vite.config.ts has default values for PORT and BASE_PATH

### API Routes Not Working

1. Check that `api/[[...route]].ts` exists
2. Verify environment variables are set in Vercel dashboard
3. View function logs: Vercel Dashboard → Functions → Logs

### Frontend Can't Reach API

1. Make sure `VITE_API_URL` is set correctly in environment variables
2. The frontend will use this URL to make API calls
3. Check browser console for network errors

### Deployment Stuck or Slow

- Monorepo builds can take 2-3 minutes
- Large dependencies increase build time
- Consider using Vercel's pro plan for better build performance

## Custom Domains

1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Follow Vercel's DNS configuration
4. Wait for DNS propagation (up to 48 hours)

## Logs & Monitoring

### Build Logs
- View in Vercel Dashboard → Deployments → Build Logs

### Function Logs
- View in Vercel Dashboard → Functions → Runtime Logs
- Real-time monitoring of API requests

### Performance Metrics
- Response times
- Memory usage
- Cold start times
- Edge location information

## Git Workflow

```bash
# Make changes locally
git checkout -b feature/my-feature

# Push to GitHub
git push origin feature/my-feature

# Create pull request - Vercel creates preview deployment automatically
# After review, merge to main
git merge feature/my-feature
git push origin main

# Vercel automatically deploys to production
```

## Rollback

If you need to revert a deployment:

1. Go to Vercel Dashboard → Deployments
2. Find the deployment you want to revert to
3. Click the three dots → "Promote to Production"

## Cost Considerations

**Free Plan Includes:**
- Unlimited deployments
- 100 GB bandwidth/month
- 10 function runtime seconds/month
- Basic monitoring

**See** [Vercel Pricing](https://vercel.com/pricing) for Pro/Enterprise plans

## Advanced Configuration

### Custom Build Command

Edit `vercel.json` to customize the build process:

```json
{
  "buildCommand": "pnpm install && pnpm run build:custom"
}
```

### Function Memory & Timeout

Edit `vercel.json` to adjust function resources:

```json
{
  "functions": {
    "api/[[...route]].ts": {
      "runtime": "nodejs20.x",
      "memory": 1024,
      "maxDuration": 60
    }
  }
}
```

### Rewrite Rules

Edit `vercel.json` to add custom rewrite rules:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Next Steps

1. ✅ Connect your GitHub repository
2. ✅ Set environment variables
3. ✅ Click Deploy
4. ✅ Test your application
5. ✅ Configure custom domain (optional)
6. ✅ Set up monitoring (optional)

## Support

- Vercel Docs: https://vercel.com/docs
- Common Issues: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

## Additional Resources

- [Vercel Node.js Runtime](https://vercel.com/docs/runtimes/nodejs)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Build Configuration](https://vercel.com/docs/build-output-api/v3)
