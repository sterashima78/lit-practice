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
<script setup lang="ts">
import "@sterashima78/lit-practice-wc/my-card.js";

const props = defineProps<{}>();
const emit = defineEmits<{}>();
</script>
