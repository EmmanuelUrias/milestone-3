import { Box, Link, List, ListItem, Typography } from '@mui/material'
import React from 'react'

const FinancialTipsPage = () => {
    // A page filled with resources to make the user's experience of educateing themselves easier
  return (
    <Box sx={{marginLeft: '3%', marginTop: '1%'}}>
      <Typography variant='h2' sx={{color: '#3059BE', fontWeight: '500', opacity: '0.8'}}>Budget Tips</Typography>
      <Box>
        <List>
          <ListItem>
            <Link target="_blank" href='https://www.newyorklife.com/articles/create-financial-strategy?tid=1371&cmpid=kncnb_AP_23MF_google_na_na_na_ctx_MAT_CFSM_na_0_0_0&gclid=Cj0KCQjwgLOiBhC7ARIsAIeetVDZo3dW-Ng65BZqZWTQLy_WnFN4J1tKsy0VJGvxotOarG7xZesvENkaAirZEALw_wcB&gclsrc=aw.ds'>
              How To Create A Financial Strategy
            </Link>
          </ListItem>
          <ListItem>
            <Link target="_blank" href='https://operationhope.org/how-we-help/credit-money-management/?gclid=Cj0KCQjwgLOiBhC7ARIsAIeetVC_4pYAlNTNIMywFlcQh4HHsO3VQpfpASHBSA94cpA_rwB3eoYOsNQaAlQ_EALw_wcB'>
              Learn How To Make Good Decisions With Your Money
            </Link>
          </ListItem>
          <ListItem>
            <Link target="_blank" href='https://www.themuse.com/advice/50-personal-finance-tips-that-will-change-the-way-you-think-about-money'>
              50 Personal Finance Tips That Will Change the Way You Think About Money
            </Link>
          </ListItem>
          <ListItem>
            <Link target="_blank" href='https://www.thebalancemoney.com/top-ten-financial-tips-1289309'>
              Top 10 Financial Tips
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default FinancialTipsPage