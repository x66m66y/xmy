import { copyFile, mkdir, writeFile } from "node:fs/promises";

await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });

const worker = `const worker = {
  async fetch(request, env) {
    if (!env?.ASSETS?.fetch) {
      return new Response("Static asset binding is unavailable", { status: 500 });
    }

    const response = await env.ASSETS.fetch(request);
    if (
      response.status !== 404 ||
      request.method !== "GET" ||
      !(request.headers.get("accept") || "").includes("text/html")
    ) {
      return response;
    }

    const indexUrl = new URL("/index.html", request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};

export default worker;
`;

await writeFile("dist/server/index.js", worker);
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
