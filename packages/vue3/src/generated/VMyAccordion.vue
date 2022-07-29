<template>
  <my-accordion
    :is-open="isOpen"
    @close="() => emit('close')"
    @open="() => emit('open')"
    @toggle="(e: CustomEvent<{ isOpen: boolean}>)=> emit('toggle', e.detail)"
  >
    <div display="contents">
      <slot></slot>
    </div>

    <div display="contents" slot="header">
      <slot name="header"></slot>
    </div>
  </my-accordion>
</template>
<script setup lang="ts">
import "@sterashima78/lit-practice-wc/my-accordion.js";

const props = defineProps<{
  isOpen?: boolean;
}>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "open"): void;
  (e: "toggle", payload: { isOpen: boolean }): void;
}>();
</script>
