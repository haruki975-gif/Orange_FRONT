import TabNav from "../../includes/side/components/tab/TabNav";
import "./DashBoard.css";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import SectionModal from "./SectionModal";
import EventDetailModal from "../modal/EventDetailModal";
import DeleteSectionModal from "./DeleteSectionModal";

const DashBoard = () => {
    const [sectionList, setSectionList] = useState([]);
    const [isAddingSection, setIsAddingSection] = useState(false);
    const [isDeleteSection, setIsDeleteSection] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [creatingSectionId, setCreatingSectionId] = useState(null);
    const [newScheduleTitle, setNewScheduleTitle] = useState("");

    // ✅ 섹션 추가
    const handleAddSectionBtn = (title) => {
        const newSection = {
            id: Date.now(),
            title,
            schedules: []
        };
        setSectionList(prev => [...prev, newSection]);
        setIsAddingSection(false);
    };

    // ✅ 일정 추가
    const handleAddSchedule = (sectionId) => {
        const trimmed = newScheduleTitle.trim();
        if (!trimmed) return;

        const newSchedule = {
            id: Date.now(),
            title: trimmed,
            content: "",
            startDate: "",
            dueDate: ""
        };

        setSectionList(prev =>
            prev.map(section =>
                section.id === sectionId
                    ? { ...section, schedules: [...section.schedules, newSchedule] }
                    : section
            )
        );

        setNewScheduleTitle("");
        setCreatingSectionId(null);
    };

    // ✅ 일정 삭제
    const handleDeleteEvent = (sectionId, scheduleId) => {
        setSectionList(prev =>
            prev.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        schedules: section.schedules.filter(schedule => schedule.id !== scheduleId)
                    }
                    : section
            )
        );
        setSelectedEvent(null);
    };

    // ✅ 일정 수정
    const handleUpdateEvent = (sectionId, updatedEvent) => {
        setSectionList(prev =>
            prev.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        schedules: section.schedules.map(schedule =>
                            schedule.id === updatedEvent.id ? updatedEvent : schedule
                        )
                    }
                    : section
            )
        );
        setSelectedEvent(null);
    };

    return (
        <>
            <TabNav />

            <div className="dashBoard">
                {isAddingSection && (
                    <SectionModal
                        setOpen={setIsAddingSection}
                        onSubmit={handleAddSectionBtn}
                    />
                )}
                <div className="section-container-wrapper">
                    {sectionList.map((section) => (
                        <div className="work-status-container" key={section.id}>
                            <h3 className="work-status">{section.title}</h3>
                            <div className="options-btn" onClick={() => setIsDeleteSection(true)}>
                                {isDeleteSection && (
                                    <DeleteSectionModal setOpen={setIsDeleteSection} />
                                )}
                                <span></span><span></span><span></span>
                            </div>

                            {/* ✅ 섹션 내 일정 목록 */}
                            {section.schedules.map((schedule) => (
                                <div
                                    key={schedule.id}
                                    className="work-container"
                                    onClick={() =>
                                        setSelectedEvent({ ...schedule, sectionId: section.id })
                                    }
                                >
                                    <h4 className="work-title">{schedule.title}</h4>
                                    <div className="assignee-info"></div>
                                </div>
                            ))}

                            {/* ✅ 일정 추가 입력 UI */}
                            <div className="work-create-btn" onClick={() => setCreatingSectionId(section.id)}>
                                {creatingSectionId === section.id ? (
                                    <div className="create-input-wrapper">
                                        <TextareaAutosize
                                            className="create-input"
                                            maxRows={4}
                                            minRows={4}
                                            placeholder="무엇을 완료해야 합니까?"
                                            value={newScheduleTitle}
                                            onChange={(e) => setNewScheduleTitle(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddSchedule(section.id);
                                                }
                                            }}
                                            autoFocus
                                        />
                                        <button
                                            className="submit-btn"
                                            onMouseDown={(e) => {
                                                e.stopPropagation();
                                                handleAddSchedule(section.id);
                                            }}
                                        >
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
                    ))}
                    <AddIcon className="addSectionBtn" onClick={() => setIsAddingSection(true)} />
                </div>
            </div>

            {/* ✅ 상세 보기 모달 */}
            {selectedEvent && (
                <EventDetailModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onUpdate={(updatedEvent) => handleUpdateEvent(selectedEvent.sectionId, updatedEvent)}
                    onDelete={() => handleDeleteEvent(selectedEvent.sectionId, selectedEvent.id)}
                />
            )}
        </>
    );
};

export default DashBoard;
