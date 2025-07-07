import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../components/context/GlobalContext";
import FindUser from "./FindUser";
import ManageUser from "./ManageUser";

const User = () => {
    const apiUrl = URL_CONFIG.API_URL;
        const [authenticated, setAuthenticated] = useState(false);
        const [password, setPassword] = useState("");
        const [loading, setLoading] = useState(false);
        const { auth, errorAlert } = useContext(GlobalContext);
    
        const handleAuth = () => {
            if (!password) return;
    
            setLoading(true);
    
            axios.post(`${apiUrl}/api/admin/verify-password`, 
                { password }, 
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            )
            .then(res => {
                setAuthenticated(true);
                console.log(res.data);
            })
            .catch(err => {
                errorAlert("인증 실패");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
        };

    const [subTab, setSubTab] = useState(null);

    const UserTab = ({ tabs, activeTab, onTabChange }) => {
        return (
            <div className="user-subtabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={activeTab === tab ? "tab active" : "tab"}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        );
    };

    if (!authenticated) {
        return (
            <div class="admin-auth-wrapper">
                <p class="auth-info">※ 개인정보 보호법에 의해 한 번 더 로그인해주세요</p>
                <input
                    type="password"
                    class="auth-input"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                <p class="auth-error">비밀번호를 확인해 주세요.</p>
                <button class="auth-btn" onClick={handleAuth} disabled={loading}>
                    로그인
                </button>
            </div>
        );
    }
    
    return (
        <>
            <UserTab
                tabs={["목록", "관리"]}
                activeTab={subTab}
                onTabChange={setSubTab}
            />
            <div className="sub-tab-content">
                {subTab === "목록" && <FindUser />}
                {subTab === "관리" && <ManageUser />}
            </div>
        </>
    );
};

export default User;