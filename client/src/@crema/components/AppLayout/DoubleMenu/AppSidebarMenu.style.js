import { makeStyles } from '@mui/material';
import { ThemeMode } from '@crema/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    appSidebarMenuRoot: {
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      position: 'relative',
      bottom: 0,
      left: 0,
      width: 0,
      maxHeight: 'calc(100vh - 56px)',
      transition: 'all 0.4s ease',
      // boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.04)',
      borderRadius: `0 ${theme.overrides.MuiCard.root.borderRadius}px ${theme.overrides.MuiCard.root.borderRadius}px 0`,
      overflow: 'hidden',
      '.subMenuMainContent &': {
        boxShadow: 'none',
        borderRadius: 0,
      },
      [theme.breakpoints.up('sm')]: {
        maxHeight: 'calc(100vh - 70px)',
      },
      [theme.breakpoints.up('lg')]: {
        position: 'fixed',
        '.menuMainContent &': {
          width: 120,
        },
      },
    },
    sidebarBg: {
      backgroundColor: (props) =>
        props.themeMode === ThemeMode.SEMI_DARK
          ? theme.palette.sidebar.bgColor
          : props.themeMode === ThemeMode.LIGHT
          ? 'white'
          : theme.palette.sidebar.bgColor,
    },
    scrollAppSidebar: {
      height: '100% !important',
    },
    drawerScrollAppSidebar: {
      height: '100% !important',
    },
    sidebarStandard: {
      height: '100%',
      width: '100%',
      color: 'white',
      overflow: 'hidden',
    },
  };
});
export default useStyles;
