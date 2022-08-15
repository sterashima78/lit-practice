import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "my-card": "src/Card/my-card.ts",
    "my-tab-group": "src/Tabs/my-tab-group.ts",
    "my-tab-panel": "src/Tabs/my-tab-panel.ts",
    "my-tab": "src/Tabs/my-tab.ts",
    "my-accordion": "src/Accordion/my-accordion.ts",
  },
  outDir: "lib",
  format: [
    "esm",
    "cjs",
  ],
  dts: true,
  sourcemap: true,
  clean: true,
});
