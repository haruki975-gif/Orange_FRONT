import "../AdminTab.css";
import { useState } from "react";
import Pagination from "../../../components/UI/Pagination";

const ManageLog = () => {
    /* 더미데이터 */
    const dummyData = [
        {
          id: "nin****",
          name: "김*남",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-06-19 15:16:44",
          dt: "2025-06-20 18:25:32",
        },
        {
          id: "nin****",
          name: "김*남",
          ip: "192.168.***.***",
          event_value: "Login : sca",
          prev_dt: "NULL",
          dt: "2025-06-19 15:16:44",
        },
        {
          id: "bin****",
          name: "이*빈",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-06-14 05:22:13",
          dt: "2025-06-16 21:35:02",
        },
        {
          id: "kim****",
          name: "김*수",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-06-11 12:12:31",
          dt: "2025-06-15 18:15:32",
        },
        {
          id: "bin****",
          name: "이*빈",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "NULL",
          dt: "2025-06-14 05:22:13",
        },
        {
          id: "kim****",
          name: "김*수",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-06-11 08:16:23",
          dt: "2025-06-11 12:12:31",
        },
        {
          id: "cho****",
          name: "최*서",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-05-29 22:25:34",
          dt: "2025-06-03 18:25:32",
        },
        {
          id: "kim****",
          name: "김*수",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-06-11 08:16:23",
          dt: "2025-06-11 12:12:31",
        },
        {
          id: "kim****",
          name: "김*수",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-06-11 08:16:23",
          dt: "2025-06-11 12:12:31",
        },
        {
          id: "kim****",
          name: "김*수",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-06-11 08:16:23",
          dt: "2025-06-11 12:12:31",
        },
        {
          id: "kim****",
          name: "김*수",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-06-11 08:16:23",
          dt: "2025-06-11 12:12:31",
        },
        {
          id: "kim****",
          name: "김*수",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-06-11 08:16:23",
          dt: "2025-06-11 12:12:31",
        },
        {
          id: "kim****",
          name: "김*수",
          ip: "192.168.***.***",
          event_value: "My Page",
          prev_dt: "2025-06-11 08:16:23",
          dt: "2025-06-11 12:12:31",
        },
    ];

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(dummyData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = dummyData.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className="logList-table-wrapper">
            <table className="logList-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>IP</th>
                        <th>Event_Value</th>
                        <th>Prev_DT</th>
                        <th>DT</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((user, idx) => (
                        <tr key={idx}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.ip}</td>
                            <td>{user.event_value}</td>
                            <td>{user.prev_dt}</td>
                            <td>{user.dt}</td>
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

export default ManageLog;