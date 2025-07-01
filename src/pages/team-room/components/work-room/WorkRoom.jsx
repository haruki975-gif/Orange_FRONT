
import { useRef, useState } from "react";
import WorkContainer from "./components/WorkContainer";
import "./WorkRoom.css";
import Plus from "/img/icon/plus.svg";

import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UpdateWorkModal from "./components/UpdateWorkModal";
import DetailWorkModal from "./components/DetailWorkModal";



const WorkRoom = () =>{

    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const updateModalBackground = useRef();
    const detailModalBackground = useRef();

    const [columnList, setColumnList] = useState([
        {
            columnNo : "1",
            workStatus : "진행전"
        },
        {
            columnNo : "2",
            workStatus : "진행중",
        },
        {
            columnNo : "3",
            workStatus : "완료",
        },
        {
            columnNo : "4",
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


    return(
        <DndProvider backend={HTML5Backend}>
            <div className="work-room">
                {columnList.map(column => (
                    <WorkContainer 
                        column={column} 
                        openUpdateModalHandler={openUpdateModalHandler}
                        openDetailModalHandler={openDetailModalHandler}
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