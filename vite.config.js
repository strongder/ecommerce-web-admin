import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "define-global",
      transformIndexHtml(html) {
        return html.replace(
          /<\/head>/,
          `<script>window.global = window;</script></head>`
        );
      },
    },
  ],
});
