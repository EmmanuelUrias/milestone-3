import { Typography, Box } from '@mui/material'
import React from 'react'
import IndividualExpense from '../components/IndividualExpense'

const ExpenseFeed = () => {
    // fetch all expenses for that month, make controller /:month and pass the month in through a Date() variable that has the month
    // make sure the controller has the logic to differentiate between the months

    // display all expenses, pass down data to the IndividualExpense component
    //Input to add expense to the feed, make sure it updates without rerendering the page
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ]
    
    const date = new Date()
    const monthName = monthNames[date.getMonth()]

    const expenses = [
      {
        name: 'hello',
        amount: 100
      },
      {
        name: 'world',
        amount: 50
      }
    ]

    let total: number | undefined = 0

    for (let i = 0; i < expenses.length; i++) {
      total += expenses[i].amount
    }
    
    console.log(monthName)

  return (
    <Box sx={{
      width: '40%',
      backgroundColor: '#3059BE',
      borderRadius: '15px'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant='h5'>
            Expenses
        </Typography>
      </Box>
      <Box>
        {expenses.map(({name, amount}) => (
          <IndividualExpense 
            name={name}
            amount={amount}
          />
        ))}
        {total}
      </Box>
    </Box>
  )
}

export default ExpenseFeed