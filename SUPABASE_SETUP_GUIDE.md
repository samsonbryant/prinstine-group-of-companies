# Supabase Setup Guide - Free Database for Render

This guide will help you set up a **free PostgreSQL database** on Supabase to store your data permanently (even on Render's free tier).

## Why Supabase?

- ✅ **100% Free** for small projects
- ✅ **500MB database** storage
- ✅ **2GB bandwidth** per month
- ✅ **Automatic backups**
- ✅ **Data persists forever** (even on free Render tier)
- ✅ **Web dashboard** to view/edit data

## Step-by-Step Setup

### Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign up with **GitHub** (recommended) or email
4. It's completely free!

### Step 2: Create a New Project

1. Click **"New Project"**
2. Fill in:
   - **Name**: `prinstine-group-db` (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free (default)
3. Click **"Create new project"**
4. Wait 2-3 minutes for project to be created

### Step 3: Get Database Connection String

1. In your Supabase project dashboard, go to:
   - **Settings** (gear icon) → **Database**
2. Scroll to **"Connection string"**
3. Find **"URI"** tab
4. Copy the connection string
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
5. **Replace `[YOUR-PASSWORD]`** with the password you created in Step 2
   - Example: `postgresql://postgres:mypassword123@db.abcdefgh.supabase.co:5432/postgres`

### Step 4: Add to Render

1. Go to your **Render Dashboard**: https://dashboard.render.com
2. Open your **Backend Web Service**
3. Go to **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add:
   - **Key**: `DATABASE_URL`
   - **Value**: Paste your connection string from Step 3
6. Click **"Save Changes"**
7. Render will automatically restart your service

### Step 5: Verify It Works

1. Check your backend logs in Render
2. You should see:
   ```
   ✅ Connected to PostgreSQL database (persistent)
   💾 Using external database - data will persist across restarts
   ✅ Database tables initialized (PostgreSQL)
   ```
3. Test by submitting an inquiry through your website
4. Restart your backend service
5. Check if the inquiry still exists (it should!)

## That's It! 🎉

Your data will now persist forever, even on Render's free tier!

## Viewing Your Data

You can view and edit your data in Supabase:

1. Go to your Supabase project
2. Click **"Table Editor"** in the sidebar
3. You'll see all your tables:
   - `inquiries` - Contact form submissions
   - `certificates` - Certificate data
   - `bank_details` - Bank account information

## Troubleshooting

### "Error connecting to PostgreSQL"

- Check that your `DATABASE_URL` is correct
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- Verify the connection string includes `postgresql://` at the start

### "Database tables not created"

- Check backend logs for errors
- The tables are created automatically on first run
- If they don't exist, restart your backend service

### "Data still getting deleted"

- Make sure `DATABASE_URL` is set in Render environment variables
- Check backend logs to confirm it's using PostgreSQL
- Restart the backend service after adding the environment variable

## Security Notes

- ⚠️ **Never commit** your `DATABASE_URL` to GitHub
- ✅ Always use **environment variables** (which you're doing)
- ✅ Your Supabase password is stored securely in Render
- ✅ Supabase free tier includes SSL encryption

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Render Support: https://render.com/docs

## Alternative: Other Free Databases

If you prefer a different service:

- **Neon**: https://neon.tech (PostgreSQL, similar to Supabase)
- **Railway**: https://railway.app (PostgreSQL, $5 free credit/month)
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas (NoSQL, 512MB free)

The setup process is similar - just get the connection string and add it as `DATABASE_URL` in Render!

