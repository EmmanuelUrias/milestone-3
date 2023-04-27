import { Box, Typography, FormLabel, Input, FormControl, InputLabel } from '@mui/material'
import React, { useState } from 'react'

const LoginPage = () => {
  const [isToRegister, setIsToRegister] = useState(true)
  const [message, setMessage] = useState('')
  const [user_name, setUser_name] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [budget, setBudget] = useState(0)

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

    const newUser = await newUserRes.json()

    if(newUser) {
      setMessage('User already exists')
    }
    console.log(newUserRes)
  }

  const logIn = async (event: any) => {

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
          <form onSubmit={register}>
              <FormLabel>Username</FormLabel>
              <Input id='user_name' onChange={(e) => setUser_name(e.target.value)} value={user_name} type='string' required/>
              <FormLabel>Password</FormLabel>
              <Input id='password' onChange={(e) => setPassword(e.target.value)} value={password} type='string' required/>
              <FormLabel>Email</FormLabel>
              <Input id='email' onChange={(e) => setEmail(e.target.value)} value={email} type='string' required/>
              <FormLabel>Budget</FormLabel>
              <Input id='budget' onChange={(e) => setBudget(parseInt(e.target.value))} value={budget.toString()} type='number' required/>
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
          <FormControl>
            <Input />
            <Input />
          </FormControl>
        </form>
          <a onClick={() => setIsToRegister(true)}>Don't have an account</a>
        </Box>
      ) }
    </Box>
  )
}

export default LoginPage