import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDuplicateCheck } from "../../Member/Signup/js/useDuplicateCheck";
import { validationRules } from "../../Member/Signup/js/validationRules";

const UserPhoneInfo = ({
  formData,
  setFormData,
  setSuccessMessages,
  setValidationErrors,
}) => {
  const [originalPhone, setOriginalPhone] = useState(""); // 기존 연락처
  const [isLoaded, setIsLoaded] = useState(false);
  const userNo = sessionStorage.getItem("userNo");
  const token = sessionStorage.getItem("accessToken");
  const apiUrl = URL_CONFIG.API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/info/phone/${userNo}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const phone = res.data.items[0] || "";
        setOriginalPhone(phone);
        setFormData((prev) => ({ ...prev, userPhone: phone }));
        sessionStorage.setItem("userPhone", phone);
        setIsLoaded(true);
      })
      .catch(() => {
        setValidationErrors((prev) => ({
          ...prev,
          userPhone: "연락처 조회에 실패했습니다.",
        }));
      });
  }, [userNo]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, userPhone: value }));
  };

  // 에러, 성공 메시지
  const setFieldStatus = (
    field,
    errorMsg,
    successMsg = "",
    isSuccess = false
  ) => {
    if (isSuccess) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
      setSuccessMessages((prev) => ({ ...prev, [field]: successMsg }));
    } else {
      setValidationErrors((prev) => ({ ...prev, [field]: errorMsg }));
      setSuccessMessages((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // 중복 검사
  useDuplicateCheck(
    "userPhone",
    formData.userPhone,
    apiUrl,
    validationRules,
    setFieldStatus,
    isLoaded,
    originalPhone
  );

  return (
    <input
      type="text"
      name="userPhone"
      placeholder="연락처 (숫자 11자리)"
      value={formData.userPhone}
      onChange={handleChange}
      maxLength={11}
      required
    />
  );
};

export default UserPhoneInfo;
