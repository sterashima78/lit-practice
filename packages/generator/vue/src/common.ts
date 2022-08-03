import type { Attribute, Event, Slot, ToEntry } from "@sterashima78/lit-practice-generator-common";
import { isVoidEvent } from "@sterashima78/lit-practice-generator-common";

type EventKeyTransformer = (n: string) => string;
export const toEventAttr = (transform: EventKeyTransformer) => (event: Event): string =>
  isVoidEvent(event.type.text)
    ? `${transform(event.name)}: ()=> emit('${event.name}')`
    : `${transform(event.name)}: (e: ${event.type.text})=> emit('${event.name}', e.detail)`;

export const toPropAttr = (attr: Attribute): string => `${attr.fieldName}: props["${attr.fieldName}"]`;
type ToSlotAttr = (name: string) => string;

const toSlot = (toSlotAttr: ToSlotAttr) => (slot: Slot) => /*javascript*/ `
slots["${slot.name === "" ? "default" : slot.name}"] === undefined ? undefined : h("div", {
    style: {
        display: "contents"
    },
    ${toSlotAttr(slot.name)}
}, [${slot.name === "" ? "slots.default()" : `slots["${slot.name}"]()`}])
`;

export const toSlots = (slots: Slot[], toSlotAttr: ToSlotAttr) => /*javascript*/ `
[
  ${
  slots.map(
    toSlot(toSlotAttr),
  ).join(",\n")
}
]`;

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
