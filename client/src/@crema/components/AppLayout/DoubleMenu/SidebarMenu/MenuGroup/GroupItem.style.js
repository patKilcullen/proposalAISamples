import { makeStyles } from '@mui/material/styles';
import { Fonts, ThemeMode } from '@crema/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      paddingLeft: 15,
      paddingRight: 15,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: 110,
      borderBottom: `solid 1px ${theme.palette.sidebar.borderColor}`,
      cursor: 'pointer',
      position: 'relative',

      '&:before': {
        content: '""',
        position: 'absolute',
        top: 10,
        bottom: 10,
        left: 0,
        width: 6,
        backgroundColor: 'transparent',
        borderRadius: 10,
      },

      '& .nav-item-text': {
        fontWeight: Fonts.REGULAR,
        color: theme.palette.sidebar.textColor,
      },

      '& .nav-item-icon': {
        color: theme.palette.sidebar.textColor,
      },

      '&:hover, &:focus': {
        '& .nav-item-text': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? `${theme.palette.primary.main}`
              : '#fff',
        },

        '& .nav-item-icon': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? `${theme.palette.primary.main}`
              : '#fff',
        },
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.open:before': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    navItemText: {
      fontSize: 14,
    },
    listIcon: {
      fontSize: 30,
      display: 'block',
      marginBottom: 5,
    },
  };
});
export default useStyles;
