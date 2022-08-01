import { StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./my-card";

export default {
  title: "Card",
  component: "my-card",
};

export const Test: StoryObj = {
  args: {
    title: "",
    body: "body",
  },
  render: (args) =>
    html`
        <my-card>
            <p slot="header">${args.title}</p>
            <div>
                <p>${args.body}</p>
                <p>contents</p>
                <p>contents</p>
                <p>contents</p>
                <p>contents</p>
                <p>contents</p>
            </div>
        </my-card>
    `,
};
