import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solid from "@astrojs/solid-js";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [solid()],
  vite: {
    plugins: [Icons({ compiler: "solid" })],
    ssr: {
      external: ["svgo"],
    },
  },
});
