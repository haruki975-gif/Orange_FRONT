import { useEffect, useRef, useState } from "react";
import WorkCard from "./WorkCard";
import { DndProvider, useDrag, useDrop } from "react-dnd";


const WorkContainer = ({column, openUpdateModalHandler, openDetailModalHandler}) => {

    const [workList, setWorkList] = useState([]); 

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "ITEM",
        drop: (item) => {
        console.log(`드롭됨: `);
        },
    });

    drop(ref);

    useEffect(()=>{
        getWorkList(column.columnNo);
    }, []);

    const getWorkList = (columnNo) =>{

        switch(columnNo){
            case "1" : 
                setWorkList(
                    [
                        {
                            workNo : "1",
                            workTitle : "(진행전)점심 메뉴 정하기1",
                            assigneeName : "홍길동",
                        },
                        {
                            workNo : "2",
                            workTitle : "(진행전)점심 메뉴 정하기2",
                            assigneeName : "홍길동",
                        },
                    ]
                )
                break;
            case "2" : 
                setWorkList(
                    [
                        {
                            workNo : "1",
                            workTitle : "(진행중)점심 메뉴 정하기1",
                            assigneeName : "홍길동",
                        },
                        {
                            workNo : "2",
                            workTitle : "(진행중)점심 메뉴 정하기2",
                            assigneeName : "홍길동",
                        },
                        {
                            workNo : "3",
                            workTitle : "(진행중)점심 메뉴 정하기3",
                            assigneeName : "홍길동",
                        },
                    ]
                )    
                break;
            case "3" : 
                setWorkList(
                    [
                        {
                            workNo : "1",
                            workTitle : "(완료)점심 메뉴 정하기1",
                            assigneeName : "홍길동",
                        },
                    ]
                )    
                break;
            case "4" : 
                setWorkList(
                    [
                        {
                            workNo : "1",
                            workTitle : "(테스트 완료)점심 메뉴 정하기1",
                            assigneeName : "홍길동",
                        },
                        {
                            workNo : "2",
                            workTitle : "(테스트 완료)점심 메뉴 정하기2",
                            assigneeName : "홍길동",
                        },
                    ]
                )    
                break; 
        }
    }

    return(
        <div className="work-status-container" ref={ref}>
            <h3 className="work-status">{column.workStatus}</h3>
            <div className="work-container">
                {workList.map(work =>(
                    <WorkCard 
                        id={work.workNo} 
                        workTitle={work.workTitle}
                        assigneeName={work.assigneeName} 
                        openUpdateModalHandler={openUpdateModalHandler}
                        openDetailModalHandler={openDetailModalHandler}/>
                ))}
            </div>
            
            <div className="work-create-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg> 만들기
            </div>
        </div>
    )
}

export default WorkContainer;