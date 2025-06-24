
const AlertComponent = ({setOpenAlertModal, openAlertModal}) =>{

    const requestList = [
        {
            teamName : "공부할사람 모여라",
            userName : "홍길동"
        },
        {
            teamName : "공부할사람 모여라",
            userName : "홍길동"
        },
        {
            teamName : "공부할사람 모여라",
            userName : "홍길동"
        },
        {
            teamName : "공부할사람 모여라",
            userName : "홍길동"
        },
    ]

    return(
        <div id={`alert-component`} 
            className={openAlertModal && "active"}>
            <div className="container">
                {requestList.map(request =>(
                    <div className="request">
                        <p className="request-type">팀신청</p>
                        <div className="request-content">
                            <p className="team-name">{request.teamName}</p>
                            <div className="request-user-info">
                                <img src="/img/icon/arrow-90.png" alt="" />
                                <div className="user-profile">
                                    <img src="/img/icon/person-fill.png" alt="" />
                                </div>
                                <p className="user-name">{request.userName}</p>
                            </div>
                        </div>
                        <button className="accept-btn">수락</button>
                        <button className="cancle-btn">거절</button>
                    </div>
                ))}
            </div>
            <button className="close-btn" onClick={() => setOpenAlertModal(false)}>
                <img src="/img/icon/chevron-right.png" alt="" />
            </button>
        </div>
    )
}

export default AlertComponent;