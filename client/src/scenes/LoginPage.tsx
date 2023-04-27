import { Box, Typography, FormLabel, Input, FormControl, InputLabel } from '@mui/material'
import React, { useState } from 'react'

const LoginPage = () => {
  const [isToRegister, setIsToRegister] = useState(true)
  const [message, setMessage] = useState('')
  const [values, setValues] = useState({
    user_name: '',
    password: '',
    email: '',
    budget: 0
  })
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = event.target
    setValues({...values, [id]: value})
  }

  const register = async (event: any) => {
    event.preventDefault()
    const user = {
      user_name: values.user_name,
      password: values.password,
      email: values.email,
      budget: values.budget,
      time_stamp: new Date
    }

    const newUserRes = await fetch('', {
      method: 'POST',
      headers: {
        'Content_Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const newUser = await newUserRes.json()

    if(newUser) {
      setMessage('User already exists')
    }
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
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input id='user_name' onChange={handleChange} value={values.user_name} type='string' required/>
              <FormLabel>Password</FormLabel>
              <Input id='password' onChange={handleChange} value={values.password} type='string' required/>
              <FormLabel>Email</FormLabel>
              <Input id='email' onChange={handleChange} value={values.email} type='string' required/>
              <FormLabel>Budget</FormLabel>
              <Input id='budget' onChange={handleChange} value={values.budget} type='number' required/>
            </FormControl>
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