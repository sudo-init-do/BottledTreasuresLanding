import "server-only";
import { randomBytes } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { DATA_DIR } from "./db";

export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
export type UploadKind = "products" | "proofs";

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};
export const CONTENT_TYPES: Record<string, string> = Object.fromEntries(Object.entries(TYPES).map(([t, e]) => [e, t]));
const MAX_BYTES = 5 * 1024 * 1024;

/** Saves an uploaded file and returns its public path (/media/<kind>/<name>), or an error message. */
export async function saveUpload(file: Blob, kind: UploadKind, allowPdf = false): Promise<{ path: string } | { error: string }> {
  const ext = TYPES[file.type];
  if (!ext || (ext === "pdf" && !allowPdf)) return { error: allowPdf ? "Upload a JPG, PNG, WebP or PDF file." : "Upload a JPG, PNG or WebP image." };
  if (file.size > MAX_BYTES) return { error: "That file is over 5MB. Try a smaller screenshot or photo." };
  const name = `${Date.now().toString(36)}-${randomBytes(6).toString("hex")}.${ext}`;
  const dir = path.join(UPLOAD_DIR, kind);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return { path: `/media/${kind}/${name}` };
}
