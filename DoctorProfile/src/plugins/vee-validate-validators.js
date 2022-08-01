import { defineRule } from "vee-validate";
defineRule("required", (value) => {
  if (!value || !value.length) {
    return "Обов'язкове поле";
  }
  return true;
});
defineRule("email", (value) => {
  // Field is empty, should pass
  if (!value || !value.length) {
    return true;
  }
  // Check if email
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    return "This field must be a valid email";
  }
  return true;
});

defineRule("minLength", (value, [limit]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return `Ви повинні ввести хочаб ${limit} символів`;
  }
  return true;
});

defineRule("maxLength", (value, [limit]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length > limit) {
    return `Ви повинні ввести максимум ${limit} символів`;
  }
  return true;
});
