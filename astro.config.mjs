import { defineConfig } from "astro/config";
import compress from "astro-compress";
import prefetch from "@astrojs/prefetch";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), compress(), prefetch()],
  output: "server",
  adapter: vercel(),
  vite: {
    ssr: {
      external: ["svgo"],
      noExternal: ["solid-bottomsheet"],
    },
  },
});
