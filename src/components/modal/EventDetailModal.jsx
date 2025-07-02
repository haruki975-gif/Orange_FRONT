import React, { useState, useEffect, useRef } from 'react';
import './EventDetailModal.css';

const EventDetailModal = ({ event, onClose, onUpdate, onDelete }) => {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        startDate: '',
        dueDate: '',
    });

    const [modalDropDown, setModalDropDown] = useState(false);

    const ref = useRef(null);

    const toggleDropdown = () => {
        setModalDropDown(!modalDropDown);
    };

    const isPastDue = (date) => {
        if (!date) return false;
        const today = new Date().toISOString().split('T')[0];
        return date < today;
    };


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

    useEffect(() => {
        if (event) {
            console.log('받은 event 객체:', event); // 디버깅용
            setFormData({
                title: event.title || '',
                content: event.content || '',
                startDate: event.startDate || '',
                dueDate: event.dueDate || '',
            });
        }
    }, [event]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input 변경: ${name} = ${value}`); // 디버깅용

        setFormData(prev => {
            const updated = {
                ...prev,
                [name]: value
            };
            console.log('업데이트된 formData:', updated); // 디버깅용
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            ...event,
            ...formData,
        };
        console.log('제출할 데이터:', submitData); // 디버깅용
        onUpdate(submitData);
    };

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
                        <div className="modal-actions" ref={ref}>
                            <button type="button" className="menu-button" onClick={toggleDropdown} >⋯</button>
                            {modalDropDown && (
                                <ul className='modalDropDownWrap' >
                                    <li className='dropDownMenu'>이동</li>
                                    <li className='dropDownMenu' onClick={handleDelete}>삭제</li>
                                </ul>
                            )}

                            <button type="button" className="close-button" onClick={onClose}>×</button>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>시작 날짜</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate || ''}
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

                    <div className="form-group">
                        <label className='content-title'>설명</label>
                        <textarea
                            name="content"
                            onChange={handleInputChange}
                            placeholder="일정 내용(최대 1000자)"
                            className="description-textarea"
                            maxLength={1000}
                            rows={4}
                            style={{ resize: 'none' }}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-btn">
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventDetailModal;