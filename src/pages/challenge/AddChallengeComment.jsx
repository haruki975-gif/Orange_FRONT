import axios from "axios";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";

const apiURL = URL_CONFIG.API_URL;

const AddChallengeComment = ({ postId, onCommentAdded }) => {
    const handleCommentSubmit = ({ content, image }) => {
        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("content", content);
        if (image) formData.append("image", image);

        toast.promise(
            axios.post(`${apiURL}/api/comments`, formData).then(() => {
                if (onCommentAdded) onCommentAdded();
            }),
            {
                pending: "댓글 등록 중...",
                success: "댓글이 등록되었습니다.",
                error: "댓글 등록 실패",
            }
        );
    };

    return <CommentForm onSubmit={handleCommentSubmit} />;
};

export default AddChallengeComment;