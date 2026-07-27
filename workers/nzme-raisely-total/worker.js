// Serves the live raised total for the NZ Made Energy Raisely campaign.
// Secret RAISELY_KEY set via `wrangler secret put` — never in the repo.
// Cached at the edge for 60s so the page can poll freely.

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    const cache = caches.default;
    const cacheKey = new Request("https://nzme-raisely-total.cache/total");
    let res = await cache.match(cacheKey);

    if (!res) {
      const upstream = await fetch(
        `https://api.raisely.com/v3/profiles/${env.PROFILE_UUID}`,
        { headers: { Authorization: `Bearer ${env.RAISELY_KEY}` } }
      );
      if (!upstream.ok) {
        return new Response(JSON.stringify({ error: "raisely upstream " + upstream.status }), {
          status: 502,
          headers: { "content-type": "application/json", ...corsHeaders() },
        });
      }
      const { data } = await upstream.json();
      const body = JSON.stringify({
        raised: Math.round((data.total ?? 0) / 100),
        goal: Math.round((data.goal ?? 0) / 100),
        currency: data.currency || "NZD",
        campaign: data.path,
        updated: new Date().toISOString(),
      });
      res = new Response(body, {
        headers: {
          "content-type": "application/json",
          "cache-control": "public, max-age=60",
          ...corsHeaders(),
        },
      });
      ctx.waitUntil(cache.put(cacheKey, res.clone()));
    } else {
      res = new Response(res.body, res);
      Object.entries(corsHeaders()).forEach(([k, v]) => res.headers.set(k, v));
    }
    return res;
  },
};

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, OPTIONS",
  };
}
