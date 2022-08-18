<script lang="ts">
import "@sterashima78/lit-practice-wc/my-text.js";
import { h, useSlots, defineComponent } from "vue";
export default defineComponent({
  name: "VMyText",
  props: {},
  emits: {},
  setup() {
    const slots = useSlots();

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
