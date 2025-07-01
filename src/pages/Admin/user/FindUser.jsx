import "../AdminTab.css";
import "./Style_User.css";
import Pagination from "../../../components/UI/Pagination";
import { useState } from "react";

const FindUser = () => {
    const dummyData = [
        {
          id: "nin****",
          name: "김*남",
          phone: "010-****-5844",
          email: "bab***@naver.com",
          address: "경기도 성남시 **구 정자***\n**동 **아파트",
          date: "2025/06/19",
          status: "활동중",
        },
        {
          id: "cho****",
          name: "최*서",
          phone: "010-****-5844",
          email: "cho***@naver.com",
          address: "경기도 성남시 **구 정자***\n**동 **아파트",
          date: "2025/06/18",
          status: "활동중",
        },
        {
          id: "lee****",
          name: "이*빈",
          phone: "010-****-5844",
          email: "bin***@naver.com",
          address: "경기도 성남시 **구 정자***\n**동 **아파트",
          date: "2025/06/16",
          status: "활동중",
        },
        {
          id: "kim****",
          name: "김*수",
          phone: "010-****-5844",
          email: "soo***@naver.com",
          address: "경기도 성남시 **구 정자***\n**동 **아파트",
          date: "2025/06/14",
          status: "활동중",
        },
        {
          id: "yo****",
          name: "김*윤",
          phone: "010-****-5844",
          email: "dsf***@naver.com",
          address: "경기도 성남시 **구 정자***\n**동 **아파트",
          date: "2025/06/13",
          status: "활동중",
        },
        {
          id: "jun****",
          name: "정*리",
          phone: "010-****-5844",
          email: "dsf***@naver.com",
          address: "경기도 성남시 **구 정자***\n**동 **아파트",
          date: "2025/06/03",
          status: "활동중",
        },
    ];

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(dummyData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = dummyData.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="userList-table-wrapper">
            <table className="userList-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>연락처</th>
                        <th>E-Mail</th>
                        <th>주소</th>
                        <th>가입일</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((user, idx) => (
                        <tr key={idx}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td style={{ whiteSpace: "pre-line" }}>{user.address}</td>
                            <td>{user.date}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
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

export default FindUser;