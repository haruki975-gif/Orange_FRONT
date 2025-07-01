
import { useContext, useEffect, useRef, useState } from "react";
import WorkContainer from "./components/WorkContainer";
import "./WorkRoom.css";
import Plus from "/img/icon/plus.svg";

import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UpdateWorkModal from "./components/UpdateWorkModal";
import DetailWorkModal from "./components/DetailWorkModal";
import useWebSocket from "react-use-websocket";
import { AlertContext } from "../../../../components/context/AlertContext";
import { useParams } from "react-router-dom";
import axios from "axios";



const WorkRoom = () =>{

    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const updateModalBackground = useRef();
    const detailModalBackground = useRef();

    const { errorAlert, successAlert } = useContext(AlertContext);

    const {id} = useParams("id");
    const userNo = sessionStorage.getItem("userNo");

    const accessToken = sessionStorage.getItem("accessToken");

    const wsUrl = URL_CONFIG.WS_URL + "/ws/work/" + id + "?token=" + accessToken;


    const [columnList, setColumnList] = useState([
        {
            columnValue : "todo",
            workStatus : "진행전"
        },
        {
            columnValue : "doing",
            workStatus : "진행중",
        },
        {
            columnValue : "done",
            workStatus : "완료",
        },
        {
            columnValue : "tested",
            workStatus : "테스트 완료",
        },
    ]);

    const [prevWorkTitle, setPrevWorkTitle] = useState(""); 
    const [workTitle, setWorkTitle] = useState(""); 

    const openUpdateModalHandler = (workTitle) =>{
        setOpenUpdateModal(true);
        setPrevWorkTitle(workTitle);
    }

    const openDetailModalHandler = (workTitle) =>{
        setOpenDetailModal(true);
        setWorkTitle(workTitle);
    }

    // WebSocket 연결 
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        wsUrl,
        {
            onOpen: () => successAlert("채팅방 연결에성공하였습니다."),
            onClose: () => console.log("채팅방 연결이종료되었습니다."),
            shouldReconnect: (closeEvent) => true,
            reconnectAttempts: 3,
            reconnectInterval: 3000,
            
            onBeforeOpen: (instance) => {
                if(!accessToken){
                    instance.close();
                    return false;
                }
                alert('123');
                return true;
            },
        }
    );


    return(
        <DndProvider backend={HTML5Backend}>
            <div className="work-room">
                {columnList.map(column => (
                    <WorkContainer 
                        column={column} 
                        openUpdateModalHandler={openUpdateModalHandler}
                        openDetailModalHandler={openDetailModalHandler}
                        sendJsonMessage={sendJsonMessage}
                        lastJsonMessage={lastJsonMessage}
                        id={id}
                        userNo={userNo}
                    />
                ))}
            </div>
            {openUpdateModal && 
                <UpdateWorkModal setOpenUpdateModal={setOpenUpdateModal} modalBackground={updateModalBackground} prevWorkTitle={prevWorkTitle}/>
            }
            {openDetailModal &&
                <DetailWorkModal setOpenDetailModal={setOpenDetailModal} modalBackground={detailModalBackground} workTitle={workTitle}/>
            }
        </DndProvider>
        
    )
}

export default WorkRoom;