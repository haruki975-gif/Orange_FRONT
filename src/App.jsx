import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
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


// 대시보드, 캘린더
import Calender from './components/calendar/Calendar'
import DashBoard from './components/dashBoard/DashBoard'

function App() {
  const [count, setCount] = useState(0);

  return (
    <main id="main">
      <Header />
      <Side />
      <Routes>
        <Route
          path="/"
          element={<h1 style={{ margin: "400px" }}>메인페이지</h1>}
        ></Route>
        {/* member */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/find-id" element={<FindUserId />} />
        <Route path="/find-pw" element={<FindPassword />} />

        <Route path="/find-team" element={<TeamComponent />} />
        <Route path="/team-room" element={<TeamRoom />}>
          <Route index element={<Navigate to="chat-room" replace />} />
          <Route path="chat-room" element={<ChatRoom />} />
          <Route path="work-room" element={<WorkRoom />} />
        </Route>
        <Route path='/calendar' element={<Calender />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </main>
  );
}

export default App;
