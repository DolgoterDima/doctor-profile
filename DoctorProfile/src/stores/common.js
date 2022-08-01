import { defineStore } from "pinia";

export const useCommonStore = defineStore({
  id: "common",
  state: () => ({
    isModalOpen: false,
  }),
  getters: {
    getIsModalOpen: (state) => state.isModalOpen,
  },
  actions: {
    closeModal() {
      this.isModalOpen = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
  },
});
