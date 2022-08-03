import { toProgramFactory } from "./commonVue2.js";
export { toEntry } from "./common.js";

export const toProgram = toProgramFactory(
  () => `import { h as _h, useSlots, defineComponent, getCurrentInstance } from '@vue/composition-api';`,
  () => `const h = _h.bind(getCurrentInstance())`,
);
