import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import AlertComponent from "./components/AlertComponent";

const Header = () => {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const navi = useNavigate();

  return (
    <header id="main-header">
      <div className="logo">
        <img src="/img/로고.png" alt="로고" onClick={() => navi("/")} />
      </div>

      {/* 로그인하면 바뀌는 부분 */}
      <div className="right">
        <div className="header-menu">
          <a className="login" onClick={() => navi("/login")}>
            로그인
          </a>
          <a className="signup" onClick={() => navi("/signup")}>
            회원가입
          </a>
          <a className="mypage">마이페이지</a>
        </div>

        <div className="alert" onClick={() => setOpenAlertModal(true)}>
          <img src="/img/icon/bell.png" alt="" />
        </div>
        <div className="user">
          <a className="name">홍길동</a>
          <div className="profile">
            <img src="/img/icon/person-fill.png" alt="" />
          </div>
        </div>
      </div>

      <AlertComponent
        setOpenAlertModal={setOpenAlertModal}
        openAlertModal={openAlertModal}
      />
    </header>
  );
};

export default Header;
