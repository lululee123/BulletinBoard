import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@@constants": path.resolve(__dirname, "./src/constants"),
      "@@features": path.resolve(__dirname, "./src/features"),
      "@@pages": path.resolve(__dirname, "./src/pages"),
      "@@components": path.resolve(__dirname, "./src/components"),
      "@@api": path.resolve(__dirname, "./src/api"),
      "@@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
