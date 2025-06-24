import "./TabNav.css";
import { useNavigate, useLocation } from "react-router-dom";

function TabNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const current = location.pathname;

    return (
        <div className="tab-nav">
            <button
                className={`tab-btn ${current === "/calendar" ? "active" : ""}`}
                onClick={() => navigate("/calendar")}
            >
                📅 캘린더
            </button>
            <button
                className={`tab-btn ${current === "/dashboard" ? "active" : ""}`}
                onClick={() => navigate("/dashboard")}
            >
                📊 대시보드
            </button>
        </div>
    );
}

export default TabNav;
