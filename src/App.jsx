import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './reset.css'
import Header from './includes/header/Header'
import Side from './includes/side/Side'
import TeamComponent from './pages/team/TeamComponent'
import TeamRoom from './pages/team-room/TeamRoom'
import ChatRoom from './pages/team-room/components/chat-room/ChatRoom'
import WorkRoom from './pages/team-room/components/work-room/WorkRoom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main id='main'>
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
      </Routes>
    </main>
  )
}

export default App
