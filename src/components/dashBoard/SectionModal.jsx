import { useState, useEffect, useContext } from "react";
import { GlobalContext } from '../context/GlobalContext';
import axios from "axios";
import "./SectionModal.css";

const SectionModal = ({ setOpen, onSubmit }) => {
    const [title, setTitle] = useState("");

    const { errorAlert, successAlert, auth } = useContext(GlobalContext);

    const [validationMessage, setValidationMessage] = useState(''); // 중복 검사 메시지
    const [isDuplicate, setIsDuplicate] = useState(false); // 중복 여부 상태
    const [typingTimeout, setTypingTimeout] = useState(null); // 디바운스용 타임아웃 ID

    const apiUrl = URL_CONFIG.API_URL;

    useEffect(() => {
        if (!title.trim()) {
            // 입력이 비었으면 메시지 초기화
            setValidationMessage('');
            setIsDuplicate(false);
            return;
        }

        if (typingTimeout) clearTimeout(typingTimeout); // 이전 타임아웃 취소

        // 400ms 지연 후 중복 체크 API 호출 (디바운스 효과)
        const timeout = setTimeout(async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/section/check-title`, {
                    headers: { Authorization: `Bearer ${auth.accessToken}` },
                    params: { sectionTitle: title },
                });

                const { code, message } = response.data;

                setValidationMessage(message); // 서버에서 온 메시지 표시
                setIsDuplicate(code === "409"); // 409면 중복임
            } catch (err) {
                setValidationMessage("중복 체크 실패");
                setIsDuplicate(true); // 실패 시 중복으로 간주
            }
        }, 400);

        setTypingTimeout(timeout);
    }, [title]);

    // 제출 버튼 클릭 시
    const handleSubmit = () => {
        if (!isDuplicate && title.trim()) {
            onSubmit(title.trim()); // 부모 콜백 호출
            setOpen(false);         // 모달 닫기
        }
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
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {/* 중복 및 상태 메시지 표시, 중복이면 빨간색, 아니면 초록색 */}
                    {validationMessage && (
                        <p style={{ color: isDuplicate ? 'red' : 'green', fontSize: 13 }}>{validationMessage}</p>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={() => setOpen(false)}>취소</button>
                    {/* 중복이거나 입력이 없으면 제출 불가 */}
                    <button className="section-submit-btn" disabled={isDuplicate || !title.trim()} onClick={handleSubmit}>
                        제출
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionModal;
