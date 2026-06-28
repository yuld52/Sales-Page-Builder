# Vercel Deployment Guide

This guide explains how to deploy the Sales Page Builder to Vercel.

## Prerequisites

- A Vercel account
- Git repository connected to Vercel
- Environment variables configured in Vercel project settings

## Project Structure

This is a monorepo with the following components:

- **landing-page** - Vite + React frontend
- **api-server** - Express.js backend API
- **mockup-sandbox** - Additional tooling

## Deployment Options

### Option 1: Deploy Frontend Only (Recommended for SPA)

If you only need the frontend deployed:

1. Go to your Vercel dashboard
2. Create a new project and select your GitHub repository
3. Use the following settings:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm install && pnpm --filter @workspace/landing-page run build:vercel`
   - **Output Directory**: `artifacts/landing-page/dist`
   - **Install Command**: `pnpm install`

### Option 2: Deploy Frontend + Backend (Full Stack)

To deploy both frontend and backend:

1. Go to your Vercel dashboard
2. Create a new project with your GitHub repository
3. Configure the following:

#### Root Settings

- **Framework Preset**: Other
- **Build Command**: `pnpm install && pnpm run build`
- **Output Directory**: `artifacts/landing-page/dist`
- **Install Command**: `pnpm install`

#### Environment Variables

Add these to your Vercel project settings:

```
NODE_ENV=production
LOG_LEVEL=info
PORT=3000
VITE_API_URL=https://your-deployment.vercel.app/api
```

### Configuring Environment Variables in Vercel

1. Go to **Project Settings** → **Environment Variables**
2. Add each variable with appropriate values for Production/Preview/Development environments
3. Redeploy your project after adding new variables

## API Server Configuration

The API server is exposed as serverless functions under `/api/*` routes.

### Available Routes

- `GET /api/healthz` - Health check endpoint

### Adding New API Routes

1. Add routes in `artifacts/api-server/src/routes/`
2. The API handler automatically wraps your Express app for Vercel Functions

### Database Configuration

If using a database:

1. Create a database (PostgreSQL, MySQL, MongoDB, etc.)
2. Add the `DATABASE_URL` environment variable in Vercel project settings
3. Update `artifacts/api-server/src/app.ts` to initialize database connections

## Build Process

The project uses a custom build process:

1. **Workspace Build**: Root `pnpm run build` builds all packages
2. **Landing Page**: Vite builds the React frontend
3. **API Server**: TypeScript is compiled and bundled with esbuild
4. **Output**: Frontend files go to `artifacts/landing-page/dist`, API functions to `api/`

## Important Files

- `vercel.json` - Main Vercel configuration (root)
- `artifacts/landing-page/vercel.json` - Landing page specific config
- `artifacts/api-server/vercel.json` - API server specific config
- `api/handler.ts` - Serverless function entry point
- `.vercelignore` - Files to exclude from deployment

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify `pnpm-lock.yaml` is up to date: `pnpm install`

### API Not Responding

1. Check function logs in Vercel dashboard
2. Verify `PORT` environment variable is set to `3000`
3. Ensure API routes are properly defined

### Frontend Can't Reach API

1. Set `VITE_API_URL` to your Vercel deployment URL
2. Check CORS configuration in `artifacts/api-server/src/vercel.ts`
3. Verify API endpoints match frontend requests

## Environment-Specific Configuration

### Development

```bash
pnpm dev  # Starts both frontend and API in development mode
```

### Production

Vercel automatically builds and deploys from your specified branch.

## Custom Domains

To use a custom domain:

1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Follow Vercel's DNS configuration steps

## Monitoring and Logs

- **Build logs**: Vercel Dashboard → Deployments
- **Function logs**: Vercel Dashboard → Functions
- **Edge Logs**: Available in Pro plans
- **Metrics**: CPU, Memory, Duration tracked automatically

## Git Workflow

1. Push changes to your repository
2. Vercel automatically triggers a build
3. Preview deployment is created
4. Merge to production branch to deploy to main URL

## Performance Optimization

- Frontend: Automatic image optimization via Vercel
- API: Lightweight Node.js functions with 1GB memory
- Database: Consider Vercel's compatible database options

## Scaling

- **Frontend**: Automatically scaled by Vercel Edge Network
- **API**: Auto-scales serverless functions based on demand
- **Database**: Scale based on your database provider

## Next Steps

1. Update `vercel.json` with your actual API domain for rewrites
2. Configure all required environment variables
3. Test locally with `pnpm dev`
4. Deploy to Vercel via GitHub integration

For more information, visit [Vercel Documentation](https://vercel.com/docs)
