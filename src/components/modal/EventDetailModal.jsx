import { useState, useEffect, useRef } from 'react';
import './EventDetailModal.css';

const EventDetailModal = ({ event, onClose, onUpdate, onDelete }) => {

    // ✅ 일정 입력 데이터 상태 관리
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        startDate: '',
        dueDate: '',
    });

    // ✅ 메뉴 드롭다운 상태
    const [modalDropDown, setModalDropDown] = useState(false);

    // ✅ 드롭다운 외부 클릭 감지용 ref
    const ref = useRef(null);

    const toggleDropdown = () => {
        setModalDropDown(!modalDropDown);
    };

    // ✅ 기한 초과 여부 판단
    const isPastDue = (date) => {
        if (!date) return false;
        const today = new Date().toISOString().split('T')[0];
        return date < today;
    };

    // ✅ 드롭다운 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setModalDropDown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [ref]);

    // ✅ 모달이 열릴 때 기존 일정 데이터 설정
    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || '',
                content: event.content || '',
                startDate: event.startDate || '',
                dueDate: event.dueDate || '',
            });
        }
    }, [event]);

    // ✅ 입력 필드 변경 처리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ✅ 저장(수정) 버튼 클릭 시 호출
    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            ...event,
            ...formData,
        };
        onUpdate(submitData);
    };

    // ✅ 삭제 버튼 클릭 시 호출
    const handleDelete = () => {
        if (window.confirm('일정을 삭제하시겠습니까?')) {
            onDelete(event.id);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="event-form">
                    <div className='modalHeaderGroup'>
                        {/* ✅ 제목 입력 */}
                        <div className="form-group">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="제목을 입력하세요"
                                className="title-input"
                                required
                            />
                        </div>

                        {/* ✅ 드롭다운 메뉴 및 닫기 버튼 */}
                        <div className="modal-actions" ref={ref}>
                            <button type="button" className="menu-button" onClick={toggleDropdown}>⋯</button>
                            {modalDropDown && (
                                <ul className='modalDropDownWrap'>
                                    <li className='dropDownMenu'>이동</li>
                                    <li className='dropDownMenu' onClick={handleDelete}>삭제</li>
                                </ul>
                            )}
                            <button type="button" className="close-button" onClick={onClose}>×</button>
                        </div>
                    </div>

                    {/* ✅ 날짜 입력 필드 */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>시작 날짜</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className="date-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>기한</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleInputChange}
                                className="date-input"
                                required
                            />
                        </div>
                    </div>

                    {/* ✅ 설명 입력 필드 */}
                    <div className="form-group">
                        <label className='content-title'>설명</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="일정 내용(최대 1000자)"
                            className="description-textarea"
                            maxLength={1000}
                            rows={4}
                            style={{ resize: 'none' }}
                        />
                    </div>

                    {/* ✅ 저장 버튼 */}
                    <div className="form-actions">
                        <button type="submit" className="save-btn">저장</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventDetailModal;
