import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const store = getStore("club-attendance");

  if (req.method === "GET") {
    const data = await store.get("state", { type: "json" });
    return new Response(JSON.stringify(data ?? null), {
      headers: { "content-type": "application/json" }
    });
  }

  if (req.method === "POST") {
    const body = await req.json();
    await store.setJSON("state", body);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json" }
    });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/data"
};
