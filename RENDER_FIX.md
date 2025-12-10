# Fix for Render "Could not read package.json" Error

## The Problem

Render is looking for `package.json` in `/opt/render/project/src/` instead of `/opt/render/project/prinstine-website/`.

This means the **Root Directory** setting is not being applied correctly.

## Step-by-Step Fix

### Method 1: Verify and Fix Root Directory (Try This First)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click on your Static Site service**
3. **Go to Settings tab**
4. **Scroll to "Build & Deploy" section**
5. **Check "Root Directory" field**:
   - If it's empty or says something else → **Set it to**: `prinstine-website`
   - If it already says `prinstine-website` → **Delete it and type it again** (sometimes there's a hidden character)
6. **Click "Save Changes"** at the bottom
7. **Go to "Manual Deploy"** → Click "Deploy latest commit"

### Method 2: Delete and Recreate (If Method 1 Doesn't Work)

1. **Delete the current Static Site**:
   - Go to Settings → Scroll to bottom → Click "Delete Service"
   - Confirm deletion

2. **Create a new Static Site**:
   - Click "New +" → "Static Site"
   - Connect repository: `samsonbryant/prinstine-group-of-companies`
   - **IMPORTANT**: Before clicking "Create Static Site", verify:
     - **Root Directory**: Type `prinstine-website` (exactly, no spaces before/after)
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
   - Click "Create Static Site"

### Method 3: Check Build Logs for Clues

1. Go to your Static Site → **Logs** tab
2. Look at the build log
3. Find the line that says: `Checking out commit...`
4. After that, look for: `Running build command...`
5. The path shown will tell you where Render thinks the root is

If you see paths like:
- `/opt/render/project/src/` → Root Directory is wrong or not set
- `/opt/render/project/prinstine-website/` → Root Directory is correct

## Verification Checklist

After setting Root Directory, verify:

- [ ] Root Directory field shows exactly: `prinstine-website`
- [ ] No leading slash: Not `/prinstine-website`
- [ ] No trailing slash: Not `prinstine-website/`
- [ ] Correct case: Lowercase `prinstine-website` not `Prinstine-Website`
- [ ] No extra spaces before or after
- [ ] Clicked "Save Changes" after setting it
- [ ] Triggered a new deployment after saving

## Alternative: Use Build Command with cd

If Root Directory still doesn't work, try this build command instead:

```
cd prinstine-website && npm install && npm run build
```

And set:
- **Root Directory**: Leave empty or set to `.` (repository root)
   - **Build Command**: `cd prinstine-website; npm install; npm run build`
- **Publish Directory**: `prinstine-website/dist`

## Still Not Working?

If none of the above works:

1. **Check if package.json exists in the repo**:
   - Go to: https://github.com/samsonbryant/prinstine-group-of-companies/tree/main/prinstine-website
   - Verify `package.json` file is visible there

2. **Contact Render Support**:
   - They can check the service configuration on their end
   - Provide them the error message and build logs

3. **Try a different approach**:
   - Consider moving the frontend to the repository root temporarily to test
   - Or use a different hosting service like Netlify or Vercel

