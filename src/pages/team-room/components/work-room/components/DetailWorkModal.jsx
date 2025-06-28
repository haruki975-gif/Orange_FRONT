

const DetailWorkModal = ({setOpenDetailModal, modalBackground, workTitle}) =>{


    const closeDetailTeamModal = (e) =>{
        setOpenDetailModal(false);
    }

    return(
        <div className="work-modal" ref={modalBackground} onClick={(e) => {
            if(modalBackground.current === e.target)
                closeDetailTeamModal(e);
        }}>
            <div className="container">
                <h2 className="title">업무</h2>
                <div className="team-name">
                    <h3>업무명</h3>
                    <p>{workTitle}</p>
                </div>
                <div className="end-date">
                    <h3>마감일</h3>
                    <p>25/06/25</p>
                </div>
                <div className="team-content">
                    <h3>업무 설명</h3>
                    <p>가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하</p>
                </div>
                <div className="assignee">
                    <h3>담당자</h3>
                    <div className="assignee-info">
                        <div className="user-profile">
                            <img src="/img/icon/person-fill.png" alt="" />
                        </div>
                        <p className="user-name">홍길동</p>
                    </div>
                </div>
                <button className="close-btn" type="button" onClick={() => closeDetailTeamModal()}>
                    <img src="/img/icon/x-lg.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default DetailWorkModal;