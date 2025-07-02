import React, { useState } from "react";
import "./Calendar.css";
import TabNav from "../../includes/side/components/tab/TabNav";
import EventDetailModal from "../modal/EventDetailModal";
import { useEffect } from "react";
import { checkAuthStatus } from "../Member/Login/js/authService.js"
import { useNavigate } from "react-router-dom";


import {
    useFloating,    /*
                       떠 있는 UI(팝업, 툴팁 등등)의 위치를 계산하고 제어하는 핵심 훅
                       기준 요소(ref)와 떠 있는 요소(ref)를 연결
                       위치 좌표 x, y, strategy, refs 등을 반환
                       middleware 옵션으로 세부 동작 조정 가능
                    */

    offset,         // 기준 요소와 떠 있는 요소 사이 간격 설정
    flip,           // 공간이 부족하면 방향을 자동으로 뒤집음 ex) bottom이 공간 부족하면 top으로 변경
    shift,          // 요소가 화면 밖으로 나가지 않도록 미세 조정, 팝업이 뷰포트 밖으로 밀리는 것 방지
    autoUpdate,     // 창 크기 변경, 스크롤 등 변화 감지 시 자동 위치 업데이트
    useDismiss,     // 바깥 클릭, ESC 키 등으로 팝업을 닫게 해주는 기능
    FloatingPortal  // 떠 있는 요소를 body 밖, 별도 DOM 계층에 렌더링
} from "@floating-ui/react";

import FullCalendar from "@fullcalendar/react";             // jsx에서 <FullCalendar /> 처럼 사용할 수 있게 해줌
// FullCalendar의 React 컴포넌트 버전을 불러옴
// 해당 컴포넌트로 실제 캘린더 렌더링

import dayGridPlugin from "@fullcalendar/daygrid";          // 월간 뷰(Month View)를 구현하기 위한 "일정 그리드" 플러그인
// 기본 달력에서 많이 쓰는 "칸형 달력 UI"을 사용하게 해줌

import interactionPlugin from "@fullcalendar/interaction";  // 마우스로 날짜 클릭, 드래그 앤 드롭, 일정 생성 등의 상호작용 기능을 가능하게 해줌
// dateClick, select, eventDragStart, eventDrop 등의 이벤트를 사용할 수 있게 됨
import PopupForm from "./PopupForm";

const Calender = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [scheduleTitle, setScheduleTitle] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navi = useNavigate();


    // 이벤트 클릭 모달 상태 추가
    const [selectedEvent, setSelectEvent] = useState(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    const { x, y, refs, strategy, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(10), flip(), shift({ padding: 5 })],
        placement: "bottom-start",
        whileElementsMounted: autoUpdate,
    });

    // 팝업 외부 클릭 시 닫기
    const dismiss = useDismiss(context);

    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);

        // 클릭된 날짜 셀의 위치를 기준으로 Virtual Element 생성
        const cellRect = info.dayEl.getBoundingClientRect();

        const virtualElement = {
            getBoundingClientRect: () => ({
                x: cellRect.left,
                y: cellRect.top,
                width: cellRect.width,
                height: cellRect.height,
                top: cellRect.top,
                left: cellRect.left,
                right: cellRect.right,
                bottom: cellRect.bottom,
            }),
        };

        refs.setReference(virtualElement);
        setIsOpen(true);
    };


    // 이벤트 클릭 핸들러
    const handleEventClick = (info) => {
        const eventData = scheduleTitle.find(event => event.id === parseInt(info.event.id));
        setSelectEvent(eventData || {
            id: info.event.id,
            title: info.event.title,
            content: '',
            startDate: info.event.startStr,
            dueDate: info.event.startStr,
        });
        setIsEventModalOpen(true);
    };

    // 이벤트 모달 닫기
    const handleEventModalClose = () => {
        setIsEventModalOpen(false);
        setSelectEvent(null);
    }

    // 이벤트 모달 업데이트
    const handleUpdateEvent = (updateEvent) => {
        setScheduleTitle(prevEvents =>
            prevEvents.map(event =>
                event.id === updateEvent.id ? updateEvent : event
            )
        );
        setIsEventModalOpen(false);
        setSelectEvent(null);
    };

    // 이벤트 삭제 핸들러
    const handleDeleteEvent = (eventId) => {
        console.log("Deleting event: ", eventId);
        setScheduleTitle(prevEvents =>
            prevEvents.filter(event => event.id !== parseInt(eventId))
        );
        setIsEventModalOpen(false);
        setSelectEvent(null);
    };

    const handleEventDrop = (info) => {
        const movedEventId = parseInt(info.event.id, 10);
        const newStartDateStr = info.event.startStr;  // 드래그 후 새 시작일

        // 기존 이벤트 찾기
        const movedEvent = scheduleTitle.find(event => event.id === movedEventId);
        if (!movedEvent) return;

        // 이벤트가 며칠짜리 일정인지 계산 (dueDate - startDate)
        const oldStart = new Date(movedEvent.startDate || movedEvent.dueDate);
        const oldEnd = new Date(movedEvent.dueDate);
        const diffTime = oldEnd.getTime() - oldStart.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일수 차이

        // 새 시작일 Date 객체
        const newStart = new Date(newStartDateStr);

        // 새 종료일 = 새 시작일 + 기간 길이
        const newEnd = new Date(newStart);
        newEnd.setDate(newStart.getDate() + diffDays);

        // 날짜 포맷 함수 (YYYY-MM-DD)
        const formatDate = (date) => date.toISOString().split('T')[0];

        // 상태 업데이트
        const updatedEvents = scheduleTitle.map(event => {
            if (event.id === movedEventId) {
                return {
                    ...event,
                    startDate: formatDate(newStart),
                    dueDate: formatDate(newEnd),
                };
            }
            return event;
        });

        setScheduleTitle(updatedEvents);
        console.log("이동된 일정 시작:", newStartDateStr);
    };




    const handleAddScheduleTitle = (eventDate) => {

        const NewEvent = {
            title: eventDate.task,
            id: Date.now(),
            content: "",
            startDate: null,
            dueDate: selectedDate,
        };

        console.log("새로 추가된 일정:", NewEvent); // 디버깅용


        setScheduleTitle(prevEvents => [...prevEvents, NewEvent]);
    }

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDayCellContent = (arg) => {
        return arg.dayNumberText.replace("일", "");
    };

    const getNextDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split("T")[0];
    };


    useEffect(() => {
        const isAuth = checkAuthStatus();
        setIsLoggedIn(isAuth);
    }, []);


    return (
        <>
            <TabNav />

            {/* 캘린더 블러 처리용 wrapper */}
            {/* <div className={`calendar-wrapper ${!isLoggedIn ? "blur" : ""}`}> */}
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                height={900}
                initialView="dayGridMonth"
                locale="ko"
                dayCellContent={handleDayCellContent}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                selectable={true}
                selectMirror={false}
                editable={true}
                eventDrop={handleEventDrop}
                events={scheduleTitle.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.startDate || event.dueDate,
                    end: getNextDate(event.dueDate),
                }))}
            />

            {isOpen && (
                <FloatingPortal>
                    <PopupForm
                        ref={refs.setFloating}
                        selectedDate={selectedDate}
                        x={x}
                        y={y}
                        strategy={strategy}
                        onClose={handleClose}
                        onAddEvent={handleAddScheduleTitle}
                    />
                </FloatingPortal>
            )}

            {isEventModalOpen && selectedEvent && (
                <EventDetailModal
                    event={selectedEvent}
                    onClose={handleEventModalClose}
                    onUpdate={handleUpdateEvent}
                    onDelete={handleDeleteEvent}
                />
            )}
            {/* </div> */}

            {/* 비로그인 시 오버레이 */}
            {/* {!isLoggedIn && (
                <div className="login-overlay">
                    <div className="login-modal">
                        <h2>로그인이 필요합니다</h2>
                        <button
                            className="login-button"
                            onClick={() => window.location.href = "/login"}
                        >
                            로그인
                        </button>
                    </div>
                </div>
            )} */}
        </>
    );

};

export default Calender;