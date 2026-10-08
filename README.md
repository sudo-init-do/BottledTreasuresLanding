# Bottled Treasures — Landing Site

Luxury perfume marketing site for **Bottled Treasures**, Lagos. *As long as it smells great.*

Built with Next.js 14 (App Router), TypeScript and Tailwind CSS. Scroll effects use CSS animations and `IntersectionObserver` — no animation libraries.

## Sections

1. Scrolling announcement bar
2. Fixed navbar (search overlay, account, cart badge, Shop Now)
3. Full-screen hero carousel (3 slides, autoplay, swipe, keyboard-accessible controls)
4. "Discover Your Most WANTED Collections" tabs — New Arrivals / Best Sellers / Under ₦50,000
5. Shop by Fragrance Family — Woody, Floral, Spicy
6. Brand story with animated stats
7. How to Order — 3 steps
8. Latest from Bottled Treasures (journal)
9. FAQ accordion
10. Newsletter signup
11. Footer

All store links point to `https://shop.bottledtreasures.ng` (see `lib/data.ts`). Product, blog, FAQ and contact content lives in `lib/data.ts`. Images are CSS/SVG placeholders (`components/Placeholder.tsx`) — swap them for real photography when available.

## Brand tokens

Defined in `tailwind.config.ts`:

| Token      | Value     |
| ---------- | --------- |
| `ink`      | `#0D0404` |
| `burgundy` | `#6B1A1A` |
| `gold`     | `#C9A84C` |
| `cream`    | `#F5ECD7` |

Fonts: Cormorant Garamond (headings, `font-serif`) and Jost (body, `font-sans`) via `next/font/google`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Docker

```bash
docker compose up --build   # http://localhost:3000
```

The Dockerfile is a multi-stage build using Next.js `standalone` output.
