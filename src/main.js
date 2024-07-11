import App from "./App.vue";
import Vue from 'vue'
import { router } from "./routes/index";
import { loadGlobalProperties } from "./global/customerApi";
import * as vue from "vue";
import '@vant/touch-emulator';
window.vue = vue;
export const app = Vue.createApp(App);
loadGlobalProperties(app);
app.use(router).use(vant).mount("#app");
