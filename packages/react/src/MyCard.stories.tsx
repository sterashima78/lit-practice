import { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MyCard } from "./generated/MyCard";
const meta: Meta = {
  component: MyCard,
};

export default meta;

export const Test: StoryObj = {
  render: () => (
    <MyCard>
      <p slot="header">Header</p>
      <button onClick={() => console.log("click btn")}>log</button>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
    </MyCard>
  ),
};
