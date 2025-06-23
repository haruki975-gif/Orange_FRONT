import { useState } from "react";
import SearchTeamRow from "../team-row/searchTeamRow";

const SearchTeam = () =>{

    const [chooseCategory, setChooseCategory] = useState("all");
    
    const categories = [
        {key : "all", label : "전체"},
        {key : "study", label : "스터디"},
        {key : "project", label : "프로젝트"},
        {key : "free", label : "자유"}
    ];

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
            },
            
        ]);

        const categoryHandler = (key) =>{
            setChooseCategory(key);
        }

    return(
        <div className="search-team">
            <div className="title">
                <h2>팀 찾기</h2>
                <div className="wall"></div>

                <div className="categorys">
                    {categories.map(category => (
                        <p className={`${category.key} ${category.key === chooseCategory ? "active" : ""}`} onClick={() => categoryHandler(category.key)}>{category.label}</p>
                    ))}
                </div>
            </div>
            <div className="container">
                <div className="column-name">
                    <p className="leader">팀장</p>
                    <p className="team-name">팀명</p>
                    <p className="team-category">카테고리</p>
                    <p className="max-member">인원수</p>
                </div>
                <div className="team-list">
                    {teamList.map(team => (
                        <SearchTeamRow team={team}/>
                    ))}
                </div>
                
            </div>
        </div>

    )
}

export default SearchTeam;