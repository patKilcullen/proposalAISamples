// import React from 'react';
// import { Dialog, DialogTitle, Slide } from '@mui/material';
// import PropTypes from 'prop-types';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import AppScrollbar from '../AppScrollbar';
// import { Fonts } from '@crema/constants/AppEnums';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction='up' ref={ref} {...props} />;
// });

// const AppDialog = ({
//   sxStyle,
//   maxWidth,
//   hideClose,
//   open,
//   onClose,
//   children,
//   dividers,
//   title,
//   actionTitle,
//   maxScrollHeight,
//   fullHeight,
// }) => {
//   return (
//     <Dialog
//       sx={{
//         '& .MuiDialog-paper': {
//           width: '100%',
//         },
//         '& .MuiDialogContent-root': {
//           overflowY: 'hidden',
//           paddingLeft: 0,
//           paddingRight: 0,
//         },
//         ...sxStyle,
//       }}
//       maxWidth={maxWidth}
//       TransitionComponent={Transition}
//       open={open}
//       onClose={onClose}
//     >
//       <DialogTitle
//         sx={{
//           fontSize: 14,
//           fontWeight: Fonts.MEDIUM,
//         }}
//         id='app-dialog-title'
//       >
//         {title}
//         {hideClose ? null : (
//           <IconButton
//             aria-label='close'
//             sx={{
//               position: 'absolute',
//               right: 4,
//               top: 4,
//               color: 'grey.700',
//             }}
//             onClick={onClose}
//             size='large'
//           >
//             <CloseIcon />
//           </IconButton>
//         )}
//       </DialogTitle>
//       <DialogContent dividers={dividers}>
//         <AppScrollbar
//           sx={{
//             paddingTop: 1,
//             height: fullHeight ? '70vh' : '100%',
//             minHeight: '300px',
//             maxHeight: maxScrollHeight ? maxScrollHeight : '400px',
//             paddingRight: 6,
//             paddingLeft: 6,
//           }}
//         >
//           {children}
//         </AppScrollbar>
//       </DialogContent>
//       {actionTitle ? (
//         <DialogActions>
//           <Button color='primary' variant='contained' type='submit'>
//             {actionTitle}
//           </Button>
//         </DialogActions>
//       ) : null}
//     </Dialog>
//   );
// };
// export default AppDialog;

// AppDialog.propTypes = {
//   maxWidth: PropTypes.string,
//   maxScrollHeight: PropTypes.number,
//   open: PropTypes.bool,
//   onClose: PropTypes.func,
//   children: PropTypes.node,
//   title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
//   dividers: PropTypes.bool,
//   hideClose: PropTypes.bool,
//   fullHeight: PropTypes.bool,
//   actionTitle: PropTypes.string,
//   sxStyle: PropTypes.object,
// };
// AppDialog.defaultProps = {
//   dividers: false,
//   fullHeight: false,
//   maxWidth: 'sm',
//   hideClose: false,
// };


import React from 'react';
import { Dialog, DialogTitle, Slide } from '@mui/material';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AppScrollbar from '../AppScrollbar';
import { Fonts } from '@crema/constants/AppEnums';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AppDialog = ({
  sxStyle,
  maxWidth,
  hideClose,
  open,
  onClose,
  children,
  dividers,
  title,
  actionTitle,
  maxScrollHeight,
  fullHeight,
}) => {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
        },
        '& .MuiDialogContent-root': {
          overflowY: 'hidden',
          paddingLeft: 0,
          paddingRight: 0,
        },
        ...sxStyle,
      }}
      maxWidth={maxWidth}
      TransitionComponent={Transition}
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        sx={{
          fontSize: 14,
          fontWeight: Fonts.MEDIUM,
        }}
        id='app-dialog-title'
      >
        {title}
        {hideClose ? null : (
          <IconButton
            aria-label='close'
            sx={{
              position: 'absolute',
              right: 4,
              top: 4,
              color: 'grey.700',
            }}
            onClick={onClose}
            size='large'
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers={dividers}>
        <AppScrollbar
          sx={{
            paddingTop: 1,
            height: fullHeight ? '70vh' : '100%',
            minHeight: '300px',
            maxHeight: maxScrollHeight ? maxScrollHeight : '400px',
            paddingRight: 6,
            paddingLeft: 6,
          }}
        >
          {children}
        </AppScrollbar>
      </DialogContent>
      {actionTitle ? (
        <DialogActions>
          <Button color='primary' variant='contained' type='submit'>
            {actionTitle}
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
};
export default AppDialog;

AppDialog.propTypes = {
  maxWidth: PropTypes.string,
  maxScrollHeight: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dividers: PropTypes.bool,
  hideClose: PropTypes.bool,
  fullHeight: PropTypes.bool,
  actionTitle: PropTypes.string,
  sxStyle: PropTypes.object,
};
AppDialog.defaultProps = {
  dividers: false,
  fullHeight: false,
  maxWidth: 'sm',
  hideClose: false,
};
