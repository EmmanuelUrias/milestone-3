import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const Goal = () => {
    // Displays the Goal amount and whether or not we are on track
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

  let expenses = 2000
  let goalAmount = goal.goal_amount
  let onTrack
  if (budget - goalAmount >= expenses) {
    onTrack = true
  } else {
    onTrack = false
  }

  useEffect(() => {
    getGoal()
  }, [])

  console.log(goal)
    
  return (
    <Box sx={{
      backgroundColor: '#3059BE',
       borderRadius: '15px',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       padding: '1rem'
    }}>
      <Typography>This Months Goal:</Typography>
      <Typography>${goal.goal_amount}</Typography>
      {onTrack ? 'On track 😁👍' : '😬'} 
    </Box>
  )
}

export default Goal