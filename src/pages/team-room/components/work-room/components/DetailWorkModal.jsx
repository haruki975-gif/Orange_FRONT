import { FaUserCircle } from "react-icons/fa";

const DetailWorkModal = ({setOpenDetailModal, modalBackground, workDetail}) =>{


    const closeDetailTeamModal = (e) =>{
        setOpenDetailModal(false);
    }

    const customDate = (date) =>{
        return date.slice(0, 10)
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
                    <p>{workDetail.title}</p>
                </div>
                <div className="end-date">
                    <h3>마감일</h3>
                    <p>{customDate(workDetail.endDate)}</p>
                </div>
                <div className="team-content">
                    <h3>업무 설명</h3>
                    <p>{workDetail.content}</p>
                </div>
                <div className="assignee">
                    <h3>담당자</h3>
                    <div className="assignee-info">
                        <div className="user-profile">
                            {work.assigneeProfile ? (
                                <img src={workDetail.assigneeProfile} alt="" />
                            ) : (
                                <FaUserCircle
                                    className="profile-icon"
                                />
                            )
                        }
                        </div>
                        <p className="user-name">{workDetail.assigneeName}</p>
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