<script setup lang="ts">
import { ref } from "vue";
import { VMyAccordion, VMyCard } from "@sterashima78/lit-practice-vue27";
const isOpen = ref(true);
const log = (a: unknown) => console.log(a);
</script>

<template>
  <div>
    <label>Toggle <input v-model="isOpen" type="checkbox" /></label>
    <VMyAccordion
      :is-open="isOpen"
      @toggle="({ isOpen: open }) => (isOpen = open)"
    >
      <template #header>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </template>
      <VMyCard>
        <template #header>
          <p>Header</p>
        </template>
        <button @click="log('click')">log</button>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
      </VMyCard>
    </VMyAccordion>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
