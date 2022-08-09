import { StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./my-tab-group";
import "./my-tab";
import "./my-tab-panel";

export default {
  title: "Tabs",
  component: "my-tab-group",
};

export const Test: StoryObj = {
  render: (args) =>
    html`
        <my-tab-group>
            <my-tab name="tab1">tab1</my-tab>
            <my-tab name="tab2">tab2</my-tab>
            <my-tab name="tab3">tab3</my-tab>
            <my-tab name="tab3">tab3-2</my-tab>
            <my-tab-panel name="tab1">
              <p>contents1</p>
            </my-tab-panel>
            <my-tab-panel name="tab2">
              <p>contents2</p>
            </my-tab-panel>
            <my-tab-panel name="tab3">
              <p>contents3</p>
            </my-tab-panel>
        </my-tab-group>
    `,
};
