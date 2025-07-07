
import { useContext, useEffect, useRef, useState } from "react";
import WorkContainer from "./components/WorkContainer";
import "./WorkRoom.css";
import Plus from "/img/icon/plus.svg";

import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UpdateWorkModal from "./components/UpdateWorkModal";
import DetailWorkModal from "./components/DetailWorkModal";
import useWebSocket from "react-use-websocket";

import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../../../components/context/GlobalContext";



const WorkRoom = () =>{

    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const updateModalBackground = useRef();
    const detailModalBackground = useRef();
    const {teamInfo} = useOutletContext();

    const { errorAlert, successAlert, auth } = useContext(GlobalContext);

    const {id} = useParams("id");

    const wsUrl = URL_CONFIG.WS_URL + "/ws/work/" + id + "?token=";

    const columnList = [
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
    ];

    const [prevWork, setPrevWork] = useState(); 
    const [workDetail, setWorkDetail] = useState(); 



    const openUpdateModalHandler = (work) =>{
        setPrevWork(work)
        setOpenUpdateModal(true);
    }

    const openDetailModalHandler = (work) =>{
        setWorkDetail(work);
        setOpenDetailModal(true);
    }

    // WebSocket 연결 
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        wsUrl + auth.accessToken,
        {
            onOpen: () => console.log("팀 일정관리방 연결에 성공하였습니다."),
            onClose: () => console.log("팀 일정관리방 연결이 종료되었습니다."),
            shouldReconnect: (closeEvent) => true,
            reconnectAttempts: 3,
            reconnectInterval: 3000,
            
            onBeforeOpen: (instance) => {
                if(!auth?.accessToken){
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
                        userNo={auth?.userNo}
                        key={column.columnValue}
                    />
                ))}
            </div>
            {openUpdateModal && 
                <UpdateWorkModal 
                    setOpenUpdateModal={setOpenUpdateModal} 
                    modalBackground={updateModalBackground} 
                    prevWork={prevWork}
                    teamMemberList={teamInfo.teamMemberList}
                    sendJsonMessage={sendJsonMessage}
                    id={id}
                    userNo={auth?.userNo}
                    />
            }
            {openDetailModal &&
                <DetailWorkModal setOpenDetailModal={setOpenDetailModal} modalBackground={detailModalBackground} workDetail={workDetail}/>
            }
        </DndProvider>
        
    )
}

export default WorkRoom;