import React, { useState } from "react";
import axios from "axios";

const apiUrl = URL_CONFIG.API_URL;

function FindPasswordStep2({ userId }) {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@._^])[A-Za-z\d!@._^]{8,20}$/;

  const handleChangePassword = () => {
    if (!pwRegex.test(newPassword)) {
      setErrorMsg("비밀번호 형식을 확인해 주세요.");
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    setErrorMsg("");

    axios
      .put(`${apiUrl}/api/info/password/${userId}`, {
        newPassword: newPassword,
      })
      .then((res) => {
        console.log("비밀번호 변경 성공", res);
        setSuccessMsg("비밀번호가 성공적으로 변경되었습니다.");
      })
      .catch((err) => {
        console.error("비밀번호 변경 실패", err);
        setErrorMsg("비밀번호 변경에 실패했습니다.");
      });
  };

  return (
    <>
      <p>새 비밀번호를 입력해주세요.</p>
      <input
        type="password"
        name="newPassword"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        name="newPasswordConfirm"
        placeholder="새 비밀번호 확인"
        value={newPasswordConfirm}
        onChange={(e) => setNewPasswordConfirm(e.target.value)}
      />
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}
      <button
        type="button"
        className="login-btn"
        onClick={handleChangePassword}
      >
        비밀번호 변경
      </button>
    </>
  );
}

export default FindPasswordStep2;
