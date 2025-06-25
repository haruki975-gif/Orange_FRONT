import "./DashBoard.css"
import TaskCard from "./TaskCard";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



const Section = ({ data, onAddTask }) => {
    const handleAddTask = () => {
        const task = prompt("일정 내용 입력");
        if (task) onAddTask(data.id, task);
    };

    return (
        <div className="section">
            <div className="titleWrap">
                <h3>{data.title}</h3>
                <button className="menuBtn">...</button>
                {data.tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        content={task.content} />
                ))}
                <button className="addSection"
                    onClick={handleAddTask}>
                    +
                </button>
            </div>
        </div>
    )
}

export default Section;