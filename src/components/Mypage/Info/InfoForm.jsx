import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserPhoneInfo from "./UserPhoneInfo";
import UserEmailInfo from "./UserEmailInfo";
import UserAddressInfo from "./UserAddressInfo";

const InfoEditInput = () => {
  const userNo = sessionStorage.getItem("userNo");
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const navi = useNavigate();
  const apiUrl = URL_CONFIG.API_URL;

  const [formData, setFormData] = useState({
    userEmail: "",
    userPhone: "",
    userAddress1: "",
    userAddress2: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  // 정보 수정 요청
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      validationErrors.userPhone ||
      validationErrors.userEmail ||
      validationErrors.userAddress1
    ) {
      alert("입력값을 확인해주세요.");
      return;
    }

    axios
      .put(`${apiUrl}/api/info/${userNo}`, formData)
      .then(() => alert("수정이 완료되었습니다."))
      .catch(() => alert("수정 중 오류가 발생했습니다."));
  };

  return (
    <div className="page-container">
      <div className="signup-wrapper">
        <h2 className="title">내 정보 수정</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            value={userId}
            disabled
            style={{ backgroundColor: "#ddd" }}
          />
          <input
            type="text"
            name="userName"
            value={userName}
            disabled
            style={{ backgroundColor: "#ddd" }}
          />

          <UserPhoneInfo
            userId={userId}
            formData={formData}
            setFormData={setFormData}
            setValidationErrors={setValidationErrors}
          />
          {validationErrors.userPhone && (
            <p className="error-msg">{validationErrors.userPhone}</p>
          )}

          <UserEmailInfo
            userId={userId}
            formData={formData}
            setFormData={setFormData}
            setValidationErrors={setValidationErrors}
          />
          {validationErrors.userEmail && (
            <p className="error-msg">{validationErrors.userEmail}</p>
          )}

          <UserAddressInfo
            userId={userId}
            formData={formData}
            setFormData={setFormData}
            setValidationErrors={setValidationErrors}
          />
          {validationErrors.userAddress1 && (
            <p className="error-msg">{validationErrors.userAddress1}</p>
          )}

          <button type="submit" className="signup-btn">
            수정하기
          </button>
          <button
            type="button"
            className="info-back-btn"
            onClick={() => navi("/mypage-main")}
          >
            뒤로가기
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoEditInput;
