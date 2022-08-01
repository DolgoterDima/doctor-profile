import { defineStore } from "pinia";

export const profileStore = defineStore({
  id: "profile",
  state: () => ({
    doctorReviews: [],
  }),
  getters: {
    getDoctorReviews: (state) => {
      return (offset = 0) => {
        return state.doctorReviews.slice(0, offset);
      };
    },
    getDoctorAverageRating: (state) => {
      //if (state.doctorReviews.length) return 0;
      const reviewsCount = state.doctorReviews.length
        ? state.doctorReviews.length
        : 1;

      let reviewsSum = state.doctorReviews.reduce((acc, item) => {
        console.log("acc", acc);
        console.log("item", item.rate);
        return acc + item.rate;
      }, 0);

      return Math.ceil(reviewsSum / reviewsCount);
    },
  },
  actions: {
    async addReview(review) {
      console.log("review", review);
      this.doctorReviews.push(review);

      return await "Відгук збережено успішно";
    },
  },
});
