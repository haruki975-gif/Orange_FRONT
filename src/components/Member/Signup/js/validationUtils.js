// validateField, validateForm

import { validationRules } from "./validationRules";

export const validateField = (fieldName, value, formData) => {
  let error = "";

  if (fieldName === "userPwConfirm") {
    if (value !== formData.userPw) {
      error = "비밀번호가 일치하지 않습니다.";
    }
  }

  if (fieldName === "userAddress1") {
    if (!value || value.trim() === "") {
      error = "주소는 필수 입력입니다.";
    }
  }

  const rule = validationRules[fieldName];

  if (rule && !rule.regex.test(value)) {
    return rule.message;
  }

  return error;
};

export const validateForm = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((field) => {
    const error = validateField(field, formData[field], formData);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
