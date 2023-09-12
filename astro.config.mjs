import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import compress from "astro-compress";
import prefetch from "@astrojs/prefetch";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), compress(), prefetch()],
  output: "server",
  adapter: node({ mode: "standalone" }),
  vite: {
    ssr: {
      external: ["svgo"],
      noExternal: ["solid-bottomsheet", "solid-headless", "solid-use"],
    },
  },
});
