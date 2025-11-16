/**
 * @file Vite build configuration
 */

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      include: ["src/**/*"],
      exclude: ["src/**/*.spec.ts", "src/**/*.tmp.ts"],
      outDir: "dist",
    }),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: {
        index: "src/index.ts",
        "dynamodb/index": "src/dynamodb/index.ts",
      },
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [/node:.+/],
    },
  },
});
