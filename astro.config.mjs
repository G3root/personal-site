import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import node from '@astrojs/node';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [preact({ compat: true })],
  output: 'server',
  adapter: node(),
  vite: {
    ssr: {
      external: ["svgo"]
    },
  }
});