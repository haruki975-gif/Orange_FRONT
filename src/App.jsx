import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./reset.css";
import Header from "./includes/header/Header";
import Side from "./includes/side/Side";
import TeamComponent from "./pages/team/TeamComponent";
import TeamRoom from "./pages/team-room/TeamRoom";
import Signup from "./components/Member/Signup/Signup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main id="main">
      <Header />
      <Side />
      <Routes>
        <Route path="/" element={<h1>메인</h1>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/"
          element={<h1 style={{ margin: "400px" }}>메인페이지</h1>}
        ></Route>
        <Route path="/find-team" element={<TeamComponent />} />
        <Route path="/team-room" element={<TeamRoom />}></Route>
      </Routes>
    </main>
  );
}

export default App;
