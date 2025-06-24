import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './reset.css'
import Header from './includes/header/Header'
import Side from './includes/side/Side'

// 대시보드, 캘린더
import Calender from './components/calendar/Calendar'
import DashBoard from './components/dashBoard/DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main id='main'>
      <Header />
      <Side />
      <Routes>
        <Route path='/' element={<h1>메인</h1>}></Route>
        <Route path='/calendar' element={<Calender />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </main>
  )
}

export default App
