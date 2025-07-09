import { useState } from "react";
import "./CommentList.css";

const CommentList = ({ comments = [], onDelete, onEdit, isAdmin = false }) => {
    const [editId, setEditId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editImage, setEditImage] = useState(null);
    const [editingLoadingId, setEditingLoadingId] = useState(null);

    // 현재 로그인한 사용자 번호 가져오기
    const userNo = Number(sessionStorage.getItem("userNo"));

    const handleEditSave = (id) => {
        const result = onEdit(id, editContent, editImage);
        if (!result || typeof result.then !== "function") {
            return;
        }

        setEditingLoadingId(id);

        result
            .then(() => {
                setEditId(null);
                setEditContent("");
                setEditImage(null);
                return true;
            })
            .catch(() => {
                alert("수정 실패");
            })
            .finally(() => {
                setEditingLoadingId(null);
            });
    };

    return (
        <div className="comment-list">
            {comments.map((comment) => {
                const isDeleted = comment.isDeleted === 'Y';

                return (
                    <div key={comment.commentNo} className="comment-item">
                        {editId === comment.commentNo ? (
                            <>
                                {/* 수정 중일 때는 삭제된 댓글이라도 수정 UI를 보여주지 않는 게 일반적 */}
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    disabled={editingLoadingId === comment.commentNo}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setEditImage(e.target.files[0])}
                                    disabled={editingLoadingId === comment.commentNo}
                                />
                                <div className="comment-actions">
                                    <button
                                        className="save-btn"
                                        onClick={() => handleEditSave(comment.commentNo)}
                                        disabled={editingLoadingId === comment.commentNo}
                                    >
                                        {editingLoadingId === comment.commentNo ? "저장 중..." : "저장"}
                                    </button>
                                    <button
                                        className="cancel-btn"
                                        onClick={() => setEditId(null)}
                                        disabled={editingLoadingId === comment.commentNo}
                                    >
                                        취소
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="comment-box">
                                <div className="comment-header">
                                    {/* 삭제된 댓글이면 내용 대신 '삭제된 댓글입니다' 표시 */}
                                    <p
                                        className={`comment-content ${isDeleted ? "deleted" : ""}`}
                                        title={isAdmin && isDeleted ? comment.commentContent : undefined}
                                    >
                                        {isDeleted ? "삭제된 댓글입니다." : comment.commentContent}
                                    </p>
                                    <span className="comment-meta">
                                        {/* 작성자와 작성일은 삭제 여부와 상관없이 표시 */}
                                        <span className="comment-writer">{comment.commentWriter}</span>
                                        ({new Date(comment.createDate).toLocaleString("ko-KR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })})
                                    </span>
                                </div>

                                {/* 삭제된 댓글이면 이미지는 숨기고, 아니면 이미지 렌더링 */}
                                {!isDeleted && comment.commentFileUrl && (
                                    <div className="comment-image-wrapper">
                                        <img
                                            src={comment.commentFileUrl}
                                            alt="첨부 이미지"
                                            className="comment-image"
                                        />
                                    </div>
                                )}

                                {/* 수정/삭제 버튼 표시 조건 변경 */}
                                {/* 삭제된 댓글은 수정/삭제 버튼 안 보이게 */}
                                {/* 관리자일 경우는 삭제된 댓글도 내용 대신 '삭제된 댓글입니다' 띄우고, 버튼은 안 보이게 */}
                                {!isDeleted && comment.commentWriterNo === userNo && (
                                    <div className="comment-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => {
                                                setEditId(comment.commentNo);
                                                setEditContent(comment.commentContent);
                                                setEditImage(null);
                                            }}
                                        >
                                            수정
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => {
                                                if (window.confirm("댓글을 삭제하시겠습니까?")) {
                                                    onDelete(comment.commentNo);
                                                }
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CommentList;