import { defineConfig } from "astro/config";
import node from '@astrojs/node';
import preact from "@astrojs/preact";
import compress from "astro-compress";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [preact({
    compat: true
  }), compress(), image()],
  output: 'server',
  adapter: node(),
  vite: {
    ssr: {
      external: ["svgo"],
      noExternal: ["ariakit", "ariakit-utils", "react-icons"]
    }
  }
});