import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./FindChallenge.css";
import CommentList from "./CommentList";
import Pagination from "../../components/UI/Pagination";
import AddChallengeComment from "./AddChallengeComment";

const apiURL = URL_CONFIG.API_URL;
const isLoggedIn = true;

const FindChallenge = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");

        if(!accessToken){
            return;
        }

        axios.get(`${apiURL}/api/challenge?page=${currentPage}`,{
             headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        })
            .then(res => {
                console.log("게시글 응답:", [...res.data]);
                setPosts([...res.data] || []);
                setTotalPages(res.data.totalPages || 1);
            })
            .catch(err => {
                console.error("게시글 로딩 실패", err);
                toast.error("게시글을 불러오지 못했습니다.");
            });
    }, [currentPage]);

    const loadComments = (postId) => {
        axios.get(`${apiURL}/api/challenge/comment?postId=${postId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        })
            .then(res => {
                console.log("댓글 응답:", [...res.data]);
                setComments(Array.isArray(res.data) ? [...res.data] : (res.data.comments || []));
            })
            .catch((err) => {
                console.error("댓글 로딩 실패", err);
                toast.error("댓글을 불러오지 못했습니다.");
            });
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
        loadComments(post.challengeNo);
    };

    const handleCommentDelete = (commentId) => {
        toast.promise(
            axios.delete(`${apiURL}/api/challenge/comment/${commentId}`).then(() => {
                loadComments(selectedPost.challengeNo);
            }),
            {
                pending: "댓글 삭제 중...",
                success: "댓글이 삭제되었습니다.",
                error: "댓글 삭제 실패",
            }
        );
    };

    const handleCommentEdit = (commentId, newContent) => {
        toast.promise(
            axios.patch(`${apiURL}/api/challenge/comment/${commentId}`, { content: newContent }).then(() => {
                loadComments(selectedPost.challengeNo);
            }),
            {
                pending: "댓글 수정 중...",
                success: "댓글이 수정되었습니다.",
                error: "댓글 수정 실패",
            }
        );
    };

    return (
        <div className="challenge-board">
            <table className="challenge-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, idx) => (
                        <tr
                            key={post.challengeNo}
                            onClick={() => handlePostClick(post)}
                            className={selectedPost?.challengeNo === post.challengeNo ? "selected" : ""}
                        >
                            <td>{(totalPages - currentPage) * posts.length + (idx + 1)}</td>
                            <td className="title">{post.challengeTitle}</td>
                            <td>{post.challengeAuthor}</td>
                            <td>{post.challengeDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {selectedPost && (
                <div className="challenge-detail">
                    <h2>{selectedPost.challengeTitle}</h2>
                    <p>{selectedPost.challengeContent}</p>
                    <img src={selectedPost.challengeFileUrl}/>
                    {isLoggedIn ? (
                        <AddChallengeComment
                            postId={selectedPost.challengeNo}
                            onCommentAdded={() => loadComments(selectedPost.challengeNo)}
                        />
                    ) : (
                        <p className="login-required">댓글 작성은 로그인 후 가능합니다.</p>
                    )}
                    {selectedPost && (
                        <CommentList
                            comments={Array.isArray(comments) ? comments : []} // 절대 안전
                            onDelete={(id) => handleCommentDelete(id)}
                            onEdit={(id, text) => handleCommentEdit(id, text)}
                            showAuthor
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default FindChallenge;