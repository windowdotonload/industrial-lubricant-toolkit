import { defineConfig, loadEnv } from "vite";
import path from "path";
import vueSfc from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteExternalsPlugin } from "vite-plugin-externals";

export default defineConfig(({ command, mode }) => {
  const ENV = loadEnv(mode, process.cwd());
  return {
    base: "./",
    build: {
      outDir: "tool",
    },
    plugins: [
      vueSfc(),
      vueJsx(),
      viteExternalsPlugin({
        vue: "Vue",
        VueRouter: "VueRouter",
        vant: "vant",
        echarts: "echarts",
      }),
      createHtmlPlugin({
        inject: {
          data: {
            vueCdnScript: ENV.VITE_VUE_CDN,
          },
        },
      })
    ],
    rollupOptions: {
      external: ["vue", "VueRouter", "vant"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "https://dev-mobilserv.mobil.com.cn/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
