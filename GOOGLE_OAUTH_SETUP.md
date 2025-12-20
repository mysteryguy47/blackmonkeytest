# Google OAuth Test Users Configuration

## Issue: All Gmail accounts can sign in, not just test users

This happens when your OAuth consent screen is **not** in "Testing" mode, or when it's in Testing mode but the restriction isn't properly configured.

## Solution:

### Step 1: Check OAuth Consent Screen Status

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **OAuth consent screen**
3. Check the **Publishing status** at the top

### Step 2: Set to Testing Mode

If the status is **"In production"**, you need to change it to **"Testing"**:

1. Click **"BACK TO TESTING"** button (if available)
2. Or click **"EDIT APP"** and change the **User Type** to **"Testing"**
3. **Save** the changes

### Step 3: Add Test Users

1. Scroll down to the **"Test users"** section
2. Click **"+ ADD USERS"**
3. Add the Gmail addresses that should be allowed to sign in
4. Click **"ADD"**
5. **Save** the changes

### Step 4: Verify Configuration

- **Publishing status** should show: **"Testing"**
- **Test users** section should list only the allowed email addresses
- **Save** all changes

## Important Notes:

- **Testing mode**: Only test users you add can sign in
- **In production**: Anyone with a Google account can sign in (requires app verification for sensitive scopes)
- Changes may take a few minutes to propagate
- If you need to allow more users, add them to the test users list
- To allow everyone, publish the app (requires verification for sensitive scopes)

## Current Configuration Check:

Your app should be in **Testing** mode with only your 2 test user emails listed in the **Test users** section.

