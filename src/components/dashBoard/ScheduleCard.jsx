import { useDrag } from 'react-dnd';

const ScheduleCard = ({ schedule, sectionId, onClick }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'SCHEDULE',
        item: () => ({
            ...schedule,
            fromSectionId: sectionId
        }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        // 하나의 일정 컴포넌트
        <div
            className="work-container"
            ref={dragRef}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onClick={onClick}
        >
            <h4 className="work-title">
                {schedule.title}
            </h4>
        </div>
    );
};

export default ScheduleCard;
