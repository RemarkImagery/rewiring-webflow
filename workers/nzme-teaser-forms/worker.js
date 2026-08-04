// Stores pre-campaign pledges + auction-item donation offers for the
// Operation Laser Kiwi teaser page. Submissions land in the NZME_TEASER KV
// namespace. Secret LIST_KEY (wrangler secret put LIST_KEY) gates /list.
//
//   POST /            {type: "pledge"|"auction-item", name, email, ...}
//   GET  /list?key=X  JSON dump of all submissions, newest first

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request, env) {
    const cors = {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/list") {
      if (!env.LIST_KEY || url.searchParams.get("key") !== env.LIST_KEY) {
        return json({ error: "unauthorised" }, 401, cors);
      }
      const list = await env.NZME_TEASER.list({ limit: 1000 });
      const entries = [];
      for (const k of list.keys) {
        const v = await env.NZME_TEASER.get(k.name, "json");
        if (v) entries.push({ key: k.name, ...v });
      }
      entries.sort((a, b) => (a.at < b.at ? 1 : -1));
      const pledges = entries.filter((e) => e.type === "pledge");
      const items = entries.filter((e) => e.type === "auction-item");
      return json({ total: entries.length, pledges: pledges.length, auctionItems: items.length, entries }, 200, cors);
    }

    if (request.method === "POST") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "bad json" }, 400, cors);
      }
      if (body.hp) return json({ ok: true }, 200, cors); // honeypot - swallow silently
      const type =
        body.type === "auction-item" ? "auction-item" : body.type === "pledge" ? "pledge" : null;
      if (!type) return json({ error: "bad type" }, 400, cors);
      const name = String(body.name || "").trim().slice(0, 200);
      const email = String(body.email || "").trim().slice(0, 200);
      if (!name) return json({ error: "name required" }, 400, cors);
      if (!EMAIL_RE.test(email)) return json({ error: "valid email required" }, 400, cors);
      const entry = {
        type,
        name,
        email,
        phone: String(body.phone || "").trim().slice(0, 60),
        business: String(body.business || "").trim().slice(0, 200),
        offer: String(body.offer || "").trim().slice(0, 2000),
        value: String(body.value || "").trim().slice(0, 60),
        amount: String(body.amount || "").trim().slice(0, 60),
        message: String(body.message || "").trim().slice(0, 2000),
        at: new Date().toISOString(),
        ip: request.headers.get("cf-connecting-ip") || "",
        country: (request.cf && request.cf.country) || "",
        ua: (request.headers.get("user-agent") || "").slice(0, 300),
      };
      const key = `${type}:${entry.at}:${crypto.randomUUID().slice(0, 8)}`;
      await env.NZME_TEASER.put(key, JSON.stringify(entry));
      return json({ ok: true }, 200, cors);
    }

    return json({ error: "not found" }, 404, cors);
  },
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", ...cors },
  });
}
