import { makeStyles } from '@mui/material';
import { ThemeStyle } from '@crema/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    appMain: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      paddingTop: 56,
      overflow: theme.direction === 'rtl' ? 'auto' : 'inherit',
      [theme.breakpoints.up('sm')]: {
        paddingTop: 70,
      },
      '&.appMainFixedFooter': {
        paddingBottom: 48,
        [theme.breakpoints.up('xl')]: {
          paddingBottom: 58,
        },
        '& .scrollAppSidebar': {
          height: (props) =>
            props.themeStyle === ThemeStyle.MODERN
              ? 'calc(100vh - 260px) !important'
              : 'calc(100vh - 198px) !important',
          [theme.breakpoints.up('xl')]: {
            height: (props) =>
              props.themeStyle === ThemeStyle.MODERN
                ? 'calc(100vh - 300px) !important'
                : 'calc(100vh - 236px) !important',
          },
        },
      },
    },
    mainContent: {
      flex: 1,
      display: 'flex',
    },
    appSidebarRoot: {
      position: 'relative',
    },
    mainContainer: {
      width: '100vw',
      transition: 'all 0.4s ease',
      [theme.breakpoints.up('lg')]: {
        '.menuMainContent &': {
          marginLeft: '120px',
          width: `calc(100vw - 120px)`,
        },
        '.subMenuMainContent &': {
          marginLeft: '350px',
          width: `calc(100vw - 350px)`,
        },
      },

      '& > .scrollbar-container': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      },
      '& .main-content-view': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        [theme.breakpoints.up('md')]: {
          padding: 30,
        },
        [theme.breakpoints.up('xl')]: {
          padding: 50,
        },
      },
    },
    boxedLayout: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1260,
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: 'none',
        border: '1px solid #e8e5dd',
        '& .app-sidebar': {
          position: 'absolute',
        },
        '& .fixed-footer': {
          position: 'sticky',
          width: '100%',
        },
        '& $mainContent': {
          width: 'calc(100% - 19rem)',
          flex: 'auto',
        },
        '& $mainContainer': {
          width: '100%',
        },
        '& .app-bar': {
          width: 'calc(100% - 19rem)',
          position: 'absolute',
          boxShadow: 'none',
          border: '1px solid #e8e5dd',
        },
        '& .grid-btn': {
          fontSize: 11,
        },
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: 1680,
        '& $mainContent, & .app-bar': {
          width: 'calc(100% - 21.6rem)',
        },
      },
    },
  };
});
export default useStyles;
