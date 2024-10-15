import { makeStyles } from '@mui/material/styles';
import { Fonts, ThemeMode } from '@crema/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      height: 40,
      marginTop: 1,
      marginBottom: 1,
      cursor: 'pointer',
      textDecoration: 'none !important',
      borderRadius: '0 30px 30px 0',
      paddingLeft:
        theme.direction === 'ltr' ? (props) => 24 + 23 * props.level : 12,
      paddingRight:
        theme.direction === 'rtl' ? (props) => 24 + 23 * props.level : 12,
      position: 'relative',
      '&.active': {
        backgroundColor: theme.palette.background.default,
        pointerEvents: 'none',
        transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
        '& .nav-item-text': {
          color: theme.palette.primary.main + '!important',
          fontWeight: Fonts.MEDIUM,
        },
        '& .nav-item-icon': {
          color: theme.palette.primary.main + '!important',
        },
      },

      '&:hover, &:focus': {
        '& .nav-item-text': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },

        '& .nav-item-icon': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& .nav-item-icon': {
        color: theme.palette.sidebar.textColor,
      },
      '& .nav-item-text': {
        color: theme.palette.sidebar.textColor,
        fontWeight: Fonts.REGULAR,
        fontSize: 14,
      },
    },
    listIcon: {
      fontSize: 22,
      display: 'block',
    },
    listItemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: Fonts.REGULAR,
      fontSize: 14,
    },
  };
});
export default useStyles;
