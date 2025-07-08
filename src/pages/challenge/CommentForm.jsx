import { useState } from "react";
import { toast } from "react-toastify";
import "./CommentForm.css";

const CommentForm = ({ onSubmit, buttonLabel = "댓글 작성", allowImage = true, image, setImage }) => {
    const [content, setContent] = useState("");
    
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        const submitAction = async () => {
            setLoading(true);
            await onSubmit({ content, image });
            setContent("");
            setImage(null);
            setLoading(false);
        };

        toast.promise(submitAction(), {
            pending: "댓글 등록 중...",
            success: "댓글이 등록되었습니다.",
            error: "등록 실패. 다시 시도해주세요.",
        });
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 입력하세요..."
                required
                disabled={loading}
            />
            {allowImage && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    disabled={loading}
                />
            )}
            <button type="submit" disabled={loading}>
                {loading ? "등록 중..." : buttonLabel}
            </button>
        </form>
    );
};

export default CommentForm;