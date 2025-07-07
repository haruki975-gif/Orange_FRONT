/* 이메일 인증 */

import axios from "axios";
import React, { useEffect, useState } from "react";

const Step2EmailVerify = ({
  userId,
  userEmail,
  setUserEmail,
  emailCode,
  setEmailCode,
  serverCode,
  setServerCode,
  errorMsg,
  setErrorMsg,
  setStep,
}) => {
  const apiUrl = URL_CONFIG.API_URL;
  const [timer, setTimer] = useState(0); // 인증번호 입력 제한시간

  const startTimer = () => {
    setTimer(180); // 3분(180초)
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSendEmailCode = () => {
    if (!userEmail.trim()) {
      setErrorMsg("이메일을 입력해주세요.");
      return;
    }

    axios
      .get(`${apiUrl}/api/members/find-pw/step2/${userId}`, {
        params: { userEmail },
      })
      .then((response) => {
        const code = response.data.items[0].code;
        setServerCode(code);
        startTimer(); // 타이머 시작
        alert("인증번호가 전송되었습니다.");
      })
      .catch(() => {
        setErrorMsg("인증번호 전송에 실패했습니다.");
      });
  };

  const handleEmailVerifySubmit = (e) => {
    e.preventDefault();

    if (!emailCode.trim()) {
      setErrorMsg("인증번호를 입력해주세요.");
      return;
    }

    if (!serverCode) {
      setErrorMsg("먼저 인증번호를 받아주세요.");
      return;
    }

    if (emailCode !== serverCode) {
      setErrorMsg("인증번호가 일치하지 않습니다.");
      return;
    }

    axios
      .post(`${apiUrl}/api/members/verify-email`, {
        email: userEmail,
        code: emailCode,
      })
      .then((response) => {
        if (response.data.code === "200") {
          setStep(3);
        } else {
          setErrorMsg(response.data.message);
        }
      })
      .catch(() => {
        setErrorMsg("인증번호 확인에 실패했습니다.");
      });
  };

  // 분:초 표시
  const formatTime = (sec) => {
    const min = String(Math.floor(sec / 60)).padStart(2, "0");
    const second = String(sec % 60).padStart(2, "0");
    return `${min}:${second}`;
  };

  return (
    <>
      <h2 className="title">비밀번호 찾기</h2>
      <p className="subtitle">
        회원정보에 등록한 이메일과 입력한 이메일이 같아야, <br />
        인증번호를 받을 수 있습니다.
      </p>

      <form onSubmit={handleEmailVerifySubmit} className="login-form">
        <div className="email-field">
          <input
            type="text"
            name="userEmail"
            placeholder="이메일을 입력해주세요."
            value={userEmail}
            required
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button
            type="button"
            className="email-btn"
            required
            onClick={handleSendEmailCode}
          >
            인증번호 받기
          </button>
        </div>

        {timer > 0 && (
          <p className="timer-text">인증번호 유효시간: {formatTime(timer)}</p>
        )}

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
