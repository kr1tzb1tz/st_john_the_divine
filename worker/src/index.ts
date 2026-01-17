import { Env, corsHeaders } from "./types";
import { handleInquiry } from "./inquiries";
import { handleSermon } from "./sermon";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Route requests
    switch (url.pathname) {
      case "/inquiry":
        return handleInquiry(request, env);
      case "/sermon":
        return handleSermon(request, env);
      default:
        return Response.json(
          { success: false, detail: "Not found" },
          { status: 404, headers: corsHeaders }
        );
    }
  },
};
