import { toast } from "react-toastify";
import ModalForm from "../../../components/UI/ModalForm";

const SetChallenge = ({ isModalOpen, setIsModalOpen }) => {
    const handleSubmit = (data) => {
        const fakeSubmit = () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    console.log("새 챌린지 등록:", data);
                    resolve();
                }, 1500);
            });

        toast.promise(fakeSubmit(), {
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
                { name: "title", label: "제목", type: "text", placeholder: "100자 이내로 입력하세요" },
                { name: "content", label: "내용", type: "textarea", placeholder: "1000자 이내로 입력하세요" },
            ]}
            onSubmit={handleSubmit}
        />
    );
};

export default SetChallenge;