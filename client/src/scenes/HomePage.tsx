import React from 'react'
import ExpenseFeed from '../widgets/ExpenseFeed'
import { Box } from '@mui/material'
import MonthlyExpenseAmount from '../widgets/MonthlyExpenseAmount'
import Goal from '../widgets/Goal'

const HomePage = () => {
    // Homepage make sure is dynamic with mobile screens
    // add boolean state so if it's a small screen we make the nav horizontal and the widgets vertical
  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <ExpenseFeed />
        <Box>
          <MonthlyExpenseAmount />
          <Goal />
        </Box>
      </Box>
              {/* ExpenseFeed */} {/* Center of the page */}
        {/* MonthlyExpenseAmount */} {/* Next to the expense feed on its right on non-mobile devices */}
        {/* Goal */} {/* On feeds right side but under MonthlyExpenseAmount */}
        {/* AddGoal */} {/* under the feed */}
    </Box>
  )
}

export default HomePage