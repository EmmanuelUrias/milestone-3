import { Box, Typography, FormLabel, TextField, Button, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setLogin } from '../ducks/userSlice'

const LoginPage = () => {
  const [isToRegister, setIsToRegister] = useState(true)
  const smallScreen = useMediaQuery('(min-width: 800px)')
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

    const newUserRes = await fetch('http://budgetbuddy-env.eba-hjjiskth.us-east-1.elasticbeanstalk.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if(newUserRes.ok) {
      setIsToRegister(false)
    } else {
      setMessage('That email is already in use')
    }
  }

  const logIn = async (event: any) => {
    event.preventDefault()

    const user = {
      email: email,
      password: password
    }
    console.log(user)

    const logInUser = await fetch('http://budgetbuddy-env.eba-hjjiskth.us-east-1.elasticbeanstalk.com/auth/login', {
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
        expenses: [],
        expense: null
      }))
    }

    localStorage.setItem('jwtToken', loggedInUser.jwtToken)
    localStorage.setItem('isUser', JSON.stringify(loggedInUser.isUser))

    navigate('/home')
  }

  return (
    <Box>
      { isToRegister ? (
        <Box sx={ smallScreen ? {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem',
          '& form': {
            display: 'flex',
            flexDirection: 'column',
            width: '40%',
          '& > *': {
            marginBottom: '1.5%'
          }
        }
        } : {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3rem',
          '& form': {
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
          '& > *': {
            marginBottom: '3.5%'
          }
        }
        }}>
          <Typography variant='h3' sx={{color: '#3059BE', fontWeight: '600'}}>Register</Typography>
          <p style={{'color': 'red'}} >{message}</p>
          <form onSubmit={register}>
              <FormLabel sx={{color: '#3059BE', fontWeight: '600'}}>Username</FormLabel>
              <TextField id='user_name' onChange={(event) => setUser_name(event.target.value)} value={user_name} type='string' required/>
              <FormLabel sx={{color: '#3059BE', fontWeight: '600'}}>Password</FormLabel>
              <TextField id='password' onChange={(event) => setPassword(event.target.value)} value={password} type='string' required/>
              <FormLabel sx={{color: '#3059BE', fontWeight: '600'}}>Email</FormLabel>
              <TextField id='email' onChange={(event) => setEmail(event.target.value)} value={email} type='string' required/>
              <FormLabel sx={{color: '#3059BE', fontWeight: '600'}}>Budget</FormLabel>
              <TextField id='budget' onChange={(event) => setBudget(parseInt(event.target.value))} value={budget.toString()} type='number' required/>
            <Button variant='contained' type='submit' sx={{fontSize: '1rem', fontWeight: '600'}}>Register</Button>
          </form>
            <Link onClick={() => setIsToRegister(false)} to={''}>Already have an account</Link>
        </Box>
      ) : (
        <Box sx={ smallScreen ? {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem',
          '& form': {
            display: 'flex',
            flexDirection: 'column',
            width: '40%',
          '& > *': {
            marginBottom: '1.5%'
          }
        }
        } : {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3rem',
          '& form': {
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
          '& > *': {
            marginBottom: '3.5%'
          }
        }
        }}>
        <Typography variant='h3'sx={{color: '#3059BE', fontWeight: '600'}}>Log In</Typography>
        <form onSubmit={logIn}>
          <FormLabel sx={{color: '#3059BE', fontWeight: '600'}}>Email</FormLabel>
          <TextField id='email' onChange={(event) => setEmail(event.target.value)} value={email} type='string' required/>
          <FormLabel sx={{color: '#3059BE', fontWeight: '600'}}>Password</FormLabel>
          <TextField id='password' onChange={(event) => setPassword(event.target.value)} value={password} type='string' required/> 
          <Button variant='contained' type='submit' sx={{fontSize: '1rem', fontWeight: '600'}}>Log In</Button>
          </form>
          <Link onClick={() => setIsToRegister(true)} to={''}>Don't have an account</Link>
        </Box>
      ) }
    </Box>
  )
}

export default LoginPage