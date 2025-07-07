import { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { FaUserCircle } from "react-icons/fa";

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
    
    const ddayCalculer = (endDate) =>{
        const date = new Date(endDate);
        const currentDate = new Date();

        date.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        const diffTime = date - currentDate; 
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    }

    const ddayContent = (endDate) =>{
        const diffDays = ddayCalculer(endDate);

        if(diffDays < 0){
            return "기간 초과";
        }
        if(diffDays == 0){
            return "D-Day";
        }
        return "D-" + diffDays;
    }

    const ddayStyle = (endDate) =>{
        const diffDays = ddayCalculer(endDate);

        if(diffDays < 0){
            return "#dddddd";
        }
        if(diffDays == 0){
            return "#ffe2d3";
        }
        return "#f6fcdf";
    }


    return(
        <div className="work-card" ref={ref} style={{ backgroundColor : ddayStyle(work.endDate)}}>
            <h4 className="work-title">{work.title}</h4>
            <div className="assignee-info">
                <span>담당자</span>
                <div className="left">
                    <div className="assignee-profile">
                        {work.assigneeProfile ? (
                                <img src={work.assigneeProfile} alt="" />
                            ) : (
                                <FaUserCircle
                                    className="profile-icon"
                                />
                            )
                        }
                    </div>
                    <p className="assignee-name">{work.assigneeName}</p>
                </div>
                <p className="day">{ddayContent(work.endDate)}</p>
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