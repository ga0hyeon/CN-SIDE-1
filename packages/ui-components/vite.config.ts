import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "ui-components",
      // 적절한 확장자가 추가됩니다.
      fileName: "ui-components",
    },
  },
});
