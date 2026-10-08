# Bottled Treasures — Landing Site

Luxury perfume marketing site for **Bottled Treasures**, Lagos. *As long as it smells great.*

Built with Next.js 14 (App Router), TypeScript and Tailwind CSS. Scroll effects use CSS animations and `IntersectionObserver` — no animation libraries.

## Sections

Section order follows shop.seindesignature.com, restyled in the Bottled Treasures look:

1. Scrolling announcement bar
2. Fixed navbar (search overlay, account, cart badge, Shop Now)
3. Full-screen hero carousel (3 slides, autoplay, swipe, keyboard-accessible controls)
4. "Discover Your Most WANTED Collections": 5 tabs (New Arrivals, Best Sellers, Under ₦50,000, Gifts for Him, Gifts for Her), 8 products each
5. Shop by Fragrance Family: Woody, Floral, Spicy
6. Featured collections: alternating image/text rows (Noir, Velvet, Lagos)
7. Home fragrance row (diffusers, candles, room spray) with View All
8. Trending houses: intro, Explore Brands button and brand wordmarks
9. About / brand story with animated stats
10. How to Order: 3 steps
11. Latest from Bottled Treasures (journal)
12. FAQ accordion (8 questions)
13. Newsletter signup
14. Footer
15. "Want access to exclusive deals?" pop-up (shows once per visitor after 6 seconds)

All store links point to `https://shop.bottledtreasures.ng`. Products, collections, brands, blog, FAQ and contact details live in `lib/data.ts`.

## Logo

- `components/BrandMark.tsx`: the logo mark as an SVG component (takes the text colour, so it can be gold, cream or ink).
- `public/brand/mark.svg`: the same mark as a file, for use elsewhere.
- `public/brand/tagline.png`: the handwritten "As long as it smells great" line, in gold on transparent.
- `public/brand/logo-original.jpg`: the original artwork it was traced from.
- `app/icon.svg`: browser-tab icon.

## Images

Everything lives in `public/images` and is served locally. All photos are free stock photography (Pexels licence or CC0), chosen to avoid third-party brand logos; sources are listed in `public/images/CREDITS.md`.

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
