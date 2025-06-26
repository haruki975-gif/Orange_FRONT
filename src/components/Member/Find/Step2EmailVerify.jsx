/* 이메일 인증 */

import axios from "axios";
import React from "react";

const Step2EmailVerify = ({
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  emailCode,
  setEmailCode,
  errorMsg,
  setErrorMsg,
}) => {
  const apiUrl = URL_CONFIG.API_URL;

  const handleSendEmailCode = () => {
    if (!userName.trim() || userEmail.trim()) {
      setErrorMsg("이름과 이메일을 모두 입력해주세요.");
      return;
    }

    axios
      .post(`${apiUrl}/api/members/send-code`, {
        userId,
        userName,
        userEmail,
      })
      .then((response) => {
        const code = response.data.items.code;
        setServerCode(code);
        alert("인증번호가 전송되었습니다.");
      })
      .catch((error) => {
        setErrorMsg("인증번호 전송에 실패했습니다.");
      });
  };

  const handleEmailVerifySubmit = () => {
    e.preventDefault();

    if (emailCode !== severCode) {
      setErrorMsg("인증번호가 일치하지 않습니다.");
      return;
    }

    setErrorMsg("");
    setStep(3);
  };

  return (
    <>
      <h2 className="title">비밀번호 찾기</h2>
      <p className="subtitle">
        회원정보에 등록한 이메일과 입력한 이메일이 같아야, <br />
        인증번호를 받을 수 있습니다.
      </p>

      <form onSubmit={handleEmailVerifySubmit} className="login-form">
        <input
          type="text"
          name="userName"
          placeholder="이름을 입력해주세요."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <div className="email-field">
          <input
            type="text"
            name="userEmail"
            placeholder="이메일을 입력해주세요."
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button
            type="button"
            className="email-btn"
            onClick={handleSendEmailCode}
          >
            인증번호 받기
          </button>
        </div>

        <input
          type="text"
          name="emailCode"
          placeholder="인증번호 4자리 숫자 입력"
          value={emailCode}
          onChange={(e) => setEmailCode(e.target.value)}
        />

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <button type="submit" className="login-btn">
          다음
        </button>
      </form>
    </>
  );
};

export default Step2EmailVerify;
