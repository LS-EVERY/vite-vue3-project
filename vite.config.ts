import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src") //设置@指向src
    }
  },
  base: "./", // 设置打包路径
  server: {
    port: 2021, // 端口号
    open: true, // 是否自动打开浏览器
    cors: true, // 允许跨域
    proxy: {
      "/api": {
        target: "http:xxx.xxxxx.xxx",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace("/api/", "/")
      }
    }
  }
});
