const { getStoryContext } = require("@storybook/test-runner");
const { injectAxe, checkA11y } = require("axe-playwright");

module.exports = {
  async preRender(page, context) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    // Get entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Do not test a11y for stories that disable a11y
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

    await checkA11y(page, "#root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // pass axe options defined in @storybook/addon-a11y
      axeOptions: storyContext.parameters?.a11y?.options,
    });
  },
};
