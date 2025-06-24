import { useState } from "react";

const SearchTeamRow = ({team}) =>{

    const [openRequestBtn, setOpenRequestBtn] = useState(false);

    return(
        <div className="team-row" 
            onMouseEnter={() => {setOpenRequestBtn(true)}}onMouseLeave={() => {setOpenRequestBtn(false)}}
        >
            <div className="user">
                <div className="profile">
                    <img src="/img/icon/person-fill.png" alt="" />
                </div>
                <p className="user-name">{team.leaderName}</p>
            </div>
            <div className="team-info">
                <p className="team-name">{team.teamName}</p>
                <p className="team-content">{team.teamContent}</p>
            </div>
            <p className="category">스터디</p>
            <div className="people">
                {openRequestBtn 
                    ? <button className="join-team">신청</button>
                    : <p>{team.teamMemberList.length}/4</p>
            }
            </div>
            
            
        </div>
    )
}

export default SearchTeamRow;