import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const MonthlyExpenseAmount = () => {
  const userJson = useSelector((state: RootState) => state.userAuthAndInfo.user)
  const user = JSON.parse(userJson as unknown as string)
  const expenses = useSelector((state: RootState) => state.userAuthAndInfo.expenses)

  const budget = user.budget
  
  let totalExpenses = 0

  for (let i = 0; i < expenses.length; i++){
    totalExpenses += expenses[i].expense_amount
  }

  let amountLeft = budget - totalExpenses

  return (
    <Box sx={{
      backgroundColor: '#A9AABC',
      borderRadius: '15px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%'
    }}>
      <Typography sx={{color: '#3059BE', fontWeight: '800', fontSize: '1.2rem'}}>Amount Spent</Typography>
      <Typography sx={{fontWeight: '600', fontSize: '1.1rem'}}>${totalExpenses}</Typography>
      <Typography sx={{color: '#3059BE', fontWeight: '800', fontSize: '1.2rem'}}>Amount Left</Typography>
      <Typography sx={{fontWeight: '600', fontSize: '1.1rem'}}>${amountLeft}</Typography>
    </Box>
  )
}

export default MonthlyExpenseAmount