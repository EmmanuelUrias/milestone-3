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

function App() {
  const user = useSelector((state: RootState) => state.userAuthAndInfo.user)
  const dispatch = useDispatch()
  const isLoggedIn = Boolean(useSelector((state: RootState) => state.userAuthAndInfo.token))

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
        </Routes>
      </Box>
    </div>
  )
}

export default App
