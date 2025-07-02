import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import AlertComponent from "./components/AlertComponent";
import axios from "axios";
import {
  checkAuthStatus,
  getUserData,
  logout,
} from "../../components/Member/Login/js/authService";
import { getProfileImage } from "../../components/Mypage/Profile/js/getProfileImage";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const navi = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const userNo = sessionStorage.getItem("userNo");
  const [profileImage, setProfileImage] = useState(null); // 서버에서 불러온 이미지
  const apiUrl = URL_CONFIG.API_URL;

  // 로그인 상태 확인
  const checkLoginStatus = () => {
    const isLoggedIn = checkAuthStatus();
    const user = getUserData();

    if (isLoggedIn && user.name) {
      setIsLogin(true);
      setUserName(user.name);
    } else {
      setIsLogin(false);
      setUserName("");
    }
  };

  /* 프로필 이미지 조회 */
  useEffect(() => {
    getProfileImage(userNo, token, apiUrl)
      .then((url) => {
        if (url) {
          setProfileImage(url);
        } else {
          setProfileImage(null);
          setMessage("등록된 프로필 이미지가 없습니다.");
        }
      })
      .catch((error) => {
        console.log("프로필 이미지 조회 실패", error);
        setMessage("프로필 이미지를 불러오지 못했습니다.");
      });
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    logout()
      .then(() => {
        alert("로그아웃 되었습니다.");
        sessionStorage.clear();
        checkLoginStatus();
        navi("/");
      })
      .catch((err) => {
        console.log("로그아웃 실패 또는 토큰 만료", err);
        sessionStorage.clear();
        alert("로그아웃 되었습니다.");
        checkLoginStatus();
        navigate("/");
      });
  };

  // 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();

    // 로그인 상태 변화 감지용 이벤트
    const handleLoginChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("loginStateChanged", handleLoginChange);

    return () => {
      window.removeEventListener("loginStateChanged", handleLoginChange);
    };
  }, []);

  return (
    <header id="main-header">
      <div className="logo">
        <img src="/img/로고.png" alt="로고" onClick={() => navi("/")} />
      </div>

      {/* 로그인하면 바뀌는 부분 */}
      <div className="right">
        {isLogin ? (
          // 로그인 됨
          <>
            <div className="alert" onClick={() => setOpenAlertModal(true)}>
              <img src="/img/icon/bell.png" alt="" />
            </div>
            <div className="user">
              <a className="name">{userName}</a>
              <div className="profile">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="프로필 이미지"
                    onClick={() => navi("/mypage-main")}
                    className="profile-img"
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                ) : (
                  <FaUserCircle
                    className="profile-icon"
                    onClick={() => navi("/mypage-main")}
                  />
                )}
              </div>
              <div className="logout">
                <a className="logout" onClick={handleLogout}>
                  로그아웃
                </a>
              </div>
            </div>
          </>
        ) : (
          // 로그아웃 됨
          <>
            <div className="header-menu">
              <a className="login" onClick={() => navi("/login")}>
                로그인
              </a>
              <a className="signup" onClick={() => navi("/signup")}>
                회원가입
              </a>
            </div>
          </>
        )}
      </div>

      <AlertComponent
        setOpenAlertModal={setOpenAlertModal}
        openAlertModal={openAlertModal}
      />
    </header>
  );
};

export default Header;
