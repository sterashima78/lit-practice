<template><render /></template>
<script setup lang="ts">
import "@sterashima78/lit-practice-wc/my-accordion.js";
import { h, useSlots } from "vue";

const props = defineProps<{
  isOpen?: boolean;
}>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "open"): void;
  (e: "toggle", payload: { isOpen: boolean }): void;
}>();
const slots = useSlots();

const render = () =>
  h(
    "my-accordion",
    {
      isOpen: props["isOpen"],
      onClose: () => emit("close"),
      onOpen: () => emit("open"),
      onToggle: (e: CustomEvent<{ isOpen: boolean }>) =>
        emit("toggle", e.detail),
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
              slot: "header",
            },
            [slots["header"]()]
          ),
    ]
  );
</script>
