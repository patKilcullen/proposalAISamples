import { makeStyles } from '@mui/material/styles';
import { Fonts, ThemeMode } from '@crema/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      height: 40,
      marginTop: 1,
      marginBottom: 1,
      paddingLeft: 15,
      paddingRight: 15,

      [theme.breakpoints.up('xl')]: {
        marginTop: 3,
        marginBottom: 3,
      },

      '& .nav-item-text': {
        fontWeight: Fonts.REGULAR,
        color: theme.palette.sidebar.textColor,
      },

      '& .nav-item-icon': {
        color: theme.palette.sidebar.textColor,
      },

      '&.open, &:hover, &:focus': {
        '& .nav-item-text': {
          fontWeight: Fonts.SEMI_BOLD,
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
        },

        '& .nav-item-icon': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
        },
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    listItemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: 14,
    },
    listIcon: {
      fontSize: 20,
      display: 'block',
    },
  };
});
export default useStyles;
