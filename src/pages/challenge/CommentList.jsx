import { useState } from "react";
import "./CommentList.css";

const CommentList = ({ comments = [], onDelete, onEdit }) => {
    const [editId, setEditId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editImage, setEditImage] = useState(null);
    

    const handleEditSave = (id) => {
        onEdit(id, editContent, editImage);
        setEditId(null);
        setEditContent("");
        setEditImage(null);
    };

    return (
        <div className="comment-list">
        {comments.map((comment) => (
            <div key={comment.commentNo} className="comment-item">
            {editId === comment.commentNo ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditImage(e.target.files[0])}
                  />
                  <div className="comment-actions">
                    <button className="save-btn" onClick={() => handleEditSave(comment.commentNo)}>저장</button>
                    <button className="cancel-btn" onClick={() => setEditId(null)}>취소</button>
                  </div>
                </>
            ) : (
            <div className="comment-box">
                <div className="comment-header">
                    <p className="comment-content">{comment.commentContent}</p>
                    <span className="comment-meta">
                        {comment.commentWriter}
                        ({new Date(comment.createDate).toLocaleString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                        })})
                    </span>
                </div>
                  
                {/* 이미지 */}
                {comment.commentFileUrl && (
                    <div className="comment-image-wrapper">
                        <img src={comment.commentFileUrl} alt="첨부 이미지" className="comment-image" />
                    </div>
                )}

                {/* 버튼 */}
                <div className="comment-actions">
                    <button className="edit-btn" onClick={() => {
                        setEditId(comment.commentNo);
                        setEditContent(comment.commentContent);
                        setEditImage(null);
                    }}>
                        수정
                    </button>

                    <button className="delete-btn" onClick={() => onDelete(comment.commentNo)}>
                        삭제
                    </button>
                </div>
            </div>
            )}
            </div>
            ))}
        </div>
    );
};

export default CommentList;