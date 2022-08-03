<script lang="ts">
import "@sterashima78/lit-practice-wc/my-accordion.js";
import { h, useSlots, defineComponent } from "vue";
export default defineComponent({
  name: "VMyAccordion",
  props: {
    isOpen: { type: Boolean, required: false },
  },
  emits: {
    open: null,
    close: null,
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
            open: () => emit("open"),
            close: () => emit("close"),
            toggle: (e: CustomEvent<{ isOpen: boolean }>) =>
              emit("toggle", e.detail),
          },
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
