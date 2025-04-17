/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Use Jest-compatible globals (describe, it, expect, vi)
    environment: "jsdom", // Use jsdom for DOM testing
    setupFiles: [], // Add setup files if needed (e.g., for global mocks)
    coverage: {
      provider: "v8", // Use V8 for coverage
      reporter: ["text", "json", "html"], // Coverage reporters
    },
    // Optional: Configure Vitest UI
    // ui: true,
    // open: true, // Automatically open UI in browser
  },
});
