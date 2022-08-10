import { Meta, StoryObj } from "@storybook/vue3";
import { VMyTab, VMyTabGroup, VMyTabPanel } from "./generated/";
const meta: Meta = {
  component: VMyTabGroup,
  subcomponents: {
    VMyTab,
    VMyTabPanel,
  },
};

export default meta;

export const Test: StoryObj = {
  render() {
    return {
      components: {
        VMyTab,
        VMyTabGroup,
        VMyTabPanel,
      },
      template: /*html*/ `
        <VMyTabGroup>
          <VMyTab name="setting">Setting</VMyTab>
          <VMyTab name="contents">Contents</VMyTab>
          <VMyTabPanel name="setting">Setting</VMyTabPanel>
          <VMyTabPanel name="contents">Contents</VMyTabPanel>
        </VMyTabGroup>
            `,
    };
  },
};
