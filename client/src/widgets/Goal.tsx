import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const Goal = () => {
    // Displays the Goal amount and whether or not we are on track
    const [goal, setGoal] = useState({})
    const userJson = useSelector((state: RootState) => state.userAuthAndInfo.user)
    const user = JSON.parse(userJson as unknown as string)

    const getGoal = async () => {
      const goalRes = await fetch(`http://localhost:3005/goal/${user.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'applications/json'
        }
      })
      const goal = goalRes.json()

      setGoal(goal)
    }

  let budget = 2200
  let expenses = 2000
  let goalAmount = 200
  let onTrack
  if (budget-goalAmount >= expenses) {
    onTrack = true
  } else {
    onTrack = false
  }
    
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
      <Typography>${goalAmount}</Typography>
      {onTrack ? 'On track 😁👍' : '😬'} 
    </Box>
  )
}

export default Goal