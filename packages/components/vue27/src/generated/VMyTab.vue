<script lang="ts">
import "@sterashima78/lit-practice-wc/my-tab.js";
import { h, useSlots, defineComponent } from "vue";
export default defineComponent({
  name: "VMyTab",
  props: {
    name: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: {},
  setup(props) {
    const slots = useSlots();

    return () =>
      h(
        "my-tab",
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
