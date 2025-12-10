# Setting Up Custom Domain: prinstinegroup.org

This guide will help you connect your domain `prinstinegroup.org` to your Render static site.

## Step 1: Add Custom Domain in Render

1. **Go to your Render Dashboard**: https://dashboard.render.com
2. **Click on your Static Site service** (`prinstine-frontend`)
3. **Go to the "Settings" tab**
4. **Scroll down to "Custom Domains" section**
5. **Click "Add Custom Domain"**
6. **Enter your domain**: `prinstinegroup.org`
7. **Click "Add"**

## Step 2: Get DNS Records from Render

After adding the domain, Render will show you DNS records that need to be added in Namecheap. You'll see something like:

### For Apex Domain (prinstinegroup.org):
- **Type**: A Record
- **Host**: `@` (or leave blank)
- **Value**: Render will provide 4 IP addresses (something like):
  - `216.24.57.1`
  - `216.24.57.2`
  - `216.24.57.3`
  - `216.24.57.4`
- **TTL**: Automatic (or 300)

### For WWW Subdomain (www.prinstinegroup.org):
- **Type**: CNAME Record
- **Host**: `www`
- **Value**: Render will provide a hostname (something like `prinstine-frontend.onrender.com`)
- **TTL**: Automatic (or 300)

**⚠️ Important**: Copy these exact values from Render - they will be unique to your service!

## Step 3: Configure DNS in Namecheap

1. **Log in to Namecheap**: https://www.namecheap.com
2. **Go to Domain List**: Click "Domain List" from the left menu
3. **Find your domain**: `prinstinegroup.org`
4. **Click "Manage"** next to your domain
5. **Go to "Advanced DNS" tab**
6. **Add the DNS records**:

### Add A Records for Apex Domain:
1. Click **"Add New Record"**
2. Select **Type**: `A Record`
3. **Host**: `@` (or leave blank for apex domain)
4. **Value**: Enter the first IP address from Render
5. **TTL**: `Automatic` (or `300`)
6. Click **Save** (checkmark icon)
7. **Repeat** for all 4 IP addresses (you need 4 separate A records with the same host `@`)

### Add CNAME Record for WWW:
1. Click **"Add New Record"**
2. Select **Type**: `CNAME Record`
3. **Host**: `www`
4. **Value**: Enter the CNAME value from Render (e.g., `prinstine-frontend.onrender.com`)
5. **TTL**: `Automatic` (or `300`)
6. Click **Save** (checkmark icon)

### Remove/Update Existing Records (if any):
- If you have existing A or CNAME records pointing elsewhere, you may need to remove or update them
- Keep any MX records (for email) and other necessary records

## Step 4: Verify DNS in Render

1. **Go back to Render** → Your Static Site → Settings → Custom Domains
2. **Wait for DNS propagation** (can take 5 minutes to 48 hours, usually 15-30 minutes)
3. **Render will automatically verify** the DNS records
4. **Status will change** from "Pending" to "Verified" when ready

## Step 5: Enable HTTPS (SSL Certificate)

1. **Once DNS is verified**, Render will automatically provision an SSL certificate
2. **Enable "Force HTTPS"**:
   - Go to Settings → Custom Domains
   - Toggle **"Force HTTPS"** to ON
   - This will redirect all HTTP traffic to HTTPS

## Step 6: Test Your Domain

1. **Wait for DNS propagation** (check status in Render)
2. **Visit**: `https://prinstinegroup.org`
3. **Visit**: `https://www.prinstinegroup.org`
4. Both should load your website with HTTPS

## Troubleshooting

### DNS Not Verifying
- **Check DNS records** are exactly as provided by Render
- **Wait longer** - DNS can take up to 48 hours (usually much faster)
- **Use DNS checker**: https://dnschecker.org to see if DNS has propagated globally
- **Verify in Namecheap** that records are saved correctly

### HTTPS Not Working
- **Wait for SSL certificate** - Render provisions this automatically after DNS verification
- **Check "Force HTTPS"** is enabled in Render settings
- **Clear browser cache** and try again

### Site Not Loading
- **Check DNS propagation**: https://dnschecker.org
- **Verify DNS records** match exactly what Render provided
- **Check Render service** is deployed and running
- **Try both**: `prinstinegroup.org` and `www.prinstinegroup.org`

### Common Mistakes
- ❌ Using wrong IP addresses (must use Render's provided IPs)
- ❌ Using wrong CNAME value (must use Render's provided hostname)
- ❌ Forgetting to add all 4 A records
- ❌ Using `@` incorrectly (should be `@` or blank for apex domain)
- ❌ Not waiting for DNS propagation

## Quick Checklist

- [ ] Domain added in Render Custom Domains
- [ ] 4 A records added in Namecheap (for apex domain)
- [ ] 1 CNAME record added in Namecheap (for www)
- [ ] DNS records match exactly what Render provided
- [ ] DNS verified in Render (status shows "Verified")
- [ ] SSL certificate provisioned (automatic)
- [ ] Force HTTPS enabled in Render
- [ ] Site loads at https://prinstinegroup.org
- [ ] Site loads at https://www.prinstinegroup.org

## Support

If you encounter issues:
1. Check Render's Custom Domain status page
2. Verify DNS records using https://dnschecker.org
3. Check Render documentation: https://render.com/docs/custom-domains
4. Contact Render support if DNS verification fails after 48 hours

