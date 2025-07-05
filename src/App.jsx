import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./reset.css";
import Header from "./includes/header/Header";
import Side from "./includes/side/Side";
import TeamComponent from "./pages/team/TeamComponent";
import TeamRoom from "./pages/team-room/TeamRoom";
import Signup from "./components/Member/Signup/Signup";
import LoginForm from "./components/Member/Login/LoginForm";
import FindUserId from "./components/Member/Find/FindUserId";
import FindPassword from "./components/Member/Find/FindPassword";
import ChatRoom from "./pages/team-room/components/chat-room/ChatRoom";
import WorkRoom from "./pages/team-room/components/work-room/WorkRoom";
import User from "./pages/Admin/user/User";
import FindUser from "./pages/Admin/user/FindUser";
import ManageUser from "./pages/Admin/user/ManageUser";
import MypageMain from "./components/Mypage/MypageMain";
import ProfileImage from "./components/Mypage/Profile/ProfileImage";
import InfoForm from "./components/Mypage/Info/InfoForm";
import PasswordForm from "./components/Mypage/Password/PasswordForm";
import DeleteUser from "./components/Mypage/Delete/DeleteUser";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "./components/context/GlobalContext";
import Challenge from "./pages/Admin/challenge/Challenge";
import Log from "./pages/Admin/log/Log";
import ManageLog from "./pages/Admin/log/ManageLog";


// 대시보드, 캘린더
import Calender from './components/calendar/Calendar'
import DashBoard from './components/dashBoard/DashBoard'
import Main from "./pages/main/Main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <GlobalProvider>
      <main id="main">
        <Header />
        <Side />
        <Routes>
          <Route
            path="/"
            element={<Main/>}
          ></Route>
          {/* member */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/find-id" element={<FindUserId />} />
          <Route path="/find-pw" element={<FindPassword />} />
          {/* mypage */}
          <Route path="/mypage-main" element={<MypageMain />} />
          <Route path="/info-form" element={<InfoForm />} />
          <Route path="/profile-image" element={<ProfileImage />} />
          <Route path="/password-form/" element={<PasswordForm />} />
          <Route path="/delete-user" element={<DeleteUser />} />

          <Route path="/find-team" element={<TeamComponent />} />
          <Route path="/team-room/:id" element={<TeamRoom />}>
            <Route index element={<Navigate to="chat-room" replace />} />
            <Route path="chat-room" element={<ChatRoom />} />
            <Route path="work-room" element={<WorkRoom />} />
          </Route>

          {/* Admin Page */}
            <Route path="/admin/user" element={<User />} />
            <Route path="/admin/user/list" element={<FindUser />} />
            <Route path="/admin/user/manage" element={<ManageUser />} />
            <Route path="/admin/challenge" element={<Challenge />} />
            <Route path="/admin/log" element={<Log />} />
            <Route path="/admin/log/list" element={<ManageLog />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </main>
      </GlobalProvider>
  )
}

export default App;
