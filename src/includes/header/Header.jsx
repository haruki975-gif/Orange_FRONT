import { useState } from "react";
import "./header.css";
import AlertComponent from "./components/AlertComponent";

<<<<<<< HEAD
const Header = () => {
  return (
    <header id="main-header">
      <div className="logo">
        <img src="/img/로고.png" alt="로고" />
      </div>
      <div className="right">
        <div className="alert">
          <img src="/img/icon/bell.png" alt="" />
        </div>
        <div className="user">
          <a className="name">홍길동</a>
          <div className="profile">
            <img src="/img/icon/person-fill.png" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
=======
const Header = () =>{

    const [openAlertModal, setOpenAlertModal] = useState(false);

    return(

        <header id="main-header">
            <div className="logo">
                <img src="/img/로고.png" alt="로고" />
            </div>
            <div className="right">
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
                setOpenAlertModal={setOpenAlertModal} openAlertModal={openAlertModal}/>

        </header>

    )
}

export default Header;
>>>>>>> eb311247dfe5a11f437b884b818994b2b0df423c
