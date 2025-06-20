import "./header.css";

const Header = () =>{
    return(

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

    )
}

export default Header;