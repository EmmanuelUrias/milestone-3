import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Box, Button, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

const AddGoal = (smallScreen: any) => {
    // Input to add goal to the Goal component to update without rerendering the page
    const [goal_amount, setGoal_amount] = useState(0)
    const [message, setMessage] = useState('')
    const userJson = useSelector((state: RootState) => state.userAuthAndInfo.user)
    const user = JSON.parse(userJson as unknown as string)
    const token = useSelector((state: RootState) => state.userAuthAndInfo.token)


    const newGoal = async(event: any) => {
      // event.preventDefault()
      const goal = {
        goal_amount: goal_amount
      }

      const newGoal = await fetch(`http://budgetbuddy-env.eba-hjjiskth.us-east-1.elasticbeanstalk.com/goal/${user.user_id}`, {
        method: 'POST',
        headers: {
          Authorization: `The chosen one ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goal)
      })
      if (!newGoal.ok) setMessage('Failed to create new goal, maybe you already made one this month')
      
    }


  return (
    <Box sx={{
      width: '95%',
      marginTop: '1rem',
      opacity: '0.9'
    }}>
      <form onSubmit={newGoal}>
        <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        <Typography variant='h6' sx={{color: '#3059BE', fontWeight: '800', fontSize: '1.2rem'}}>Add Goal</Typography>
        <TextField id='goal-amount' onChange={(event) => setGoal_amount(parseInt(event.target.value))} value={goal_amount.toString()} type='number' required/>
        <Button variant='contained' endIcon={<SendIcon />} type='submit' sx={{ 
                fontWeight: '700',
                marginTop: '7px',
                backgroundColor: '#3059BE'
                 }}>Add Goal</Button>
        <p style={{'width': '190px', 'marginLeft': '20px', 'color': 'red'} }><strong>{message}</strong></p>
        </Box>
      </form>
    </Box>
  )
}

export default AddGoal