import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import compress from "astro-compress";
import image from "@astrojs/image";
import prefetch from "@astrojs/prefetch";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), compress(), image(), prefetch()],
  output: "server",
  adapter: node(),
  vite: {
    ssr: {
      external: ["svgo"],
      noExternal: ["solid-bottomsheet", "solid-headless", "solid-use"],
    },
  },
});
