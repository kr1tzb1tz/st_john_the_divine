import { Env, corsHeaders } from "./types";

const SERMON_KEY = "current.mp3";

export async function handleSermon(request: Request, env: Env): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const object = await env.SAMPLE_SERMON_BUCKET.get(SERMON_KEY, {
    range: request.headers,
    onlyIf: request.headers,
  });

  if (!object) {
    return new Response("Sermon not found", { status: 404, headers: corsHeaders });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Content-Type", "audio/mpeg");
  headers.set("Accept-Ranges", "bytes");

  // Add CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  // Handle range requests for seeking
  if (object.range) {
    const { offset, length } = object.range as { offset: number; length: number };
    headers.set("Content-Range", `bytes ${offset}-${offset + length - 1}/${object.size}`);
    headers.set("Content-Length", String(length));
    return new Response(object.body, { status: 206, headers });
  }

  headers.set("Content-Length", String(object.size));
  return new Response(object.body, { headers });
}
