import { useState } from "react";

const CreateTeamModal = ({setOpenModal, modalBackground}) =>{

    const categories = [
        {key : "study", label : "스터디"},
        {key : "project", label : "프로젝트"},
        {key : "free", label : "자유"}
    ];

    const [chooseCategory, setChooseCategory] = useState();

    const closeCreateTeamModal = (e) =>{
        setOpenModal(false);
    }

    return( 
        <div className="create-team-modal" ref={modalBackground} onClick={(e) => {
            if(modalBackground.current === e.target)
                closeCreateTeamModal(e);
        }}>
            <form className="container">
                <h2 className="title">팀 생성</h2>
                <div className="team-name">
                    <label htmlFor="team-name" className="name">팀명</label>
                    <input type="text" id="team-name" placeholder="팀명(최대100자)"/>
                </div>
                <div className="team-content">
                    <label htmlFor="team-content" className="content">팀 설명</label>
                    <textarea id="team-content" placeholder="팀설명 (최대 1000자)"/>
                </div>
                <div className="team-category">
                    <h3>팀 카테고리</h3>
                    <div className="categories">
                        {categories.map(category => (
                            <button type="button" className={`category ${chooseCategory === category.key ? "active" : ""}`} onClick={() => setChooseCategory(category.key)}>{category.label}</button>
                        ))}
                    </div>
                </div>

                <button className="create-request-btn">팀 생성</button>
                <button className="close-btn" type="button" onClick={() => closeCreateTeamModal()}>
                    <img src="/img/icon/x-lg.png" alt="" />
                </button>
            </form>
        </div>
    )
}

export default CreateTeamModal;