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
                                <button onClick={() => handleEditSave(comment.commentNo)}>저장</button>
                                <button onClick={() => setEditId(null)}>취소</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>{comment.commentContent}</p>
                            {comment.commentFileUrl && (
                                <img src={comment.commentFileUrl} alt="첨부 이미지" />
                            )}
                            <div className="comment-actions">
                                <button
                                    onClick={() => {
                                        setEditId(comment.commentNo);
                                        setEditContent(comment.commentContent);
                                        setEditImage(null); //
                                    }}
                                >
                                    수정
                                </button>
                                <button onClick={() => onDelete(comment.commentNo)}>삭제</button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentList;
