import { Typography, Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IndividualExpense from '../components/IndividualExpense'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { addExpense, setExpenses } from '../ducks/userSlice'

const ExpenseFeed = () => {
    const [expense_name, setExpense_name] = useState('')
    const [expense_type, setExpense_type] = useState('')
    const [expense_amount, setExpense_amount] = useState(0)
    const dispatch = useDispatch()
    const userJson = useSelector((state: RootState) => state.userAuthAndInfo.user)
    const user = JSON.parse(userJson as unknown as string)
    const token = useSelector((state: RootState) => state.userAuthAndInfo.token)
    const expenses = useSelector((state: RootState) => state.userAuthAndInfo.expenses)

    const newExpense = async (event: any) => {
      event.preventDefault()

      const expense = {
        expense_name: expense_name,
        expense_amount: expense_amount,
        expense_type: expense_type
      }

      const newExpenseRes = await fetch(`http://localhost:3005/expense/${user.user_id}`, {
        method: 'POST',
        headers: {
          Authorization: `The chosen one ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
      })

      const userExpense = await newExpenseRes.json()

      dispatch(addExpense({
        expenses: expenses,
        user: user,
        token: token,
        expense: userExpense
      }))
    }

    const getExpenses = async () => {
      const allExpenses = await fetch(`http://localhost:3005/expense/${user.user_id}`, {
        method: 'GET',
        headers: {
          Authorization: `The chosen one ${token}`
        }
      })

      const expenses = await allExpenses.json()

        dispatch(setExpenses({
          expenses: expenses,
          user: user,
          token: token,
          expense: null
        }))
      
    }

    useEffect(() => {
      getExpenses()
    }, [dispatch, expenses])

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
              <TextField id='expense_name' onChange={(event) => setExpense_name(event.target.value)} value={expense_name} type='string' placeholder='Expense Name' required/>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <TextField id='expense_amount' sx={{width: '50%'}} onChange={(event) => setExpense_amount(parseInt(event.target.value))} value={expense_amount.toString()} type='number' placeholder='Expense Amount' required/>
              <TextField id='expense_type' onChange={(event) => setExpense_type(event.target.value)} value={expense_type} type='string' placeholder='Expense Type'/>
            </Box>
            </Box>
              <button type='submit'>Add Expense</button>
          </form>
        </Box>
    </Box>
  )
}

export default ExpenseFeed