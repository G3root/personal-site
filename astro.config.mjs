import { defineConfig } from "astro/config";
import node from '@astrojs/node';
import preact from "@astrojs/preact";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [preact({
    compat: true
  }), compress()],
  output: 'server',
  adapter: node(),
  vite: {
    ssr: {
      external: ["svgo"],
      noExternal: ["ariakit", "ariakit-utils", "react-icons"]
    },
    resolve: {
      alias: {
        "react": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime"
      },
    }
  }
});