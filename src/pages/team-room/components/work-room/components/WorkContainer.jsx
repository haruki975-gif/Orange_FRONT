import { useContext, useEffect, useRef, useState } from "react";
import WorkCard from "./WorkCard";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AlertContext } from "../../../../../components/context/AlertContext";


const WorkContainer = ({column, openUpdateModalHandler, openDetailModalHandler, sendJsonMessage, lastJsonMessage, id, userNo}) => {
    const { errorAlert, successAlert } = useContext(AlertContext); 
    const accessToken = sessionStorage.getItem("accessToken");
    const apiUrl = URL_CONFIG.API_URL;

    const [workList, setWorkList] = useState([]); 

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "WORK",
        drop: (item) => {
            const updateWorkStatus = {
                type : "statusUpdate",
                teamId : id,
                requestUserNo : userNo,
                workId : item.work.workId,
                status : column.columnValue,
                prevStatus : item.work.status
            }

            sendJsonMessage(updateWorkStatus);
        },
    });

    drop(ref);


    useEffect(()=>{
        axios.get(`${apiUrl}/api/works?teamId=${id}&status=${column.columnValue}`,
            {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                }
            }
        ).then((response)=>{
            setWorkList(response.data.items);
        }).catch((error)=>{
            console.log(error);
        })
    }, [id]);

    useEffect(()=>{

        if(!lastJsonMessage){
            return;
        }

        switch(lastJsonMessage?.type){
            case 'add': 
                const addWorkList = {...lastJsonMessage}
                delete addWorkList.type
                if(column.columnValue === addWorkList.status){
                    setWorkList(prev => [...prev, addWorkList]);
                }
                break;
            case 'statusUpdate':
                const suWorkList = {...lastJsonMessage}

                if(suWorkList.prevStatus === column.columnValue){
                    setWorkList(prev => {
                        return prev.filter(work =>(
                            work.workId != suWorkList.workId
                        ))
                    });
                }
                if(suWorkList.status === column.columnValue){
                    setWorkList(prev => [suWorkList, ...prev]);
                }
                break;
            case 'update':
                const updateWork = {...lastJsonMessage}

                if (updateWork.status === column.columnValue) {
                    setWorkList(prev => [
                        ...prev.map(work =>
                            work.workId === updateWork.workId ? updateWork : work
                        )
                    ]);
                }
                break;  
            case 'delete':
                if (lastJsonMessage.status === column.columnValue) {
                    setWorkList(prev => [
                        ...prev.filter(work =>
                            work.workId != lastJsonMessage.workId
                        )
                    ]);
                }
                break;
            default : 
                console.log(lastJsonMessage.userNo);
                if(lastJsonMessage.requestUserNo == userNo && column.columnValue == 'todo'){
                    errorAlert(lastJsonMessage?.type); 
                }
                break;
        }
        
    }, [lastJsonMessage])


    const addWorkHandler = () =>{
        const addWork = {
            type : "add",
            teamId : id,
            requestUserNo : userNo,
            status : column.columnValue
        }
        sendJsonMessage(addWork);
    }

    if(!workList) return null;


    return(
        <div className="work-status-container" ref={ref}>
            <h3 className="work-status">{column.workStatus}</h3>
            <div className="work-container">
                {workList.map(work =>(
                    <WorkCard 
                        work={work}
                        openUpdateModalHandler={openUpdateModalHandler}
                        openDetailModalHandler={openDetailModalHandler}
                        sendJsonMessage={sendJsonMessage}
                        lastJsonMessage={lastJsonMessage}
                        column={column}
                        id={id}
                        userNo={userNo}/>
                ))}
            </div>
            
            <div className="work-create-btn" onClick={() => addWorkHandler()}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg> 만들기
            </div>
        </div>
    )
}

export default WorkContainer;