import type { Attribute, Event } from "custom-elements-manifest/schema";
import type { ToEntry, ToProgram } from "./common.js";
import { isVoidEvent, toTemplate } from "./vue.js";

const toPropEntry = (prop: Attribute): string =>
  `${prop.fieldName}: { type: ${prop.type?.text === "boolean" ? "Boolean" : "String"}, required: ${
    typeof prop.default === "string" ? "false" : "true"
  }}`;

const toEventFn = (type: string): string => {
  if (isVoidEvent(type)) return "null";
  const match = type.match(/CustomEvent<(.+)>/)!;
  return `(p: ${match[1]}) => true`;
};
const toEventEntry = (event: Event): string => `"${event.name}": ${toEventFn(event.type.text)}`;

export const toProgram: ToProgram = (p) => {
  return [
    `V${p.name}.vue`,
    /*html*/ `
<template>
${toTemplate(p.tagName || p.name, p.attributes || [], p.events || [], p.slots || [])}
</template>
<script lang="ts">
import "@sterashima78/lit-practice-wc/${p.tagName}.js"
import { defineComponent } from "@vue/composition-api"
export default defineComponent({
    name: "V${p.name}",
    props: {
        ${(p.attributes || []).map(toPropEntry).join(",\n        ")}
    },
    emits: {
        ${(p.events || []).map(toEventEntry).join(",\n        ")}
    },
    setup(_, { emit }){
      return { emit }
    }
})
</script>
`,
  ];
};

export const toEntry: ToEntry = (defs) =>
  defs.map((ele) => `export { default as V${ele.name} } from "./V${ele.name}.vue"`).join("\n");
