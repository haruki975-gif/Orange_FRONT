import { useState } from "react";
import MyTeamRow from "../team-row/myTeamRow";

const AffiliatedTeam = () =>{

    const [teamList, setTeamList] = useState([
            {
                "teamNo" : "12",
                "teamName" : "공부하자",
                "teamContent" : "매일 공부하는 방입니다.",
                "leaderNo" : "32",
                "leaderName" : "짱구",
                "category" : "스터디",
                "teamMemberList" : [
                    {
                        "memberNo" : "7",
                        "memberName" : "호돌이"
                    },
                    {
                         "memberNo" : "251",
                         "memberName" : "최윤서"
                    }
                ]
            },
            {
                "teamNo" : "12",
                "teamName" : "공부하자",
                "teamContent" : "매일 공부하는 방입니다.",
                "leaderNo" : "32",
                "leaderName" : "짱구",
                "category" : "스터디",
                "teamMemberList" : [
                    {
                        "memberNo" : "25",
                        "memberName" : "홍길동"
                    },
                    {
                        "memberNo" : "7",
                        "memberName" : "호돌이"
                    },
                    {
                         "memberNo" : "251",
                         "memberName" : "최윤서"
                    }
                ]
            }
        ]);

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
                    {teamList.map(team => (
                        <MyTeamRow team={team}/>
                    ))}
                </div>
                
            </div>
        </div>
    )
}
export default AffiliatedTeam;