import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./TeamRoom.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AlertContext } from "../../components/context/AlertContext";

const TeamRoom = () =>{

    const apiUrl = URL_CONFIG.API_URL;

    const path = String(window.location.href).split("/")
    const currentPath = path[path.length - 1];
    const navi = useNavigate();
    const { errorAlert, successAlert } = useContext(AlertContext);

    const userNo = sessionStorage.getItem("userNo");

    const {id} = useParams("id");

    const [teamInfo, setTeamInfo] = useState();
    const [openOptionModal, setOpenOptionModal] = useState("");
    const [memberString, setMemberString] = useState("");

    useEffect(()=>{

        const accessToken = sessionStorage.getItem("accessToken");

        if(!accessToken){
            return;
        }

        axios.get(`${apiUrl}/api/teams/${id}`,{
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        }).then((response)=>{
            const teamInfo = response.data.items[0];
            setTeamInfo(teamInfo);
            setMemberString(
                teamInfo.teamMemberList.map(member => member.memberName).join(', ') || ''
            );
        }).catch((error)=>{
            console.log(error);
        })
    }, [id]);


    const kickOutTeamMemberHandler = (member) =>{

        const accessToken = sessionStorage.getItem("accessToken");

        if(!accessToken){
            return;
        }

        axios.delete(`${apiUrl}/api/teams/member`,{
            data : {
                teamId : id,
                memberNo : member.memberNo,
                memberName : member.memberName,
            }, 
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        }).then((response)=>{
            successAlert(response.data.message);
            
        }).catch((error)=>{
            errorAlert(error.response.data.message);
        })
    } 

    const categories = [
        {key : "all", label : "전체"},
        {key : "study", label : "스터디"},
        {key : "project", label : "프로젝트"},
        {key : "free", label : "자유"}
    ];

    const findCategoryLabel = (key) =>{
        return categories.find(category => category.key === key)?.label;
    }


    if(!teamInfo) return null;

    return(
        <div id="team-room">
            <div className="header">
                <p className="category">{findCategoryLabel(teamInfo.category)}</p>
                <div className="team-info">
                    <div className="left">
                        <img src="/img/icon/easel2-fill.png" alt="" />
                        <p className="team-name">{teamInfo.title}</p>
                    </div>
                    <div className="profile-list" >
                        {teamInfo.teamMemberList.map(member => (
                            <div className="member-profile" key={member.memberNo}
                                onClick={() => {setOpenOptionModal(member.memberNo)}} 
                                onMouseLeave={() => {setOpenOptionModal("")}}>
                                <img src="/img/icon/person-fill.png" alt="" />
                                {openOptionModal == member.memberNo && 
                                    <div className="option-modal">
                                        <div className="user-name"
                                            >{member.memberName}</div>
                                        {userNo == teamInfo.teamLeader &&
                                            <div className="kick-member"
                                                onClick={() => kickOutTeamMemberHandler(member)}
                                            >추방하기</div>
                                        }
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tab-menu">
                    <div className={`chat-room-tab ${currentPath === "chat-room" && "active"}`} 
                        onClick={() => navi("chat-room")}>
                        <img src="/img/icon/view-stacked.png" alt="" />
                        <h3>채팅방</h3>
                    </div>
                    <div className={`work-room-tab ${currentPath === "work-room" && "active"}`}
                        onClick={() => navi("work-room")}>
                        <img src="/img/icon/view-stacked.png" alt="" />
                        <h3>일정관리</h3>
                    </div>
                </div>
            </div>
            <Outlet context={{memberString, teamInfo}}/>
        </div>
    )
}

export default TeamRoom;