import Vue from "vue";
import "@sterashima78/lit-practice-token/libs/css/variables.css";
import "./style.css";
import App from "./App.vue";
Vue.config.ignoredElements = [/^my-/];
const app = new Vue(App);
app.$mount("#app");
