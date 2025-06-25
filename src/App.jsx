import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './reset.css'
import Header from './includes/header/Header'
import Side from './includes/side/Side'
import TeamComponent from './pages/team/TeamComponent'
import TeamRoom from './pages/team-room/TeamRoom'
import ChatRoom from './pages/team-room/components/chat-room/ChatRoom'
import WorkRoom from './pages/team-room/components/work-room/WorkRoom'

// 대시보드, 캘린더
import Calender from './components/calendar/Calendar'
import DashBoard from './components/dashBoard/DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main id='main'>
<<<<<<< HEAD
      <Header />
      <Side />
      {/*       <div id='display'>
 */}        <Routes>
        <Route path='/' element={<h1>메인</h1>}></Route>
        <Route path='/' element={<h1 style={{ margin: "400px" }}>메인페이지</h1>}></Route>
        <Route path='/find-team' element={<TeamComponent />} />
        <Route path='/team-room' element={<TeamRoom />}></Route>

        <Route path='/calendar' element={<Calender />} />
        <Route path='/dashboard' element={<DashBoard />} />
=======
      <Header/>
      <Side/>
      <Routes>
        <Route path='/' element={<h1 style={{margin : "400px"}}>메인페이지</h1>}></Route>
        <Route path='/find-team' element={<TeamComponent/>}/>
        <Route path='/team-room' element={<TeamRoom/>}>
          <Route index element={<Navigate to="chat-room" replace />} />
          <Route path='chat-room' element={<ChatRoom/>}/>
          <Route path='work-room' element={<WorkRoom/>}/>
        </Route>
>>>>>>> 7bcb7848162dfd91271796fa8d66e8dcc8e62183
      </Routes>
      {/* </div> */}
    </main>
  )
}

export default App
