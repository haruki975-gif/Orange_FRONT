import { useEffect, useState } from "react";
import MyTeamRow from "../team-row/myTeamRow";
import axios from "axios";

const AffiliatedTeam = () =>{

    const apiUrl = URL_CONFIG.API_URL;

    const [teamList, setTeamList] = useState([]);

    useEffect(()=>{
        let accessToken = sessionStorage.getItem("accessToken");

        if(!accessToken){
            return;
        }

        axios.get(`${apiUrl}/api/teams/my-team`,{
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        }).then((response)=>{
            console.log(response.data.items);
            setTeamList(response.data.items);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    return(
        <div className="affiliated-team">
            <h2 className="title">내가 속한 팀</h2>
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
                            <MyTeamRow team={team} key={index}/>
                        ))
                    ) : (
                        <div className="not-found-team">
                            <h2>팀이 존재하지 않습니다.</h2>
                        </div>
                    )}
                </div>
                
            </div>
        </div>
    )
}
export default AffiliatedTeam;