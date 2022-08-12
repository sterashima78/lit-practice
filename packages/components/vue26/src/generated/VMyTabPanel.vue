<script lang="ts">
import "@sterashima78/lit-practice-wc/my-tab-panel.js";
import {
  h as _h,
  useSlots,
  defineComponent,
  getCurrentInstance,
} from "@vue/composition-api";
export default defineComponent({
  name: "VMyTabPanel",
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
    const h = _h.bind(getCurrentInstance());
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
