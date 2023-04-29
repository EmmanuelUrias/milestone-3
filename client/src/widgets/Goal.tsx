import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const Goal = (smallScreen: any) => {
    const [goal, setGoal] = useState({
      goal_id: 0,
      goal_amount: 0,
      user_id: 0,
      time_stamp: ''
    })
    const userJson = useSelector((state: RootState) => state.userAuthAndInfo.user)
    const user = JSON.parse(userJson as unknown as string)
    const token = useSelector((state: RootState) => state.userAuthAndInfo.token)
    const budget = user.budget
    const expenses = useSelector((state: RootState) => state.userAuthAndInfo.expenses)

    const getGoal = async () => {
      const goalRes = await fetch(`http://localhost:3005/goal/${user.user_id}`, {
        method: 'GET',
        headers: {
          Authorization: `The chosen one ${token}`
        }
      })
      const goal = await goalRes.json()

      setGoal(goal)
    }

    let totalExpenses = 0

    for (let i = 0; i < expenses.length; i++){
      totalExpenses += expenses[i].expense_amount
    }  
    let goalAmount = goal.goal_amount
    let onTrack
    if (budget - goalAmount >= totalExpenses) {
      onTrack = true
    } else {
      onTrack = false
    }

  useEffect(() => {
    getGoal()
  }, [])
    
  return (
    <Box sx={{
      backgroundColor: '#A9AABC',
       borderRadius: '15px',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       padding: '1rem',
       width: '80%',
       marginTop: '0.7rem',
       opacity: '0.9'
    }}>
      <Typography sx={{color: '#3059BE', fontWeight: '800', fontSize: '1.2rem'}}>This Months Goal</Typography>
      <Typography sx={{fontWeight: '600', fontSize: '1.1rem'}}>${goal.goal_amount}</Typography>
      <Typography sx={{color: '#3059BE', fontWeight: '800', fontSize: '1.2rem', marginTop: '0.5rem'}}>{onTrack ? 'On track 😁👍' : '😬'} </Typography>
    </Box>
  )
}

export default Goal