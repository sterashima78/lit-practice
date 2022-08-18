<script lang="ts">
import "@sterashima78/lit-practice-wc/my-text.js";
import {
  h as _h,
  useSlots,
  defineComponent,
  getCurrentInstance,
} from "@vue/composition-api";
export default defineComponent({
  name: "VMyText",
  props: {},
  emits: {},
  setup() {
    const slots = useSlots();
    const h = _h.bind(getCurrentInstance());
    return () =>
      h(
        "my-text",
        {
          domProps: {},
          on: {},
        },

        [
          slots["default"] === undefined
            ? undefined
            : h(
                "div",
                {
                  style: {
                    display: "contents",
                  },

                  attrs: {},
                },
                [slots.default()]
              ),
        ]
      );
  },
});
</script>
