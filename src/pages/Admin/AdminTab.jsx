import "./AdminTab.css";

const AdminTab = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="tab-buttons">
            {tabs.map((label) => (
                <button
                    key={label}
                    className={activeTab === label ? 'tab active' : 'tab'}
                    onClick={() => onTabChange(label)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default AdminTab;