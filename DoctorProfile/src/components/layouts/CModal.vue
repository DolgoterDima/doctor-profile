<template>
  <teleport to="body">
    <div class="modal" v-if="getIsModalOpen">
      <div class="modal__backdrop" @click.prevent.stop="closeModal"></div>

      <div class="modal__content">
        <button @click.prevent.stop="closeModal" class="modal__close">
          <span class="modal__icon modal__icon--close icon-cross"></span>
        </button>

        <slot name="default"></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCommonStore } from "@/stores/common";

export default {
  name: "CModal",
  computed: {
    ...mapState(useCommonStore, ["getIsModalOpen"]),
  },
  methods: {
    ...mapActions(useCommonStore, ["closeModal"]),
  },
};
</script>
