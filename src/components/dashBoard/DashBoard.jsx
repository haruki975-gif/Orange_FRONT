import TabNav from "../../includes/side/components/tab/TabNav";
import "./DashBoard.css"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import TextareaAutosize from '@mui/material/TextareaAutosize';


const DashBoard = () => {

    const [scheduleTitleList, setScheduleTitleList] = useState([]);
    const [scheduleTitle, setScheduleTitle] = useState();
    const [isCreating, setIsCreating] = useState(false);

    const [sectionList, setSectionList] = useState([]);
    const [sectionTitle, setSectionTitle] = useState();

    const handleCreateClick = () => {
        setIsCreating(true);
    }

    const handleCreatingSubmit = () => {
        const trimmed = scheduleTitle.trim();
        if (!trimmed) return;

        setScheduleTitleList(prev => [...prev, trimmed]);
        setScheduleTitle("");
        setIsCreating(false); //팝업 닫고 다시 버튼 보이기
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCreatingSubmit();
        }
    }

    const handleBlur = () => {
        setIsCreating(false);
    }




    return (
        <>
            <TabNav />
            <div className="dashBoard">
                <AddIcon className="addSectionBtn" />
                <div className="work-status-container">
                    <h3 className="work-status">해야 할 작업</h3>
                    <div className="options-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {scheduleTitleList.map((title, index) => (
                        <div key={index} className="work-container">
                            <h4 className="work-title">{title}</h4>
                            <div className="assignee-info"></div>
                        </div>
                    ))}

                    <div className="work-create-btn" onClick={handleCreateClick}>
                        {isCreating ? (
                            <div className="create-input-wrapper">
                                <TextareaAutosize
                                    className="create-input"
                                    maxRows={4}
                                    minRows={4}
                                    placeholder="무엇을 완료해야 합니까?"
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                    onChange={(e) => setScheduleTitle(e.target.value)}
                                    autoFocus
                                />
                                <button className="submit-btn" onMouseDown={(e) => {
                                    e.stopPropagation();
                                    handleCreatingSubmit();
                                }}>
                                    ⏎
                                </button>
                            </div>
                        ) : (
                            <div className="plusWrap">
                                <svg className="makeBtn" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                </svg>
                                만들기
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default DashBoard;