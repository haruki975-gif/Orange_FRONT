import { useState, useContext, useEffect } from "react";
import "./Calendar.css";
import TabNav from "../../includes/side/components/tab/TabNav";
import EventDetailModal from "../modal/EventDetailModal";
import { checkAuthStatus } from "../Member/Login/js/authService.js"
import { GlobalContext } from '../context/GlobalContext';
import axios from "axios";

import {
    useFloating,
    offset,
    flip,
    shift,
    autoUpdate,
    useDismiss,
    FloatingPortal
} from "@floating-ui/react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import PopupForm from "./PopupForm";

const Calender = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [scheduleTitle, setScheduleTitle] = useState([]);
    const { errorAlert, successAlert, auth } = useContext(GlobalContext);
    const apiUrl = URL_CONFIG.API_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 이벤트 클릭 모달 상태 관리
    const [selectedEvent, setSelectEvent] = useState(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    // 팝업 위치 제어용 Floating UI 훅
    const { x, y, refs, strategy, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(10), flip(), shift({ padding: 5 })],
        placement: "bottom-start",
        whileElementsMounted: autoUpdate,
    });

    // 팝업 외부 클릭 시 닫기 핸들러
    const dismiss = useDismiss(context);

    // 날짜 클릭 시 팝업 열기 및 위치 설정
    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);

        const cellRect = info.dayEl.getBoundingClientRect();
        const virtualElement = {
            getBoundingClientRect: () => cellRect
        };

        refs.setReference(virtualElement);
        setIsOpen(true);
    };

    // 이벤트 클릭 시 모달 열기
    const handleEventClick = (info) => {
        const eventData = scheduleTitle.find(event => event.id === parseInt(info.event.id));
        setSelectEvent(eventData || {
            id: info.event.id,
            title: info.event.title,
            content: '',
            startDate: info.event.startStr,
            dueDate: info.event.startStr,
            sectionNo: eventData?.sectionNo || null,
        });
        setIsEventModalOpen(true);
    };

    // 이벤트 모달 닫기
    const handleEventModalClose = () => {
        setIsEventModalOpen(false);
        setSelectEvent(null);
    }

    // 일정 수정 API 호출 및 상태 업데이트
    const handleUpdateEvent = async (updateEvent) => {
        try {
            await axios.post(
                `${apiUrl}/api/schedule/update`,
                {
                    scheduleNo: updateEvent.id,
                    scheduleTitle: updateEvent.title,
                    scheduleContent: updateEvent.content,
                    startDate: updateEvent.startDate,
                    dueDate: updateEvent.dueDate,
                    isCompleted: updateEvent.isCompleted || 'N',
                    sectionNo: updateEvent.sectionNo
                },
                { headers: { Authorization: `Bearer ${auth.accessToken}` } }
            );

            setScheduleTitle(prevEvents =>
                prevEvents.map(event =>
                    event.id === updateEvent.id ? { ...event, ...updateEvent } : event
                )
            );

            successAlert("일정이 수정되었습니다.");
        } catch {
            errorAlert("일정 수정에 실패했습니다.");
        } finally {
            setIsEventModalOpen(false);
            setSelectEvent(null);
        }
    };

    // 일정 삭제 API 호출 및 상태 업데이트
    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`${apiUrl}/api/schedule/${eventId}`, {
                headers: { Authorization: `Bearer ${auth.accessToken}` },
            });

            setScheduleTitle(prevEvents =>
                prevEvents.filter(event => event.id !== parseInt(eventId))
            );

            successAlert("일정이 삭제되었습니다.");
        } catch {
            errorAlert("일정 삭제에 실패했습니다.");
        } finally {
            setIsEventModalOpen(false);
            setSelectEvent(null);
        }
    };

    // 일정 드래그 앤 드롭 후 서버 업데이트 및 상태 반영
    const handleEventDrop = async (info) => {
        const movedEventId = parseInt(info.event.id, 10);
        const newStartDateStr = info.event.startStr;

        const movedEvent = scheduleTitle.find(event => event.id === movedEventId);
        if (!movedEvent) return;

        const oldStart = new Date(movedEvent.startDate || movedEvent.dueDate);
        const oldEnd = new Date(movedEvent.dueDate);
        const diffDays = Math.floor((oldEnd.getTime() - oldStart.getTime()) / (1000 * 60 * 60 * 24));

        const newStart = new Date(newStartDateStr);
        const newEnd = new Date(newStart);
        newEnd.setDate(newStart.getDate() + diffDays);

        const formatDate = (date) => date.toISOString().split('T')[0];

        const updatedEvent = {
            ...movedEvent,
            startDate: formatDate(newStart),
            dueDate: formatDate(newEnd),
        };

        try {
            await axios.post(
                `${apiUrl}/api/schedule/update`,
                {
                    scheduleNo: updatedEvent.id,
                    scheduleTitle: updatedEvent.title,
                    scheduleContent: updatedEvent.content,
                    startDate: updatedEvent.startDate,
                    dueDate: updatedEvent.dueDate,
                    isCompleted: updatedEvent.isCompleted || 'N',
                    sectionNo: updatedEvent.sectionNo
                },
                { headers: { Authorization: `Bearer ${auth.accessToken}` } }
            );

            setScheduleTitle(prevEvents =>
                prevEvents.map(event =>
                    event.id === movedEventId ? updatedEvent : event
                )
            );

            successAlert("일정이 이동되어 업데이트 되었습니다.");
        } catch {
            errorAlert("일정 이동 업데이트에 실패했습니다.");
        }
    };

    // 일정 추가 API 호출 및 상태 업데이트
    const handleAddScheduleTitle = async (eventDate) => {
        try {
            const requestBody = {
                scheduleTitle: eventDate.task,
                startDate: selectedDate,
                dueDate: selectedDate,
            };

            const res = await axios.post(
                `${apiUrl}/api/schedule/base-section-set`,
                requestBody,
                { headers: { Authorization: `Bearer ${auth.accessToken}` } }
            );

            const added = res.data.items[0];
            const newSchedule = {
                id: added.scheduleNo,
                title: added.scheduleTitle,
                content: added.scheduleContent || "",
                startDate: added.startDate || null,
                dueDate: added.dueDate || selectedDate,
            };

            setScheduleTitle(prev => [...prev, newSchedule]);
            successAlert("기준 섹션에 일정이 추가되었습니다.");
        } catch {
            errorAlert("일정 추가에 실패했습니다.");
        } finally {
            setIsOpen(false);
        }
    };

    const handleClose = () => setIsOpen(false);

    // 월 날짜 숫자만 보여주기 (일 제거)
    const handleDayCellContent = (arg) => arg.dayNumberText.replace("일", "");

    // 종료일을 FullCalendar 규격에 맞게 하루 더하기
    const getNextDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split("T")[0];
    };

    // 로그인 상태 확인
    useEffect(() => {
        const isAuth = checkAuthStatus();
        setIsLoggedIn(isAuth);
    }, []);

    // 초기 일정 데이터 불러오기
    useEffect(() => {
        const fetchDashboardSchedules = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/section/dashboard`, {
                    headers: { Authorization: `Bearer ${auth.accessToken}` },
                });

                // 섹션 번호 포함하여 일정 저장
                const allSchedules = res.data.items.flatMap(section =>
                    section.schedules?.map(sc => ({
                        id: sc.scheduleNo,
                        title: sc.scheduleTitle,
                        content: sc.scheduleContent,
                        startDate: sc.startDate,
                        dueDate: sc.dueDate,
                        sectionNo: section.sectionNo,
                        isCompleted: sc.isCompleted,
                    })) || []
                );

                setScheduleTitle(allSchedules);
            } catch {
                console.error("일정 조회 실패");
            }
        };

        if (auth.accessToken) fetchDashboardSchedules();
    }, [auth.accessToken]);

    return (
        <>
            <TabNav />

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                height={900}
                initialView="dayGridMonth"
                locale="ko"
                dayCellContent={handleDayCellContent}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                selectable
                selectMirror={false}
                editable
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
        </>
    );
};

export default Calender;
