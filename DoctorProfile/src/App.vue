<template>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { mapActions } from "pinia/dist/pinia";
import { profileStore } from "./stores/profile";

export default {
  name: "App",

  data: () => ({}),
};
</script>
