<template>
  <CModal title="залишити оцінку та відгук">
    <trmplate v-if="finalMessage">
      <h1>{{ finalMessage }}</h1>
    </trmplate>
    <trmplate v-else>
      <Form
        @submit="onSubmit"
        @reset="onReset"
        class="form"
        :validation-schema="schema"
        v-slot="{ validate, resetForm, meta }"
      >
        <div class="form__row">
          <label class="form__label form__label--heading" for="name">
            Представтесь:*
          </label>
          <div class="form__field form__field--name">
            <Field
              v-model="form.name"
              type="text"
              name="name"
              v-slot="{ field, errors, errorMessage }"
            >
              <input
                class="form__input"
                :class="{ 'form__input--error': errors[0] }"
                placeholder="Вкажіть ваше прізвище та ім’я"
                v-bind="field"
                :disabled="disableName"
                id="name"
                type="text"
              />

              <span class="form__error"> {{ errors[0] }} </span>
            </Field>
          </div>

          <div class="form__field form__field--checkbox">
            <Field
              placeholder="Вкажіть ваше прізвище та ім’я"
              name="isAnon"
              :value="form.isAnon"
              @input="changeAnonState"
              id="isAnon"
              type="checkbox"
            />
            <label class="form__label" for="isAnon">Анонімно </label>
          </div>
        </div>

        <div class="form__row form__row--rate">
          <label class="form__label form__label--heading" for="radio-5">
            Оцініть роботу лікаря:*
          </label>
          <div class="form__field form__field--radio">
            <template v-for="(radio, index) in ratingList" :key="radio">
              <Field
                v-model="form.rate"
                placeholder="Вкажіть ваше прізвище та ім’я"
                :id="`radio-${ratingList.length - index}`"
                name="rate"
                type="radio"
                :value="ratingList.length - index"
                class="form__radio"
              />

              <label
                class="form__label"
                :for="`radio-${ratingList.length - index}`"
              >
                <span class="icon-star form__star"></span>
                {{ radio }}
              </label>
              <ErrorMessage name="rate" />
            </template>
          </div>
        </div>

        <div class="form__row">
          <label class="form__label form__label--heading" for="message">
            Напишіть відгук:*
          </label>
          <div class="form__field form__field--textarea">
            <Field
              v-model="form.message"
              name="message"
              rules="required|maxLength:500"
              v-slot="{ field, errors, errorMessage }"
            >
              <textarea
                class="form__input form__input--textarea"
                :class="{ 'form__input--error': errors[0] }"
                placeholder="Вкажіть відгук до 500 символів"
                v-bind="field"
                id="message"
              />

              <span class="form__error"> {{ errors[0] }} </span>
            </Field>
          </div>
        </div>
        <div class="form__row form__row--buttons">
          <button
            type="reset"
            :disabled="!meta.dirty"
            class="button button--reset"
            :class="{ 'button--disabled': !meta.dirty }"
          >
            Очистити
          </button>
          <button
            type="submit"
            :disabled="!meta.valid"
            class="button button--send"
            :class="{ 'button--disabled': !meta.valid }"
          >
            Надіслати
          </button>
        </div>
      </Form>
    </trmplate>
  </CModal>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import { mapActions, mapState } from "pinia";
import { profileStore } from "../../stores/profile";
import { useCommonStore } from "@/stores/common";

const validationOptions = {
  name: {
    maxWidth: 50,
  },
  message: {
    maxWidth: 500,
  },
};

export default {
  name: "ModalComment",

  data: () => ({
    ratingList: [
      "Дуже погано",
      "Погано",
      "Нормально",
      "Добре",
      "Дуже добре",
    ].reverse(),
    form: {
      name: "",
      rate: null,
      message: "",
      isAnon: false,
    },
    finalMessage: "",
    disableName: false,
    schema: {
      rate: (value) => {
        if (value) return true;
        return "You must choose a drink";
      },
      name: `required|maxLength:${validationOptions.name.maxWidth}`,
      message: `required|maxLength:${validationOptions.message.maxWidth}`,
    },
  }),
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  watch: {
    //a little event bus)
    isModalOpen() {
      this.finalMessage = "";
    },
  },
  computed: {
    ...mapState(useCommonStore, ["isModalOpen"]),
  },
  methods: {
    ...mapActions(profileStore, ["addReview"]),

    changeAnonState() {
      this.disableName = !this.disableName;

      this.form.name = this.disableName ? "Анонімно" : "";
    },
    onReset(values, { resetForm }) {
      resetForm();
      this.disableName = false;
    },
    onSubmit(values, { resetForm }) {
      this.addReview(values).then((res) => {
        resetForm();
        this.disableName = false;
        this.finalMessage = res;
      });
    },
  },
};
</script>
