import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Member/Form.css";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(GlobalContext);
  const apiUrl = URL_CONFIG.API_URL;

  const handleLogin = (e) => {
    e.preventDefault();

    if (!userId.trim() || !userPw.trim()) {
      setErrorMsg("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    axios
      .post(`${apiUrl}/api/auth/tokens`, {
        userId,
        userPw,
      })
      .then((response) => {
        const userInfo = response.data.items[0];
        login(
          userInfo.accessToken,
          userInfo.refreshToken,
          userInfo.userNo,
          userInfo.userId,
          userInfo.userName,
          userInfo.userRole
        );

        alert(`${userInfo.userName}님 환영합니다.`);
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
