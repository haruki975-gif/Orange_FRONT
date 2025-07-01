// 아이디, 이메일, 연락처 중복체크용 커스텀 훅

import { useEffect } from "react";
import axios from "axios";

export const useDuplicateCheck = (
  fieldName,
  value,
  apiUrl,
  validationRules,
  setFieldStatus,
  enabled = true,
  originalValue = ""
) => {
  useEffect(() => {
    if (!enabled || !value) return;

    // 기존 값이면 중복 체크 안함
    if (value === originalValue) {
      setFieldStatus(fieldName, "", "", true); // 성공 상태로 초기화
      return;
    }
    const rule = validationRules[fieldName];

    if (rule && !rule.regex.test(value)) {
      setFieldStatus(fieldName, rule.message);
      return;
    }

    let url = "";

    if (fieldName === "userId") {
      if (value.length < 6) return;
      url = `${apiUrl}/api/members/check-id/${value}`;
    } else if (fieldName === "userEmail") {
      if (value.length < 5) return;
      url = `${apiUrl}/api/members/check-email/${value}`;
    } else if (fieldName === "userPhone") {
      if (value.length !== 11) return;
      url = `${apiUrl}/api/members/check-phone/${value}`;
    }

    axios
      .get(url)
      .then((res) => {
        if (res.data?.message?.includes("사용 가능한")) {
          setFieldStatus(fieldName, "", res.data.message, true);
        } else {
          setFieldStatus(fieldName, res.data.message || "이미 사용중입니다.");
        }
      })
      .catch((err) => {
        console.error(`${fieldName} 중복 확인 에러`, err);
      });
  }, [value, enabled, originalValue]);
};
