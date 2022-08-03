<template><render /></template>
<script setup lang="ts">
import "@sterashima78/lit-practice-wc/my-card.js";
import { h, useSlots } from "vue";

const props = defineProps<{}>();
const emit = defineEmits<{}>();
const slots = useSlots();

const render = () =>
  h(
    "my-card",
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
      slots["header"] === undefined
        ? undefined
        : h(
            "div",
            {
              style: {
                display: "contents",
              },
              slot: "header",
            },
            [slots["header"]()]
          ),
    ]
  );
</script>
