import type { ToEntry, ToProgram } from "@sterashima78/lit-practice-generator-common";
import { kabobToOnEvent } from "@sterashima78/lit-practice-generator-common";

export const toProgram: ToProgram = (p) => {
  return [
    `${p.name}.tsx`,
    /*javascript*/ `
import { createComponent } from "@lit-labs/react"
import * as React from "react"
import { ${p.name} as Tmp${p.name} } from "@sterashima78/lit-practice-wc"
export const ${p.name} = createComponent(
    React,
    '${p.tagName}',
    Tmp${p.name},
    {
    ${
      (p.events || []).map(
        ({ name }) => `
        ${kabobToOnEvent(name)}: '${name}'`,
      )
    }
    }
);
`,
  ];
};

export const toEntry: ToEntry = (defs) => defs.map(ele => `export { ${ele.name} } from "./${ele.name}.js"`).join("\n");
