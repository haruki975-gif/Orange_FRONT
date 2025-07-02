import { useContext, useState } from "react";

import axios from "axios";
import { GlobalContext } from "../../../../components/context/GlobalContext";
import { FaUserCircle } from "react-icons/fa";

const SearchTeamRow = ({team, setUpdateSearchTeamList, findCategoryLabel}) =>{

    const apiUrl = URL_CONFIG.API_URL;
    const { errorAlert, successAlert, auth } = useContext(GlobalContext);
    

    const [openRequestBtn, setOpenRequestBtn] = useState(false);

    const canApplyToTeam = () => {

        // 1. 신청 기록이 있으면 신청 불가
        if (!team.canApplyToTeam) return false;

        // 2. 이미 팀 멤버면 신청 불가
        const isAlreadyMember = team.teamMemberList.some(member => member.memberNo == auth?.userNo);
        if (isAlreadyMember) return false;

        return true;
    };

    
    const joinRequestHandler = () =>{

        if(!auth?.accessToken){
            errorAlert("로그인 후 이용 가능합니다.");
            return;
        }
        
        axios.post(`${apiUrl}/api/teams/join`, 
            {
                teamId : team.teamId,
            },
            {
                headers : {
                    Authorization : `Bearer ${auth.accessToken}`,
                }
            }
        ).then((response)=>{
            successAlert(response.data.message);
            setUpdateSearchTeamList(prev => !prev)
        }).catch((error)=>{
            errorAlert(error.response.data.message);
        })
    };



    return(
        <div className="team-row" key={team.teamId}
            onMouseEnter={() => {setOpenRequestBtn(true)}}onMouseLeave={() => {setOpenRequestBtn(false)}}
        >
            <div className="user">
                <div className="profile">
                    {team.leaderProfile ? (
                            <img src={team.leaderProfile} alt="" />
                        ) : (
                            <FaUserCircle
                                className="profile-icon"
                            />
                        )
                    }
                </div>
                <p className="user-name">{team.leaderName}</p>
            </div>
            <div className="team-info">
                <p className="team-name">{team.title}</p>
                <p className="team-content">{team.content}</p>
            </div>
            <p className="category">{findCategoryLabel(team.category)}</p>
            <div className="people">
                {openRequestBtn 
                    ? <button
                        onClick={() => joinRequestHandler()} 
                        className={`join-team ${canApplyToTeam() ? "" : "active"}`}>신청</button>
                    : <p>{team.teamMemberList.length}/4</p>
            }
            </div>
            
            
        </div>
    )
}

export default SearchTeamRow;