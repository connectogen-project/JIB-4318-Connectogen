import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: ["src/index.js"],
  clean: true,
  format: ["cjs"],
  ...options,
}));