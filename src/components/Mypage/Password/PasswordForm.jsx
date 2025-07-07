import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "../../Member/Form.css";
import { useNavigate } from "react-router-dom";
import { UserPasswordCheck } from "./UserPasswordCheck";
import { updateUserPassword } from "./UserPasswordUpdate";
import { GlobalContext } from "../../context/GlobalContext";

const PasswordForm = () => {
  const [userPassword, setUserPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navi = useNavigate();
  const apiUrl = URL_CONFIG.API_URL;
  const { auth, logout } = useContext(GlobalContext);

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+=])[A-Za-z\d~`!@#$%^&*()_\-+=]{8,20}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userPassword.trim()) {
      setErrorMsg("현재 비밀번호를 입력해주세요.");
      return;
    }
    if (!newPassword.trim()) {
      setErrorMsg("새 비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      setErrorMsg("비밀번호는 영문, 숫자, 특수문자 포함 8~20자여야 합니다.");
      return;
    }
    if (!confirmPassword.trim()) {
      setErrorMsg("새 비밀번호를 확인해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 1단계: 현재 비밀번호 확인
    UserPasswordCheck(auth.userNo, userPassword, auth.accessToken, apiUrl)
      .then(() => {
        // 2단계: 새 비밀번호로 업데이트
        return updateUserPassword(
          auth.userNo,
          userPassword,
          newPassword,
          auth.accessToken,
          apiUrl
        );
      })
      .then(() => {
        alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
        logout();
        window.location.replace("/login");
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setErrorMsg("현재 비밀번호가 일치하지 않습니다.");
        } else {
          setErrorMsg("비밀번호 변경에 실패했습니다.");
        }
      });
  };

  return (
    <div className="page-container">
      <div className="wrapper">
        <h2 className="title">비밀번호 변경</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="password"
            name="userPassword"
            placeholder="현재 비밀번호"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="common-btn">
            수정하기
          </button>
        </form>
        <button className="back-btn" onClick={() => navi("/mypage-main")}>
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default PasswordForm;
