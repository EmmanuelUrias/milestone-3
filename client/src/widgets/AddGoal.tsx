import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Box, TextField, Typography } from '@mui/material'

const AddGoal = () => {
    // Input to add goal to the Goal component to update without rerendering the page
    const [goal_amount, setGoal_amount] = useState(0)
    const [message, setMessage] = useState('')
    const userJson = useSelector((state: RootState) => state.userAuthAndInfo.user)
    const user = JSON.parse(userJson as unknown as string)
    const token = useSelector((state: RootState) => state.userAuthAndInfo.token)


    const newGoal = async(event: any) => {
      event.preventDefault()
      const goal = {
        goal_amount: goal_amount
      }

      const newGoal = await fetch(`http://localhost:3005/goal/${user.user_id}`, {
        method: 'POST',
        headers: {
          Authorization: `The chosen one ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goal)
      })
      if (!newGoal.ok) {
        setMessage('Failed to create new goal, maybe you already made one this month')
        return
      }
      setMessage('New goal created successfully')
    }


  return (
    <Box>
      <form onSubmit={newGoal}>
        <Typography variant='h6'>Add Goal</Typography>
        <TextField id='goal-amount' onChange={(event) => setGoal_amount(parseInt(event.target.value))} value={goal_amount.toString()} type='number' required/>
        <button type='submit'>Add Goal</button>
        <p style={{'width': '190px', 'marginLeft': '20px', 'color': 'red'} }><strong>{message}</strong></p>
      </form>
    </Box>
  )
}

export default AddGoal