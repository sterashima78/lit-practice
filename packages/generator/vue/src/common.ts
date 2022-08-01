import type { ToEntry } from "@sterashima78/lit-practice-generator-common";

export const isVoidEvent = (type: string): boolean => {
  const match = type.match(/CustomEvent<(.+)>/);
  return !(!!match && !!match[1] && !match[1].match("void"));
};

export const render = (
  tagName: string,
  attrs: string,
  slots: string,
) => /*javascript*/ `
    h("${tagName}", 
        ${attrs},
        ${slots}
    )
    `;

export const toEntry: ToEntry = (defs) =>
  defs.map((ele) => `export { default as V${ele.name} } from "./V${ele.name}.vue"`).join("\n");
