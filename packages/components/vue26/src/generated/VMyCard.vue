<script lang="ts">
import "@sterashima78/lit-practice-wc/my-card.js";
import {
  h as _h,
  useSlots,
  defineComponent,
  getCurrentInstance,
} from "@vue/composition-api";
export default defineComponent({
  name: "VMyCard",
  props: {},
  emits: {},
  setup() {
    const slots = useSlots();
    const h = _h.bind(getCurrentInstance());
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
