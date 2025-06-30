import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import OpenPostcode from "../../Member/Signup/OpenPostcode";
import "../../Member/Signup/Signup.css";

function InfoEditInput({
  formData,
  setFormData,
  validationErrors,
  successMessages,
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
    <div className="page-container">
      <div className="signup-wrapper">
        <h2 className="title">내 정보 수정</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="userId"
            value={formData.userId}
            disabled
            style={{ backgroundColor: "#ddd" }}
          />
          <input
            type="text"
            name="userName"
            value={formData.userName}
            disabled
            style={{ backgroundColor: "#ddd" }}
          />

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
            수정하기
          </button>
        </form>

        {showPostcode && (
          <OpenPostcode
            onClose={() => setShowPostcode(false)}
            onComplete={handleAddressComplete}
          />
        )}
      </div>
    </div>
  );
}

export default InfoEditInput;
