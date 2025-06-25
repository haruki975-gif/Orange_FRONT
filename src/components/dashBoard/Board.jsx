import "./DashBoard.css"
import { useState } from "react";
import Section from "./Section";

const Board = () => {
    const [sections, setSections] = useState([
        { id: 1, title: "섹션 제목", tasks: [] },
    ]);

    const addSection = () => {
        const title = prompt("섹션 이름 입력");
        if (title) {
            setSections([
                ...sections,
                { id: Date.now(), title, tasks: [] }
            ]);
        }
    };

    const addTaskToSection = (sectionId, taskContent) => {
        setSections(prev =>
            prev.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        tasks: [...section.tasks, { id: Date.now(), content: taskContent }],
                    }
                    : section
            )
        );
    };


    return (
        <div className="board">
            {sections.map(section => (
                <Section
                    key={section.id}
                    data={section}
                    onAddTask={addTaskToSection}
                />
            ))}
            <button className="addScheduleBtn" onClick={addSection}>
                <span className="plusBtn">+</span>
                <span className="textBtn">만들기</span>
            </button>
        </div>
    );
};

export default Board;