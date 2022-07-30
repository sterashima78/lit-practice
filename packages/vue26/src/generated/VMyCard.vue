<template>
  <my-card>
    <div display="contents">
      <slot></slot>
    </div>

    <div display="contents" slot="header">
      <slot name="header"></slot>
    </div>
  </my-card>
</template>
<script lang="ts">
import "@sterashima78/lit-practice-wc/my-card.js";
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "VMyCard",
  props: {},
  emits: {},
  setup(_, { emit }) {
    return { emit };
  },
});
</script>
