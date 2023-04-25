import { Box, Typography } from '@mui/material'
import React from 'react'

interface Expense {
  name: string,
  amount: number
}

const IndividualExpense: React.FC<Expense> = ({name, amount}) => {
    //fetch for each individual Id coming in from the props, SideNote: Might use some sort of state management for this data

    //populate data from props
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
      <Box marginLeft='20px'>
        <Typography>{name}</Typography>
        <Typography>{amount}</Typography>
      </Box>
      <Box marginRight='20px'>
        <Typography>Type</Typography>
        <Box>
         {/* delete and edit button on hover*/} l
        </Box>
      </Box>
    </Box>
  )
}

export default IndividualExpense