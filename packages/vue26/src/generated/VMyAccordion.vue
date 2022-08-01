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
    isOpen: { type: Boolean, required: false },
  },
  emits: {
    close: null,
    open: null,
    toggle: (p: { isOpen: boolean }) => true,
  },
  setup(props, { emit }) {
    const slots = useSlots();
    const vm = getCurrentInstance();
    const h = _h.bind(vm);
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
