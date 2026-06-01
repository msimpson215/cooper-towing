# Cooper's Automotive & Towing

Static website matching your landing-page design. Open `index.html` in a browser, or run a local server:

```powershell
cd c:\Users\Marty\Desktop\cooper-towing
python -m http.server 8080
```

Then visit http://localhost:8080

## What works

- **Call buttons** — `tel:6186718770` (works on phones; on desktop opens your default dialer app if configured)
- **Request Service** — modal form; submits via email draft (set `DISPATCH_EMAIL` in `js/main.js` or use [FormSubmit](https://formsubmit.co) / Formspree for automatic delivery
- **Navigation** — Towing & Automotive dropdowns, About & Contact sections
- **Mobile menu** — hamburger on smaller screens

## GitHub + Render (recommended)

**GitHub** holds your code. **Render** hosts the live site and redeploys when you push.

### Step 1 — Push to GitHub

1. Create an empty repo at https://github.com/new (e.g. `cooper-towing`).
2. In PowerShell:

```powershell
cd c:\Users\Marty\Desktop\cooper-towing
git init
git add .
git commit -m "Cooper's towing website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cooper-towing.git
git push -u origin main
```

### Step 2 — Connect Render (same as Howard Tree)

1. Sign in at https://render.com (use **Sign in with GitHub**).
2. **Dashboard → New + → Web Service** (Node, not Static Site).
3. Connect the **`cooper-towing`** repo (standalone — not A1-test).
4. Use these settings:

| Setting | Value |
|---------|--------|
| **Root directory** | *(leave blank)* |
| **Build command** | `npm install` |
| **Start command** | `npm start` |

5. Click **Create Web Service**. No API keys needed unless you add email/API integrations later.

Every `git push` to `main` triggers a new deploy automatically.

### Optional: custom domain

In Render: your site → **Settings → Custom Domains** → add e.g. `cooperstowing.com` and follow the DNS instructions.

---

## GitHub Pages (alternative, no Render)

**Settings → Pages → Deploy from branch → `main` / root** → `https://YOUR_USERNAME.github.io/cooper-towing/`

## Customize

- Replace placeholder contact form email in `index.html` (`formsubmit.co/...`) with your real address
- Set `DISPATCH_EMAIL` in `js/main.js` for the service request modal
- Swap `images/hero.png` if you have a real photo of your truck
