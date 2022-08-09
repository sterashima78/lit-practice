<script lang="ts">
import "@sterashima78/lit-practice-wc/my-tab-panel.js";
import { h, useSlots, defineComponent } from "vue";
export default defineComponent({
  name: "VMyTabPanel",
  props: {
    name: { type: String, required: false },
  },
  emits: {},
  setup(props, { emit }) {
    const slots = useSlots();

    return () =>
      h(
        "my-tab-panel",
        {
          domProps: {
            name: props["name"],
          },
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
