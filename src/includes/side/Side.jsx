import Menu from "./components/menu/Menu";
import Tab from "./components/tab/Tab";
import "./side.css";



const Side = () =>{

    const myCalendar = {
        "main" : 
                {"name" : "개인 일정 관리", 
                "icon" : "/img/icon/journal-frame.png"},
        "subMenu" : [
            {
                "name" : "캘린더", 
                "icon" : "/img/icon/journal-frame.png",
                "path" : "/"
            },
            {
                "name" : "대시보드", 
                "icon" : "/img/icon/journal-frame.png",
                "path" : "/"
            }
        ],
        "path" : null
    };

    const myTeam = {
        "main" : 
            {"name" : "팀 관리", 
            "icon" : "/img/icon/journal-frame.png"},
        "subMenu" : [
            {
                "name" : "오렌지조", 
                "icon" : "/img/icon/journal-frame.png",
                "path" : "/team-room"
            },
            {
                "name" : "팀2", 
                "icon" : "/img/icon/journal-frame.png",
                "path" : "/team-room"
            }
        ],
        "path" : null
    };

    const findTeam = {
        "main" : 
            {"name" : "팀 찾기", 
            "icon" : "/img/icon/journal-frame.png"},
        "subMenu" : [],
        "path" : "/find-team"
    };

    const challenges = {
        "main" : 
                {"name" : "챌린지방", 
                "icon" : "/img/icon/journal-frame.png"},
        "subMenu" : [],
        "path" : "/"
    }
    

    const admin = {
        "main" : 
                {"name" : "관리자 페이지", 
                "icon" : "/img/icon/journal-frame.png"},
        "subMenu" : [],
        "path" : "/"
    }

    return(
        <div id="side">
            <div className="menus">
                <Tab menu={myCalendar}/>
                <Tab menu={myTeam}/>
                <Tab menu={findTeam}/>
                <Tab menu={challenges}/>
                <Tab menu={admin}/>

            </div>
        </div>
    )
}


export default Side;