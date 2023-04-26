import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'

const LoginPage = () => {
  const [isToRegister, setIsToRegister] = useState(true)


  return (
    <Box>
      { isToRegister ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '& form': {
            display: 'flex',
            flexDirection: 'column'
        }
        }}>
          <Typography variant='h3'>Register</Typography>
          <form>
            <label>Hello</label>
            <input />
            <input />
            <input />
            <input />
          </form>
            <a onClick={() => setIsToRegister(false)}>Already have an account</a>
        </Box>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '& form': {
            display: 'flex',
            flexDirection: 'column'
        }
      }}>
        <Typography variant='h3'>Log In</Typography>
          <form>
            <input />
            <input />
          </form>
          <a onClick={() => setIsToRegister(true)}>Don't have an account</a>
        </Box>
      ) }
    </Box>
  )
}

export default LoginPage