import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  base: "./",
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: "dist",
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});

