<script lang="ts">
import "@sterashima78/lit-practice-wc/my-tab-group.js";
import { h, useSlots, defineComponent } from "vue";
export default defineComponent({
  name: "VMyTabGroup",
  props: {},
  emits: {},
  setup(props, { emit }) {
    const slots = useSlots();

    return () =>
      h(
        "my-tab-group",
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
