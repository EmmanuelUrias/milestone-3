import React, { useState } from 'react'
import { Typography, Box, Link, MenuList, MenuItem, Popper, Button, Grow, Paper, Stack, ClickAwayListener, useMediaQuery } from '@mui/material'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const smallScreen = useMediaQuery('(min-width: 600px)')

    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event: Event | React.SyntheticEvent) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }
  return (
    <Box sx={ smallScreen ? {
        width: '20%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      } : {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'top'
      }}>
        <Typography variant='h4' color='#3059BE' marginTop='20px'>
          Budget Buddy
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          top: '-10%',
          '& > *': {marginBottom: '20px'}
        }}>
          <Link underline='hover' color='#3059BE' sx={{ position: 'flex-bottom' }} variant='h5'>Tracker</Link>
          <Link underline='hover' color='#3059BE' variant='h5'>Tips</Link>
          <Box>
          <Stack direction="row" spacing={2}>
        <div>
          <Button
            ref={anchorRef}
            onClick={handleToggle}
            sx={{ color: '#3059BE', '&:hover': {color: '#7D94FF'}}}
            size='large'
          >
            Account
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement="right-start"
            transition
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>User_Name</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
          </Box>
        </Box>
    </Box>
  )
}

export default Navbar