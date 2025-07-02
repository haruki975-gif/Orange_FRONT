import { useEffect, useRef, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const UpdateWorkModal = ({setOpenUpdateModal, modalBackground, prevWork, teamMemberList, sendJsonMessage, id, userNo}) =>{

    const closeUpdateTeamModal = (e) =>{
        setOpenUpdateModal(false);
    }

    const [updateTitle, setUpdateTitle] = useState(prevWork.title);
    const [updateContent, setUpdateContent] = useState(prevWork.content);
    const [updateEndDate, setUpdateEndDate] = useState(new Date(prevWork.endDate));
    const [updateAssignee, setUpdateAssignee] = useState(prevWork.assigneeNo);
    const [calendarOpen, setCalendarOpen] = useState(false);


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const calendarRef = useRef(null);

    const handleDateClickOutside = (e) => {
        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
            setCalendarOpen(false);
        }
    };

    const updateWorkHandler = () =>{
        const updateWorkInfo={
            type : "update",
            teamId : id,
            requestUserNo : userNo,
            workId : prevWork.workId,
            status : prevWork.status,
            title : updateTitle,
            content : updateContent,
            assigneeNo : updateAssignee,
            endDate : formatDate(updateEndDate)
        }

        sendJsonMessage(updateWorkInfo);
        closeUpdateTeamModal();
    }


    return( 
        <div className="work-modal" ref={modalBackground} onClick={(e) => {
            if(modalBackground.current === e.target)
                closeUpdateTeamModal(e);
        }}>
            <form className="container" onClick={(e) => handleDateClickOutside(e)}>
                <h2 className="title">업무 수정</h2>
                <div className="team-name">
                    <label htmlFor="team-name" className="name">업무명</label>
                    <input type="text" id="team-name" 
                        placeholder="업무명(최대100자)" 
                        value={updateTitle}
                        onChange={e => setUpdateTitle(e.target.value)}/>
                </div>
                <div className="calendar-wrapper">
                    <label className="name">마감일</label>
                    <div
                        className="calendar-display"
                        onClick={() => setCalendarOpen(prev => !prev)}>
                        {formatDate(updateEndDate)}
                    </div>
                    {calendarOpen && (
                        <div className="calender-container"
                            ref={calendarRef}>
                            <Calendar
                                value={updateEndDate}
                                onChange={(date) => {
                                    console.log(date);
                                    setUpdateEndDate(date);
                                    setCalendarOpen(false);
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="team-content">
                    <label htmlFor="team-content" className="content">업무 설명</label>
                    <textarea id="team-content" 
                        placeholder="업무 설명 (최대 1000자)"
                        value={updateContent}
                        onChange={e => setUpdateContent(e.target.value)}/>
                </div>
                <div className="team-category">
                    <h3>담당자</h3>
                    <div className="categories">
                        {teamMemberList.map(member => (
                            <button type="button" 
                                className={`category ${updateAssignee === member.memberNo ? "active" : ""}`} onClick={() => setUpdateAssignee(member.memberNo)}
                            >
                                {member.memberName}
                            </button>
                        ))}
                    </div>
                </div>

                <button type="button" onClick={() => updateWorkHandler()} className="create-request-btn">정보 수정</button>
                <button className="close-btn" type="button" onClick={() => closeUpdateTeamModal()}>
                    <img src="/img/icon/x-lg.png" alt="" />
                </button>
            </form>
        </div>
    )
}

export default UpdateWorkModal;