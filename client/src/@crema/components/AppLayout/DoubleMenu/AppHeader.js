import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AppLngSwitcher from '../../AppLngSwitcher';
import Box from '@mui/material/Box';
import AppSearchBar from '../../AppSearchBar';
import useStyles from './AppHeader.style';
import clsx from 'clsx';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Drawer from '@mui/material/Drawer';
import AppMessages from '../../AppMessages';
import AppNotifications from '../../AppNotifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { allowMultiLanguage } from '../../../../constants/AppConst';
const AppHeader = ({
  updateNavState,
  sidebarMenuState,
  toggleNavCollapsed,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();

  return (
    <AppBar color='inherit' className={clsx(classes.appBar, 'app-bar')}>
      <Toolbar className={classes.appToolbar}>
        <Hidden mdDown>
          <IconButton
            edge='start'
            className={clsx(classes.menuBarButton, 'menu-bar-btn')}
            color='inherit'
            aria-label='open drawer'
            onClick={updateNavState}
          >
            <Box
              component='span'
              className={clsx(classes.menuBarIcon, 'main', {
                active: sidebarMenuState > 0,
              })}
            >
              <MenuIcon />
            </Box>
            <Box
              component='span'
              className={clsx(classes.menuBarIcon, 'sub', {
                active: sidebarMenuState > 1 && sidebarMenuState < 3,
              })}
            >
              <MenuIcon />
            </Box>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            edge='start'
            className={clsx(classes.menuButton, 'menu-btn')}
            color='inherit'
            aria-label='open drawer'
            onClick={toggleNavCollapsed}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
        </Hidden>
     
        <AppSearchBar
          className={classes.appSearch}
          iconPosition='right'
          placeholder='Search…'
        />
        <Box className={classes.grow} />
        {allowMultiLanguage && <AppLngSwitcher />}

        <Box ml={{ xs: 2, sm: 4 }}>
          <Hidden xsDown>
            <Box className={classes.hsHeaderAction}>
              <Box className={classes.hsHeaderActionItem}>
                <Tooltip title='Notification'>
                  <IconButton
                    className='iconBtn'
                    onClick={() => setShowNotification(true)}
                  >
                    <NotificationsNoneIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box className={classes.hsHeaderActionItem}>
                <Tooltip title='Message'>
                  <IconButton
                    className='iconBtn'
                    onClick={() => setShowMessage(true)}
                  >
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box className={classes.hsHeaderActionItem}>
                <Tooltip title='Setting'>
                  <IconButton className='iconBtn'>
                    <SettingsOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Hidden>

          <Hidden smUp>
            <Box className={classes.hsHeaderActionItem}>
              <Tooltip title='More'>
                <IconButton className='iconBtn' onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Hidden>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => setShowNotification(true)}>
              Notification
            </MenuItem>
            <MenuItem onClick={() => setShowMessage(true)}>Message</MenuItem>
            <MenuItem>Setting</MenuItem>
          </Menu>
        </Box>

        <Drawer
          anchor='right'
          open={showMessage}
          onClose={() => setShowMessage(false)}
        >
          <AppMessages onClose={() => setShowMessage(false)} />
        </Drawer>
        <Drawer
          anchor='right'
          open={showNotification}
          onClose={() => setShowNotification(false)}
        >
          <AppNotifications onClose={() => setShowNotification(false)} />
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;

AppHeader.propTypes = {
  updateNavState: PropTypes.func,
  toggleNavCollapsed: PropTypes.func,
  sidebarMenuState: PropTypes.number,
};
