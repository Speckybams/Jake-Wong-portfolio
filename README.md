# Jake Wong Portfolio

Local rebuild of the former Wix site, ready to host on jake-wong.com.

## Preview locally

From this folder:

```
python -m http.server 8080
```

Then open http://localhost:8080

## Go live on jake-wong.com

This repo deploys through **Cloudflare Pages** connected to GitHub. After you push to `main`, Cloudflare rebuilds the site automatically.

### Push updates

```powershell
git add .
git commit -m "Describe your change"
git push
```

Then check **Cloudflare Dashboard → Workers & Pages → your project → Deployments**. The latest deployment should show **Success**. Hard-refresh jake-wong.com with Ctrl+Shift+R.

### If changes do not appear live

1. **Confirm GitHub has the latest code** — open your repo on GitHub and check `index.html`.
2. **Check Cloudflare Pages is connected to this repo** — Build → Compute → your Pages project → Settings → Builds & deployments → Connected Git repository should be `Speckybams/Jake-Wong-portfolio`, branch `main`.
3. **Check the deployment did not fail** — a single file over **25 MB** will fail the build. Large videos should be hosted externally (linked by URL), not uploaded to this repo.
4. **Purge cache** — Cloudflare → your domain → Caching → Purge Everything (only if the deployment succeeded but the browser still shows old content).

Upload this folder to Cloudflare Pages, Netlify, or GitHub Pages. A CNAME file is included.

## Contact form

The contact form opens an email to jake.w@volugraph.com. Change that address in assets/js/main.js if needed.
