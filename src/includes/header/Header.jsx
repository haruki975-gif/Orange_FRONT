import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import AlertComponent from "./components/AlertComponent";
import axios from "axios";
import { GlobalContext } from "../../components/context/GlobalContext";
import { getProfileImage } from "../../components/Mypage/Profile/js/getProfileImage";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const { logout, auth } = useContext(GlobalContext);
  const navi = useNavigate();
  const [profileImage, setProfileImage] = useState(null); // 서버에서 불러온 이미지
  const apiUrl = URL_CONFIG.API_URL;

  /* 프로필 이미지 조회 */
  useEffect(() => {
    if (!auth?.userNo || !auth?.accessToken) return;

    getProfileImage(auth.userNo, auth.accessToken, apiUrl)
      .then((url) => {
        if (url) {
          setProfileImage(url);
        } else {
          setProfileImage(null);
        }
      })
      .catch(() => {
        setProfileImage(null);
      });
  }, [auth.userNo, auth.accessToken, apiUrl]);

  // 로그아웃 처리
  const handleLogout = () => {
    if (!auth?.accessToken) {
      alert("이미 로그인 만료 상태입니다.");
      logout();
      navi("/");
      return;
    }

    axios
      .post(
        `${apiUrl}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then(() => {
        alert("로그아웃 되었습니다.");
        logout();
        navi("/");
      })
      .catch((err) => {
        console.error("로그아웃 실패 또는 토큰 만료", err);
        alert("로그아웃 되었습니다.");
        navi("/");
      });
  };

  return (
    <header id="main-header">
      <div className="logo">
        <img src="/img/로고.png" alt="로고" onClick={() => navi("/")} />
      </div>

      {/* 로그인하면 바뀌는 부분 */}
      <div className="right">
        {auth.userId ? (
          // 로그인 됨
          <>
            <div className="alert" onClick={() => setOpenAlertModal(true)}>
              <img src="/img/icon/bell.png" alt="" />
            </div>
            <div className="user">
              <a className="name">{auth.userName}</a>
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
