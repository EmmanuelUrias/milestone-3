import React from 'react'
import { Box, Typography } from '@mui/material'

const Goal = () => {
    // Displays the Goal amount and whether or not we are on track
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
    <Box>
      <Typography>{goalAmount}</Typography>
      {onTrack ? 'On track 😁👍' : '😬'} 
    </Box>
  )
}

export default Goal