import "server-only";
import { randomBytes } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { seedDatabase } from "./seed";
import type { Database } from "./types";

/**
 * A tiny JSON-file database. Fine for a single shop with a few hundred orders;
 * all reads and writes go through here so it can be swapped for a real database later.
 */
export const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

let queue: Promise<unknown> = Promise.resolve();

let seeding: Promise<void> | null = null;

/** Creates the database from the starter products the first time the site runs (once, even under concurrent requests). */
function ensureSeeded() {
  seeding ??= fs
    .access(DB_FILE)
    .catch(() => save(seedDatabase()))
    .catch((e) => {
      seeding = null; // try again on the next request
      throw e;
    });
  return seeding;
}

async function load(): Promise<Database> {
  await ensureSeeded();
  return upgrade(JSON.parse(await fs.readFile(DB_FILE, "utf8")));
}

/** Brings data saved by older versions of the site up to date. */
function upgrade(db: Database): Database {
  for (const p of db.products as (Database["products"][number] & { inStock?: boolean })[]) {
    if (typeof p.stock !== "number") p.stock = p.inStock === false ? 0 : 10;
    delete p.inStock;
    // the business moved its naming from Lagos to Bonny Island
    p.tags = p.tags.map((t) => ((t as string) === "lagos" ? "bonny" : t));
    if (p.slug === "lagos-nights") {
      p.slug = "bonny-nights";
      p.name = "Bonny Nights";
      p.image = "/photos/products/bonny-nights.jpg";
    }
    p.description = p.description.replace(/Lagos Nights/g, "Bonny Nights").replace(/Hand-picked in Lagos/g, "Hand-picked on Bonny Island");
  }
  for (const o of db.orders) {
    if ((o.delivery as string) === "lagos") o.delivery = "island";
    for (const i of o.items) if (i.slug === "lagos-nights") Object.assign(i, { slug: "bonny-nights", name: "Bonny Nights", image: "/photos/products/bonny-nights.jpg" });
  }
  return db;
}

async function save(db: Database) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.${randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2));
  await fs.rename(tmp, DB_FILE);
}

export async function readDb(): Promise<Database> {
  await queue;
  return load();
}

/** Run a change against the database; changes are applied one at a time. */
export function updateDb<T>(fn: (db: Database) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const db = await load();
    const result = await fn(db);
    await save(db);
    return result;
  });
  queue = run.catch(() => undefined);
  return run;
}
