import CompositionApi from "@vue/composition-api";
import Vue from "vue";
import "./style.css";
import App from "./App.vue";
Vue.config.ignoredElements = [/^my-/];
Vue.use(CompositionApi);
const app = new Vue(App);
app.$mount("#app");
