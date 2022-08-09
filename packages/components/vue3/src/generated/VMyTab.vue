<template><render /></template>
<script setup lang="ts">
import "@sterashima78/lit-practice-wc/my-tab.js";
import { h, useSlots } from "vue";

const props = defineProps<{
  name?: string;
}>();
const emit = defineEmits<{}>();
const slots = useSlots();

const render = () =>
  h(
    "my-tab",
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
