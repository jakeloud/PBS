import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/*": async (req) => {
      const incomingUrl = new URL(req.url);
      const backendUrl = new URL(`${incomingUrl.pathname}${incomingUrl.search}`, "http://localhost:8000");

      return fetch(new Request(backendUrl, req));
    }
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
