import { createComponent } from "@lit-labs/react";
import { MyCard as TmpMyCard } from "@sterashima78/lit-practice-wc";
import * as React from "react";
export const MyCard = createComponent(
  React,
  "my-card",
  TmpMyCard,
  {},
);
