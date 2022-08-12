import type { Attribute, Event, ToProgram } from "@sterashima78/lit-practice-generator-common";
import { isVoidEvent } from "@sterashima78/lit-practice-generator-common";
export { toEntry } from "./common.js";
import { render, toEventAttr, toPropAttr, toSlots } from "./common.js";

export const toPropEntry = (prop: Attribute): string =>
  `${prop.fieldName}: { 
    type: ${prop.type?.text === "boolean" ? "Boolean" : "String"}, 
    required: ${typeof prop.default === "string" ? "false" : "true"}
    ${
    typeof prop.default === "string"
      ? `,default: ${prop.default}`
      : ""
  }
  }`;

const toEventFn = (type: string): string => {
  if (isVoidEvent(type)) return "null";
  const match = type.match(/CustomEvent<(.+)>/);
  if (!match || !match[1]) return "";
  return `(p: ${match[1]}) => !!p`;
};
export const toEventEntry = (event: Event): string => `"${event.name}": ${toEventFn(event.type.text)}`;

export const toAttrs = (events: Event[], props: Attribute[]) =>
  /*javascript*/ `{
    domProps: {
        ${props.map(toPropAttr).join(",\n")}
    },
    on: {
        ${events.map(toEventAttr((s) => `"${s}"`)).join(",\n")}
    }
}`;

export const toSlotAttr = (name: string) => `
attrs: {
  ${name === "" ? "" : `slot: "${name}"`}
}
`;

type Imports = () => string;
type SetupBefors = () => string;
export const toProgramFactory = (i: Imports, s: SetupBefors): ToProgram => (p) => {
  return [
    `V${p.name}.vue`,
    /*html*/ `
      <script lang="ts">
  import "@sterashima78/lit-practice-wc/${p.tagName}.js"
  ${i()}
  export default defineComponent({
      name: "V${p.name}",
      props: {
          ${(p.attributes || []).map(toPropEntry).join(",\n        ")}
      },
      emits: {
          ${(p.events || []).map(toEventEntry).join(",\n        ")}
      },
      setup(${
      (p.events && p.events.length > 0) || (p.attributes && p.attributes.length > 0)
        ? "props"
        : ""
    }${p.events && p.events.length > 0 ? ", { emit }" : ""}){
        const slots = useSlots()
        ${s()}
        return ()=> ${
      render(
        p.tagName || "",
        toAttrs(p.events || [], p.attributes || []),
        toSlots(p.slots || [], toSlotAttr),
      )
    }
      }
  })
  </script>
    `,
  ];
};
