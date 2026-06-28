# Vercel Adaptation Changes

This document summarizes all changes made to adapt the Sales Page Builder for deployment on Vercel.

## New Files Created

### Configuration Files
- **`vercel.json`** - Root Vercel configuration for the entire project
- **`artifacts/api-server/vercel.json`** - API server specific Vercel configuration
- **`.vercelignore`** - Files to exclude from Vercel deployments
- **`.env.example`** - Example environment variables

### API Integration
- **`api/[[...route]].ts`** - Vercel serverless function handler for all API routes
- **`artifacts/api-server/src/vercel.ts`** - Express app wrapper with CORS headers for Vercel

### Documentation
- **`VERCEL_DEPLOYMENT.md`** - Comprehensive deployment guide
- **`VERCEL_SETUP.md`** - Step-by-step setup instructions
- **`DEPLOYMENT_CHECKLIST.md`** - Pre-deployment verification checklist
- **`VERCEL_CHANGES.md`** - This file documenting all changes

## Modified Files

### 1. `artifacts/api-server/package.json`
**Changes:**
- Added `@vercel/node` dependency for Vercel serverless function support
- Added `build:vercel` script for Vercel builds

**Before:**
```json
"dependencies": {
  "@workspace/api-zod": "workspace:*",
  ...
}
```

**After:**
```json
"dependencies": {
  "@vercel/node": "^3.0.11",
  "@workspace/api-zod": "workspace:*",
  ...
}
```

### 2. `artifacts/landing-page/vite.config.ts`
**Changes:**
- Made `PORT` and `BASE_PATH` environment variables optional with sensible defaults
- This allows the build to run on Vercel without failing due to missing env vars

**Before:**
```typescript
const rawPort = process.env.PORT;
if (!rawPort) {
  throw new Error("PORT environment variable is required...");
}
```

**After:**
```typescript
const rawPort = process.env.PORT || "5173";
const port = Number(rawPort);
// No error thrown, build proceeds with default
```

### 3. `artifacts/mockup-sandbox/vite.config.ts`
**Changes:**
- Same as landing-page: Made `PORT` and `BASE_PATH` optional with defaults
- Uses port 5174 as default to avoid conflicts

## How It Works

### Frontend Deployment
1. Vercel runs: `pnpm install && pnpm run build`
2. This executes the root build command which:
   - Runs TypeScript type checking
   - Builds all workspace packages
   - Landing page output goes to `artifacts/landing-page/dist/`
3. Vercel serves the frontend from CDN
4. SPA routing is handled with rewrite rule: `/(.*) → /index.html`

### API Deployment
1. The file `api/[[...route]].ts` is recognized as a Vercel serverless function
2. It imports the Express app from `artifacts/api-server/src/app.ts`
3. All requests to `/api/*` are handled by the Express middleware
4. The function automatically scales based on traffic

### Environment Variables
- `NODE_ENV=production` - Disables development-only plugins and optimizes logging
- `PORT=3000` - Required by Express app
- `VITE_API_URL=https://<domain>/api` - Tells frontend where to reach the API
- `LOG_LEVEL=info` - Controls logging verbosity

## Build Process on Vercel

```
Vercel Deployment
├── Install Dependencies
│   └── pnpm install (respects pnpm-lock.yaml)
├── Run Build
│   ├── Type checking: tsc --build
│   ├── Landing page: vite build
│   ├── API server: esbuild (creates index.mjs)
│   └── Mockup sandbox: vite build
├── Deploy Frontend
│   └── Upload dist/ to CDN
└── Deploy Functions
    └── Create serverless function for api/[[...route]].ts
```

## API Routing

All API requests are routed through `api/[[...route]].ts`:

```
Request: GET /api/healthz
  ↓
Vercel Function: api/[[...route]].ts
  ↓
Express App in artifacts/api-server/src/app.ts
  ↓
Routes configured in artifacts/api-server/src/routes/
  ↓
Response: { "status": "ok" }
```

## CORS Configuration

The API handler includes CORS headers:
```typescript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
```

This allows the frontend to make cross-origin requests to the API.

## Performance Considerations

### Frontend
- Vite build creates optimized bundles
- Tailwind CSS is compiled and minified
- React components are code-split automatically
- Images are optimized by Vercel CDN

### API
- Cold start time: ~100-300ms (Node.js 20)
- Memory limit: 1024 MB per function
- Execution timeout: 60 seconds
- Automatically scales horizontally

## File Structure After Deployment

```
Vercel Project
├── Frontend (served from /)
│   ├── index.html
│   ├── assets/
│   │   ├── main-*.js (React app)
│   │   └── main-*.css (Tailwind styles)
│   └── images/
└── API Functions (/api/*)
    └── api/[[...route]].ts
        ├── /api/healthz (GET)
        └── [Additional routes configured in Express]
```

## Database Support

To add database support:

1. Create a database (PostgreSQL, MySQL, MongoDB, etc.)
2. Add `DATABASE_URL` to Vercel environment variables
3. Update `artifacts/api-server/src/app.ts` to connect to the database
4. Run migrations if needed
5. Redeploy

Example with PostgreSQL:
```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/api/data', async (req, res) => {
  const result = await pool.query('SELECT * FROM table');
  res.json(result.rows);
});
```

## Monitoring & Debugging

### View Logs
1. Vercel Dashboard → Deployments → Build Logs
2. Vercel Dashboard → Functions → Runtime Logs
3. Local development: `pnpm dev` (shows server output)

### Check Performance
1. Vercel Dashboard → Analytics
2. Monitor: Cold starts, Memory usage, Function duration
3. Web Vitals: LCP, FID, CLS

## Backward Compatibility

All changes are backward compatible:
- Local development still works: `pnpm dev`
- Existing build scripts unchanged
- Test suite unaffected
- Database operations continue to work

## Troubleshooting

### Issue: Build fails with missing environment variables
**Solution:** The updated vite.config files now use defaults. If you still see this, ensure you're using the latest code.

### Issue: API endpoints not working
**Solution:** Check that:
1. `api/[[...route]].ts` exists
2. Express routes are defined
3. Environment variables are set in Vercel

### Issue: Frontend can't reach API
**Solution:** 
1. Verify `VITE_API_URL` is set correctly
2. Check frontend network requests in browser DevTools
3. Ensure CORS is enabled

## Future Improvements

Potential enhancements for better Vercel integration:

1. **Edge Functions** - Move some API logic to edge for lower latency
2. **Incremental Static Regeneration** - Cache static pages with revalidation
3. **Database Optimization** - Use connection pooling for better resource usage
4. **Caching Strategy** - Configure cache headers for better CDN performance
5. **Analytics** - Integrate Vercel Analytics for better insights

## Testing Locally

Before pushing to Vercel:

```bash
# Install dependencies
pnpm install

# Build locally
pnpm run build

# Test the build output
pnpm --filter @workspace/landing-page run serve

# For API testing, use a separate terminal
node artifacts/api-server/dist/index.mjs
```

## Deployment Checklist

- [ ] All code committed to git
- [ ] GitHub repository connected to Vercel
- [ ] Environment variables configured in Vercel dashboard
- [ ] Build command verified in vercel.json
- [ ] Output directory correct (artifacts/landing-page/dist)
- [ ] API handler file exists (api/[[...route]].ts)
- [ ] .vercelignore file present
- [ ] No secrets in environment variables
- [ ] Tested locally with `pnpm build`
- [ ] Ready to deploy!

## Questions or Issues?

Refer to the other documentation files:
- `VERCEL_SETUP.md` - Setup guide
- `VERCEL_DEPLOYMENT.md` - Deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist
