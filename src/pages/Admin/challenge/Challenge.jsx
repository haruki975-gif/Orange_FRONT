import "../AdminTab.css";
import { useEffect, useState } from "react";
import SetChallenge from "./SetChallenge";

const Challenge = () => {
    const [subTab, setSubTab] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const ChallengeTab = ({ tabs, activeTab, onTabChange }) => {
        return (
            <div className="challenge-tabs">
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

    const handleTabChange = (tab) => {
        setSubTab(tab);

        if (tab === "생성") {
            setIsModalOpen(true);
        }
    };

    useEffect(() => {
        if (subTab !== "생성") {
            setIsModalOpen(false);
        }
    }, [subTab]);

    return (
        <>
            <ChallengeTab
                tabs={["생성"]}
                activeTab={subTab}
                onTabChange={handleTabChange}
            />
            <div className="sub-tab-content">
                {subTab === "생성" && (
                    <SetChallenge
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
            </div>
        </>
    );
};

export default Challenge;