<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { VMyAccordion, VMyCard } from "@sterashima78/lit-practice-vue26";
export default defineComponent({
  components: {
    VMyAccordion,
    VMyCard,
  },
  setup() {
    const isOpen = ref(true);
    const log = (a: unknown) => console.log(a);
    return {
      isOpen,
      log,
    };
  },
});
</script>

<template>
  <div>
    <label>Toggle <input type="checkbox" v-model="isOpen" /></label>
    <VMyAccordion
      :isOpen="isOpen"
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
