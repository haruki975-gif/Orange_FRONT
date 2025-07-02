import { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../../../components/context/GlobalContext";
import { FaUserCircle } from "react-icons/fa";



const MyTeamRow = ({team, index, teamViewType, setUpdateSearchTeamList, findCategoryLabel}) =>{

    const apiUrl = URL_CONFIG.API_URL;
    const { errorAlert, successAlert, auth } = useContext(GlobalContext);

    const [openRequestBtn, setOpenRequestBtn] = useState(false);


    const deleteRequestHandler = () =>{

        if(!auth?.accessToken){
            errorAlert("로그인 후 이용 가능합니다.");
            return;
        }

        const requestUrl = teamViewType === "member" ? "/my-team" : "";

        axios.delete(`${apiUrl}/api/teams${requestUrl}?teamId=${team.teamId}`,
        {
            headers : {
                Authorization : `Bearer ${auth.accessToken}`,
            }
        }).then((response)=>{
            successAlert(response.data.message);
            setUpdateSearchTeamList(prev => !prev);
        }).catch((error)=>{
            errorAlert(error.response.data.message);
        })
    }


    return(
        <div className="team-row" key={index}
            onMouseEnter={() => {setOpenRequestBtn(true)}}onMouseLeave={() => {setOpenRequestBtn(false)}}>
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
                        className={`join-team`}
                        onClick={() => deleteRequestHandler()}
                        >{teamViewType === "host" ? "삭제" : "탈퇴"}</button>
                    : <p>{team.teamMemberList.length}/4</p>
            }
            </div>
        </div>
    )
}

export default MyTeamRow;