import type { Attribute, Event, Slot, ToProgram } from "@sterashima78/lit-practice-generator-common";
import { isVoidEvent } from "@sterashima78/lit-practice-generator-common";
export { toEntry } from "./common.js";
import { render } from "./common.js";

export const toPropEntry = (prop: Attribute): string =>
  `${prop.fieldName}: { type: ${prop.type?.text === "boolean" ? "Boolean" : "String"}, required: ${
    typeof prop.default === "string" ? "false" : "true"
  }}`;

const toEventFn = (type: string): string => {
  if (isVoidEvent(type)) return "null";
  const match = type.match(/CustomEvent<(.+)>/)!;
  return `(p: ${match[1]}) => true`;
};
export const toEventEntry = (event: Event): string => `"${event.name}": ${toEventFn(event.type.text)}`;

const toPropAttr = (attr: Attribute): string => `${attr.fieldName}: props["${attr.fieldName}"]`;
const toEventAttr = (event: Event): string =>
  isVoidEvent(event.type.text)
    ? `"${event.name}": ()=> emit('${event.name}')`
    : `"${event.name}": (e: ${event.type.text})=> emit('${event.name}', e.detail)`;

export const toAttrs = (events: Event[], props: Attribute[]) =>
  /*javascript*/ `{
    domProps: {
        ${props.map(toPropAttr).join(",\n")}
    },
    on: {
        ${events.map(toEventAttr).join(",\n")}
    }
}`;

const toSlot = (slot: Slot) => /*javascript*/ `
    slots["${slot.name === "" ? "default" : slot.name}"] === undefined ? undefined : h("span", {
        style: {
            display: "contents"
        },
        attrs: {
            ${slot.name === "" ? "" : `slot: "${slot.name}"`}
        }
    }, [${slot.name === "" ? "slots.default()" : `slots["${slot.name}"]()`}])
`;

export const toSlots = (slots: Slot[]) =>
  /*javascript*/ `[
  ${slots.map(toSlot).join(",\n")}
]`;

export const toProgram: ToProgram = (p) => {
  return [
    `V${p.name}.vue`,
    /*html*/ `
    <script lang="ts">
import "@sterashima78/lit-practice-wc/${p.tagName}.js"
import { h as _h, useSlots, defineComponent, getCurrentInstance } from '@vue/composition-api';
export default defineComponent({
    name: "V${p.name}",
    props: {
        ${(p.attributes || []).map(toPropEntry).join(",\n        ")}
    },
    emits: {
        ${(p.events || []).map(toEventEntry).join(",\n        ")}
    },
    setup(props, { emit }){
      const slots = useSlots()
      const vm = getCurrentInstance()
      const h = _h.bind(vm)
      return ()=> ${
      render(
        p.tagName!,
        toAttrs(p.events || [], p.attributes || []),
        toSlots(p.slots || []),
      )
    }
    }
})
</script>
  `,
  ];
};
