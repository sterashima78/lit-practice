<template><render /></template>
<script setup lang="ts">
import "@sterashima78/lit-practice-wc/my-accordion.js";
import { h, useSlots } from "vue";

const props = defineProps<{
  isOpen?: boolean;
}>();

const emit = defineEmits<{
  (e: "open"): void;
  (e: "close"): void;
  (e: "toggle", payload: { isOpen: boolean }): void;
}>();

const slots = useSlots();

const render = () =>
  h(
    "my-accordion",
    {
      isOpen: props["isOpen"],
      onOpen: () => emit("open"),
      onClose: () => emit("close"),
      onToggle: (e: CustomEvent<{ isOpen: boolean }>) =>
        emit("toggle", e.detail),
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
