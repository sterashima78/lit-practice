<script lang="ts">
import "@sterashima78/lit-practice-wc/my-accordion.js";
import { h, useSlots, defineComponent } from "vue";
export default defineComponent({
  name: "VMyAccordion",
  props: {
    isOpen: { type: Boolean, required: false },
  },
  emits: {
    close: null,
    open: null,
    toggle: (p: { isOpen: boolean }) => true,
  },
  setup(props, { emit }) {
    const slots = useSlots();
    return () =>
      h(
        "my-accordion",
        {
          domProps: {
            isOpen: props["isOpen"],
          },
          on: {
            close: () => emit("close"),
            open: () => emit("open"),
            toggle: (e: CustomEvent<{ isOpen: boolean }>) =>
              emit("toggle", e.detail),
          },
        },
        [
          slots["default"] === undefined
            ? undefined
            : h(
                "span",
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
                "span",
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
