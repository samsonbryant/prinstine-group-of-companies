# Fix for 404 Errors on Page Refresh

## Problem
When refreshing the website on routes like `/about` or `/services`, you get a 404 error. This happens because the server tries to find a file at that path, but in a Single Page Application (SPA), all routes should be handled by the client-side router.

## Solution
We've added a server configuration that serves `index.html` for all routes, allowing React Router to handle the routing.

## Files Added/Modified

1. **`prinstine-website/server.js`** - Express server that serves static files and handles SPA routing
2. **`prinstine-website/package.json`** - Added `express` dependency and `start` script
3. **`prinstine-website/vercel.json`** - Configuration for Vercel deployments
4. **`render.yaml`** - Configuration for Render Web Service deployment

## Deployment Options

### Option 1: Render Web Service (Recommended)

If you're currently using Render as a **Static Site**, you need to switch to a **Web Service**:

1. Go to Render Dashboard → Your Static Site → Settings
2. Delete the Static Site service
3. Create a new **Web Service**:
   - Connect your GitHub repository
   - **Root Directory**: `prinstine-website`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
   - **Port**: 10000 (or leave default)

Alternatively, you can use the `render.yaml` file:
- Render will automatically detect `render.yaml` in your repository root
- It will create a Web Service with the correct configuration

### Option 2: Keep Static Site (Alternative)

If you want to keep using Render as a Static Site, you'll need to use a different hosting provider that supports SPA routing:

- **Netlify**: Already configured with `_redirects` file
- **Vercel**: Already configured with `vercel.json` file
- **GitHub Pages**: Requires additional configuration

### Option 3: Other Platforms

- **Vercel**: Automatically uses `vercel.json` for routing
- **Netlify**: Automatically uses `_redirects` file
- **Other platforms**: Use the `server.js` approach

## Testing Locally

After building, you can test the server locally:

```bash
cd prinstine-website
npm install
npm run build
npm start
```

Then visit:
- `http://localhost:3000/` - Should work
- `http://localhost:3000/about` - Should work (no 404)
- `http://localhost:3000/services` - Should work (no 404)

## Verification

After deployment, test these URLs:
- `https://yourdomain.com/` ✅
- `https://yourdomain.com/about` ✅ (should not show 404)
- `https://yourdomain.com/services` ✅ (should not show 404)
- `https://yourdomain.com/what-we-do` ✅ (should not show 404)
- `https://yourdomain.com/partners` ✅ (should not show 404)

All routes should load the same page, and React Router will handle the client-side routing.

## Notes

- The server.js file only runs in production (after `npm run build`)
- In development (`npm run dev`), Vite handles routing automatically
- The `_redirects` file is for Netlify deployments
- The `vercel.json` file is for Vercel deployments
- The `render.yaml` file is for Render Web Service deployments

