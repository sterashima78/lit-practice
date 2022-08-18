<template><render /></template>
<script setup lang="ts">
import "@sterashima78/lit-practice-wc/my-text.js";
import { h, useSlots } from "vue";

const slots = useSlots();

const render = () =>
  h(
    "my-text",
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
