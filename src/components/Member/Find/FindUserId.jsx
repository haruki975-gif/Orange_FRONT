import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Member/Form.css";
import axios from "axios";

const FindUserId = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [foundUserId, setFoundUserId] = useState("");
  const navi = useNavigate();
  const apiUrl = URL_CONFIG.API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName.trim() || !userEmail.trim()) {
      setErrorMsg("이름과 이메일을 모두 입력해주세요.");
      return;
    }

    setErrorMsg("");

    axios
      .get(`${apiUrl}/api/members/find-id/${userName}`, {
        params: {
          userName: userName,
          userEmail: userEmail,
        },
      })
      .then((response) => {
        //console.log(response);
        if (
          response.data &&
          response.data.items &&
          response.data.items.userId
        ) {
          setFoundUserId(response.data.items.userId);
        } else {
          setErrorMsg("아이디를 찾을 수 없습니다.");
          setFoundUserId("");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("아이디 조회에 실패했습니다.");
        setFoundUserId("");
      });
  };

  return (
    <div className="page-container">
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
            <p
              style={{
                color: "red",
                fontWeight: "bold",
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              회원님의 아이디는{" "}
              <span style={{ color: "red" }}>{foundUserId}</span> 입니다.
            </p>
          )}

          <button type="submit" className="login-btn">
            확인
          </button>
          <button className="go-login-btn" onClick={() => navi("/login")}>
            로그인으로
          </button>
        </form>
      </div>
    </div>
  );
};
export default FindUserId;
