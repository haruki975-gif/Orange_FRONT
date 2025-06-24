import "./TeamRoom.css";

const TeamRoom = () =>{

    const profileList = [1,2,3];

    return(
        <div id="team-room">
            <div className="header">
                <p className="category">스터디</p>
                <div className="team-info">
                    <div className="left">
                        <img src="/img/icon/easel2-fill.png" alt="" />
                        <p className="team-name">공부 할사람 모여라</p>
                    </div>
                    <div className="profile-list">
                        {profileList.map(profile => (
                            <div className="member-profile">
                                <img src="/img/icon/person-fill.png" alt="" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tab-menu">
                    <div className={`chat-room active`}>
                        <img src="/img/icon/view-stacked.png" alt="" />
                        <h3>채팅방</h3>
                    </div>
                    <div className={`work-room`}>
                        <img src="/img/icon/view-stacked.png" alt="" />
                        <h3>일정관리</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamRoom;