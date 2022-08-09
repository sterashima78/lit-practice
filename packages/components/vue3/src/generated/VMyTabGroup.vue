<template><render /></template>
<script setup lang="ts">
import "@sterashima78/lit-practice-wc/my-tab-group.js";
import { h, useSlots } from "vue";

const props = defineProps<{}>();
const emit = defineEmits<{}>();
const slots = useSlots();

const render = () =>
  h(
    "my-tab-group",
    {},

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
