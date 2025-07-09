import axios from "axios";
import { toast } from "react-toastify";
import "./CompleteChallenge.css";
import { useState } from "react";

const apiURL = URL_CONFIG.API_URL;

const CompleteChallenge = ({ challengeNo, onCompleted }) => {
    const [loading, setLoading] = useState(false);

    const handleComplete = () => {
        if (loading) return;
        if (!window.confirm("이 챌린지를 종료하시겠습니까?")) return;

        setLoading(true);

        axios
            .post(`${apiURL}/api/challenge/${challengeNo}/complete`, null, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                },
            })
            .then(() => {
                toast.success("챌린지를 성공적으로 종료했습니다.");
                onCompleted?.();
            })
            .catch((err) => {
                console.error("챌린지 종료 실패", err);
                toast.error("챌린지 종료에 실패했습니다.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <button className="complete-btn" onClick={handleComplete} disabled={loading}>
            {loading ? "종료중..." : "종료"}
        </button>
    );
};

export default CompleteChallenge;