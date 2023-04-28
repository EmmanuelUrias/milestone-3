import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Box, TextField, Typography } from '@mui/material'

const AddGoal = () => {
    // Input to add goal to the Goal component to update without rerendering the page
    const [goal_amount, setGoal_amount] = useState(0)
    const userJson = useSelector((state: RootState) => state.userAuthAndInfo.user)
    const user = JSON.parse(userJson as unknown as string)

    const newGoal = async(event: any) => {
      event.preventDefault()
      const goal = {
        goal_amount: goal_amount
      }

      const newGoal = await fetch(`http://localhost:3005/goal/${user.user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goal)
      })
    }


  return (
    <Box>
      <form>
        <Typography variant='h6'>Add Goal</Typography>
        <TextField onChange={(event) => setGoal_amount(parseInt(event.target.value))} value={goal_amount.toString()} type='number' required/>
        <button type='submit'>Add Goal</button>
      </form>
    </Box>
  )
}

export default AddGoal