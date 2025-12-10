# DNS Troubleshooting Guide for prinstinegroup.org

## Current Issue
- Domain shows "this site can not be found"
- SSL certificate is still pending on Render

## Root Cause
The SSL certificate is pending because **DNS verification hasn't completed**. Render can only provision SSL certificates after DNS records are verified.

## Step-by-Step Fix

### Step 1: Verify DNS Records in Render

1. Go to **Render Dashboard** → Your Static Site → **Settings** → **Custom Domains**
2. Find `prinstinegroup.org` in the list
3. **Copy the exact DNS records** that Render shows you
4. You should see:
   - **4 A records** with IP addresses (for apex domain)
   - **1 CNAME record** with a hostname (for www subdomain)

### Step 2: Check Current DNS Records in Namecheap

1. Log in to **Namecheap**: https://www.namecheap.com
2. Go to **Domain List** → Click **"Manage"** next to `prinstinegroup.org`
3. Go to **"Advanced DNS"** tab
4. **Check what records currently exist**

### Step 3: Remove Incorrect Records

**IMPORTANT**: Remove any existing records that conflict:

- ❌ Remove any A records pointing to other IPs (like old hosting IPs)
- ❌ Remove any CNAME records pointing to other domains
- ❌ Remove any AAAA records (IPv6) unless Render specifically provides them
- ✅ **Keep**: MX records (for email), TXT records (for verification), and other non-web records

### Step 4: Add Correct DNS Records

#### For Apex Domain (prinstinegroup.org):

You need **4 separate A records**:

1. Click **"Add New Record"**
2. Select **Type**: `A Record`
3. **Host**: `@` (or leave blank - this means the root domain)
4. **Value**: Enter the **first IP address** from Render
5. **TTL**: `Automatic` (or `300`)
6. Click **Save** (✓)
7. **Repeat steps 1-6** for the remaining 3 IP addresses

**Example** (use Render's actual IPs):
```
A Record 1: @ → 216.24.57.1
A Record 2: @ → 216.24.57.2
A Record 3: @ → 216.24.57.3
A Record 4: @ → 216.24.57.4
```

#### For WWW Subdomain (www.prinstinegroup.org):

1. Click **"Add New Record"**
2. Select **Type**: `CNAME Record`
3. **Host**: `www`
4. **Value**: Enter the CNAME value from Render (e.g., `prinstine-frontend.onrender.com`)
   - **IMPORTANT**: Do NOT include `http://` or `https://`
   - **IMPORTANT**: Do NOT include a trailing dot (`.`)
   - Should look like: `prinstine-frontend.onrender.com`
5. **TTL**: `Automatic` (or `300`)
6. Click **Save** (✓)

### Step 5: Verify DNS Records Are Correct

After adding records, your Namecheap DNS should look like:

```
Type    Host    Value                          TTL
A       @       216.24.57.1                    Automatic
A       @       216.24.57.2                    Automatic
A       @       216.24.57.3                    Automatic
A       @       216.24.57.4                    Automatic
CNAME   www     prinstine-frontend.onrender.com Automatic
```

### Step 6: Wait for DNS Propagation

1. **DNS changes can take 5 minutes to 48 hours** (usually 15-30 minutes)
2. **Check propagation status**:
   - Go to: https://dnschecker.org
   - Enter: `prinstinegroup.org`
   - Select: `A Record`
   - Click "Search"
   - You should see the 4 IP addresses from Render appearing globally

### Step 7: Verify in Render

1. Go back to **Render** → Static Site → Settings → Custom Domains
2. The status should change from **"Pending"** to **"Verified"**
3. Once verified, Render will automatically provision the SSL certificate
4. SSL certificate provisioning takes **5-15 minutes** after DNS verification

### Step 8: Test Your Domain

After DNS is verified and SSL is provisioned:

1. Visit: `https://prinstinegroup.org` (wait a few minutes after SSL is ready)
2. Visit: `https://www.prinstinegroup.org`
3. Both should load your website

## Common Mistakes to Avoid

### ❌ Wrong A Record Values
- **Don't use**: Your old hosting IP addresses
- **Don't use**: Random IP addresses
- **Do use**: The exact 4 IP addresses Render provides

### ❌ Wrong CNAME Value
- **Don't use**: `https://prinstine-frontend.onrender.com`
- **Don't use**: `prinstine-frontend.onrender.com.` (with trailing dot)
- **Do use**: `prinstine-frontend.onrender.com` (exact value from Render)

### ❌ Missing A Records
- **Don't**: Add only 1 or 2 A records
- **Do**: Add all 4 A records (Render requires all 4 for redundancy)

### ❌ Wrong Host Value
- **For apex domain**: Use `@` or leave blank (NOT `prinstinegroup.org`)
- **For www**: Use `www` (NOT `www.prinstinegroup.org`)

### ❌ Not Waiting Long Enough
- DNS propagation takes time
- SSL provisioning takes time
- Be patient and check status in Render

## Quick Diagnostic Commands

You can test DNS from your terminal:

```bash
# Check A records for apex domain
dig prinstinegroup.org A

# Check CNAME for www
dig www.prinstinegroup.org CNAME

# Check what your domain resolves to
nslookup prinstinegroup.org
```

Expected output should show Render's IP addresses.

## Still Not Working?

### If DNS is verified but SSL is still pending:
1. Wait 15-30 minutes after DNS verification
2. Check Render logs for SSL errors
3. Try removing and re-adding the domain in Render

### If DNS won't verify:
1. Double-check all 4 A records match Render exactly
2. Double-check CNAME value matches Render exactly
3. Use https://dnschecker.org to verify global propagation
4. Wait up to 48 hours for full propagation
5. Contact Render support with your DNS records

### If site loads but shows "Not Secure":
1. SSL certificate might still be provisioning (wait 15-30 minutes)
2. Clear browser cache
3. Try incognito/private browsing mode
4. Check if "Force HTTPS" is enabled in Render

## Contact Information

- **Render Support**: https://render.com/docs/support
- **Namecheap Support**: https://www.namecheap.com/support/
- **DNS Checker**: https://dnschecker.org

## Next Steps

1. ✅ Verify DNS records in Render
2. ✅ Check current records in Namecheap
3. ✅ Remove incorrect records
4. ✅ Add correct 4 A records + 1 CNAME record
5. ✅ Wait for DNS propagation (check with dnschecker.org)
6. ✅ Wait for DNS verification in Render
7. ✅ Wait for SSL certificate provisioning
8. ✅ Test domain at https://prinstinegroup.org

