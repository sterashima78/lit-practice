<script lang="ts">
import "@sterashima78/lit-practice-wc/my-accordion.js";
import {
  h as _h,
  useSlots,
  defineComponent,
  getCurrentInstance,
} from "@vue/composition-api";
export default defineComponent({
  name: "VMyAccordion",
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: {
    open: null,
    close: null,
    toggle: (p: { isOpen: boolean }) => !!p,
  },
  setup(props, { emit }) {
    const slots = useSlots();
    const h = _h.bind(getCurrentInstance());
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
