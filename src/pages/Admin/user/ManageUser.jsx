import "../AdminTab.css";
import "./Style_User.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../components/context/GlobalContext";
import Toggle from "../../../components/UI/Toggle";
import Pagination from "../../../components/UI/Pagination";

const ManageUser = () => {
    const apiURL = URL_CONFIG.API_URL;
    const { auth, errorAlert } = useContext(GlobalContext);
    const [members, setMembers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        const pad = (n) => n.toString().padStart(2, '0');
        
        return (
            d.getFullYear().toString().slice(2) + "/" +
            pad(d.getMonth() + 1) + "/" +
            pad(d.getDate()) + " " +
            pad(d.getHours()) + ":" +
            pad(d.getMinutes()) + ":" +
            pad(d.getSeconds())
        );
    };

    useEffect(() => {
        if (!auth?.accessToken) return;

        axios.get(`${apiURL}/api/admin/members?page=${currentPage}&size=${itemsPerPage}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        })
        .then((res) => {
            setMembers(res.data.members);
            setTotalCount(res.data.total);
            console.log("회원 목록 조회 성공:", res.data);
        })
        .catch((err) => {
            console.error("회원 목록 조회 실패:", err);
            errorAlert("회원 목록을 불러오지 못했습니다.");
        });
    }, [auth?.accessToken, currentPage]);

    const handleToggle = (userId, currentStatus) => {
        const newStatus = currentStatus === "Y" ? "N" : "Y";

        setMembers((prev) =>
            prev.map((member) =>
                member.userId === userId
                    ? { ...member, userStatus: newStatus }
                    : member
            )
        );

        axios.put(`${apiURL}/api/admin/members/${userId}/status`, 
        { userStatus: newStatus },
        {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        })
        .catch((err) => {
            console.error("상태 변경 실패:", err);
            errorAlert("회원 상태 변경에 실패했습니다.");

            setMembers((prev) =>
                prev.map((member) =>
                    member.userId === userId
                        ? { ...member, userStatus: currentStatus }
                        : member
                )
            );
        });
    };

    return (
        <div className="userManage-table-wrapper">
            <table className="userManage-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>연락처</th>
                        <th>E-Mail</th>
                        <th>가입일</th>
                        <th>상태</th>
                        <th>활동 / 정지</th>
                    </tr>
                </thead>

                <tbody>
                    {members.length === 0 ? (
                        <tr><td colSpan="7">회원이 없습니다.</td></tr>
                    ) : (
                        members.map((user, idx) => (
                            <tr key={user.userId || idx}>
                                <td>{user.userId}</td>
                                <td>{user.userName}</td>
                                <td>{user.userPhone}</td>
                                <td>{user.userEmail}</td>
                                <td>{formatDate(user.joinDate)}</td>
                                <td>{user.userStatus === "Y" ? "활동중" : "정지"}</td>
                                <td>
                                    <Toggle
                                        checked={String(user.userStatus).toUpperCase() === "Y"}
                                        onChange={() =>
                                            handleToggle(user.userId, user.userStatus)
                                        }
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default ManageUser;