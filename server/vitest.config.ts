import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "^(\\.{1,2}/.*)\\.js$": "$1.ts",
    },
  },
});
