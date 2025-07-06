import { useState, useContext, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';

import SectionColumn from './SectionColumn';
import SectionModal from './SectionModal';
import EventDetailModal from '../modal/EventDetailModal';
import DeleteSectionModal from './DeleteSectionModal'; // 삭제 모달 import

import AddIcon from '@mui/icons-material/Add';
import TabNav from '../../includes/side/components/tab/TabNav';
import { GlobalContext } from '../context/GlobalContext';

import './DashBoard.css';

const Dashboard = () => {
    const apiUrl = URL_CONFIG.API_URL;
    const { errorAlert, successAlert, auth } = useContext(GlobalContext);

    const [sectionList, setSectionList] = useState([]);
    const [creatingSectionId, setCreatingSectionId] = useState(null);
    const [newScheduleTitle, setNewScheduleTitle] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isAddingSection, setIsAddingSection] = useState(false);
    const [deletingSection, setDeletingSection] = useState(null); // 삭제 대상 상태

    // 섹션 전체 조회
    const fetchSections = async () => {
        if (!auth.accessToken) return;
        try {
            const res = await axios.get(`${apiUrl}/api/section/dashboard`, {
                headers: { Authorization: `Bearer ${auth.accessToken}` },
            });

            // API 응답을 컴포넌트 상태에 맞게 파싱
            const parsed = res.data.items.map(s => ({
                id: s.sectionNo,
                title: s.sectionTitle,
                isBaseSection: s.isBaseSection,
                createdAt: s.createdAt,
                schedules: s.schedules?.map(sc => ({
                    id: sc.scheduleNo,
                    title: sc.scheduleTitle,
                    content: sc.scheduleContent,
                    startDate: sc.startDate,
                    dueDate: sc.dueDate
                })) || []
            }));

            setSectionList(parsed);
        } catch (err) {
            errorAlert(err.response?.data?.message || "조회 실패");
        }
    };

    useEffect(() => {
        fetchSections();
    }, [auth.accessToken]);

    // 섹션 추가 - 임시 ID로 UI 즉시 반영 후, API 호출 후 실제 ID로 교체
    const handleAddSectionBtn = async (title) => {
        const tempId = `temp_${Date.now()}`;
        const tempSection = {
            id: tempId,
            title,
            isBaseSection: false,
            createdAt: new Date(),
            schedules: []
        };
        setSectionList(prev => [...prev, tempSection]);

        try {
            const res = await axios.post(`${apiUrl}/api/section`, { sectionTitle: title }, {
                headers: { Authorization: `Bearer ${auth.accessToken}` },
            });
            const newS = res.data.items?.[0];
            if (newS) {
                setSectionList(prev => prev.map(s => s.id === tempId ? {
                    id: newS.sectionNo,
                    title: newS.sectionTitle,
                    isBaseSection: newS.isBaseSection,
                    createdAt: newS.createdAt,
                    schedules: newS.schedules || []
                } : s));
                successAlert("섹션 추가 완료");
            }
        } catch (err) {
            setSectionList(prev => prev.filter(s => s.id !== tempId));
            errorAlert(err.response?.data?.message || "섹션 추가 실패");
        }
    };

    // 섹션 삭제 API 호출 및 상태 갱신
    const handleDeleteSection = async (sectionId) => {
        try {
            await axios.delete(`${apiUrl}/api/section/${sectionId}`, {
                headers: { Authorization: `Bearer ${auth.accessToken}` }
            });
            successAlert("섹션 삭제 완료");
            setDeletingSection(null); // 삭제 모달 닫기
            fetchSections(); // 섹션 목록 갱신
        } catch (err) {
            errorAlert(err.response?.data?.message || "섹션 삭제 실패");
        }
    };

    // 일정 추가 - 임시 ID로 UI 즉시 반영 후 API 호출 후 실제 ID로 교체
    const handleAddSchedule = async (sectionId) => {
        const title = newScheduleTitle.trim();
        if (!title) return;

        const tempId = `temp_${Date.now()}`;
        const newSchedule = {
            id: tempId,
            title,
            content: '',
            startDate: '',
            dueDate: ''
        };

        setSectionList(prev => prev.map(s =>
            s.id === sectionId
                ? { ...s, schedules: [...s.schedules, newSchedule] }
                : s
        ));

        setNewScheduleTitle('');
        setCreatingSectionId(null);

        try {
            const response = await axios.post(`${apiUrl}/api/schedule`, {
                scheduleTitle: title,
                scheduleContent: '',
                startDate: '',
                dueDate: '',
                sectionNo: sectionId
            }, {
                headers: { Authorization: `Bearer ${auth.accessToken}` }
            });

            const { items, code, message } = response.data;
            if (code === '200' && items?.length) {
                const saved = items[0];

                // 임시 일정 ID를 실제 DB ID로 교체
                setSectionList(prev => prev.map(s =>
                    s.id === sectionId
                        ? {
                            ...s,
                            schedules: s.schedules.map(sc =>
                                sc.id === tempId
                                    ? {
                                        ...sc,
                                        id: saved.scheduleNo,
                                        content: saved.scheduleContent,
                                        startDate: saved.startDate,
                                        dueDate: saved.dueDate,
                                    }
                                    : sc
                            )
                        }
                        : s
                ));

                successAlert(message);
            } else {
                throw new Error('일정 추가 실패');
            }
        } catch (err) {
            // 실패 시 임시 일정 제거
            setSectionList(prev => prev.map(s =>
                s.id === sectionId
                    ? { ...s, schedules: s.schedules.filter(sc => sc.id !== tempId) }
                    : s
            ));
            errorAlert(err.response?.data?.message || "일정 추가 실패");
        }
    };

    // 일정 수정
    const handleUpdateSchedule = async (updatedSchedule) => {
        const payload = {
            scheduleNo: updatedSchedule.id,
            scheduleTitle: updatedSchedule.title,
            scheduleContent: updatedSchedule.content,
            startDate: updatedSchedule.startDate,
            dueDate: updatedSchedule.dueDate,
            sectionNo: updatedSchedule.sectionId,
        };

        try {
            const res = await axios.post(`${apiUrl}/api/schedule/update`,
                payload, {
                headers: { Authorization: `Bearer ${auth.accessToken}` }
            });

            if (res.data.code === '200') {
                setSectionList(prev => prev.map(section => {
                    if (section.id !== updatedSchedule.sectionId) return section;

                    const updatedSchedules = section.schedules.map(sc =>
                        sc.id === updatedSchedule.id ? {
                            ...sc,
                            title: updatedSchedule.title,
                            content: updatedSchedule.content,
                            startDate: updatedSchedule.startDate,
                            dueDate: updatedSchedule.dueDate,
                        } : sc
                    );

                    return { ...section, schedules: updatedSchedules };
                }));

                successAlert(res.data.message);
                setSelectedEvent(null);
            } else {
                throw new Error("일정 수정 실패");
            }

        } catch (err) {
            errorAlert(err.response?.data?.message || "일정 수정 실패");
        }
    };

    // 일정 삭제
    const handleDeleteSchedule = async (scheduleId) => {
        try {
            const res = await axios.delete(`${apiUrl}/api/schedule/${scheduleId}`, {
                headers: { Authorization: `Bearer ${auth.accessToken}` }
            });

            if (res.data.code === '200') {
                setSectionList(prevSections =>
                    prevSections.map(section => ({
                        ...section,
                        schedules: section.schedules.filter(sc => sc.id !== scheduleId)
                    }))
                );

                successAlert(res.data.message);
                setSelectedEvent(null);
            } else {
                throw new Error('일정 삭제 실패');
            }
        } catch (err) {
            errorAlert(err.response?.data?.message || '일정 삭제 실패');
        }
    };

    // 일정 드래그 앤 드롭 시 섹션 변경 처리
    const handleDropSchedule = async (dropped, targetSectionId) => {
        const { id, fromSectionId } = dropped;

        // 같은 섹션 내 드롭이면 처리하지 않음
        if (fromSectionId === targetSectionId) return;

        try {
            // UI 즉시 업데이트 (optimistic update)
            setSectionList(prev =>
                prev.map(section => {
                    if (section.id === fromSectionId) {
                        return { ...section, schedules: section.schedules.filter(s => s.id !== id) };
                    } else if (section.id === targetSectionId) {
                        return { ...section, schedules: [...section.schedules, { ...dropped, sectionId: targetSectionId }] };
                    }
                    return section;
                })
            );

            // 서버에 섹션 이동 요청
            await axios.post(`${apiUrl}/api/schedule/update-schedule-section`, {
                scheduleNo: id,
                targetSectionNo: targetSectionId,
            }, {
                headers: { Authorization: `Bearer ${auth.accessToken}` }
            });

            successAlert('일정이 성공적으로 이동되었습니다.');
        } catch (err) {
            errorAlert(err.response?.data?.message || '일정 이동 실패');
            // 실패 시 UI 롤백 로직 필요 시 구현 가능
        }
    };

    // 섹션 제목 수정
    const handleUpdateSectionTitle = async (sectionId, newTitle) => {
        try {
            const response = await axios.post(`${apiUrl}/api/section/title-update`, {
                sectionNo: sectionId,
                sectionTitle: newTitle,
            }, {
                headers: { Authorization: `Bearer ${auth.accessToken}` }
            });

            if (response.data.code === '200') {
                setSectionList(prev => prev.map(section =>
                    section.id === sectionId
                        ? { ...section, title: newTitle }
                        : section
                ));
                successAlert(response.data.message || '섹션 제목이 수정되었습니다.');
            } else {
                throw new Error('섹션 제목 수정 실패');
            }
        } catch (err) {
            errorAlert(err.response?.data?.message || '섹션 제목 수정 실패');
        }
    };

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <TabNav />
                <div className="dashBoard">

                    {/* 일정 상세 모달 */}
                    {selectedEvent && (
                        <EventDetailModal
                            event={selectedEvent}
                            onClose={() => setSelectedEvent(null)}
                            onUpdate={handleUpdateSchedule}
                            onDelete={handleDeleteSchedule}
                        />
                    )}

                    {/* 섹션 추가 모달 */}
                    {isAddingSection && (
                        <SectionModal
                            setOpen={setIsAddingSection}
                            onSubmit={handleAddSectionBtn}
                            onUpdate={handleUpdateSchedule}
                        />
                    )}

                    {/* 섹션 삭제 확인 모달 */}
                    {deletingSection && (
                        <DeleteSectionModal
                            sectionId={deletingSection.id}
                            sectionTitle={deletingSection.title}
                            setOpen={() => setDeletingSection(null)}
                            onDelete={handleDeleteSection}
                        />
                    )}

                    <div className="section-container-wrapper">
                        {sectionList.map(section => (
                            <SectionColumn
                                key={section.id}
                                section={section}
                                onDropSchedule={handleDropSchedule}
                                selectedEventSetter={setSelectedEvent}
                                creatingSectionId={creatingSectionId}
                                newScheduleTitle={newScheduleTitle}
                                setNewScheduleTitle={setNewScheduleTitle}
                                handleAddSchedule={handleAddSchedule}
                                setCreatingSectionId={setCreatingSectionId}
                                openDeleteModal={() => setDeletingSection(section)}
                                onUpdateSectionTitle={handleUpdateSectionTitle}
                            />
                        ))}
                        <AddIcon className="addSectionBtn" onClick={() => setIsAddingSection(true)} />
                    </div>
                </div>
            </DndProvider>
        </>
    );
};

export default Dashboard;
