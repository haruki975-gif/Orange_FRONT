import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ModalForm from "../../../components/UI/ModalForm";

const apiURL = URL_CONFIG.API_URL;

const SetChallenge = ({ isModalOpen, setIsModalOpen }) => {
    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
            return;
        }

        axios.post(`${apiURL}/api/admin/challenge`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then(res => {
                console.log("챌린지 생성 API 호출 성공:", res.data);
            })
            .catch(err => {
                console.error("챌린지 생성 API 호출 실패", err);
            });
    }, []);


    const handleSubmit = (data) => {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
            return;
        }

        const formData = new FormData();
        formData.append("challengeTitle", data.title);
        formData.append("challengeContent", data.content);
        if (data.file) {
            formData.append("file", data.file);
        }

        toast.promise(
        axios.post(`${apiURL}/api/admin/challenge`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log("챌린지 등록 성공:", res.data);
        })
        .catch((err) => {
            console.error("챌린지 등록 실패:", err);
            throw err;
        }),
        {
            pending: "챌린지 등록 중...",
            success: "등록 성공!",
            error: "등록 실패. 다시 시도하세요.",
        });
    };

    return (
        <ModalForm
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            title="챌린지 생성"
            submitText="생성"
            fields={[
                { name: "title", label: "제목", type: "text", placeholder: "50자 이내로 입력하세요" },
                { name: "content", label: "내용", type: "textarea", placeholder: "300자 이내로 입력하세요" },
            ]}
            onSubmit={handleSubmit}
        />
    );
};

export default SetChallenge;