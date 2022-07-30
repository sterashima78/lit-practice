<template>
  <my-accordion
    :is-open="isOpen"
    @close="() => emit('close')"
    @open="() => emit('open')"
    @toggle="(e) => emit('toggle', e.detail)"
  >
    <div display="contents">
      <slot></slot>
    </div>

    <div display="contents" slot="header">
      <slot name="header"></slot>
    </div>
  </my-accordion>
</template>
<script lang="ts">
import "@sterashima78/lit-practice-wc/my-accordion.js";
import { defineComponent } from "@vue/composition-api";
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
  setup(_, { emit }) {
    return { emit };
  },
});
</script>
