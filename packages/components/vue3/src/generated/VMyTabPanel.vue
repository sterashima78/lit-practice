<template><render /></template>
<script setup lang="ts">
import "@sterashima78/lit-practice-wc/my-tab-panel.js";
import { h, useSlots } from "vue";

const props = defineProps<{
  name?: string;
}>();

const slots = useSlots();

const render = () =>
  h(
    "my-tab-panel",
    {
      name: props["name"],
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
            },
            [slots.default()]
          ),
    ]
  );
</script>
