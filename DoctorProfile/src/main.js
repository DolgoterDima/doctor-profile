import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/scss/app.scss";
import "@/plugins/vee-validate-validators";

const app = createApp(App);

app.use(createPinia());

//icons
import IconStar from "@/components/icons/IconStar.vue";
app.component("IconStar", IconStar);

//modal
import CModal from "@/components/layouts/CModal.vue";
app.component("CModal", CModal);

app.use(router);

app.mount("#app");
