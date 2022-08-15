export default {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.ts",
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  features: {
    interactionsDebugger: true,
  },
  "framework": "@storybook/web-components-webpack5",
};
