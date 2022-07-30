export default {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.tsx",
  ],
  "addons": [
    "@storybook/addon-essentials",
  ],
  "framework": "@storybook/react-webpack5",
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
     fallback: {
       ...config.resolve.fallback,
      assert: require.resolve('assert')
     }
    },
  })
};
