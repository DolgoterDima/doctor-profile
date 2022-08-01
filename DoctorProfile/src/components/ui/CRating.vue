<template>
  <div class="rating eddd">
    <template v-for="(legend, index) in ratingLegends" :key="index">
      <div  @click="clickRating(index + 1)" class="rating__item"
      :class="{
        'rating__item--checked': currentRting=== index+1,
        'rating__item--selected': currentRting<= index+1,
      }">
        <slot class="rating__icon"> </slot>
        <span class="rating__legend"> {{ legend }}</span>
      </div>
    </template>
  </div>
</template>

<script>
const ratingLegends = [
  "Дуже погано",
  "Погано",
  "Нормально",
  "Добре",
  "Дуже добре",
].reverse();

export default {
  data: () => ({
    ratingLegends,
    currentRting:0
  }),

  name: "CRating",

  methods: {
    clickRating(rating) {
      this.currentRting=rating
      this.$emit("rating", rating);
    },
  },
};
</script>
<style lang="scss">
.rating{
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
  &__item{
    &--checked{
      background-color: purple;

    }
    &--selected{
      background-color: yellow;

    }
  }
display: flex;
}

.rating   + .rating__item {
  text-align: center;
  font-size: 24px;
  color: red;
  cursor: pointer;
}




.rating{
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
}
.rating__item:hover ~ .rating__item,
.rating__item:hover {
  background: black;
}
</style>
