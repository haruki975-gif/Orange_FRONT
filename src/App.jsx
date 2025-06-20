import { useState } from 'react'
import CalenderTest from './components/calendar/DemoApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CalenderTest />
    </>
  )
}

export default App
