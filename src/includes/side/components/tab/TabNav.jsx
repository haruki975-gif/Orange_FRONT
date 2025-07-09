import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import { useNavigate, useLocation } from 'react-router-dom';
import "./TabNav.css";

function TabNav() {
    const navi = useNavigate();
    const location = useLocation();
    const current = location.pathname;

    return (
        <div id="tab-nav">
            <div className="header">
                <div className="team-info">
                    <div className="left">
                        <img src="/img/icon/easel2-fill.png" alt="" />
                        <p className="team-name">개인 일정 관리</p>
                    </div>
                </div>

                <div className="tab-menu">
                    <div
                        className={`calendar ${current === "/calendar" ? "active" : ""}`}
                        onClick={() => navi('/calendar')}
                    >
                        <ViewAgendaIcon
                            style={{
                                width: '18px',
                                height: '18px',
                                marginRight: '8px',
                                fill: current === "/calendar" ? "#FF8C00" : "gray"
                            }}
                        />
                        <h3>캘린더</h3>
                    </div>

                    <div
                        className={`dashboard ${current === "/dashboard" ? "active" : ""}`}
                        onClick={() => navi('/dashboard')}
                    >
                        <ViewAgendaIcon
                            style={{
                                width: '18px',
                                height: '18px',
                                marginRight: '8px',
                                fill: current === "/dashboard" ? "#FF8C00" : "gray"
                            }}
                        />
                        <h3>대시보드</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabNav;
