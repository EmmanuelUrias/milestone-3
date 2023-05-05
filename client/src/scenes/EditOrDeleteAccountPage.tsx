import { Box, Button, FormLabel, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setLogin, setLogout } from '../ducks/userSlice'
import { useNavigate } from 'react-router-dom'

function EditOrDeleteAccountPage() {
  const [user_name, setUser_name] = useState('')
  const [budget, setBudget] = useState(0)
  const userJson = useSelector((state: RootState) => state.userAuthAndInfo.user)
  const user = JSON.parse(userJson as unknown as string)
  const token = useSelector((state: RootState) => state.userAuthAndInfo.token)
  const expenses = useSelector((state: RootState) => state.userAuthAndInfo.expenses)
  const dispatch = useDispatch()
  const smallScreen = useMediaQuery('(min-width: 800px)')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const updateUser = async (event: any) => {
    event.preventDefault()
    const newUser = {
      user_id: user.user_id,
      user_name: user_name,
      password: user.password,
      email: user.email,
      budget: budget,
      time_stamp: user.time_stamp
    }

    const newUserRes = await fetch(`http://localhost:3005/${user.user_id}`, {
      method: 'PUT',
      headers: {
        Authorization: `The chosen one ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    
    const getUpdatedUser = await fetch(`http://budgetbuddy-env.eba-hjjiskth.us-east-1.elasticbeanstalk.com/user/${user.user_id}`, {
      method: 'GET',
      headers: {
        Authorization: `The chosen one ${token}`
      }
    })
    const updatedUser = await getUpdatedUser.json()

    if (newUserRes.ok){
      dispatch(setLogin({
        user: updatedUser,
        token: token,
        expenses: expenses,
        expense: null
      }))
      localStorage.removeItem('isUser')
      localStorage.setItem('isUser', JSON.stringify(updatedUser))
    } else {
      setMessage('Oops something went wrong')
    }

    navigate('/home')
  }  

  const deleteUser = async () => {
    const deletedUser = await fetch(`http://budgetbuddy-env.eba-hjjiskth.us-east-1.elasticbeanstalk.com/user/${user.user_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `The chosen one ${token}`
      }
    })
    
    dispatch(setLogout())
    
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('isUser')

    window.location.reload()
  }

  return (
    <Box>
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
          <Typography variant='h3' sx={{color: '#3059BE', fontWeight: '600'}}>Update</Typography>
          {message}
          <form onSubmit={updateUser}>
              <FormLabel sx={{color: '#3059BE', fontWeight: '600'}}>Username</FormLabel>
              <TextField id='user_name' onChange={(event) => setUser_name(event.target.value)} type='string' value={user_name} required/>
              <FormLabel sx={{color: '#3059BE', fontWeight: '600'}}>Budget</FormLabel>
              <TextField id='budget' onChange={(event) => setBudget(parseInt(event.target.value))} type='number' value={budget} required/>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant='contained' type='submit' sx={{fontSize: '1rem', fontWeight: '600', marginRight: '5px'}}>Update</Button>
                <Button variant='contained' onClick={() => deleteUser()} sx={{fontSize: '1rem', fontWeight: '600', backgroundColor: 'red'}}>Delete</Button>
              </Box>
          </form>
        </Box>
    </Box>
  )
}

export default EditOrDeleteAccountPage