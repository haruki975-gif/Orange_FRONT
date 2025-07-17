import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./FindChallenge.css";
import CommentList from "./CommentList";
import Pagination from "../../components/UI/Pagination";
import AddChallengeComment from "./AddChallengeComment";
import CompleteChallenge from "./CompleteChallenge";

const apiURL = URL_CONFIG.API_URL;
const isLoggedIn = true;
const userRole = sessionStorage.getItem("userRole") || "";
const isAdmin = userRole.includes("ADMIN");

const FindChallenge = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const [totalPosts, setTotalPosts] = useState(0);

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
                const { challenges, totalPages, totalCount } = res.data;
        setPosts(challenges);
        setTotalPages(totalPages);
        setTotalPosts(totalCount);
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
                console.log("댓글 응답 데이터 확인:", res);
                setComments(Array.isArray(res.data) ? [...res.data] : (res.data.comments || []));
            })
            .catch((err) => {
                console.error("댓글 로딩 실패", err);
                toast.error("댓글을 불러오지 못했습니다.");
            });
    };

    const handlePostClick = (post) => {
        const accessToken = sessionStorage.getItem("accessToken");
        
        axios.get(`${apiURL}/api/challenge/${post.challengeNo}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(res => {
            setSelectedPost(res.data);
            loadComments(post.challengeNo);
        
            // 게시글 클릭 → 상세 조회 → 전체 목록 다시 가져와서 조회수 반영
            axios.get(`${apiURL}/api/challenge?page=${currentPage}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            }).then((res2) => {
                const { challenges, totalPages, totalCount } = res2.data;
                setPosts(challenges);
                setTotalPages(totalPages);
                setTotalPosts(totalCount);
            });
        })
        .catch(err => {
            console.error("게시글 상세 조회 실패", err);
            toast.error("게시글을 불러오지 못했습니다.");
        });
    };


    const handleCommentDelete = (commentNo) => {
        toast.promise(
            axios
            .delete(`${apiURL}/api/challenge/comment/${commentNo}`, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
              },
            })
            .then(() => {
              loadComments(selectedPost.challengeNo);
            }),
            {
                pending: "댓글 삭제 중...",
                success: "댓글이 삭제되었습니다.",
                error: "댓글 삭제 실패",
            }
        );
    };

    
    const handleCommentEdit = (commentNo, newContent, newImage) => {
        const comment = comments.find((c) => c.commentNo === commentNo);
        if (!comment) return;
        
        const formData = new FormData();
        formData.append("commentContent", newContent);
        formData.append("refBoardNo", selectedPost.challengeNo);
        
        // 새 이미지가 없다면 기존 이미지 URL을 다시 넘김
        if (newImage) {
            formData.append("file", newImage);
        } else if (comment.commentFileUrl) {
            formData.append("commentFileUrl", comment.commentFileUrl);
        }
        
        return toast.promise(
            axios.put(`${apiURL}/api/challenge/comment/${commentNo}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                },
            }).then(() => {
                return loadComments(selectedPost.challengeNo);
            }),
            {
                pending: "댓글 수정 중...",
                success: "댓글이 수정되었습니다.",
                error: "댓글 수정 실패",
            }
        );
    };
    
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const hh = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");

        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    };

    return (
        <div className="challenge-board">
            <h2>챌린지방</h2>
            <br />
            <table className="challenge-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, idx) => (
                        <tr
                            key={post.challengeNo}
                            onClick={() => handlePostClick(post)}
                            className={selectedPost?.challengeNo === post.challengeNo ? "selected-post" : ""}
                        >
                            <td>{post.displayNo}</td>
                            {/* post.status 'N'이면 종료된 상태 */}
                            <td className={`title ${post.status === "N" ? "completed-title" : ""}`}>
                                {selectedPost?.challengeNo === post.challengeNo && <span className="eye-icon">👁️ </span>}
                                {post.challengeTitle}
                            </td>
                            <td>{post.challengeAuthor}</td>
                            <td>{new Date(post.challengeDate).toISOString().slice(0, 10)}</td>
                            <td>{post.challengeViews}</td>
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
            <div className="challenge-header">
              <h2 className={selectedPost.completed ? "completed-title" : ""}>
                {selectedPost.challengeTitle}
              </h2>

              {isAdmin && selectedPost.status === "Y" && (
                <CompleteChallenge
                  challengeNo={selectedPost.challengeNo}
                  onCompleted={() => {
                    toast.success("게시글이 종료되었습니다.");
                    setSelectedPost(null);
                    setCurrentPage(1); // 목록 새로고침 원할 때
                  }}
                />
              )}
              <div className="post-meta">
                    <div>작성일 : {formatDateTime(selectedPost.challengeDate)}</div>
                    <div>작성자 : <strong>{selectedPost.challengeAuthor}</strong></div>
                    <div>조회수 : {selectedPost.challengeViews}</div>
              </div>
            </div>
          
            {selectedPost.challengeFileUrl ? (
            <img src={selectedPost.challengeFileUrl} alt="첨부 이미지" />
            ) : null}
            <p>{selectedPost.challengeContent}</p>
          
            {isLoggedIn && selectedPost.status !== "N" ? (
              <AddChallengeComment
                key={selectedPost.challengeNo}
                postId={selectedPost.challengeNo}
                onCommentAdded={() => loadComments(selectedPost.challengeNo)}
              />
            ) : (
                <p className="login-required">
                    {selectedPost.status === "N" ? (
                        <>
                            🚫 종료된 게시글은 댓글 작성이 불가합니다.
                        </>
                    ) : (
                        <>
                            🚫 댓글 작성은 로그인 후 가능합니다.
                        </>
                    )}
                </p>
            )}

            <CommentList
              comments={Array.isArray(comments) ? comments : []}
              onDelete={(id) => handleCommentDelete(id)}
              onEdit={(id, text, image) => handleCommentEdit(id, text, image)}
              showAuthor
            />
          </div>
        )}
        </div>
    );
};

export default FindChallenge;