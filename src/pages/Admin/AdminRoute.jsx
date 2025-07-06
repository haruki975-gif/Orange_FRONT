import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

    const navigate = useNavigate();
    const role = sessionStorage.getItem("userRole");
    if (role === "ROLE_ADMIN") {
      return children; // ✅ 관리자라면 페이지 표시
    } else {
      alert("관리자만 접근 가능한 페이지입니다.");
      return <navigate to="/" />; // ✅ 일반 유저는 메인으로 보냄
    }
};

export default AdminRoute;