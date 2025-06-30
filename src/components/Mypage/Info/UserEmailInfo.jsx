import axios from "axios";
import React, { useEffect, useState } from "react";

const UserEmailInfo = ({ formData, setFormData, setValidationErrors }) => {
  const [localEmail, setLocalEmail] = useState("");
  const userNo = sessionStorage.getItem("userNo");
  const token = sessionStorage.getItem("accessToken");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const apiUrl = URL_CONFIG.API_URL;

  // 이메일 조회
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/info/email/${userNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const email = response.data.items[0] || "";
        setLocalEmail(email);
        setFormData((prev) => ({ ...prev, userEmail: email }));
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
    setLocalEmail(value);
    setFormData((prev) => ({ ...prev, userEmail: value }));

    if (!emailRegex.test(value)) {
      setValidationErrors((prev) => ({
        ...prev,
        userEmail: "유효한 이메일 형식이 아닙니다.",
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, userEmail: "" }));
    }
  };

  return (
    <>
      <input
        type="text"
        name="userEmail"
        placeholder="이메일"
        value={localEmail}
        onChange={handleChange}
        required
      />
    </>
  );
};

export default UserEmailInfo;
