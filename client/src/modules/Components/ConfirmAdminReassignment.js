import React, { useState } from 'react';
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
  Box,
  TextField,
  MenuItem,
} from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import ExitButton from 'modules/Components/ExitButton';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const ConfirmAdminReassignment = ({
  open,
  onDeny,
  onConfirm,
  title,
  dialogTitle,
  newAdminRole,
  setNewAdminRole,
}) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={() => onDeny(false)}
    >
      <DialogTitle>
        <ExitButton onClose={() => onDeny(false)} />
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
        {`If you assign another user as an administrator, you will no longer be an administrator?
            If you wish to continue, select a new role for yourself then click yes. If you choose "None", you will no longer have access to this proposal`}
      </DialogContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        {/* ROLE DROPDOWN SELECT */}
        <Typography sx={{ fontSize: '16px' }}>New Role: </Typography>
        <TextField
          required
          value={newAdminRole}
          onChange={(e) => {
            setNewAdminRole(e.target.value);
          }}
          select
          // label='New Role'
          sx={{ width: '175px', mt: 1 }}
        >
          <MenuItem key={1} value='Collaborator'>
            Collaborator
          </MenuItem>
          <MenuItem key={2} value='Approver'>
            Approver
          </MenuItem>
          <MenuItem key={2} value='None'>
            None
          </MenuItem>
        </TextField>
      </Box>
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
          disabled={!newAdminRole}
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

export default ConfirmAdminReassignment;

ConfirmAdminReassignment.propTypes = {
  dialogTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  open: PropTypes.bool.isRequired,
  onDeny: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onConfirm: PropTypes.func.isRequired,
};
