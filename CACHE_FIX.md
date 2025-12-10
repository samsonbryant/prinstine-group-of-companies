# Fix Background Images Not Updating on Deployed Site

If background images aren't updating after deployment, try these solutions:

## Solution 1: Force Rebuild on Render

1. Go to your Render dashboard
2. Navigate to your Static Site service
3. Go to **Settings** → **Build & Deploy**
4. Click **"Clear build cache"** (if available)
5. Go to **Manual Deploy** → **"Deploy latest commit"**
6. Wait for the build to complete

## Solution 2: Hard Refresh Browser

After deployment, clear your browser cache:
- **Chrome/Edge**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- **Firefox**: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- **Safari**: `Cmd+Option+R` (Mac)

Or clear cache)

Or:
- Open browser DevTools (F12)
- Right-click the refresh button
- Select "Empty Cache and Hard Reload"

## Solution 3: Verify Images Are Committed

Check that your image files are actually in the repository:

```bash
git ls-files prinstine-website/src/assets/*.jpeg
```

If images are missing, add them:
```bash
git add prinstine-website/src/assets/*.jpeg
git commit -m "Add updated background images"
git push
```

## Solution 4: Check Build Logs

1. Go to Render → Your Static Site → **Logs**
2. Check the build logs for any errors
3. Verify that images are being processed correctly
4. Look for messages about asset processing

## Solution 5: Add Version Query Parameter (Temporary Fix)

If images still don't update, you can temporarily add a version query to force reload:

In your component files, you can add:
```javascript
import heroBg from '../assets/background-image-homepage-below-header.jpeg';
// Then use: `${heroBg}?v=${Date.now()}` for development
// Or: `${heroBg}?v=2` for production
```

## Why This Happens

1. **Browser Caching**: Browsers cache images aggressively
2. **CDN Caching**: Render's CDN may cache assets
3. **Build Cache**: Render might reuse old build artifacts
4. **Asset Hashing**: Vite generates hash-based filenames, but if the file content hash doesn't change, the filename stays the same

## Prevention

The Vite config has been updated to include proper cache busting. After the next deployment:
- Images will get unique hash-based filenames
- Changed images will get new hashes
- Browsers will fetch the new versions automatically

## Still Not Working?

1. **Verify file changes**: Check that the actual image file content changed (not just metadata)
2. **Check file sizes**: Compare file sizes before/after
3. **Rename images**: If needed, rename the image files to force a new import
4. **Contact Render Support**: If the issue persists, Render support can check their CDN cache

