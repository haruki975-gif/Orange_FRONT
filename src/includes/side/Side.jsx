import { useContext, useEffect, useState } from "react";
import Menu from "./components/menu/Menu";
import Tab from "./components/tab/Tab";
import "./side.css";
import axios from "axios";
import { GlobalContext } from "../../components/context/GlobalContext";



const Side = () =>{

    const { auth } = useContext(GlobalContext);

    const apiUrl = URL_CONFIG.API_URL;


    const myCalendar = {
        "main":
        {
            "name": "개인 일정 관리",
            "icon": "/img/icon/journal-frame.png"
        },
        "subMenu": [
            {
                "name": "캘린더",
                "icon": "/img/icon/journal-frame.png",
                "path": "/calendar"
            },
            {
                "name": "대시보드",
                "icon": "/img/icon/journal-frame.png",
                "path": "/dashboard"
            }
        ],
        "path": null
    };

    const [myTeam, setMyTeam] = useState({
        main: {
            name: "팀 관리",
            icon: "/img/icon/journal-frame.png"
        },
        subMenu: [],
        path: null
    });

    useEffect(()=>{

        if(!auth?.accessToken){
            return;
        }

        axios.get(`${apiUrl}/api/teams/my-team`,{
            headers : {
                Authorization : `Bearer ${auth.accessToken}`,
            }
        }).then((response)=>{
            setMyTeam(prev => ({
                ...prev,
                subMenu : [...response.data.items]
            }))
        }).catch((error)=>{
            console.log(error);
        })
    }, [auth?.accessToken])

    const findTeam = {
        "main":
        {
            "name": "팀 찾기",
            "icon": "/img/icon/journal-frame.png"
        },
        "subMenu": [],
        "path": "/find-team"
    };
    const challenges = {
        "main" : 
                {"name" : "챌린지방", 
                "icon" : "/img/icon/journal-frame.png"},
        "subMenu" : [],
        "path" : "/challenge/:id"
    }
    const admin = {
        "main" : 
                {"name" : "관리자 페이지", 
                "icon" : "/img/icon/journal-frame.png"},
        "subMenu" : [
            {
                "name" : "회원 관리", 
                "icon" : "/img/icon/journal-frame.png",
                "path" : "/admin/user"
            },
            {
                "name" : "챌린지방 관리", 
                "icon" : "/img/icon/journal-frame.png",
                "path" : "/admin/challenge"
            },
            {
                "name" : "로그 관리", 
                "icon" : "/img/icon/journal-frame.png",
                "path" : "/admin/log"
            }
        ],
        "path" : "/admin"
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