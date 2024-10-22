//react

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      host: env.VITE_HOST,
      port: env.VITE_PORT,
      "/weather": {
        target: "http://api.weatherapi.com/v1",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/weather/, ""),
      },
    },
  };
});
