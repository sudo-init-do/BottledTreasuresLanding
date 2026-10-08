# Bottled Treasures

Luxury perfume site and shop for **Bottled Treasures**, Bonny Island, Rivers State. *As long as it smells great.*

Built with Next.js 14 (App Router), TypeScript and Tailwind CSS. Scroll effects use CSS animations and `IntersectionObserver` — no animation libraries.

## Sections

Section order follows shop.seindesignature.com, restyled in the Bottled Treasures look:

1. Scrolling announcement bar
2. Fixed navbar (search overlay, account, cart badge, Shop Now)
3. Full-screen hero carousel (3 slides, autoplay, swipe, keyboard-accessible controls)
4. "Discover Your Most WANTED Collections": 5 tabs (New Arrivals, Best Sellers, Under ₦50,000, Gifts for Him, Gifts for Her), 8 products each
5. Shop by Fragrance Family: Woody, Floral, Spicy
6. Featured collections: alternating image/text rows (Noir, Velvet, Bonny)
7. Home fragrance row (diffusers, candles, room spray) with View All
8. Trending houses: intro, Explore Brands button and brand wordmarks
9. About / brand story with animated stats
10. How to Order: 3 steps
11. Latest from Bottled Treasures (journal)
12. FAQ accordion (8 questions)
13. Newsletter signup
14. Footer
15. "Want access to exclusive deals?" pop-up (shows once per visitor after 6 seconds)

Products live in the shop database (managed from `/admin`). Page content such as the hero, collections, brands, blog, FAQ and contact details lives in `lib/data.ts`.

## Logo

- `components/BrandMark.tsx`: the logo mark as an SVG component (takes the text colour, so it can be gold, cream or ink).
- `public/brand/mark.svg`: the same mark as a file, for use elsewhere.
- `public/brand/tagline.png`: the handwritten "As long as it smells great" line, in gold on transparent.
- `public/brand/logo-original.jpg`: the original artwork it was traced from.
- `app/icon.svg`: browser-tab icon.

## Images

Everything lives in `public/photos` and is served locally. All photos are free stock photography (Pexels licence or CC0), chosen to avoid third-party brand logos; sources are listed in `public/photos/CREDITS.md`.

The product photos are stand-ins. Replace them with photos of the real products before launch, keeping the same file names (see the `slug` of each product in `lib/data.ts`).

## Brand tokens

Defined in `tailwind.config.ts`:

| Token      | Value     |
| ---------- | --------- |
| `ink`      | `#0D0404` |
| `burgundy` | `#6B1A1A` |
| `gold`     | `#C9A84C` |
| `cream`    | `#F5ECD7` |

Fonts: Cormorant Garamond (headings, `font-serif`) and Jost (body, `font-sans`) via `next/font/google`.

## Shop and dashboard

**For customers** (no account needed):

- `/shop`: all products, with filters and search
- `/shop/<product>`: product page
- `/cart` → `/checkout`: details, pickup or delivery, bank transfer, upload payment receipt
- `/order/<code>`: confirmation; `/track`: track an order with its number and phone

**For the owner** (`/admin`, login required):

- **Orders**: see new orders, view the payment receipt, change status (Checking payment → Paid → Dispatched → Completed), WhatsApp the customer
- **Products (inventory)**: stock count per product with − / + buttons (tap the number to type an exact count); badges are red under 5, gold 5–19, green 20+. Add, edit and delete products; changes show on the site straight away. Stock goes down when an order is placed and back up if the order is cancelled; at 0 the product shows as sold out
- **Settings**: bank details shown at checkout, WhatsApp number

Login details come from `.env` (copy `.env.example`). When running locally without a `.env`, the login is `admin@bottledtreasures.ng` / `changeme`.

Orders, receipts and uploaded photos are saved in the `data/` folder (a simple JSON file plus uploads). Back this folder up. The first run fills the shop with the starter products from `lib/seed.ts`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Production deployment (Docker)

The image uses `node:18-alpine`, runs the Next.js standalone server as a non-root user on **port 3000**, and has a health check at `/api/health`.

```bash
cp .env.example .env          # fill in ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_SECRET
docker compose up -d --build  # http://localhost:3000 (change with HOST_PORT in .env)
docker compose logs -f        # watch the logs
```

- **Environment variables**: all listed in `.env.example`. In production the dashboard login stays disabled until `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `SESSION_SECRET` are set.
- **HTTPS**: put the site behind HTTPS (e.g. a reverse proxy such as Caddy, Nginx or your host's load balancer). The login cookie is HTTPS-only; set `COOKIE_SECURE=false` only if you must use the dashboard over plain `http://`.
- **Data**: orders, payment receipts and product photos are stored in the `shop-data` volume (`/app/data`). Back it up, e.g. `docker run --rm -v bottledtreasureslanding_shop-data:/data -v "$PWD":/backup alpine tar czf /backup/shop-data.tgz -C /data .`
- **Updating**: `git pull && docker compose up -d --build`. Data in the volume is kept.
- **Different base image source**: `docker compose build --build-arg NODE_IMAGE=public.ecr.aws/docker/library/node:18-alpine` if Docker Hub rate-limits your server.
