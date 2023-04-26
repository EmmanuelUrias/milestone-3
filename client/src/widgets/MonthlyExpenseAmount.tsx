import { Box, Typography } from '@mui/material'
import React from 'react'

const MonthlyExpenseAmount = () => {
    // Displays the amount the user has spent this month and the budget and whats left, this data should come from a fetch req or a state
    let totalExpenses = '$1200'
    let remainingBudget = '$2200'
  return (
    <Box sx={{
      backgroundColor: '#3059BE',
      borderRadius: '15px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography>Amount Spent</Typography>
      <Typography>{totalExpenses}</Typography>
      <Typography>Amount Left</Typography>
      <Typography>{remainingBudget}</Typography>
    </Box>
  )
}

export default MonthlyExpenseAmount