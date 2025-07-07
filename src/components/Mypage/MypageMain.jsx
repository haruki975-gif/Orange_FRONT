import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaImage,
  FaUserEdit,
  FaLock,
  FaUserTimes,
} from "react-icons/fa";
import "./MypageMain.css";
import { logout } from "../Member/Login/js/authService";

const MypageMain = () => {
  const navi = useNavigate();

  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");

  const handleLogout = () => {
    logout()
      .then(() => {
        alert("로그아웃 되었습니다.");
        sessionStorage.clear();
        navi("/");
      })
      .catch((error) => {
        // console.log("로그아웃 실패 또는 토큰 만료", error);
        sessionStorage.clear();
        alert("로그아웃 되었습니다.");
        navi("/");
      });
  };

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <div className="user-info">
          <img
            src="/img/로고_마이페이지.png"
            alt=""
            style={{ width: "55px", height: "55px" }}
          />
          <div>
            <div className="user-id">{userId}</div>
            <div className="user-welcome">
              <span className="highlight">{userName}</span>님 환영합니다.
            </div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      <div className="mypage-menu">
        <div className="menu-card" onClick={() => navi("/profile-image")}>
          <FaImage size={30} />
          <p>내 프로필 수정</p>
        </div>
        <div className="menu-card" onClick={() => navi("/info-form")}>
          <FaUserEdit size={30} />
          <p>내 정보 수정</p>
        </div>
        <div className="menu-card" onClick={() => navi("/password-form")}>
          <FaLock size={30} />
          <p>비밀번호 변경</p>
        </div>
        <div className="menu-card" onClick={() => navi("/delete-user")}>
          <FaUserTimes size={30} />
          <p>회원 탈퇴</p>
        </div>
      </div>
    </div>
  );
};

export default MypageMain;
