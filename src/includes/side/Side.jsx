import { useEffect, useState } from "react";
import Menu from "./components/menu/Menu";
import Tab from "./components/tab/Tab";
import "./side.css";
import axios from "axios";



const Side = () =>{

    const accessToken = sessionStorage.getItem("accessToken");

    const apiUrl = URL_CONFIG.API_URL;


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

    const [myTeam, setMyTeam] = useState({
        main: {
            name: "팀 관리",
            icon: "/img/icon/journal-frame.png"
        },
        subMenu: [],
        path: null
    });

    useEffect(()=>{

        if(!accessToken){
            return;
        }

        axios.get(`${apiUrl}/api/teams/my-team`,{
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        }).then((response)=>{
            setMyTeam(prev => ({
                ...prev,
                subMenu : [...response.data.items]
            }))
        }).catch((error)=>{
            console.log(error);
        })
    }, [accessToken])

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