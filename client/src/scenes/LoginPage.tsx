import { Box, Typography, FormLabel, Input } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from '../ducks/userSlice'

const LoginPage = () => {
  const [isToRegister, setIsToRegister] = useState(true)
  const [message, setMessage] = useState('')
  const [user_name, setUser_name] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [budget, setBudget] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const register = async (event: any) => {
    event.preventDefault()
    const user = {
      user_name: user_name,
      password: password,
      email: email,
      budget: budget
    }

    const newUserRes = await fetch('http://localhost:3005/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    setIsToRegister(false)
  }

  const logIn = async (event: any) => {
    event.preventDefault()

    const user = {
      email: email,
      password: password
    }

    const logInUser = await fetch('http://localhost:3005/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const loggedInUser = await logInUser.json()

    if(loggedInUser) {
      dispatch(setLogin({
        user: loggedInUser.isUser,
        token: loggedInUser.jwtToken,
        expenses: []
      }))
    }

    localStorage.setItem('jwtToken', loggedInUser.jwtToken)
    localStorage.setItem('isUser', JSON.stringify(loggedInUser.isUser))

    navigate('/home')
  }

  return (
    <Box>
      { isToRegister ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '& form': {
            display: 'flex',
            flexDirection: 'column'
        }
        }}>
          <Typography variant='h3'>Register</Typography>
          {message}
          <form onSubmit={register}>
              <FormLabel>Username</FormLabel>
              <Input id='user_name' onChange={(event) => setUser_name(event.target.value)} value={user_name} type='string' required/>
              <FormLabel>Password</FormLabel>
              <Input id='password' onChange={(event) => setPassword(event.target.value)} value={password} type='string' required/>
              <FormLabel>Email</FormLabel>
              <Input id='email' onChange={(event) => setEmail(event.target.value)} value={email} type='string' required/>
              <FormLabel>Budget</FormLabel>
              <Input id='budget' onChange={(event) => setBudget(parseInt(event.target.value))} value={budget.toString()} type='number' required/>
            <button type='submit'>Register</button>
          </form>
            <a onClick={() => setIsToRegister(false)}>Already have an account</a>
        </Box>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '& form': {
            display: 'flex',
            flexDirection: 'column'
        }
      }}>
        <form onSubmit={logIn}>
        <Typography variant='h3'>Log In</Typography>
          <FormLabel>Email</FormLabel>
          <Input id='email' onChange={(event) => setEmail(event.target.value)} value={email} type='string' required/>
          <FormLabel>Password</FormLabel>
          <Input id='password' onChange={(event) => setPassword(event.target.value)} value={password} type='string' required/> 
          <button type='submit'>Log In</button>
          </form>
          <a onClick={() => setIsToRegister(true)}>Don't have an account</a>
        </Box>
      ) }
    </Box>
  )
}

export default LoginPage