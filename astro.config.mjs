import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import compress from "astro-compress";
import image from "@astrojs/image";
import vitePreact from "@preact/preset-vite";
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact({
      compat: true,
    }),
    compress(),
    image(),
    prefetch(),
  ],
  output: "server",
  adapter: node(),
  vite: {
    plugins: [vitePreact()],
    ssr: {
      external: ["svgo"],
      noExternal: ["ariakit", "ariakit-utils", "react-icons"],
    },
  },
});
