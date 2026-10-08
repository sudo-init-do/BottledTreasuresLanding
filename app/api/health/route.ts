import { promises as fs } from "node:fs";
import { DATA_DIR } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Used by the Docker health check: the app is up and its data folder is writable. */
export async function GET() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_DIR, fs.constants.W_OK);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "data directory is not writable" }, { status: 503 });
  }
}
