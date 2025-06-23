import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './reset.css'
import Header from './includes/header/Header'
import Side from './includes/side/Side'
import TeamComponent from './pages/team/TeamComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main id='main'>
      <Header/>
      <Side/>
      <Routes>
        <Route path='/' element={<TeamComponent/>}></Route>
      </Routes>
    </main>
  )
}

export default App
