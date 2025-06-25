import { useState } from "react";

const UpdateWorkModal = ({setOpenUpdateModal, modalBackground, prevWorkTitle}) =>{

    const memberList = ["홍길동", "철수", "짱구"];

    const [chooseMember, setChooseMember] = useState();

    const closeUpdateTeamModal = (e) =>{
        setOpenUpdateModal(false);
    }

    return( 
        <div className="work-modal" ref={modalBackground} onClick={(e) => {
            if(modalBackground.current === e.target)
                closeUpdateTeamModal(e);
        }}>
            <form className="container">
                <h2 className="title">업무 수정</h2>
                <div className="team-name">
                    <label htmlFor="team-name" className="name">업무명</label>
                    <input type="text" id="team-name" placeholder="업무명(최대100자)" value={prevWorkTitle}/>
                </div>
                <div className="team-content">
                    <label htmlFor="team-content" className="content">업무 설명</label>
                    <textarea id="team-content" placeholder="업무 설명 (최대 1000자)"/>
                </div>
                <div className="team-category">
                    <h3>담당자</h3>
                    <div className="categories">
                        {memberList.map(member => (
                            <button type="button" 
                                className={`category ${chooseMember === member ? "active" : ""}`} onClick={() => setChooseMember(member)}
                            >
                                {member}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="create-request-btn">업무 생성</button>
                <button className="close-btn" type="button" onClick={() => closeUpdateTeamModal()}>
                    <img src="/img/icon/x-lg.png" alt="" />
                </button>
            </form>
        </div>
    )
}

export default UpdateWorkModal;