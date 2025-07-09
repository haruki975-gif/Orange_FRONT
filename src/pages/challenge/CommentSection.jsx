import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../components/context/GlobalContext";
import CommentList from "./CommentList";

const CommentSection = ({ postId }) => {
    const { auth } = useContext(GlobalContext);
    const [comments, setComments] = useState([]);

    const fetchComments = () => {
      axios
        .get("/api/challenge/comment", {
          params: { boardNo: postId },
        })
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          console.error("댓글 조회 실패:", err);
          alert("댓글을 불러오지 못했습니다.");
        });
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    // 삭제 요청
    const handleDelete = (commentNo) => {
        axios
            .delete("/api/challenge/comment", {
                params: { commentNo },
                headers: {
                  Authorization: `Bearer ${auth?.accessToken}`,
                },
            })
            .then(() => {
                fetchComments();
            })
            .catch((err) => {
                console.error("댓글 삭제 실패:", err);
                alert("댓글 삭제 실패");
            });
    };

    // 수정 요청
    const handleEdit = (commentNo, content, imageFile) => {
        const formData = new FormData();
        formData.append("commentNo", commentNo);
        formData.append("commentContent", content);
        formData.append("refBoardNo", postId);
        if (imageFile) formData.append("file", imageFile);
        
        return axios
            .put(`/api/challenge/comment/${commentNo}`, formData, {
                headers: {
                    Authorization: `Bearer ${auth?.accessToken}`,
                    "Content-Type": "multipart/form-data"
                },
            })
            .then(fetchComments);
    };

    return (
        <div>
            <CommentList
                comments={comments}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
};

export default CommentSection;