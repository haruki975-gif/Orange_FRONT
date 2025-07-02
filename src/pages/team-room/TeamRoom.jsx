import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./TeamRoom.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../components/context/GlobalContext";
import { FaUserCircle } from "react-icons/fa";

const TeamRoom = () =>{

    const apiUrl = URL_CONFIG.API_URL;

    const path = String(window.location.href).split("/")
    const currentPath = path[path.length - 1];
    const navi = useNavigate();
    const { errorAlert, successAlert, auth } = useContext(GlobalContext);

    const {id} = useParams("id");

    const [teamInfo, setTeamInfo] = useState();
    const [openOptionModal, setOpenOptionModal] = useState("");
    const [memberString, setMemberString] = useState("");
    const [updateTeamInfo, setUpdateTeamInfo] = useState(true);

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
    }, [id, updateTeamInfo]);


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
            setUpdateTeamInfo(prev => !prev);
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
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M660-570q-25 0-42.5-17.5T600-630q0-25 17.5-42.5T660-690q25 0 42.5 17.5T720-630q0 25-17.5 42.5T660-570Zm-360 0q-25 0-42.5-17.5T240-630q0-25 17.5-42.5T300-690q25 0 42.5 17.5T360-630q0 25-17.5 42.5T300-570Zm180 110q-25 0-42.5-17.5T420-520q0-25 17.5-42.5T480-580q25 0 42.5 17.5T540-520q0 25-17.5 42.5T480-460Zm0-220q-25 0-42.5-17.5T420-740q0-25 17.5-42.5T480-800q25 0 42.5 17.5T540-740q0 25-17.5 42.5T480-680Zm0 520q-20 0-40.5-3t-39.5-8v-143q0-35 23.5-60.5T480-400q33 0 56.5 25.5T560-314v143q-19 5-39.5 8t-40.5 3Zm-140-32q-20-8-38.5-18T266-232q-28-20-44.5-52T205-352q0-26-5.5-48.5T180-443q-10-13-37.5-39.5T92-532q-11-11-11-28t11-28q11-11 28-11t28 11l153 145q20 18 29.5 42.5T340-350v158Zm280 0v-158q0-26 10-51t29-42l153-145q12-11 28.5-11t27.5 11q11 11 11 28t-11 28q-23 23-50.5 49T780-443q-14 20-19.5 42.5T755-352q0 36-16.5 68.5T693-231q-16 11-34.5 21T620-192Z"/></svg>
                        <p className="team-name">{teamInfo.title}</p>
                    </div>
                    <div className="profile-list" >
                        {teamInfo.teamMemberList.map(member => (
                            <div className="member-profile" key={member.memberNo}
                                onClick={() => {setOpenOptionModal(member.memberNo)}} 
                                onMouseLeave={() => {setOpenOptionModal("")}}>
                                {member.memberProfile ? (
                                        <img src={member.memberProfile} alt="" />
                                    ) : (
                                        <FaUserCircle
                                            className="profile-icon"
                                        />
                                    )
                                }
                                {openOptionModal == member.memberNo && 
                                    <div className="option-modal">
                                        <div className="user-name"
                                            >{member.memberName}</div>
                                        {auth.userNo == teamInfo.teamLeader &&
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
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
                        <h3>채팅방</h3>
                    </div>
                    <div className={`work-room-tab ${currentPath === "work-room" && "active"}`}
                        onClick={() => navi("work-room")}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z"/></svg>
                        <h3>일정관리</h3>
                    </div>
                </div>
            </div>
            <Outlet context={{memberString, teamInfo}}/>
        </div>
    )
}

export default TeamRoom;