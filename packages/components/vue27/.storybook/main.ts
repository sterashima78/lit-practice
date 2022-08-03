export default {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.ts",
  ],
  "addons": [
    "@storybook/addon-essentials",
  ],
  "framework": "@storybook/vue-webpack5",
  webpackFinal: async (config) => {
    const loader = config.module.rules.find(({ loader }) => typeof loader === "string" && loader.match("vue-loader"));
    if (loader) {
      loader.options = {
        ...(loader.options || {}),
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith("my-"),
        },
      };
    }
    return config;
  },
};
