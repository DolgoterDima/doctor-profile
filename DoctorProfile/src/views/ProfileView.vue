<template>
  <main class="profile">
    <CHeader class="profile__header" title="Профіль лікаря" />
    <div class="profile__main">
      <div class="profile__row profile__row--heading">
        <span class="profile__name">тестова оксана василівна </span>
        <div class="profile__stars">
          <span
            class="icon-star profile__star"
            v-for="(star, index) in getDoctorAverageRating"
            :key="index"
          ></span>
        </div>

        <span class="profile__rating" v-if="getDoctorAverageRating">
          (Середня оцінка: {{ getDoctorAverageRating }})
        </span>
      </div>
      <div class="profile__row profile__row--content">
        <img
          src="@/assets/images/doctor.jpg"
          width="219"
          height="243"
          alt="doctor"
          class="profile__avatar"
        />
        <div class="profile__info">
          <ul class="list list--info">
            <li class="list__item">
              <div class="list__key">Місто:</div>
              <div class="list__value">Львів</div>
            </li>
            <li class="list__item">
              <div class="list__key">Місце роботи:</div>
              <div class="list__value">Львів, площа Ринок, 10</div>
            </li>
            <li class="list__item">
              <div class="list__key">Заклад:</div>
              <div class="list__value">
                <a
                  href="https://goo.gl/maps/3d9dUhbLndE1GHaC7"
                  target="_blank"
                  class="list__link"
                >
                  Відділення надання екстренної допомоги черговим лікарем у
                  зфкладі стаціонарної допомоги імені Пиліпова Юрія
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="profile__row profile__row--footer">
        <button
          class="button button--call-modal profile__row__button"
          @click="openModal"
        >
          Залишити відгук
        </button>
      </div>
      <div class="profile__row profile__row--comments">
        <div
          class="review profile__review"
          v-for="(review, index) in getDoctorReviews(offset)"
          :key="index"
        >
          <div class="review__header">
            <span class="review__name">{{ review.name }}</span>
            <div class="review__stars">
              <span
                class="review__star icon-star"
                v-for="star in review.rate"
                :key="star"
              ></span>
            </div>
          </div>
          <div class="review__content">
            <span class="review__message">{{ review.message }}</span>
          </div>
        </div>

        <button
          class="button"
          type="button"
          @click="loadMoreReviews(5)"
          v-if="isLoadMoreHidden"
        >
          Завантажити ще
        </button>
      </div>
    </div>

    <ModalComment></ModalComment>
  </main>
</template>

<script>
import ModalComment from "@/components/modals/ModalComment.vue";

import { mapActions, mapState } from "pinia";
import { useCommonStore } from "@/stores/common";
import { profileStore } from "@/stores/profile";

import CHeader from "@/components/layouts/CHeader.vue";

export default {
  name: "Profile",
  components: {
    CHeader,
    ModalComment,
  },
  data: () => ({
    offset: 5,
  }),

  methods: {
    ...mapActions(useCommonStore, ["openModal"]),
    loadMoreReviews(increment) {
      console.log("increment", increment);
      this.offset += increment;
    },
  },
  mounted() {
   // this.loadMoreReviews(this.offset);
  },
  computed: {
    ...mapState(profileStore, [
      "getDoctorReviews",
      "doctorReviews",
      "getDoctorAverageRating",
    ]),
    isLoadMoreHidden() {
      return this.offset <=this.doctorReviews.length-1;
    },
  },
};
</script>
