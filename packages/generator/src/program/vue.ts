import type { Attribute, CustomElement, Event, Slot } from "custom-elements-manifest/schema";
import type { ToEntry, ToProgram } from "./common.js";

export const isVoidEvent = (type: string): boolean => {
  const match = type.match(/CustomEvent<(.+)>/);
  return !(!!match && !!match[1] && !match[1].match("void"));
};

const toSlotAttr = (name: string, attrName: string) => name === "" ? "" : ` ${attrName}="${name}"`;
const toSlot = (s: Slot): string => /*html*/ `
<div display="contents"${toSlotAttr(s.name, "slot")}>
  <slot${toSlotAttr(s.name, "name")}></slot>
</div>
`;
const toPropAttr = (attr: Attribute): string => `:${attr.name}="${attr.fieldName}"`;
const toEventAttr = (event: Event): string =>
  isVoidEvent(event.type.text)
    ? `@${event.name}="()=> emit('${event.name}')"`
    : `@${event.name}="(e)=> emit('${event.name}', e.detail)"`;

export const toTemplate = (
  tagName: string,
  props: NonNullable<CustomElement["attributes"]>,
  events: NonNullable<CustomElement["events"]>,
  slots: NonNullable<CustomElement["slots"]>,
) => /*html*/ `
<${tagName} ${props.map(toPropAttr).join(" ")} ${events.map(toEventAttr).join(" ")}>
  ${slots.map(toSlot).join("\n  ")}
</${tagName}>

`;

const toPropEntry = (prop: Attribute): string =>
  `${prop.fieldName}${typeof prop.default === "string" ? "?" : ""}: ${prop.type?.text || "string"};`;

const toEventPayload = (type: string): string => {
  if (isVoidEvent(type)) return "";
  const match = type.match(/CustomEvent<(.+)>/)!;
  return `, payload: ${match[1]}`;
};
const toEventEntry = (event: Event): string => `(e: "${event.name}"${toEventPayload(event.type.text)}): void;`;

const toScripts = (
  props: NonNullable<CustomElement["attributes"]>,
  events: NonNullable<CustomElement["events"]>,
): string => /*javascript*/ `
const props = defineProps<{
  ${props.map(toPropEntry).join("\n  ")}
}>();
const emit = defineEmits<{
  ${events.map(toEventEntry).join("\n  ")}
}>()
`;

export const toProgram: ToProgram = (p) => {
  return [
    `V${p.name}.vue`,
    /*html*/ `
<template>
${toTemplate(p.tagName || p.name, p.attributes || [], p.events || [], p.slots || [])}
</template>
<script setup lang="ts">
import "@sterashima78/lit-practice-wc/${p.tagName}.js"
${toScripts(p.attributes || [], p.events || [])}
</script>
`,
  ];
};

export const toEntry: ToEntry = (defs) =>
  defs.map((ele) => `export { default as V${ele.name} } from "./V${ele.name}.vue"`).join("\n");
