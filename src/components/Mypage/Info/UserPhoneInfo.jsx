import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPhoneInfo = ({ setFormData, setValidationErrors }) => {
  const [localPhone, setLocalPhone] = useState("");
  const userNo = sessionStorage.getItem("userNo");
  const token = sessionStorage.getItem("accessToken");
  const apiUrl = URL_CONFIG.API_URL;

  // 연락처 조회
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/info/phone/${userNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const phone = response.data.items[0] || "";
        setLocalPhone(phone);
        setFormData((prev) => ({ ...prev, userPhone: phone }));
      })
      .catch((error) => {
        setValidationErrors((prev) => ({
          ...prev,
          userPhone: "연락처 조회에 실패했습니다.",
        }));
      });
  }, [userNo]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalPhone(value);
    setFormData((prev) => ({ ...prev, userPhone: value }));

    if (!/^\d{11}$/.test(value)) {
      setValidationErrors((prev) => ({
        ...prev,
        userPhone: "연락처는 숫자 11자리여야 합니다.",
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, userPhone: "" }));
    }
  };

  return (
    <>
      <input
        type="text"
        name="userPhone"
        placeholder="연락처 (숫자 11자리)"
        value={localPhone}
        onChange={handleChange}
        maxLength={11}
        required
      />
    </>
  );
};
export default UserPhoneInfo;
