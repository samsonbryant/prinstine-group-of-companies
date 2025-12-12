# Production Fixes - Data Persistence & 404 Errors

This document explains the fixes applied to resolve production issues.

## Issues Fixed

### 1. ✅ Data Loss on Restart (Backend Database)

**Problem**: User data, inquiries, and certificates were deleted when the backend service restarted.

**Root Cause**: Render's filesystem is ephemeral - files are deleted on restart unless stored on a persistent disk.

**Solution**: 
- Updated backend to automatically detect and use Render's persistent disk
- Database now stored at `/opt/render/project/persistent/prinstine.db` in production
- Falls back to local directory in development

**Action Required**: 
1. Go to Render dashboard → Your Backend Service → Settings → Persistent Disks
2. Add a persistent disk with mount path: `/opt/render/project/persistent`
3. Set size to at least 1GB
4. Save and restart the service

See **[BACKEND_PERSISTENT_STORAGE.md](./BACKEND_PERSISTENT_STORAGE.md)** for detailed instructions.

### 2. ✅ 404 Errors on Page Refresh (SPA Routing)

**Problem**: Users getting "Not Found" errors when:
- Refreshing the page on any route (e.g., `/about`, `/services`)
- Navigating directly to a route
- Signing out and navigating

**Root Cause**: Static site servers don't know about client-side routes. When you visit `/about` directly, the server looks for an `/about` file, which doesn't exist in a SPA.

**Solution**: 
- Created `_redirects` file in `public/` folder
- This file tells the server to serve `index.html` for all routes
- Allows React Router to handle routing client-side

**How It Works**:
- The `_redirects` file is copied to the build output during `npm run build`
- Render's static site server reads this file and redirects all routes to `index.html`
- React Router then handles the routing on the client side

## Files Changed

1. **`prinstine-website/public/_redirects`** (NEW)
   - Handles SPA routing for all pages
   - Redirects all routes to `index.html` with 200 status

2. **`backend/index.js`** (UPDATED)
   - Added persistent disk detection
   - Improved database path handling for production
   - Enhanced error handling and graceful shutdown

3. **`BACKEND_PERSISTENT_STORAGE.md`** (NEW)
   - Complete guide for setting up persistent storage
   - Troubleshooting tips
   - Backup recommendations

## Testing

### Test Data Persistence:
1. Submit a test inquiry through the contact form
2. Check backend logs to verify database path
3. Restart the backend service
4. Verify the inquiry still exists

### Test SPA Routing:
1. Navigate to `https://prinstinegroup.org/about`
2. Refresh the page (F5 or Cmd+R)
3. Should load correctly without 404 error
4. Try navigating to other routes directly
5. All should work without errors

## Deployment

After committing these changes:

1. **Frontend** (Static Site):
   - Changes will auto-deploy on Render
   - `_redirects` file will be included in build
   - No additional configuration needed

2. **Backend** (Web Service):
   - Code changes will auto-deploy
   - **IMPORTANT**: You must manually add persistent disk in Render dashboard
   - See BACKEND_PERSISTENT_STORAGE.md for step-by-step instructions

## Verification

### Check Backend Logs:
Look for these log messages:
```
📁 Database path: /opt/render/project/persistent/prinstine.db
✅ Connected to SQLite database
💾 Database location: /opt/render/project/persistent/prinstine.db
```

### Check Frontend:
- All routes should work on refresh
- No 404 errors when navigating directly to routes
- Sign out and navigation should work smoothly

## Additional Notes

- The `_redirects` file uses Render's static site redirect syntax
- If you're using a different hosting provider, you may need different configuration:
  - **Netlify**: Uses `_redirects` (same as this)
  - **Vercel**: Uses `vercel.json`
  - **Apache**: Uses `.htaccess`
  - **Nginx**: Requires server configuration

- Database persistence requires a Render Web Service (not available for Static Sites)
- If you only have a static site, consider using an external database service (e.g., Supabase, PlanetScale)

