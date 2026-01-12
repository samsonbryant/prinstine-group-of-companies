# Render Web Service Setup - Fix 404 Errors

## Problem
The website is currently deployed as a **Static Site** on Render, which doesn't support server-side routing. This causes 404 errors when refreshing pages like `/about`, `/services`, etc.

## Solution
Switch from **Static Site** to **Web Service** to enable the `server.js` file that handles SPA routing.

## Step-by-Step Instructions

### Option 1: Manual Setup (Recommended)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Find your current Static Site** (named something like `prinstine-frontend`)
3. **Delete the Static Site**:
   - Go to Settings → Scroll to bottom
   - Click "Delete Service"
   - Confirm deletion

4. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `samsonbryant/prinstine-group-of-companies`
   - Configure with these **exact** settings:
     - **Name**: `prinstine-frontend` (or any name you prefer)
     - **Root Directory**: `prinstine-website` ⚠️ **Important**
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start` ⚠️ **Important**
     - **Plan**: Choose your plan (Free tier works)

5. **Environment Variables** (optional):
   - `NODE_ENV`: `production`

6. **Click "Create Web Service"**

7. **Wait for deployment** (usually 3-5 minutes)

8. **Configure Custom Domain** (if you had one):
   - Go to Settings → Custom Domains
   - Add your domain: `prinstinegroup.org`
   - Update DNS records if needed
   - Enable "Force HTTPS"

### Option 2: Using render.yaml (Blueprint)

If you want to use the `render.yaml` file:

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +" → "Blueprint"**
3. **Connect your GitHub repository**
4. **Render will automatically detect `render.yaml`**
5. **Review and create the service**

The `render.yaml` file is already configured in the repository root.

## Verification

After deployment, test these URLs (they should all work without 404):
- ✅ `https://prinstinegroup.org/`
- ✅ `https://prinstinegroup.org/about` (refresh should work)
- ✅ `https://prinstinegroup.org/services` (refresh should work)
- ✅ `https://prinstinegroup.org/what-we-do` (refresh should work)
- ✅ `https://prinstinegroup.org/partners` (refresh should work)
- ✅ `https://prinstinegroup.org/bank-details` (refresh should work)
- ✅ `https://prinstinegroup.org/certificate-verification` (refresh should work)

## Important Notes

- **Static Sites** on Render cannot run `server.js` - you MUST use Web Service
- The `server.js` file serves `index.html` for all routes, allowing React Router to handle routing
- The Web Service will automatically restart on code pushes (if auto-deploy is enabled)
- Make sure your custom domain points to the new Web Service, not the old Static Site

## Troubleshooting

### Still getting 404 errors?
1. Verify you're using **Web Service**, not Static Site
2. Check that `Start Command` is set to `npm start`
3. Check build logs to ensure `server.js` is running
4. Verify `dist` folder is being created during build

### Build fails?
1. Check that `Root Directory` is set to `prinstine-website`
2. Verify `package.json` has the `start` script
3. Check that `express` is in dependencies

### Domain not working?
1. Update DNS to point to the new Web Service
2. Remove old Static Site DNS records
3. Wait for DNS propagation (15-30 minutes)

