import React, { useEffect, useState } from "react";
import axios from "axios";
import { validationRules } from "../../Member/Signup/js/validationRules";
import { useDuplicateCheck } from "../../Member/Signup/js/useDuplicateCheck";

const UserEmailInfo = ({
  formData,
  setFormData,
  setSuccessMessages,
  setValidationErrors,
}) => {
  const [originalEmail, setOriginalEmail] = useState(""); // 기존 이메일
  const [isLoaded, setIsLoaded] = useState(false);
  const userNo = sessionStorage.getItem("userNo");
  const token = sessionStorage.getItem("accessToken");
  const apiUrl = URL_CONFIG.API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/info/email/${userNo}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const email = res.data.items[0] || "";
        setOriginalEmail(email);
        setFormData((prev) => ({ ...prev, userEmail: email }));
        sessionStorage.setItem("userEmail", email);
        setIsLoaded(true);
      })
      .catch(() => {
        setValidationErrors((prev) => ({
          ...prev,
          userEmail: "이메일 조회에 실패했습니다.",
        }));
      });
  }, [userNo]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, userEmail: value }));
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
    "userEmail",
    formData.userEmail,
    apiUrl,
    validationRules,
    setFieldStatus,
    isLoaded,
    originalEmail
  );

  return (
    <input
      type="text"
      name="userEmail"
      placeholder="이메일"
      value={formData.userEmail}
      onChange={handleChange}
      required
    />
  );
};

export default UserEmailInfo;
