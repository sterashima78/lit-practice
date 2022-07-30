import { createComponent } from "@lit-labs/react";
import { MyAccordion as TmpMyAccordion } from "@sterashima78/lit-practice-wc";
import * as React from "react";
export const MyAccordion = createComponent(
  React,
  "my-accordion",
  TmpMyAccordion,
  {
    onClose: "close",
    onOpen: "open",
    onToggle: "toggle",
  },
);
