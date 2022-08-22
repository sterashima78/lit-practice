import type { Attribute, CustomElement, Event, ToProgram } from "@sterashima78/lit-practice-generator-common";
export { toEntry } from "./common.js";
import { isVoidEvent } from "@sterashima78/lit-practice-generator-common";

const toPropEntry = (prop: Attribute): string => `
  /**
   * ${prop.description}
   * @type {${prop.type?.text}}
   */
  ${prop.fieldName}${typeof prop.default === "string" ? "?" : ""}: ${prop.type?.text || "string"};`;

const toEventPayload = (type: string): string => {
  if (isVoidEvent(type)) return "";
  const match = type.match(/CustomEvent<(.+)>/);
  if (!match || !match[1]) return "";
  return `, payload: ${match[1]}`;
};
const toEventEntry = (event: Event): string => /*javascript*/ `
    /**
     * ${event.description}
     * @event ${event.name}
     * @type {${event.type.text}}
     */
    (e: "${event.name}"${toEventPayload(event.type.text)}): void;
`;

const toEventScripts = (events: NonNullable<CustomElement["events"]>) =>
  events.length === 0 ? "" : /*javascript*/ `
    const emit = defineEmits<{
      ${events.map(toEventEntry).join("\n  ")}
    }>()
  `;

const toEventPropss = (props: NonNullable<CustomElement["attributes"]>) =>
  props.length === 0 ? "" : /*javascript*/ `
  defineProps<{
    ${props.map(toPropEntry).join("\n  ")}
  }>();
  `;

const toScripts = (
  props: NonNullable<CustomElement["attributes"]>,
  events: NonNullable<CustomElement["events"]>,
): string => /*javascript*/ `
  ${toEventPropss(props)}
  ${toEventScripts(events)}
  `;

export const toProgram: ToProgram = (p) => {
  return [
    `V${p.name}.vue`,
    /*html*/ `
  <template>
    <${p.tagName}
        ${(p.attributes || []).map((attr) => `:${attr.name}.prop="${attr.fieldName}"`).join("\n")}
        ${
      (p.events || []).map((event) =>
        isVoidEvent(event.type.text)
          ? `@${event.name}="() => emit('${event.name}')"`
          : `@${event.name}="(e: ${event.type.text}) => emit('${event.name}', e.detail)"`
      ).join("\n")
    }
    >
      ${
      (p.slots || []).map(slot =>
        slot.name === ""
          ? /*html*/ `
            <!-- @slot ${slot.description} -->
            <slot />`
          : /*html*/ `
            <div style="display: contents;" slot="${slot.name}">
                <!-- @slot ${slot.description} -->
                <slot name="${slot.name}" />
            </div>
        `
      ).join("\n")
    }
    </${p.tagName}>
  </template>
  <script setup lang="ts">
  import "@sterashima78/lit-practice-wc/${p.tagName}.js"
  ${toScripts(p.attributes || [], p.events || [])}
  </script>
  `,
  ];
};
