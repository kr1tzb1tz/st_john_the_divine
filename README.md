# St. John the Divine — Parish Website

Static parish website built with Next.js, deployed to Cloudflare Pages with a Cloudflare Worker for contact form handling.

## Stack

- **Frontend**: Next.js 16, React 19, MUI, react-big-calendar
- **Worker**: Cloudflare Worker (TypeScript) for contact form → Pushover notifications
- **Hosting**: Cloudflare Pages (frontend) + Cloudflare Workers (API)
- **Calendar**: Google Calendar API (fetched at build time)

## Structure

```
├── frontend/          # Next.js site
│   ├── components/    # React components with hardcoded content
│   ├── pages/         # Next.js pages
│   ├── public/images/ # Static images (webp format)
│   └── api.ts         # Calendar fetch & form submission
├── worker/            # Cloudflare Worker
│   └── src/
│       ├── index.ts      # Router
│       ├── types.ts      # Shared types
│       ├── inquiries.ts  # Contact form handler
│       └── sermon.ts     # Sermon audio handler (R2)
└── .github/workflows/ # Auto-deploy worker on push
```

## Local Development

### Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

### Worker
```bash
cd worker
pnpm install
pnpm run dev
```

Create `worker/.dev.vars` for local secrets:
```
PUSHOVER_API_TOKEN=your_token_here
PUSHOVER_USER_KEYS=key1,key2,key3
```

## Deployment

### Frontend (Cloudflare Pages)
1. Connect repo to Cloudflare Pages
2. Build command: `cd frontend && pnpm install && pnpm build`
3. Output directory: `frontend/.next`
4. Environment variables:
   - `NEXT_PUBLIC_WORKER_URL` - Worker URL
   - `NEXT_PUBLIC_GOOGLE_API_KEY` - Google Calendar API key

### Worker (Auto-deploy)
Deploys automatically via GitHub Actions when `worker/**` files change on `main`. These are assigned in the repository's secrets and used in the `.github/workflows/deploy-worker.yml` script on deploy.

**Required GitHub secret 1**: `CLOUDFLARE_API_TOKEN`
**Required GitHub secret 2**: `CLOUDFLARE_ACCOUNT_ID`

**Worker secrets** (set via wrangler):
```bash
cd worker
npx wrangler secret put PUSHOVER_API_TOKEN
npx wrangler secret put PUSHOVER_USER_KEYS  # comma-separated for multiple recipients
```

### Sermon Audio (R2)

The sermon audio is served from Cloudflare R2 for range request support (seeking).

**Initial setup:**
```bash
cd worker
npx wrangler r2 bucket create stjohns-sample-sermon
```

**Upload sermon (production):**
```bash
cd worker
npx wrangler r2 object put stjohns-sample-sermon/current.mp3 --file="path/to/sermon.mp3"
```

**Upload sermon (local testing):**
```bash
cd worker
npx wrangler r2 object put stjohns-sample-sermon/current.mp3 --file="path/to/sermon.mp3" --local
```

To update the sermon, simply upload a new file with the same command. The change takes effect immediately (no redeploy needed).

## Content Updates

Content is hardcoded in components. To modify:
- Edit files in `frontend/components/`
- Add images to `frontend/public/images/` (use webp format)
- For seasonal sales, uncomment nav items in `Navbar.tsx`

## Scripts

- `node frontend/scripts/convert_to_webp.js <path>` - Convert images to webp format
  - Accepts a single file or directory
  - Options: `-q <quality>` (1-100, default 80), `-d` (delete originals)

- `node frontend/scripts/compress_webp.js <path>` - Compress webp files under a target size
  - Reduces quality and/or dimensions until file is under target size
  - Options: `-s <size>` (max size in KB, default 500)

## License

Private use for St. John the Divine Greek Orthodox Church.
