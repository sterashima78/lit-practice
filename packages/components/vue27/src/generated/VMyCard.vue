<script lang="ts">
import "@sterashima78/lit-practice-wc/my-card.js";
import { h, useSlots, defineComponent } from "vue";
export default defineComponent({
  name: "VMyCard",
  props: {},
  emits: {},
  setup() {
    const slots = useSlots();

    return () =>
      h(
        "my-card",
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
          slots["header"] === undefined
            ? undefined
            : h(
                "div",
                {
                  style: {
                    display: "contents",
                  },

                  attrs: {
                    slot: "header",
                  },
                },
                [slots["header"]()]
              ),
        ]
      );
  },
});
</script>
