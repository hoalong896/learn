import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const BUCKET = process.env.SUPABASE_VIDEO_BUCKET ?? "nestjs-videos";
const LOCAL_BASE = process.env.VIDEO_BASE_PATH ?? "C:\\Users\\God\\Downloads\\NEXTJS";

function srtToVtt(srt: string): string {
  return (
    "WEBVTT\n\n" +
    srt
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/^\d+\s*\n/gm, "")
      .replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2")
      .trim()
  );
}

export async function GET(req: NextRequest) {
  const filePath = req.nextUrl.searchParams.get("f");
  if (!filePath) return new Response("Missing path", { status: 400 });

  // Production: fetch .srt from Supabase, convert to VTT
  if (SUPABASE_URL) {
    const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
    const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodedPath}`;
    try {
      const res = await fetch(url);
      if (!res.ok) return new Response("Not found", { status: 404 });
      const srt = await res.text();
      return new Response(srtToVtt(srt), {
        headers: {
          "Content-Type": "text/vtt; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch {
      return new Response("Failed to fetch subtitle", { status: 500 });
    }
  }

  // Development: read from local filesystem
  const resolved = path.resolve(LOCAL_BASE, filePath);
  if (!resolved.startsWith(path.resolve(LOCAL_BASE))) {
    return new Response("Forbidden", { status: 403 });
  }
  if (!fs.existsSync(resolved)) {
    return new Response("Not found", { status: 404 });
  }

  const srt = fs.readFileSync(resolved, "utf-8");
  return new Response(srtToVtt(srt), {
    headers: {
      "Content-Type": "text/vtt; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
