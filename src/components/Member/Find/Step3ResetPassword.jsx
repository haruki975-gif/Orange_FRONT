import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Step3ResetPassword = ({ userId, userEmail, setStep }) => {
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const apiUrl = URL_CONFIG.API_URL;
  const navi = useNavigate();
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+=])[A-Za-z\d~`!@#$%^&*()_\-+=]{8,20}$/;

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!newPw.trim() || !confirmPw.trim()) {
      setErrorMsg("모든 항목을 입력해주세요.");
      return;
    }

    if (!passwordRegex.test(newPw)) {
      setErrorMsg("비밀번호는 영문, 숫자, 특수문자 포함 8~20자여야 합니다.");
      return;
    }

    if (newPw !== confirmPw) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios
      .put(`${apiUrl}/api/members/find-pw/step3/${userId}`, {
        userEmail: userEmail,
        userPw: newPw,
      })
      .then(() => {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navi("/login");
      })
      .catch((error) => {
        setErrorMsg("비밀번호 변경에 실패했습니다.");
        console.error(error);
      });
  };

  return (
    <>
      <h2 className="title">비밀번호 재설정</h2>
      <p className="subtitle">새 비밀번호를 입력해주세요.</p>

      <form onSubmit={handleResetPassword} className="login-form">
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          required
        />

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <button type="submit" className="login-btn">
          비밀번호 변경
        </button>
      </form>
    </>
  );
};

export default Step3ResetPassword;
