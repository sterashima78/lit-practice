import Vue from "vue";
import "./style.css";
import App from "./App.vue";
Vue.config.ignoredElements = [/^my-/];
const app = new Vue(App);
app.$mount("#app");
