import { useContext, useEffect, useState } from "react";
import MyTeamRow from "../team-row/myTeamRow";
import axios from "axios";
import { GlobalContext } from "../../../../components/context/GlobalContext";

const HostTeam = ({setOpenModal, updateTeamList, findCategoryLabel}) =>{

    const apiUrl = URL_CONFIG.API_URL;

    const [teamList, setTeamList] = useState([]);
    const [updateSearchTeamList, setUpdateSearchTeamList] = useState(true);
    const { auth, errorAlert } = useContext(GlobalContext);

    useEffect(()=>{

        if(!auth?.accessToken){
            return;
        }

        axios.get(`${apiUrl}/api/teams/created-team`,{
            headers : {
                Authorization : `Bearer ${auth.accessToken}`,
            }
        }).then((response)=>{
            setTeamList(response.data.items);
        }).catch((error)=>{
            console.log(error);
        })
    }, [updateSearchTeamList, updateTeamList, auth])

    const openCreateTeamModal = () =>{

        if(!auth?.accessToken){
            errorAlert("로그인 후 이용가능합니다.");
            return;
        }

        setOpenModal(true);
    }


    return(
        <div className="host-team">
            <h2 className="title">내가 생성한 팀</h2>
            <div className="container">
                <div className="column-name">
                    <p className="leader">팀장</p>
                    <p className="team-name">팀명</p>
                    <p className="team-category">카테고리</p>
                    <p className="max-member">인원수</p>
                </div>
                <div className="team-list">
                    {teamList.length !== 0 ? (
                        teamList.map((team, index) => (
                        <MyTeamRow key={index} team={team} teamViewType={"host"} 
                            setUpdateSearchTeamList={setUpdateSearchTeamList} findCategoryLabel={findCategoryLabel}/>
                        ))
                    ) : (
                        <div className="not-found-team">
                            <h2>팀이 존재하지 않습니다.</h2>
                        </div>
                    )}
                </div>
                {teamList.length < 5 &&
                    <button className="create-team-btn" onClick={()=>openCreateTeamModal()}>팀 추가</button>
                }
            </div>
        </div>
    )
}

export default HostTeam;