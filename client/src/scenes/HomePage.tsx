import React from 'react'
import ExpenseFeed from '../widgets/ExpenseFeed'
import { Box, useMediaQuery } from '@mui/material'
import MonthlyExpenseAmount from '../widgets/MonthlyExpenseAmount'
import Goal from '../widgets/Goal'
import AddGoal from '../widgets/AddGoal'

const HomePage = () => {
  const smallScreen = useMediaQuery('(min-width: 800px)')
  return (
    <Box>
      { smallScreen ? (
        <Box sx={{width: '100%'}}>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '4%'}}>
            <ExpenseFeed smallScreen={smallScreen}/>
            <Box sx={{marginLeft: '5%'}}>
              <MonthlyExpenseAmount smallScreen={smallScreen}/>
              <Goal smallScreen={smallScreen}/>
              <AddGoal smallScreen={smallScreen}/>
            </Box>
          </Box>
        </Box>
        ) : (
          <Box sx={{width: '100%'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '4%', marginLeft: '7%'}}>
              <ExpenseFeed smallScreen={smallScreen}/>
            <Box sx={{marginLeft: '12%'}}>
              <MonthlyExpenseAmount smallScreen={smallScreen}/>
              <Goal smallScreen={smallScreen}/>
              <AddGoal smallScreen={smallScreen}/>
            </Box>
            </Box>
          </Box>
      )}
    </Box>
  )
}

export default HomePage