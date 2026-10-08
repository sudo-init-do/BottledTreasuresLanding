import { promises as fs } from "node:fs";
import path from "node:path";
import { isAdmin } from "@/lib/auth";
import { CONTENT_TYPES, UPLOAD_DIR } from "@/lib/uploads";

export const dynamic = "force-dynamic";

/** Serves uploaded files. Product photos are public; payment receipts are for the owner only. */
export async function GET(_req: Request, { params }: { params: { path: string[] } }) {
  const [kind, name] = params.path;
  if (params.path.length !== 2 || !["products", "proofs"].includes(kind) || !/^[a-z0-9-]+\.(jpg|png|webp|pdf)$/.test(name)) {
    return new Response("Not found", { status: 404 });
  }
  if (kind === "proofs" && !(await isAdmin())) return new Response("Not found", { status: 404 });
  try {
    const file = await fs.readFile(path.join(UPLOAD_DIR, kind, name));
    return new Response(file, {
      headers: {
        "Content-Type": CONTENT_TYPES[name.split(".").pop()!] ?? "application/octet-stream",
        "Cache-Control": kind === "products" ? "public, max-age=31536000, immutable" : "private, no-store",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
