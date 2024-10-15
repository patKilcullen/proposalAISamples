import React from 'react';
import Button from '@mui/material/Button';
import IntlMessages from '@crema/helpers/IntlMessages';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const AppConfirmDialog = ({ open, onDeny, onConfirm, title, dialogTitle }) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={() => onDeny(false)}
    >
      <DialogTitle>
        <Typography
          component='h4'
          variant='h4'
          sx={{
            mb: 3,
            fontWeight: Fonts.SEMI_BOLD,
          }}
          id='alert-dialog-title'
        >
          {dialogTitle}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{ color: 'text.secondary', fontSize: 14 }}
        id='alert-dialog-description'
      >
        {title}
      </DialogContent>
      <DialogActions
        sx={{
          pb: 5,
          px: 6,
        }}
      >
        <Button
          variant='outlined'
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
          onClick={onConfirm}
          color='primary'
          autoFocus
        >
          <IntlMessages id='common.yes' />
        </Button>
        <Button
          variant='outlined'
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
          onClick={() => onDeny(false)}
          color='secondary'
        >
          <IntlMessages id='common.no' />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppConfirmDialog;

AppConfirmDialog.propTypes = {
  dialogTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  open: PropTypes.bool.isRequired,
  onDeny: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onConfirm: PropTypes.func.isRequired,
};
