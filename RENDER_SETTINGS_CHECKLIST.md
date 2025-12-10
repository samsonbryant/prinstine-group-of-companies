# Render Static Site Settings Checklist

Use this checklist to verify your Render Static Site is configured correctly.

## ✅ Settings to Verify

### 1. Basic Information
- [ ] **Name**: `prinstine-frontend` (or your preferred name)
- [ ] **Repository**: `samsonbryant/prinstine-group-of-companies`
- [ ] **Branch**: `main`

### 2. Build & Deploy Settings

**Root Directory** ⚠️ **CRITICAL - Most Common Issue**
- [ ] Set to exactly: `prinstine-website`
- [ ] ✅ Correct: `prinstine-website`
- [ ] ❌ Wrong: `/prinstine-website` (no leading slash)
- [ ] ❌ Wrong: `Prinstine-Website` (wrong case)
- [ ] ❌ Wrong: `prinstine_website` (wrong separator)
- [ ] ❌ Wrong: `prinstine-website/` (no trailing slash)

**Build Command**
- [ ] Set to exactly: `npm install && npm run build`
- [ ] ✅ Correct: `npm install && npm run build`
- [ ] ❌ Wrong: `npm ci && npm run build` (npm ci may fail)
- [ ] ❌ Wrong: `npm install && npm run build && npm run deploy` (extra commands)

**Publish Directory**
- [ ] Set to exactly: `dist`
- [ ] ✅ Correct: `dist` (relative to root directory)
- [ ] ❌ Wrong: `prinstine-website/dist` (absolute path)
- [ ] ❌ Wrong: `./dist` (unnecessary prefix)

### 3. Environment Variables
- [ ] Leave empty (no environment variables needed for static site)

### 4. Custom Domain (After successful deployment)
- [ ] Domain added: `prinstinegroup.org`
- [ ] DNS records configured in Namecheap
- [ ] DNS verified in Render
- [ ] Force HTTPS enabled

## 🔍 How to Check Your Current Settings

1. Go to https://dashboard.render.com
2. Click on your Static Site service
3. Go to **Settings** tab
4. Scroll to **"Build & Deploy"** section
5. Verify each setting matches the checklist above

## 🚨 Common Mistakes

1. **Root Directory not set** - Most common issue!
   - Render defaults to repository root
   - You MUST set Root Directory to `prinstine-website`

2. **Wrong path format**
   - Use relative path: `prinstine-website`
   - Don't use absolute: `/prinstine-website` or `./prinstine-website`

3. **Case sensitivity**
   - Must be lowercase: `prinstine-website`
   - Not: `Prinstine-Website` or `PRINSTINE-WEBSITE`

4. **Publish Directory wrong**
   - Should be `dist` (relative to root directory)
   - Since Root Directory is `prinstine-website`, Render will look for `prinstine-website/dist`

## 📸 Visual Guide

When configuring, your settings should look like this:

```
Name: prinstine-frontend
Repository: samsonbryant/prinstine-group-of-companies
Branch: main
Root Directory: prinstine-website          ← CRITICAL!
Build Command: npm install && npm run build
Publish Directory: dist                    ← Relative to root
```

## 🆘 Still Having Issues?

If you've verified all settings and it's still failing:

1. **Delete and recreate** the Static Site service
2. **Double-check** Root Directory before clicking "Create"
3. **Check build logs** - they show the exact path Render is using
4. Look for: `Checking out commit...` - this shows the repo root
5. Look for: `Running build command...` - this should run from `prinstine-website`

If the build log shows paths like `/opt/render/project/src/` instead of `/opt/render/project/prinstine-website/`, then Root Directory is not set correctly.

