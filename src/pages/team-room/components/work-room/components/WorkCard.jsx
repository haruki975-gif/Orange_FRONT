import { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";

const WorkCard = ({id, workTitle, assigneeName, openUpdateModalHandler, openDetailModalHandler}) =>{

    
    const optionBtn = useRef();

    const [openOptionModal, setOpenOptionModal] = useState(false);
    

    // 드래그 관련 코드
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
      type: "ITEM",
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(ref);

    return(
        <div className="work-card" ref={ref}>
            <h4 className="work-title">{workTitle}</h4>
            <div className="assignee-info">
                <span>담당자</span>
                <p className="assignee-name">{assigneeName}</p>
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
                            onClick={() => openDetailModalHandler(workTitle)}>상세보기</div>
                        <div className="detail-option"
                            onClick={() => openUpdateModalHandler(workTitle)}>수정하기</div>
                    </div>
                }
            </div>
        </div>
    )
}
export default WorkCard;