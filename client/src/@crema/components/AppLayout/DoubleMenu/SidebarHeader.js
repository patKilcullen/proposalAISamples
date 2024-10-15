import React from 'react';
import Avatar from '@mui/material/Avatar';
import { alpha, makeStyles } from '@mui/material';
import Box from '@mui/material/Box';
import { Fonts } from '@crema/constants/AppEnums';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';
import { useAuthMethod, useAuthUser } from '../../../utility/AuthHooks';
import AppLogo from '../components/AppLogo';

const useStyles = makeStyles((theme) => {
  return {
    sidebarHeaderRoot: {
      minHeight: 56,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      // backgroundColor: alpha(theme.palette.common.black, 0.15),
      [theme.breakpoints.up('sm')]: {
        minHeight: 70,
      },
      '&:hover': {
        '& .arrowIcon': {
          opacity: 1,
          visibility: 'visible',
        },
      },
    },
    hsUserRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '30px 10px',
      borderBottom: `solid 1px ${alpha(
        theme.palette.sidebar.borderColor,
        0.2,
      )}`,
    },
    profilePic: {
      position: 'relative',
      border: `solid 1px ${theme.palette.background.default}`,
      padding: 4,
      borderRadius: '50%',
      marginBottom: 10,
    },
    userStatusRoot: {
      position: 'absolute',
      right: 4,
      bottom: 4,
      zIndex: 1,
      width: 15,
      height: 15,
      cursor: 'pointer',
      borderRadius: '50%',
      backgroundColor: theme.palette.success.main,
      border: `solid 2px ${theme.palette.text.primary}`,
    },
    avatarPic: {
      height: 74,
      width: 74,
    },
    hsUserInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      '& .arrowIcon': {
        transition: 'all 0.4s ease',
        opacity: 0,
        visibility: 'hidden',
        cursor: 'pointer',
      },
    },
    userName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: 16,
      fontWeight: Fonts.MEDIUM,
      marginBottom: 2,
      marginLeft: 24,
      color: (props) => (props.themeMode === 'light' ? '#313541' : 'white'),
      display: 'flex',
    },
    designation: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: theme.palette.sidebar.textColor,
      fontSize: 14,
    },
    pointer: {
      cursor: 'pointer',
    },
  };
});

const SidebarHeader = () => {
  const { themeMode } = useThemeContext();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useAuthUser();
  const { logout } = useAuthMethod();
  const getUserAvatar = () => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  const classes = useStyles({ themeMode });

  return (
    <Box className={classes.sidebarHeaderRoot}>
      <AppLogo />
      <Box className={classes.hsUserRoot}>
        {user?.photoURL ? (
          <Box className={classes.profilePic}>
            <Avatar className={classes.avatarPic} src={user.photoURL} />
            <Box className={classes.userStatusRoot} />
          </Box>
        ) : (
          <Box className={classes.profilePic}>
            <Avatar className={classes.avatarPic}>{getUserAvatar()}</Avatar>
          </Box>
        )}
        <Box className={classes.hsUserInfo}>
          <Typography component='h3' variant='h3' className={classes.userName}>
            {user.userName ? user.userName : 'Admin User '}
            <KeyboardArrowDownIcon
              className='arrowIcon'
              onClick={handleClick}
            />
          </Typography>
        </Box>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default SidebarHeader;
SidebarHeader.propTypes = {
  setShowMessage: PropTypes.func,
  setShowNotification: PropTypes.func,
};
