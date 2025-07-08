import "../AdminTab.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../../components/context/GlobalContext";
import Pagination from "../../../components/UI/Pagination";

const ManageLog = () => {
    const apiUrl = URL_CONFIG.API_URL;
    const [logs, setLogs] = useState([]);
    const { auth, errorAlert } = useContext(GlobalContext);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const yy = String(date.getFullYear()).slice(2);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${yy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
    };

    useEffect(() => {
        if (!auth?.accessToken) return;

        axios.get(`${apiUrl}/api/admin/log?page=${currentPage}&size=${itemsPerPage}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        })
        .then((response) => {
            setLogs(response.data.logs);
            setTotalCount(response.data.total);
            setTotalPages(Math.ceil(response.data.total / itemsPerPage));
        })
        .catch((error) => {
            console.error("로그 목록 조회 실패:", error);
            errorAlert("로그 목록을 불러오지 못했습니다.");
        });
    }, [auth?.accessToken, currentPage]);

    return (
        <div className="logList-table-wrapper">
            <h2>로그 목록</h2>
            <table className="logList-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>ID</th>
                        <th>이름</th>
                        <th>Event_Value</th>
                        <th>DT</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.length === 0 ? (
                        <tr><td colSpan="5">로그가 없습니다.</td></tr>
                    ) : (
                        [...logs]
                        .reverse() // 최신 로그가 위에 오도록 역순 정렬
                        .map((log, index) => (
                            <tr key={log.logNo}>
                                <td>{totalCount - (startIdx + index)}</td>
                                <td>{log.logUserId}</td>
                                <td>{log.logUserName}</td>
                                <td>{log.logValue}</td>
                                <td>{formatDate(log.logDate)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default ManageLog;