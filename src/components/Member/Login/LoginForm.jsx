import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Member/Form.css";
import { login } from "./js/authService";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navi = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!userId.trim() || !userPw.trim()) {
      setErrorMsg("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    login(userId, userPw)
      .then((data) => {
        //console.log(data);
        const response = data.items;

        sessionStorage.setItem("accessToken", response.accessToken);
        sessionStorage.setItem("refreshToken", response.refreshToken);
        sessionStorage.setItem("userNo", response.userNo);
        sessionStorage.setItem("userId", response.userId);
        sessionStorage.setItem("userName", response.userName);
        sessionStorage.setItem("userRole", response.userRole);

        // 로그인 상태 변경 이벤트
        window.dispatchEvent(new Event("loginStateChanged"));
        alert(`${response.userName}님 환영합니다.`);

        if (response.userRole === "ADMIN") {
          navi("/admin");
        } else {
          navi("/");
        }
      })
      .catch((error) => {
        console.log("로그인 오류", error);
        let message =
          "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          message = error.response.data.error;
        }

        setErrorMsg(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="page-container">
      <div className="login-wrapper">
        <h2 className="title">로그인</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            name="userId"
            placeholder="아이디를 입력해주세요."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={isLoading}
          />
          <div className="password-field">
            <input
              type="password"
              name="userPw"
              placeholder="비밀번호를 입력해주세요."
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            로그인
          </button>
        </form>

        <div className="login-links">
          <a href="/find-pw">비밀번호 찾기</a>
          <span>|</span>
          <a href="/find-id">아이디 찾기</a>
          <span>|</span>
          <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
