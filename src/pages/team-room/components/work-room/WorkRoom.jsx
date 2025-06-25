
import { useRef, useState } from "react";
import WorkContainer from "./components/WorkContainer";
import "./WorkRoom.css";
import Plus from "/img/icon/plus.svg";

import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateWorkModal from "./components/CreateWorkModal";



const WorkRoom = () =>{

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const modalBackground = useRef();

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


    return(
        <DndProvider backend={HTML5Backend}>
            <div className="work-room">
                {columnList.map(column => (
                    <WorkContainer column={column} setOpenCreateModal={setOpenCreateModal}/>
                ))}
            </div>
            {openCreateModal && 
                <CreateWorkModal setOpenCreateModal={setOpenCreateModal} modalBackground={modalBackground}/>
            }
        </DndProvider>
        
    )
}

export default WorkRoom;