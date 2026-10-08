# Bottle renderer

Makes the 3D product shots used on the site (`public/images/products`, `hero`, `collections`, `home`, `journal`, `story`, `popup.jpg`).

```bash
cd tools/bottle-renderer
npm install
npx playwright install chromium   # first time only
npm run render                    # writes PNGs to ./out
ONLY=p-ruby-oud npm run render    # just one scene
```

Each entry in `specs.json` is one image. To add a product, copy a `p-…` entry and change:

| Field | Meaning |
| --- | --- |
| `shape` | `square`, `flat`, `round`, `tall`, `classic`, `vial`, `jar` |
| `cap` | `facet`, `cube`, `sphere`, `dome`, `tall`, `spray`, `none` |
| `capMat` | `gold`, `brushed`, `lacquer`, `burg` |
| `liquid` | juice colour, e.g. `#8c1020` |
| `name`, `sub` | text printed on the label |

Then convert the PNG to JPEG and save it as `public/images/products/<slug>.jpg`, matching the product's `slug` in `lib/data.ts`. When you have real product photography, just replace the JPEG with the same file name.
