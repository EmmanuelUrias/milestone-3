import React, { useState } from 'react'
import { Typography, Box, Link, MenuList, MenuItem, Popper, Button, Grow, Paper, Stack, Divider, ClickAwayListener, useMediaQuery, IconButton } from '@mui/material'
import AddchartIcon from '@mui/icons-material/Addchart';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { setLogout } from '../ducks/userSlice';

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const smallScreen = useMediaQuery('(min-width: 600px)')
    const [isMobileNavMenuToggled, setIsMobileNavMenuToggled] = useState(false)
    const dispatch = useDispatch()

    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleLogOut = (event: Event | React.SyntheticEvent) => {
      dispatch(setLogout())
    }

    const handleToggle = () => {
      setOpen(!open);
    };

    const handleMenuOpen = () => {
      setIsMobileNavMenuToggled(!isMobileNavMenuToggled)
      handleToggle()
    }
  
    const handleClose = (event: Event | React.SyntheticEvent) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
  
      setOpen(false);
    };

    //const logOut = setLogout() reroute to login page
  
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
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
        opacity: 0.7
      } : {
        width: '100%',
        height: '70px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'top',
        backgroundColor: '#F8F8FF',
        opacity: 0.7,
        position: 'fixed'
      }}>
        <Typography variant='h4' color='#3059BE' marginTop={smallScreen ? '20px' : '7px'} marginLeft={smallScreen ? '0rem' : '0.7rem'} sx={{'& > *': {marginTop: '10px'}}}>
          Budget Buddy
          <Divider variant='middle'/>
        </Typography>
        { smallScreen ? <Box sx={ smallScreen ? {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          top: '-10%',
          '& > *': {marginBottom: '22px'},
          '& > *:hover': {cursor: 'pointer'}
        } : {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          '& > *': {marginLeft: '20px'},
          '& > *:hover': {cursor: 'pointer'}
        }}>
          <Link underline='hover' color='#3059BE' variant='h5' sx={{marginBottom: '20px', marginRight: '10px'}}>
            <AddchartIcon/> Tracker
          </Link>
          <Link underline='hover' color='#3059BE' variant='h5' sx={{marginBottom: '20px', marginRight: '10px'}}>
            <TipsAndUpdatesIcon /> Tips
          </Link>
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
          <Divider variant='middle'/>
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
                      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
          </Box>
        </Box> : (
          <Box marginTop='2px'>
            {!isMobileNavMenuToggled && (<IconButton onClick={handleMenuOpen}>
              <MenuIcon fontSize='large'/>
            </IconButton>)}
            {isMobileNavMenuToggled && (
              <div>
              <Stack direction="row" spacing={2}>
                  <div>
                    <Button ref={anchorRef} onClick={handleMenuOpen}>
                      <CloseIcon fontSize='large' />
                    </Button>
                    <Divider variant='middle' />
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      placement={ smallScreen ? "right-start" : "bottom-end"}                      
                      transition
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
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
                </div>
            )}
          </Box>

        )}
    </Box>
  )
}

export default Navbar