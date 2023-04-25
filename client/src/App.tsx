import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setLogout } from './ducks/userSlice'
import { RootState } from './store'
import HomePage from './scenes/HomePage'
import './App.css'

function App() {
  const user = useSelector((state: RootState) => state.userAuthAndInfo.user)
  const dispatch = useDispatch()

  const { user_name, password } = user
  console.log(user)

  return (
    <div className='App'>
        <Navbar /> 
      <div>
        <HomePage />
      </div>
    </div>
  )
}

export default App
