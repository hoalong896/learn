import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const BUCKET      = process.env.NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET ?? "nestjs-videos";
const LOCAL_BASE  = process.env.VIDEO_BASE_PATH ?? "C:\\Users\\God\\Downloads\\NEXTJS";

export async function GET(req: NextRequest) {
  const filePath = req.nextUrl.searchParams.get("f");
  if (!filePath) return new Response("Missing path", { status: 400 });

  // Production: redirect to Supabase CDN
  if (SUPABASE_URL) {
    const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodedPath}`;
    return NextResponse.redirect(publicUrl, 302);
  }

  // Development only: stream from local filesystem via dynamic import
  const [fs, path] = await Promise.all([
    import("fs"),
    import("path"),
  ]);

  const resolved = path.resolve(LOCAL_BASE, filePath);
  if (!resolved.startsWith(path.resolve(LOCAL_BASE))) {
    return new Response("Forbidden", { status: 403 });
  }
  if (!fs.existsSync(resolved)) {
    return new Response("Not found", { status: 404 });
  }

  const stat  = fs.statSync(resolved);
  const total = stat.size;
  const range = req.headers.get("range");
  const ext   = path.extname(resolved).toLowerCase();
  const mime  = ext === ".webm" ? "video/webm" : "video/mp4";

  if (range) {
    const parts = range.replace("bytes=", "").split("-");
    const start = parseInt(parts[0], 10);
    const end   = parts[1] ? parseInt(parts[1], 10) : Math.min(start + 2 * 1024 * 1024 - 1, total - 1);
    const nodeStream = fs.createReadStream(resolved, { start, end });
    const readable = new ReadableStream({
      start(c) { nodeStream.on("data", d => c.enqueue(d)); nodeStream.on("end", () => c.close()); nodeStream.on("error", e => c.error(e)); },
      cancel()  { nodeStream.destroy(); },
    });
    return new Response(readable, {
      status: 206,
      headers: {
        "Content-Range":  `bytes ${start}-${end}/${total}`,
        "Accept-Ranges":  "bytes",
        "Content-Length": String(end - start + 1),
        "Content-Type":   mime,
      },
    });
  }

  const nodeStream = fs.createReadStream(resolved);
  const readable = new ReadableStream({
    start(c) { nodeStream.on("data", d => c.enqueue(d)); nodeStream.on("end", () => c.close()); nodeStream.on("error", e => c.error(e)); },
    cancel()  { nodeStream.destroy(); },
  });
  return new Response(readable, {
    headers: { "Content-Length": String(total), "Content-Type": mime, "Accept-Ranges": "bytes" },
  });
}
