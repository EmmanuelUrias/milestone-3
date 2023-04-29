import { Typography, Box, TextField, InputAdornment, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IndividualExpense from '../components/IndividualExpense'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { addExpense, setExpenses } from '../ducks/userSlice'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TitleIcon from '@mui/icons-material/Title';
import SendIcon from '@mui/icons-material/Send';

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
      //event.preventDefault() // If you uncomment this it will not update the feed, if you want it to update without refreshing put dispatch, expenses, newExpense in the useEffect --> NOTE: it will make a large amount of requests a second

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
    }, [])

  return (
    <Box sx={{
      width: '40%',
      backgroundColor: '#A9AABC',
      opacity: '0.8',
      borderRadius: '15px',
      padding: '0.75rem'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant='h5' sx={{color: '#3059BE', fontWeight: '900', fontSize: '1.8rem'}}>
            Expenses
        </Typography>
      </Box>
      <Box sx={{
        height: '350px',
        overflowY: 'scroll'
      }}>
        {expenses.map(({expense_id, expense_name, expense_amount, expense_type}) => (
          <IndividualExpense 
            key={expense_id}
            id={expense_id}
            name={expense_name}
            amount={expense_amount}
            type={expense_type}
          />
        ))}
      </Box>
        <Box>
          <form onSubmit={newExpense}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'success',
              '& fieldset': {
                borderColor: '#3059BE'
              }
              }}>
            <Typography variant='h5' sx={{color: '#3059BE', fontWeight: '900', margin: '0.5rem'}}>Add Expense</Typography>
              <TextField id='expense_name' InputProps={{ startAdornment: ( <InputAdornment position='start'><DriveFileRenameOutlineIcon/></InputAdornment> ) }} sx={{width: '85%', marginBottom: '7px'}} onChange={(event) => setExpense_name(event.target.value)} value={expense_name} type='string' placeholder='Expense Name' required/>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <TextField id='expense_amount' InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon/></InputAdornment> ) }} sx={{width: '50%', marginRight: '7px'}} onChange={(event) => setExpense_amount(parseInt(event.target.value))} value={expense_amount.toString()} type='number' placeholder='Expense Amount' required/>
              <TextField id='expense_type' InputProps={{ startAdornment: ( <InputAdornment position='start'><TitleIcon/></InputAdornment> ) }} onChange={(event) => setExpense_type(event.target.value)} value={expense_type} type='string' placeholder='Expense Type'/>
            </Box>
            </Box>
              <Button variant='contained' endIcon={<SendIcon />} type='submit' sx={{ 
                fontWeight: '700',
                marginTop: '7px',
                marginLeft: '33%',
                backgroundColor: '#3059BE'
                 }}
                 >
                  Add Expense
              </Button>
          </form>
        </Box>
    </Box>
  )
}

export default ExpenseFeed