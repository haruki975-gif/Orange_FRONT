import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserPhoneInfo from "./UserPhoneInfo";
import UserEmailInfo from "./UserEmailInfo";
import UserAddressInfo from "./UserAddressInfo";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";

const InfoEditInput = () => {
  const { auth } = useContext(GlobalContext);
  const navi = useNavigate();
  const apiUrl = URL_CONFIG.API_URL;

  const [formData, setFormData] = useState({
    userEmail: "",
    userPhone: "",
    userAddress1: "",
    userAddress2: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [successMessages, setSuccessMessages] = useState({});

  // 변경된 이메일, 연락처를 sessionStorage에 반영
  useEffect(() => {
    sessionStorage.setItem("userEmail", formData.userEmail);
    sessionStorage.setItem("userPhone", formData.userPhone);
  }, [formData.userEmail, formData.userPhone]);

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
      .put(`${apiUrl}/api/info/${auth.userNo}`, formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        alert("수정이 완료되었습니다.");
        sessionStorage.setItem("userEmail", formData.userEmail);
        sessionStorage.setItem("userPhone", formData.userPhone);
      })
      .catch(() => {
        alert("수정 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="page-container">
      <div className="signup-wrapper">
        <h2 className="title">내 정보 수정</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            value={auth.userId ?? ""}
            disabled
            style={{ backgroundColor: "#ddd" }}
          />
          <input
            type="text"
            name="userName"
            value={auth.userName ?? ""}
            disabled
            style={{ backgroundColor: "#ddd" }}
          />

          <UserPhoneInfo
            userId={auth.userId}
            formData={formData}
            setFormData={setFormData}
            setValidationErrors={setValidationErrors}
            setSuccessMessages={setSuccessMessages}
          />
          {validationErrors.userPhone && (
            <p className="error-msg">{validationErrors.userPhone}</p>
          )}
          {successMessages.userPhone && (
            <p className="success-msg">{successMessages.userPhone}</p>
          )}

          <UserEmailInfo
            userId={auth.userId}
            formData={formData}
            setFormData={setFormData}
            setValidationErrors={setValidationErrors}
            setSuccessMessages={setSuccessMessages}
          />
          {validationErrors.userEmail && (
            <p className="error-msg">{validationErrors.userEmail}</p>
          )}
          {successMessages.userEmail && (
            <p className="success-msg">{successMessages.userEmail}</p>
          )}

          <UserAddressInfo
            userId={auth.userId}
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
