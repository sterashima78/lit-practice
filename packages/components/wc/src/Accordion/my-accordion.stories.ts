import { StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./my-accordion";
import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";

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
  play: async ({ canvasElement }) => {
    await new Promise(re => setTimeout(() => re(null), 1000));
    // @ts-expect-error カスタムエレメントの内部を参照させる
    const canvas = within(canvasElement.querySelector("my-accordion")?.shadowRoot);
    expect(canvas.queryByRole("region")).toBe(null);
    await userEvent.click(canvas.getByRole("button"));
    await waitFor(() => expect(canvas.getByRole("region")).toBeDefined());
    await userEvent.click(canvas.getByRole("button"));
    expect(canvas.queryByRole("region")).toBe(null);
  },
};
