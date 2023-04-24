import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setLogout } from './ducks/userSlice'
import { RootState } from './store'

function App() {
  const user = useSelector((state: RootState) => state.userAuthAndInfo.user)
  const dispatch = useDispatch()

  const { user_name, password } = user
  console.log(user)

  return (
    <div className="App">
        <Navbar /> 
      <div className="card">
        {/* Homepage */}
        {user_name}
      </div>
    </div>
  )
}

export default App
