import { useContext, useEffect, useRef, useState } from "react";
import SearchTeamRow from "../team-row/searchTeamRow";
import axios from "axios";
import { GlobalContext } from "../../../../components/context/GlobalContext";

const SearchTeam = ({updateTeamList, categories, findCategoryLabel}) =>{

    const apiUrl = URL_CONFIG.API_URL;

    const scrollEnabledRef = useRef(false);

    const [updateSearchTeamList, setUpdateSearchTeamList] = useState(true);


    const [chooseCategory, setChooseCategory] = useState("all");
    const [teamList, setTeamList] = useState([]);
    const [lastTimeStamp, setLastTimeStamp] = useState(null);

    const { auth } = useContext(GlobalContext);



    const getTeamList = (lastTimeStamp) =>{

        let userNo = auth?.userNo;

        if(userNo == null){
            userNo = -1;
        }

        axios.get(`${apiUrl}/api/teams?category=${chooseCategory}&userNo=${userNo}&lastTimeStamp=${lastTimeStamp}`
        ).then((response)=>{
            
            setTeamList([...teamList, ...response.data.items]);
            setLastTimeStamp(response.data.items.pop().currentDate);
        }).catch((error)=>{
            console.log(error);
        })
    }

    // 무한 스크롤 
    const scrollRef = useRef();

    useEffect(() => {
        const element = scrollRef.current;

        const handleScroll = () => {
            if (!scrollEnabledRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = element;

            if (scrollHeight - scrollTop - clientHeight < 1) {
                getTeamList(lastTimeStamp);
            }
        };

        element.addEventListener("scroll", handleScroll);
        return () => element.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(()=>{
        let userNo = auth?.userNo;

        scrollEnabledRef.current = false;

        if(userNo == null){
            userNo = -1;
        }

        axios.get(`${apiUrl}/api/teams?category=${chooseCategory}&userNo=${userNo}&lastTimeStamp=${null}`
        ).then((response)=>{
            
            setTeamList(response.data.items);
            setLastTimeStamp(response.data.items.pop().currentDate);
        }).catch((error)=>{
            console.log(error);
        })
        .finally(() => {
            setTimeout(() => scrollEnabledRef.current = true, 100);
        });
            
    }, [chooseCategory, updateTeamList, updateSearchTeamList, auth]);

    // 카테고리 수정
    const categoryHandler = (key) =>{
        setChooseCategory(key);
    }

    
    return(
        <div className="search-team">
            <div className="title">
                <h2>팀 찾기</h2>
                <div className="wall"></div>

                <div className="categorys">
                    {categories.map((category, index) => (
                        <p className={`${category.key} ${category.key === chooseCategory ? "active" : ""}`} 
                            onClick={() => categoryHandler(category.key)}
                            key={index}>{category.label}</p>
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
                <div className="team-list" ref={scrollRef}>
                    {teamList.length !== 0 ? (
                        teamList.map(team => (
                            <SearchTeamRow 
                                key={team.teamId}
                                team={team}
                                findCategoryLabel={findCategoryLabel} 
                                setUpdateSearchTeamList={setUpdateSearchTeamList}
                            />
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

export default SearchTeam;