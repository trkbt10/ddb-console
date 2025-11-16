/**
 * @file Vite build configuration
 */

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      include: ["src/dynamodb/**/*.ts"],
      exclude: ["src/**/*.spec.ts", "src/**/*.tmp.ts"],
      outDir: "dist",
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: {
        index: "src/dynamodb/index.ts",
      },
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [/node:.+/],
    },
  },
});
