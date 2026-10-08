// Renders every scene in a specs file to PNG.
// Usage: node render.mjs specs.json out        (ONLY=p-ruby-oud,hero-1 to render a subset)
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const [specFile = "specs.json", outDir = "out"] = process.argv.slice(2);
const specs = JSON.parse(await readFile(specFile, "utf8"));
await mkdir(outDir, { recursive: true });

const types = { ".html": "text/html", ".js": "text/javascript", ".woff2": "font/woff2" };
const root = process.cwd();
const server = createServer(async (req, res) => {
  try {
    const path = normalize(join(root, decodeURIComponent(req.url.split("?")[0])));
    if (!path.startsWith(root)) throw new Error("outside root");
    res.writeHead(200, { "content-type": types[extname(path)] || "application/octet-stream" });
    res.end(await readFile(path));
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader", "--ignore-gpu-blocklist"] });
const only = process.env.ONLY?.split(",");
for (const [name, spec] of Object.entries(specs)) {
  if (only && !only.includes(name)) continue;
  const page = await browser.newPage({ viewport: { width: spec.w || 1200, height: spec.h || 1500 } });
  await page.goto(`http://127.0.0.1:${port}/render.html#${encodeURIComponent(JSON.stringify(spec))}`);
  await page.waitForFunction(() => window.renderDone, null, { timeout: 240000 });
  await page.locator("canvas").screenshot({ path: `${outDir}/${name}.png` });
  console.log("rendered", name);
  await page.close();
}
await browser.close();
server.close();
