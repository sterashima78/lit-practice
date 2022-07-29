import { StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./my-accordion";

export default {
  title: "Accordion",
  component: "my-accordion",
};

export const Test: StoryObj = {
  args: {
    title: "hogehoge",
    body: "body",
  },
  render: (args) =>
    html`
        <my-accordion>
            <p slot="header">${args.title}</p>
            <div>
                <p>${args.body}</p>
                <p>contents</p>
                <p>contents</p>
                <p>contents</p>
                <p>contents</p>
                <p>contents</p>
            </div>
        </my-accordion>
    `,
};
