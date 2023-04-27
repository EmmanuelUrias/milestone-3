import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setLogout } from './ducks/userSlice'
import { RootState } from './store'
import HomePage from './scenes/HomePage'
import './App.css'
import { Box } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './scenes/LoginPage'
import FinancialTipsPage from './scenes/FinancialTipsPage'
import { User } from './ducks/userSlice'
import EditOrDeleteAccountPage from './scenes/EditOrDeleteAccountPage'

function App() {
  const user = useSelector((state: RootState) => state.userAuthAndInfo.user)
  const dispatch = useDispatch()
  const isLoggedIn = Boolean(useSelector((state: RootState) => state.userAuthAndInfo.token))

  const userToken = localStorage.getItem('jwtToken')
  const userCookies = localStorage.getItem('isUser')
  console.log(JSON.stringify(userCookies))

  if (userToken && userCookies) {
    dispatch(setLogin({
      user: userCookies as unknown as User,
      token: userToken,
      expenses: []
    }))
  }

  if (user) {
    const { user_name, password } = user
  }
  console.log(user)

  return (
    <div className='App'>
        {isLoggedIn && <Navbar /> }
      <Box sx={isLoggedIn ? { width: '90%' } : { width: '100%' }}>
        <Routes>
          <Route path='/' element={!isLoggedIn ? <LoginPage /> : <Navigate to='/home' />} />
          <Route path='/home' element={isLoggedIn ? <HomePage /> : <Navigate to='/'/> }/>
          <Route path='/tips' element={isLoggedIn ? <FinancialTipsPage /> : <Navigate to='/'/>}/>
          <Route path='/account' element={isLoggedIn ? <EditOrDeleteAccountPage /> : <Navigate to='/'/>}/>
        </Routes>
      </Box>
    </div>
  )
}

export default App
