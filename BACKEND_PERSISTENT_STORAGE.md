# Backend Persistent Storage Setup for Render

This guide explains how to configure persistent storage for the backend database on Render to prevent data loss on restarts.

## Problem

By default, Render's filesystem is **ephemeral** - all files are deleted when the service restarts. This means:
- ❌ Database files get wiped on every restart
- ❌ User data and submissions are lost
- ❌ Certificates and inquiries disappear

## Solution: Render Persistent Disk

Render provides **Persistent Disks** that survive restarts and deployments.

## Setup Instructions

### Step 1: Add Persistent Disk to Backend Service

1. Go to your Render dashboard: https://dashboard.render.com
2. Open your **Backend Web Service** (not the static site)
3. Go to **"Settings"** → Scroll to **"Persistent Disks"**
4. Click **"Add Persistent Disk"**
5. Configure:
   - **Mount Path**: `/opt/render/project/persistent`
   - **Size**: Start with 1GB (you can increase later)
6. Click **"Save Changes"**
7. Render will restart your service

### Step 2: Verify Database Persistence

The backend code has been updated to automatically:
- ✅ Detect if persistent disk is available
- ✅ Use persistent disk path in production
- ✅ Fall back to local directory in development
- ✅ Create directory if it doesn't exist

### Step 3: Test Data Persistence

1. Submit a test inquiry through the website
2. Restart the backend service manually
3. Check if the data still exists

## Environment Variables

The backend automatically detects the persistent disk. No environment variables are required.

However, if you want to customize the path, you can set:
- `RENDER_PERSISTENT_DISK_PATH` - Custom persistent disk path (default: `/opt/render/project/persistent`)

## Important Notes

⚠️ **Persistent Disks are only available for Web Services**, not Static Sites.

⚠️ **Persistent Disks have a cost** - Check Render's pricing for current rates.

⚠️ **Backup your database regularly** - While persistent disks survive restarts, they don't protect against data corruption or accidental deletion.

## Database Location

- **Development**: `backend/prinstine.db` (local file)
- **Production (with persistent disk)**: `/opt/render/project/persistent/prinstine.db`
- **Production (without persistent disk)**: `backend/prinstine.db` (will be lost on restart)

## Troubleshooting

### Database still getting wiped?

1. Check if persistent disk is mounted:
   ```bash
   # In Render shell or logs
   ls -la /opt/render/project/persistent
   ```

2. Check backend logs for database path:
   ```
   📁 Database path: /opt/render/project/persistent/prinstine.db
   ```

3. Verify persistent disk is added in Render dashboard

### Database not found errors?

- Ensure the persistent disk mount path matches: `/opt/render/project/persistent`
- Check file permissions (should be readable/writable by the service)

## Backup Strategy

Consider implementing regular database backups:

1. **Manual Backup**: Download database file from Render shell
2. **Automated Backup**: Use Render Cron Jobs to backup database periodically
3. **External Storage**: Copy database to S3 or similar storage

## Cost

Persistent disks on Render are charged based on:
- Disk size (GB)
- I/O operations

Check Render's current pricing: https://render.com/pricing

