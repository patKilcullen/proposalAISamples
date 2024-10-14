// import React, { useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ErrorIcon from '@mui/icons-material/Error';
// import InfoIcon from '@mui/icons-material/Info';
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';
// import SnackbarContent from '@mui/material/SnackbarContent';
// import WarningIcon from '@mui/icons-material/Warning';
// import Snackbar from '@mui/material/Snackbar';
// import { Slide } from '@mui/material';
// import { amber, green } from '@mui/material/colors';

// const PREFIX = 'AppMessageView';

// const classes = {
//   success: `${PREFIX}-success`,
//   error: `${PREFIX}-error`,
//   info: `${PREFIX}-info`,
//   warning: `${PREFIX}-warning`,
//   icon: `${PREFIX}-icon`,
//   iconVariant: `${PREFIX}-iconVariant`,
//   message: `${PREFIX}-message`,
// };

// // const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
// //   [`& .${classes.success}`]: {
// //     backgroundColor: green[600],
// //   },

// //   [`& .${classes.error}`]: {
// //     backgroundColor: theme.palette.error.main,
// //   },

// //   [`& .${classes.info}`]: {
// //     backgroundColor: theme.palette.primary.light,
// //   },

// //   [`& .${classes.warning}`]: {
// //     backgroundColor: amber[700],
// //   },

// //   [`& .${classes.icon}`]: {
// //     fontSize: 20,
// //   },

// //   [`& .${classes.iconVariant}`]: {
// //     opacity: 0.9,
// //      marginRight: theme.spacing(1),
// //   },

// //   [`& .${classes.message}`]: {
// //     display: 'flex',
// //     alignItems: 'center',
// //   },
// // }));

// const variantIcon = {
//   success: CheckCircleIcon,
//   warning: WarningIcon,
//   error: ErrorIcon,
//   info: InfoIcon,
// };

// function TransitionLeft(props) {
//   return <Slide {...props} direction='right' />;
// }

// const AppMessageView = (props) => {
//   const [open, setOpen] = React.useState(false);
//   const { clearInfoView, className, message, variant, stackCount, ...other } = props;
//   const Icon = variantIcon[variant];
//   const onClose = () => {
//     setOpen(false);
//     setTimeout(() => clearInfoView(), 500);
//   };
//   useEffect(() => {
//     if (message) {
//       setOpen(true);
//     }
//   }, [message]);


//   const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
//   [`& .${classes.success}`]: {
//     backgroundColor: green[600],
//   },

//   [`& .${classes.error}`]: {
//     backgroundColor: theme.palette.error.main,
//   },

//   [`& .${classes.info}`]: {
//     backgroundColor: theme.palette.primary.light,
//   },

//   [`& .${classes.warning}`]: {
//     backgroundColor: amber[700],
//   },

//   [`& .${classes.icon}`]: {
//     fontSize: 20,
//   },

//   [`& .${classes.iconVariant}`]: {
//     opacity: 0.9,
//      marginRight: theme.spacing(1),
//   },

//   [`& .${classes.message}`]: {
//     display: 'flex',
//     alignItems: 'center',
//   },
// }));

//   return (
//     <StyledSnackbar
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'left',
//       }}
//       open={open}
//       onClose={onClose}
//       autoHideDuration={6500}
//       TransitionComponent={TransitionLeft}
   
//     >
//       <SnackbarContent
        
//         className={clsx(classes[variant], className)}
//    sx={{marginLeft: `${(stackCount * 10)}px`}}
//         aria-describedby='client-snackbar'
//         message={
//           <span id='client-snackbar' className={classes.message}>
//             <Icon className={clsx(classes.icon, classes.iconVariant)} />
//             {message}
//             {stackCount}
//           </span>
//         }
//         action={[
//           <IconButton
//             key='close'
//             aria-label='close'
//             color='inherit'
//             onClick={onClose}
//             size='large'
//           >
//             <CloseIcon className={classes.icon} />
//           </IconButton>,
//         ]}
//         {...other}
//       />
//     </StyledSnackbar>
//   );
// };
// AppMessageView.propTypes = {
//   clearInfoView: PropTypes.func,
//   className: PropTypes.string,
//   message: PropTypes.string,
//   variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
// };

// export default AppMessageView;
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SnackbarContent from '@mui/material/SnackbarContent';
import WarningIcon from '@mui/icons-material/Warning';
import Snackbar from '@mui/material/Snackbar';
import { Slide } from '@mui/material';
import { amber, green } from '@mui/material/colors';

const PREFIX = 'AppMessageView';

const classes = {
  success: `${PREFIX}-success`,
  error: `${PREFIX}-error`,
  info: `${PREFIX}-info`,
  warning: `${PREFIX}-warning`,
  icon: `${PREFIX}-icon`,
  iconVariant: `${PREFIX}-iconVariant`,
  message: `${PREFIX}-message`,
};

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

const AppMessageView = (props) => {
  const [open, setOpen] = React.useState(false);
  const { clearInfoView, className, message, variant, stackCount, onClose, ...other } = props;
  const Icon = variantIcon[variant];

  // Handle close event
  const handleClose = () => {
    setOpen(false);
    //  setTimeout(() => {
      clearInfoView();
      if (onClose) {
        onClose(); // Call the onClose callback passed from parent
      }
    //  }, 500);
  };

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
    [`& .${classes.success}`]: {
      backgroundColor: green[600],
    },

    [`& .${classes.error}`]: {
      backgroundColor: theme.palette.error.main,
    },

    [`& .${classes.info}`]: {
      backgroundColor: theme.palette.primary.light,
    },

    [`& .${classes.warning}`]: {
      backgroundColor: amber[700],
    },

    [`& .${classes.icon}`]: {
      fontSize: 20,
    },

    [`& .${classes.iconVariant}`]: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },

    [`& .${classes.message}`]: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

  return (
    <StyledSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6500}
      TransitionComponent={TransitionLeft}
    >
      <SnackbarContent
        className={clsx(classes[variant], className)}
        sx={{ border: `${2 * stackCount}px solid red`, marginLeft: `${50 * stackCount}px` }}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
            {stackCount}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            size="large"
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    </StyledSnackbar>
  );
};

AppMessageView.propTypes = {
  clearInfoView: PropTypes.func,
  className: PropTypes.string,
  message: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  onClose: PropTypes.func, // Define the prop type for the onClose callback
};

export default AppMessageView;
