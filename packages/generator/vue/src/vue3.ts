import type { Attribute, CustomElement, Event, ToProgram } from "@sterashima78/lit-practice-generator-common";
export { toEntry } from "./common.js";
import { isVoidEvent, kabobToOnEvent } from "@sterashima78/lit-practice-generator-common";
import { render, toEventAttr, toPropAttr, toSlots } from "./common.js";

const toPropEntry = (prop: Attribute): string =>
  `${prop.fieldName}${typeof prop.default === "string" ? "?" : ""}: ${prop.type?.text || "string"};`;

const toEventPayload = (type: string): string => {
  if (isVoidEvent(type)) return "";
  const match = type.match(/CustomEvent<(.+)>/);
  if (!match || !match[1]) return "";
  return `, payload: ${match[1]}`;
};
const toEventEntry = (event: Event): string => `(e: "${event.name}"${toEventPayload(event.type.text)}): void;`;

const toEventScripts = (events: NonNullable<CustomElement["events"]>) =>
  events.length === 0 ? "" : /*javascript*/ `
    const emit = defineEmits<{
      ${events.map(toEventEntry).join("\n  ")}
    }>()
  `;

const toEventPropss = (props: NonNullable<CustomElement["attributes"]>) =>
  props.length === 0 ? "" : /*javascript*/ `
  const props = defineProps<{
    ${props.map(toPropEntry).join("\n  ")}
  }>();
  `;

const toScripts = (
  props: NonNullable<CustomElement["attributes"]>,
  events: NonNullable<CustomElement["events"]>,
): string => /*javascript*/ `
  ${toEventPropss(props)}
  ${toEventScripts(events)}
  const slots = useSlots()
  `;

const toAttrs = (events: Event[], props: Attribute[]) =>
  /*javascript*/ `{
  ${props.map(toPropAttr).concat(events.map(toEventAttr(kabobToOnEvent))).join(",\n")}
}`;

const toSlotAttr = (name: string) => `${name === "" ? "" : `slot: "${name}"`}`;

export const toProgram: ToProgram = (p) => {
  return [
    `V${p.name}.vue`,
    /*html*/ `
  <template><render /></template>
  <script setup lang="ts">
  import "@sterashima78/lit-practice-wc/${p.tagName}.js"
  import { h, useSlots } from 'vue';
  ${toScripts(p.attributes || [], p.events || [])}
  const render = ()=> ${
      render(
        p.tagName || "",
        toAttrs(p.events || [], p.attributes || []),
        toSlots(p.slots || [], toSlotAttr),
      )
    }
  </script>
  `,
  ];
};
