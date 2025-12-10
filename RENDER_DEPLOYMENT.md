# Render Static Site Deployment Guide

This guide will help you deploy the Prinstine Group website as a **Static Site** on Render.

## Prerequisites

- A Render account (sign up at https://render.com)
- Your domain `prinstinegroup.org` configured in Namecheap
- GitHub repository connected to Render

## Important Note

⚠️ **Render Blueprints do not support Static Sites**. Static sites must be configured manually through the Render dashboard. This is a one-time setup that takes just a few minutes.

## Deploy Static Site (Manual Setup)

1. Go to your Render dashboard: https://dashboard.render.com
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository: `samsonbryant/prinstine-group-of-companies`
4. Configure the service with these **exact** settings:
   - **Name**: `prinstine-frontend` (or any name you prefer)
   - **Root Directory**: `prinstine-website` ⚠️ **Important: Must be exactly this**
   - **Build Command**: `npm install && npm run build` ⚠️ **Important: Use npm install (not npm ci)**
   - **Publish Directory**: `dist` ⚠️ **Important: Relative to root directory, so just `dist` (not prinstine-website/dist)**
5. **Environment Variables**: Leave empty (none needed for static site)
6. Click **"Create Static Site"**
7. Wait for deployment to complete (usually 2-5 minutes)

## Configure Custom Domain

1. In your **Static Site** settings, go to **"Custom Domains"**
2. Click **"Add Custom Domain"**
3. Enter: `prinstinegroup.org`
4. Render will provide DNS records to add in Namecheap:
   - **A Record** for `@` (apex domain) pointing to Render's IP addresses
   - **CNAME Record** for `www` pointing to Render's provided hostname
5. Add these records in Namecheap DNS settings:
   - Go to Namecheap → Domain List → Manage → Advanced DNS
   - Add the A records and CNAME as provided by Render
6. Wait for DNS propagation (can take up to 48 hours, usually much faster)
7. Once verified, enable **"Force HTTPS"** in Render

## Features

The static site includes:
- ✅ All pages and content
- ✅ Contact forms (with mailto fallback if no backend)
- ✅ Bank details (with static fallback data)
- ✅ Certificate verification (with contact info if no backend)
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Smooth animations

## Notes

- **No Backend Required**: The site works fully as a static site
- **Forms**: Contact forms use mailto links if no backend API is configured
- **Bank Details**: Shows static bank information
- **Certificate Verification**: Provides contact information for manual verification
- **Environment Variables**: No environment variables needed for static-only deployment

## Troubleshooting

### Build Fails
- Ensure Root Directory is set to: `prinstine-website`
- Check that Build Command is exactly: `npm ci && npm run build`
- Verify Publish Directory is: `prinstine-website/dist`

### Domain Not Working
- Verify DNS records are correctly set in Namecheap
- Wait for DNS propagation (can take time)
- Check Render's custom domain status page for errors
- Ensure "Force HTTPS" is enabled after DNS is verified

### Site Not Loading
- Check build logs in Render dashboard
- Verify all dependencies are in `package.json`
- Check that `dist` folder is being generated correctly

## Quick Reference

### Static Site Settings
```
Type: Static Site
Root Directory: prinstine-website
Build Command: npm install && npm run build
Publish Directory: dist
```

### DNS Records (Namecheap)
- **A Record** (`@`): Point to Render's provided IP addresses
- **CNAME Record** (`www`): Point to Render's provided hostname

## Support

For issues or questions, contact:
- Email: info@prinstinegroup.org
- Email: info@prinstineacademy.org
