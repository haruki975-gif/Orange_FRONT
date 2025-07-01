import { useState } from "react";
import FindUser from "./FindUser";
import ManageUser from "./ManageUser";

const User = () => {
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