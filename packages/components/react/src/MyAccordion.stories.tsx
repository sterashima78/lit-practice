import { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MyAccordion } from "./generated/MyAccordion";
const meta: Meta = {
  component: MyAccordion,
};

export default meta;

export const Test: StoryObj = {
  render: (args) => (
    <MyAccordion
      isOpen={args.isOpen}
      onToggle={(e) => console.log("toggle", e)}
      onOpen={(e) => console.log("open", e)}
      onClose={(e) => console.log("close", e)}
    >
      <p slot="header">Header</p>
      <button onClick={() => console.log("click")}>log</button>
      <p>contensts</p>
      <p>contensts</p>
      <p>contensts</p>
      <p>contensts</p>
      <p>contensts</p>
      <p>contensts</p>
    </MyAccordion>
  ),
};
