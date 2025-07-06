import { useContext } from "react";
import "./DeleteSectionModal.css";
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import { GlobalContext } from '../context/GlobalContext';

const DeleteSectionModal = ({ setOpen, sectionId, sectionTitle, onDelete }) => {
    const { errorAlert } = useContext(GlobalContext);

    const handleDelete = () => {
        onDelete(sectionId);
        setOpen(false);
    };

    return (
        <div className="delete-backdrop" onClick={() => setOpen(false)}>
            <div className="delete-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="delete-header">
                    <SmsFailedIcon className="dangerImg" />
                    <h2>{sectionTitle || "섹션"}(를) 삭제하시겠습니까?</h2> {/* ✅ 제목 표시 */}
                    <button className="delete-close-btn" onClick={() => setOpen(false)}>✕</button>
                </div>
                <div className="delete-body">
                    <p className="delete-label">해당 섹션의 데이터를 영구적으로 삭제하려고 합니다.</p>
                    <p className="delete-label">삭제하지 않으려면 닫으세요.</p>
                </div>
                <div className="delete-footer">
                    <button className="delete-cancel-btn" onClick={() => setOpen(false)}>취소</button>
                    <button className="delete-submit-btn" onClick={handleDelete}>삭제</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteSectionModal;
