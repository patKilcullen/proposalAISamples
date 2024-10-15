import { alpha, makeStyles } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: '100%',
    // boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.04)',
    backgroundColor: theme.palette.background.paper,
  },
  appToolbar: {
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 56,
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
      minHeight: 70,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: 50,
      paddingRight: 50,
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  menuIcon: {
    width: 35,
    height: 35,
  },
  menuBarButton: {
    marginRight: theme.spacing(4),
    width: 42,
    height: 42,
    paddingLeft: 5,
  },
  menuBarIcon: {
    transition: 'all 0.4s ease',
    position: 'relative',
    height: 24,
    overflow: 'hidden',
    '&.main': {
      color: theme.palette.text.hint,
      width: 6,
      marginRight: 5,
      marginLeft: -9,
      '&.active': {
        color: theme.palette.text.secondary,
      },
    },
    '&.sub': {
      width: 14,
      color: theme.palette.text.hint,
      position: 'absolute',
      right: 8,
      top: '50%',
      transform: 'translateY(-50%)',
      '&.active': {
        color: theme.palette.text.secondary,
      },
    },
    '&.main, &.sub': {
      color: theme.palette.text.hint,
      '&.active': {
        color: theme.palette.text.secondary,
      },
    },
    '& .MuiSvgIcon-root': {
      display: 'block',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appSearch: {
    '& .MuiInputBase-input': {
      backgroundColor: alpha(theme.palette.background.default, 0.7),
      color: theme.palette.text.secondary,
      '&:focus': {
        backgroundColor: alpha(theme.palette.background.default, 1.0),
        color: theme.palette.text.secondary,
      },
      '&:hover': {
        backgroundColor: alpha(theme.palette.background.default, 0.85),
        color: theme.palette.text.secondary,
      },
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.secondary,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuItemRoot: {
    padding: 0,
  },
  pointer: {
    cursor: 'pointer',
  },
  logoRoot: {
    verticalAlign: 'middle',
    display: 'inline-block',
    height: 30,
  },
  hsHeaderAction: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginLeft: -7.5,
    marginRight: -7.5,
  },
  hsHeaderActionItem: {
    paddingLeft: 7.5,
    paddingRight: 7.5,
    '& .iconBtn': {
      border: `solid 1px ${alpha(theme.palette.text.secondary, 0.2)}`,
      borderRadius: '50%',
      width: 40,
      height: 40,
      color: theme.palette.text.secondary,
      '&:hover, &:focus': {
        color: theme.palette.text.primary,
        backgroundColor: alpha(theme.palette.background.default, 0.8),
      },
      '& .MuiSvgIcon-root': {
        fontSize: 18,
      },
    },
  },
}));
export default useStyles;
