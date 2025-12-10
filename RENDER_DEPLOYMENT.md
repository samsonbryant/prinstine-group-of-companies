# Render Deployment Guide

This guide will help you deploy the Prinstine Group website to Render.

## Prerequisites

- A Render account (sign up at https://render.com)
- Your domain `prinstinegroup.org` configured in Namecheap
- GitHub repository connected to Render

## Deployment Steps

### 1. Deploy Backend (API Service)

1. Go to your Render dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `samsonbryant/prinstine-group-of-companies`
4. Configure the service:
   - **Name**: `prinstine-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm ci`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = `https://prinstinegroup.org,https://www.prinstinegroup.org`
   - `PORT` is automatically set by Render (don't add this manually)
6. Click **"Create Web Service"**
7. Wait for deployment to complete
8. **Copy the service URL** (e.g., `https://prinstine-backend-xxxx.onrender.com`)

### 2. Deploy Frontend (Static Site)

1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Connect your GitHub repository: `samsonbryant/prinstine-group-of-companies`
3. Configure the service:
   - **Name**: `prinstine-frontend`
   - **Root Directory**: `prinstine-website`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `prinstine-website/dist`
4. Add Environment Variable:
   - `VITE_API_BASE` = `https://your-backend-service.onrender.com` (use the URL from step 1)
5. Click **"Create Static Site"**
6. Wait for deployment to complete

### 3. Configure Custom Domain

1. In your **Frontend Static Site** settings, go to **"Custom Domains"**
2. Click **"Add Custom Domain"**
3. Enter: `prinstinegroup.org`
4. Render will provide DNS records to add in Namecheap:
   - **A Record** for `@` (apex domain) pointing to Render's IP addresses
   - **CNAME Record** for `www` pointing to Render's provided hostname
5. Add these records in Namecheap DNS settings
6. Wait for DNS propagation (can take up to 48 hours, usually much faster)
7. Once verified, enable **"Force HTTPS"** in Render

### 4. Update CORS (After Frontend is Live)

Once your frontend is live at `https://prinstinegroup.org`, update the backend CORS:

1. Go to your **Backend Web Service** settings
2. Update Environment Variable:
   - `CORS_ORIGIN` = `https://prinstinegroup.org,https://www.prinstinegroup.org,https://prinstine-frontend-xxxx.onrender.com`
3. Redeploy the backend

## Important Notes

- **Backend URL**: After deploying the backend, copy its URL and use it for `VITE_API_BASE` in the frontend
- **Database**: The backend uses SQLite. For production, consider migrating to PostgreSQL (Render offers free PostgreSQL)
- **Environment Variables**: Make sure `VITE_API_BASE` in the frontend matches your backend service URL
- **HTTPS**: Always enable "Force HTTPS" after DNS is configured

## Troubleshooting

### Build Fails
- Ensure Root Directory is set correctly (`backend` for backend, `prinstine-website` for frontend)
- Check that Build Command is exactly: `npm ci && npm run build` (frontend) or `npm ci` (backend)

### API Calls Fail
- Verify `VITE_API_BASE` environment variable is set correctly in frontend
- Check backend CORS_ORIGIN includes your frontend domain
- Check backend service is running and accessible

### Domain Not Working
- Verify DNS records are correctly set in Namecheap
- Wait for DNS propagation (can take time)
- Check Render's custom domain status page for errors

## Quick Reference

### Backend Settings
```
Type: Web Service
Root Directory: backend
Build Command: npm ci
Start Command: npm start
Environment: Node
```

### Frontend Settings
```
Type: Static Site
Root Directory: prinstine-website
Build Command: npm ci && npm run build
Publish Directory: prinstine-website/dist
```

### Environment Variables

**Backend:**
- `CORS_ORIGIN`: `https://prinstinegroup.org,https://www.prinstinegroup.org`

**Frontend:**
- `VITE_API_BASE`: `https://your-backend-service.onrender.com`

