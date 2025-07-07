/* 아이디 조회 */

import React, { useState } from "react";
import axios from "axios";

const Step1UserCheck = ({
  userId,
  setUserId,
  setStep,
  errorMsg,
  setErrorMsg,
}) => {
  const apiUrl = URL_CONFIG.API_URL;

  const validateUserId = (value) => {
    const regex = /^[a-zA-Z0-9]{6,15}$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId.trim()) {
      setErrorMsg("아이디를 입력해 주세요.");
      return;
    }

    if (!validateUserId(userId)) {
      setErrorMsg("아이디 형식이 올바르지 않습니다.");
      return;
    }

    axios
      .get(`${apiUrl}/api/members/find-pw/step1/${userId}`)
      .then((response) => {
        const items = response.data.items;

        if (Array.isArray(items) && items.length > 0 && items[0].userId) {
          setStep(2); // 성공하면 다음 스텝으로 이동
          setErrorMsg("");
        } else {
          setErrorMsg("존재하지 않는 아이디입니다.");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("아이디 조회에 실패했습니다.");
        }
      });
  };

  return (
    <>
      <h2 className="title">비밀번호 찾기</h2>
      <p className="subtitle">비밀번호를 찾고자 하는 아이디를 입력해 주세요.</p>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="userId"
          placeholder="아이디를 입력해주세요."
          value={userId}
          required
          onChange={(e) => setUserId(e.target.value)}
        />

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <button type="submit" className="login-btn">
          다음
        </button>
      </form>

      <div className="login-links">
        <p>
          아이디가 기억나지 않는다면?{" "}
          <a href="/find-id" style={{ fontWeight: "bold", marginLeft: "10px" }}>
            아이디 찾기
          </a>
        </p>
      </div>
    </>
  );
};

export default Step1UserCheck;
