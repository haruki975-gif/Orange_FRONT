import { useContext, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { AlertContext } from '../../../../components/context/AlertContext';
import axios from "axios";

const SearchTeamRow = ({team, categories, setUpdateSearchTeamList}) =>{

    const apiUrl = URL_CONFIG.API_URL;
    const { errorAlert, successAlert } = useContext(AlertContext);
    
    const userNo = sessionStorage.getItem("userNo");

    const [openRequestBtn, setOpenRequestBtn] = useState(false);

    const canApplyToTeam = () => {

        // 1. 신청 기록이 있으면 신청 불가
        if (!team.canApplyToTeam) return false;

        // 2. 이미 팀 멤버면 신청 불가
        const isAlreadyMember = team.teamMemberList.some(member => member.memberNo == userNo);
        if (isAlreadyMember) return false;

        return true;
    };

    
    const joinRequestHandler = () =>{

        const accessToken = sessionStorage.getItem("accessToken");

        if(!accessToken){
            errorAlert("로그인 후 이용 가능합니다.");
            return;
        }
        
        axios.post(`${apiUrl}/api/teams/join`, 
            {
                teamId : team.teamId,
            },
            {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
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
                    <img src="/img/icon/person-fill.png" alt="" />
                </div>
                <p className="user-name">{team.leaderName}</p>
            </div>
            <div className="team-info">
                <p className="team-name">{team.title}</p>
                <p className="team-content">{team.content}</p>
            </div>
            <p className="category">{categories[team.category]}</p>
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