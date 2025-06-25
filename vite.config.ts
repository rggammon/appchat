import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  root: "src",
  plugins: [
    react(),
    basicSsl({ name: "local.vibetato.com", domains: ["localhost"] }),
  ],
  server: {
    port: 3000,
    open: true,
    https: true, // Enable self-signed HTTPS for local development
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
          appinsights: [
            "@microsoft/applicationinsights-web",
            "@microsoft/applicationinsights-react-js",
          ],
        },
      },
    },
  },
  publicDir: "../public",
  envDir: "..",
});
