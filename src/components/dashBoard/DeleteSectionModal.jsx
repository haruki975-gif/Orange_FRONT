import { useState } from "react";
import "./DeleteSectionModal.css";
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
const DeleteSectionModal = ({ setOpen }) => {
    const [title, setTitle] = useState("");

    const handleDelete = () => {
        if (window.confirm('일정을 삭제하시겠습니까?')) {
            onDelete(event.id);
        }
    };

    return (
        <div className="delete-backdrop" onClick={() => setOpen(false)}>
            <div className="delete-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="delete-header">
                    <SmsFailedIcon className="dangerImg" />
                    <h2>{title || "섹션"}(를) 삭제하시겠습니까?</h2>
                    <button className="delete-close-btn" onClick={() => setOpen(false)}>✕</button>
                </div>

                <div className="delete-body">
                    <p className="delete-label">
                        해당 섹션의 데이터를 영구적으로 삭제하려고 합니다.
                    </p>
                    <p className="delete-label">
                        삭제하지 않으려면 대신에 해결하거나 닫을 수 있습니다.
                    </p>
                </div>

                <div className="delete-footer">
                    <button className="delete-cancel-btn" onClick={() => setOpen(false)}>취소</button>
                    <button
                        className="delete-submit-btn"
                        onClick={handleDelete}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteSectionModal;
