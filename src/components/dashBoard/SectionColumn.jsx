import { useState } from 'react';
import { useDrop } from 'react-dnd';
import ScheduleCard from './ScheduleCard';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import './SectionColumn.css'

const SectionColumn = ({
    section,
    onDropSchedule,
    selectedEventSetter,
    creatingSectionId,
    newScheduleTitle,
    setNewScheduleTitle,
    handleAddSchedule,
    setCreatingSectionId,
    openDeleteModal,
    onUpdateSectionTitle
}) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editingTitle, setEditingTitle] = useState(section.title);

    // 드래그된 일정 드롭 받기, 섹션 ID와 함께 부모 콜백 호출
    const [, dropRef] = useDrop(() => ({
        accept: 'SCHEDULE',
        drop: (item) => onDropSchedule(item, section.id),
    }));

    // 제목 수정 시작 시 현재 제목으로 초기화
    const handleTitleClick = () => {
        setIsEditingTitle(true);
        setEditingTitle(section.title);
    };

    // 제목 수정 완료 시 공백 체크 및 변경 사항 있을 때만 업데이트 콜백 호출
    const handleTitleSubmit = () => {
        const trimmedTitle = editingTitle.trim();
        if (trimmedTitle && trimmedTitle !== section.title) {
            onUpdateSectionTitle(section.id, trimmedTitle);
        }
        setIsEditingTitle(false);
    };

    // 제목 수정 취소 시 원래 제목 복원
    const handleTitleCancel = () => {
        setIsEditingTitle(false);
        setEditingTitle(section.title);
    };

    // Enter: 수정 완료, Escape: 수정 취소
    const handleTitleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleTitleSubmit();
        } else if (e.key === 'Escape') {
            handleTitleCancel();
        }
    };

    return (
        <div className="work-status-container" ref={dropRef}>
            {/* 제목 인라인 편집 UI */}
            {isEditingTitle ? (
                <div className="title-edit-wrapper">
                    <input
                        className="title-input"
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={handleTitleKeyDown}
                        onBlur={handleTitleSubmit} // 포커스 아웃 시 저장
                        autoFocus
                        maxLength={50}
                    />
                    <div className="title-edit-buttons">
                        <CheckBoxIcon
                            className="icon-btn"
                            onClick={handleTitleSubmit}
                        />
                        <CloseIcon
                            className="icon-btn"
                            onClick={handleTitleCancel}
                        />
                    </div>
                </div>
            ) : (
                // 제목 클릭 시 수정 모드 전환
                <h3
                    className="work-status editable"
                    onClick={handleTitleClick}
                    title="클릭하여 제목 수정"
                >
                    {section.title}
                </h3>
            )}

            {/* 섹션 삭제 버튼 - 클릭 시 삭제 모달 호출 */}
            <div className="options-btn" onClick={openDeleteModal}>
                <span></span><span></span><span></span>
            </div>

            {/* 해당 섹션의 일정 리스트 출력, 클릭 시 선택된 일정 설정 */}
            {(section.schedules ?? []).map(schedule => (
                <ScheduleCard
                    key={schedule.id}
                    schedule={schedule}
                    sectionId={section.id}
                    onClick={() =>
                        selectedEventSetter({ ...schedule, sectionId: section.id })
                    }
                />
            ))}

            {/* 일정 추가 UI - 생성중인 섹션에서만 입력창 보여주기 */}
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
                                    handleAddSchedule(section.id); // 일정 추가 함수 호출
                                }
                            }}
                            autoFocus
                        />
                        <button
                            className="submit-btn"
                            onMouseDown={(e) => {
                                e.stopPropagation(); // 부모 이벤트 전파 막음
                                handleAddSchedule(section.id); // 일정 추가 함수 호출
                            }}
                        >
                            ⏎
                        </button>
                    </div>
                ) : (
                    // 입력창이 아닐 때 보이는 ‘만들기’ 버튼 UI
                    <div className="plusWrap">
                        <svg className="makeBtn" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                        만들기
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionColumn;
