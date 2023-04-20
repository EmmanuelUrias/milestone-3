import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
// On mobile just make it all vertical and navbar horizontal
  return (
    <div className="App">
      {/* Navbar */} {/* I want navbar to be vertical */}
      <div className="card">
        {/* ExpenseFeed */} {/* Center of the page */}
        {/* MonthlyExpenseAmount */} {/* Next to the expense feed on its right on non-mobile devices */}
        {/* Goal */} {/* On feeds right side but under MonthlyExpenseAmount */}
        {/* AddGoal */} {/* under the feed */}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
