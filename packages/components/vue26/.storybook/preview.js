import CompositionApi from "@vue/composition-api";
import Vue from "vue";
Vue.use(CompositionApi);
Vue.config.ignoredElements = [/^my-/];
export const parameters = {};
