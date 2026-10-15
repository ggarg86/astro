# Staging and production

| | Production | Staging |
|---|---|---|
| Git branch | `main` | `staging` |
| Site | https://cnp.brainmanual.in | Vercel branch URL for `staging` |
| Backend | Current Apps Script + Sheet | Separate Apps Script copy + separate Sheet |
| Data | Real users | Fake test users only |

`config.js` chooses the backend by hostname. Only `cnp.brainmanual.in` uses production; every other address (localhost, Vercel previews, the staging URL) uses staging and shows an amber **STAGING** pill in the bottom-left corner. If the staging URL is missing, the pill says "backend not set" and server calls fail. They never fall back to production.

## One-time setup

### 1. Copy the backend (Google)

1. Open the production Google Sheet in Drive. **File → Make a copy**, and name it `CNP – STAGING`.
   - If the Apps Script is attached to the Sheet (**Extensions → Apps Script** opens it), the copy brings its own copy of the script. Continue to step 2.
   - If the script is a separate file in Drive, make a copy of that file too. In the copy, replace the production Sheet ID (the long ID in the Sheet's URL) with the staging Sheet's ID.
2. In the **staging** Sheet, delete every data row on every tab and keep the header rows.
3. Add test users by hand in the users tab:
   - one admin
   - one active user with course + sessions access
   - one expired user (`valid_until` in the past)
   - one user with no course access

   Use fake names and fake mobile numbers (e.g. `9000000001`–`9000000004`), never real customer data.

### 2. Deploy the staging backend

1. Open the **staging** script. Click **Deploy → New deployment → Web app**.
2. Set Execute as: **Me** and Who has access: **Anyone**, the same settings as production.
3. Click **Deploy** and copy the web app URL (it ends in `/exec`).
4. Paste it into `config.js` as `API_URLS.staging`.

### 3. Staging site (Vercel)

1. Push the `staging` branch to GitHub. Vercel builds it automatically as a preview.
2. In Vercel → Project → **Deployments**, open the `staging` build and copy its branch URL (it looks like `astro-git-staging-….vercel.app`). That URL stays the same for every later push to `staging`.
3. Check Settings → Git → **Production Branch** is `main`, so only `main` deploys to `cnp.brainmanual.in`.
4. Optional: Settings → **Deployment Protection** set to Vercel Authentication keeps the staging URL private to your team.

## Everyday workflow

1. Make changes on `staging`. Backend changes go into the **staging** script first, then **Deploy → Manage deployments → Edit → New version** so the URL stays the same.
2. Test on the staging URL (look for the STAGING pill).
3. When happy, merge `staging` into `main`. For backend changes, paste the same code into the **production** script and publish a new version of its existing deployment.
4. Check the live site.
