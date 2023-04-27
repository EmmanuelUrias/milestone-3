import { Typography, Box, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IndividualExpense from '../components/IndividualExpense'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setExpenses } from '../ducks/userSlice'

const ExpenseFeed = () => {
    // fetch all expenses for that month, make controller /:month and pass the month in through a Date() variable that has the month
    // make sure the controller has the logic to differentiate between the months

    // display all expenses, pass down data to the IndividualExpense component
    //Input to add expense to the feed, make sure it updates without rerendering the page
    const [expense_name, setExpense_name] = useState('')
    const [expense_type, setExpense_type] = useState('')
    const [expense_amount, setExpense_amount] = useState(0)
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.userAuthAndInfo.user)
    const token = useSelector((state: RootState) => state.userAuthAndInfo.token)
    const expenses = useSelector((state: RootState) => state.userAuthAndInfo.expenses)
    const {user_id} = user || {}
    
    const newExpense = async (event: any) => {
      event.preventDefualt()

      const expense = {
        expense_name: expense_name,
        expense_type: expense_type,
        expense_amount: expense_amount,
        user_id: user_id
      }

      const newExpense = await fetch(`http://localhost:3005/expense/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
      })
    }

    const getExpenses = async () => {
      const allExpenses = await fetch(`http://localhost:3005/expense/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const expenses = await allExpenses.json()
      console.log(expenses)

      if(expenses) {
        dispatch(setExpenses({
          expenses: expenses,
          user: user,
          token: token
        }))
      }
    }

    useEffect(() => {
      // getExpenses()
    }, [])

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
      <Box sx={{
        height: '300px',
        overflowY: 'scroll'
      }}>
        {expenses.map(({expense_name, expense_amount}) => (
          <IndividualExpense 
            name={expense_name}
            amount={expense_amount}
          />
        ))}
      </Box>
        <Box>
          <form onSubmit={newExpense}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column'
              }}>
            <Typography variant='h6'>Add Expense</Typography>
              <Input onChange={(event) => setExpense_name(event.target.value)} value={expense_name} type='string' placeholder='Expense Name' required/>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Input sx={{width: '50%'}} onChange={(event) => setExpense_amount(parseInt(event.target.value))} value={expense_amount.toString()} type='number' placeholder='Expense Amount' required/>
              <Input onChange={(event) => setExpense_type(event.target.value)} value={expense_type} type='string' placeholder='Expense Type'/>
            </Box>
            </Box>
              <button type='submit'>Add Expense</button>
          </form>
        </Box>
    </Box>
  )
}

export default ExpenseFeed