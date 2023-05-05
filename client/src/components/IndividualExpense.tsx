import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

interface Expense {
  id: number,
  name: string,
  amount: number,
  type: string
}

const IndividualExpense: React.FC<Expense> = ({id, name, amount, type}) => {
  const userJson = useSelector((state: RootState) => state.userAuthAndInfo.user)
  const user = JSON.parse(userJson as unknown as string)
  const token = useSelector((state: RootState) => state.userAuthAndInfo.token)

    const deleteExpense = async (event: any) => {
      const deletedExpense = await fetch(`http://budgetbuddy-env.eba-hjjiskth.us-east-1.elasticbeanstalk.com/${user.user_id}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `The chosen one ${token}`
        }
      })
      window.location.reload()
    }

    return (
    <Box sx={{
      backgroundColor: '#F8F8FF',
      width: '90%',
      margin: '0.7rem 1rem',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Box marginLeft='20px' padding='0.4rem'>
        <Typography sx={{
          color: '#3059BE',
          fontWeight: '800',
          fontSize: '1.1rem'
        }}>{name}</Typography>
        <Typography sx={{
          fontWeight: '800',
          fontSize: '1.1rem'
        }}>${amount}</Typography>
      </Box>
      <Box marginRight='20px'>
        <Typography sx={{
          color: '#3059BE',
          fontWeight: '800',
          fontSize: '1.1rem'
        }}>{type}</Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'end'
        }}>
          <IconButton onClick={deleteExpense}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default IndividualExpense