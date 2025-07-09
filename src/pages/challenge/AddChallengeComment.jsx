import axios from "axios";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";
import { useContext, useState } from "react";
import { GlobalContext } from "../../components/context/GlobalContext";

const apiURL = URL_CONFIG.API_URL;


const AddChallengeComment = ({ postId, onCommentAdded }) => {
    const {auth, errorAlert} = useContext(GlobalContext);
    const [image, setImage] = useState(null);

    const handleCommentSubmit = ({ content, image }) => {
        const formData = new FormData();
        formData.append("refBoardNo", postId);
        formData.append("commentContent", content);
        if (image) formData.append("file", image);
        

        if(!auth?.accessToken){
            errorAlert("로그인이 필요합니다.");
            return Promise.reject();
        }
        return axios
            .post(`${apiURL}/api/challenge/comment`, formData,
            {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        ).then((response) => {
            console.log(response);
            if (onCommentAdded) onCommentAdded();
        }).catch((err) => {
            console.log(err);
            errorAlert("댓글 등록에 실패했습니다.");
        }
        );
    };

    return <CommentForm onSubmit={handleCommentSubmit} image={image} setImage={setImage}/>;
};

export default AddChallengeComment;