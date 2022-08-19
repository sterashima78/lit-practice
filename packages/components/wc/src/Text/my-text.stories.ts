import { StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./my-text";

export default {
  title: "Text",
  component: "my-text",
};

export const Test: StoryObj = {
  render: () =>
    html`
        <my-text>hoge</my-text>
    `,
};
