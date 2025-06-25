import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiSearch } from "react-icons/fi";
import "./Signup.css";
import OpenPostcode from "./OpenPostcode";

function SignupInput({
  formData,
  setFormData,
  validationErrors,
  successMessages,
  toggleShowPassword,
  showPassword,
  handleChange,
  handleSubmit,
}) {
  const [showPostcode, setShowPostcode] = useState(false);

  const handleAddressComplete = (address) => {
    setFormData((prev) => ({
      ...prev,
      userAddress1: address,
    }));
  };

  return (
    <div className="signup-wrapper">
      <h2 className="title">회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="userId"
          placeholder="아이디"
          value={formData.userId}
          onChange={handleChange}
          required
        />
        {validationErrors.userId && (
          <p className="error-msg">{validationErrors.userId}</p>
        )}
        {successMessages.userId && (
          <p className="success-msg">{successMessages.userId}</p>
        )}

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="userPw"
            placeholder="비밀번호"
            value={formData.userPw}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FiEyeOff color="#FF8C00" size="24" />
            ) : (
              <FiEye color="#FF8C00" size="24" />
            )}
          </button>
        </div>
        {validationErrors.userPw && (
          <p className="error-msg">{validationErrors.userPw}</p>
        )}

        <input
          type="password"
          name="userPwConfirm"
          placeholder="비밀번호 확인"
          value={formData.userPwConfirm}
          onChange={handleChange}
          required
        />
        {validationErrors.userPwConfirm && (
          <p className="error-msg">{validationErrors.userPwConfirm}</p>
        )}

        <input
          type="text"
          name="userName"
          placeholder="이름"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        {validationErrors.userName && (
          <p className="error-msg">{validationErrors.userName}</p>
        )}

        <input
          type="text"
          name="userEmail"
          placeholder="이메일"
          value={formData.userEmail}
          onChange={handleChange}
          required
        />
        {validationErrors.userEmail && (
          <p className="error-msg">{validationErrors.userEmail}</p>
        )}
        {successMessages.userEmail && (
          <p className="success-msg">{successMessages.userEmail}</p>
        )}

        <input
          type="text"
          name="userPhone"
          placeholder="연락처 (숫자 11자리)"
          maxLength={11}
          value={formData.userPhone}
          onChange={handleChange}
          required
        />
        {validationErrors.userPhone && (
          <p className="error-msg">{validationErrors.userPhone}</p>
        )}
        {successMessages.userPhone && (
          <p className="success-msg">{successMessages.userPhone}</p>
        )}

        <div className="address-field">
          <input
            type="text"
            name="userAddress1"
            placeholder="주소"
            value={formData.userAddress1}
            onChange={handleChange}
            disabled
            style={{ backgroundColor: "#ddd" }}
          />
          <button
            type="button"
            className="search-btn"
            onClick={() => setShowPostcode(true)}
          >
            <FiSearch size="20" color="#FF8C00" />
            <span>검색</span>
          </button>
        </div>
        {validationErrors.userAddress1 && (
          <p className="error-msg">{validationErrors.userAddress1}</p>
        )}

        <input
          type="text"
          name="userAddress2"
          placeholder="상세주소"
          value={formData.userAddress2}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signup-btn">
          가입하기
        </button>
      </form>

      {showPostcode && (
        <OpenPostcode
          onClose={() => setShowPostcode(false)}
          onComplete={handleAddressComplete}
        />
      )}
    </div>
  );
}

export default SignupInput;
