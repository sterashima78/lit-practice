import type { Attribute, CustomElement, Event, Slot, ToProgram } from "@sterashima78/lit-practice-generator-common";
export { toEntry } from "./common.js";
import { kabobToOnEvent } from "@sterashima78/lit-practice-generator-common";
import { isVoidEvent, render } from "./common.js";

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
  const slots = useSlots()
  `;

const toPropAttr = (attr: Attribute): string => `${attr.fieldName}: props["${attr.fieldName}"]`;
const toEventAttr = (event: Event): string =>
  isVoidEvent(event.type.text)
    ? `${kabobToOnEvent(event.name)}: ()=> emit('${event.name}')`
    : `${kabobToOnEvent(event.name)}: (e: ${event.type.text})=> emit('${event.name}', e.detail)`;

const toAttrs = (events: Event[], props: Attribute[]) =>
  /*javascript*/ `{
  ${props.map(toPropAttr).concat(events.map(toEventAttr)).join(",\n")}
}`;

const toSlot = (slot: Slot) => /*javascript*/ `
    slots["${slot.name === "" ? "default" : slot.name}"] === undefined ? undefined : h("span", {
        style: {
            display: "contents"
        },
        ${slot.name === "" ? "" : `slot: "${slot.name}"`}
    }, [${slot.name === "" ? "slots.default()" : `slots["${slot.name}"]()`}])
`;

const toSlots = (slots: Slot[]) =>
  /*javascript*/ `[
  ${slots.map(toSlot).join(",\n")}
]`;

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
        p.tagName!,
        toAttrs(p.events || [], p.attributes || []),
        toSlots(p.slots || []),
      )
    }
  </script>
  `,
  ];
};
