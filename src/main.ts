import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(ElementPlus).use(router).use(store).mount("#app");
