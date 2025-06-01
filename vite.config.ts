import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "src",
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          msal: ["@azure/msal-browser", "@azure/msal-react"],
          fluentui: ["@fluentui/react-components"],
          router: ["react-router-dom"],
        },
      },
    },
  },
  publicDir: "../public",
});
