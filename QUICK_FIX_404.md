# Quick Fix for 404 Errors

## The Problem
Your website is deployed as a **Static Site** on Render, but it needs to be a **Web Service** to fix 404 errors.

## The Solution (5 Minutes)

### Step 1: Delete Static Site
1. Go to https://dashboard.render.com
2. Find your Static Site service
3. Settings → Delete Service

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect GitHub repo: `samsonbryant/prinstine-group-of-companies`
3. **Settings:**
   - **Name**: `prinstine-frontend`
   - **Root Directory**: `prinstine-website` ⚠️
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start` ⚠️
4. Click "Create Web Service"

### Step 3: Add Custom Domain
1. Settings → Custom Domains
2. Add: `prinstinegroup.org`
3. Enable "Force HTTPS"

## That's It!
After deployment (3-5 min), all routes will work without 404 errors.

## Why This Works
- Static Sites can't run `server.js`
- Web Services can run `server.js` which handles SPA routing
- The `server.js` file serves `index.html` for all routes

