import { useState } from "react";
import "./SectionModal.css";

const SectionModal = ({ setOpen, onSubmit }) => {
    const [title, setTitle] = useState("");

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

    const isValid = title.trim() !== ""; // 공백 제거 후 빈 문자열이면 false

    const handleSubmit = () => {
        if (!isValid) return;
        onSubmit(title);
        setOpen(false);
    };

    return (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
            <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>섹션 만들기</h2>
                    <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
                </div>

                <div className="modal-body">
                    <label className="section-title">이름</label>
                    <input
                        type="text"
                        className="modal-input"
                        placeholder="섹션 제목을 입력하세요"
                        value={title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={() => setOpen(false)}>취소</button>
                    <button className="section-submit-btn" disabled={!isValid} onClick={handleSubmit}>
                        제출
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionModal;
