import type { ToProgram } from "@sterashima78/lit-practice-generator-common";
export { toEntry } from "./common.js";
import { render } from "./common.js";
import { toAttrs, toEventEntry, toPropEntry, toSlots } from "./vue26";

export const toProgram: ToProgram = (p) => {
  return [
    `V${p.name}.vue`,
    /*html*/ `
    <script lang="ts">
import "@sterashima78/lit-practice-wc/${p.tagName}.js"
import { h, useSlots, defineComponent } from 'vue';
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
