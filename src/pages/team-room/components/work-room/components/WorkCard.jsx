import { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag } from "react-dnd";

const WorkCard = ({work, openUpdateModalHandler, openDetailModalHandler, sendJsonMessage, column, id, userNo}) =>{
    
    const optionBtn = useRef();

    const [openOptionModal, setOpenOptionModal] = useState(false);
    

    // 드래그 관련 코드
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
      type: "WORK",
      item: { work : work },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(ref);

    const deleteWorkHandler = () =>{
        const deleteWork = {
            type : 'delete',
            teamId : id,
            workId : work.workId,
            requestUserNo : userNo,
            status : column.columnValue
        }

        sendJsonMessage(deleteWork);
    }


    return(
        <div className="work-card" ref={ref}>
            <h4 className="work-title">{work.title}</h4>
            <div className="assignee-info">
                <span>담당자</span>
                <p className="assignee-name">{work.assigneeName}</p>
                <div className="assignee-profile">
                    <img src="/img/icon/person-fill.png" alt="" />
                </div>
            </div>
            <div className="options-btn" ref={optionBtn} 
                onClick={() => {setOpenOptionModal(true)}} 
                onMouseLeave={() => {setOpenOptionModal(false)}}
            >
                <span></span>
                <span></span>
                <span></span>
                {openOptionModal && 
                    <div className="option-modal">
                        <div className="update-option"
                            onClick={() => openDetailModalHandler(work)}>상세보기</div>
                        <div className="detail-option"
                            onClick={() => openUpdateModalHandler(work)}>수정하기</div>
                        <div className="delete-option"
                            onClick={() => deleteWorkHandler()}>삭제하기</div>
                    </div>
                }
            </div>
        </div>
    )
}
export default WorkCard;