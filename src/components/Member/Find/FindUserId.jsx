import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/LoginForm.css";

const FindUserId = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [foundUserId, setFoundUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName.trim() || !userEmail.trim()) {
      setErrorMsg("이름과 이메일을 모두 입력해주세요.");
      return;
    }

    setErrorMsg("");

    // 서버 요청
    // 예: axios.post('/api/members/find-id', { userName, userEmail })
    // 여기선 임시로 성공 메시지 표시
    setTimeout(() => {
      setFoundUserId("user0101"); // 예시 아이디
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <h2 className="title">아이디 찾기</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="userName"
          placeholder="이름을 입력해주세요."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="text"
          name="userEmail"
          placeholder="이메일을 입력해주세요."
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        {foundUserId && (
          <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
            회원님의 아이디는{" "}
            <span style={{ color: "red" }}>{foundUserId}</span> 입니다.
          </p>
        )}

        <button type="submit" className="login-btn">
          확인
        </button>
      </form>
    </div>
  );
};
export default FindUserId;
