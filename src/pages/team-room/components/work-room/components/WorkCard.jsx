import { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";

const WorkCard = ({id, workTitle, assigneeName}) =>{

    const ref = useRef(null);
    
    const [{ isDragging }, drag] = useDrag({
      type: "ITEM",
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(ref)

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
            <div className="options-btn">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
export default WorkCard;