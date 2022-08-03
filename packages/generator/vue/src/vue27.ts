import { toProgramFactory } from "./commonVue2.js";
export { toEntry } from "./common.js";

export const toProgram = toProgramFactory(
  () => `import { h, useSlots, defineComponent } from 'vue';`,
  () => "",
);
