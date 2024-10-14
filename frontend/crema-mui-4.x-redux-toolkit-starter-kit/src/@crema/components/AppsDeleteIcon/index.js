import React, { useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppConfirmDialog from '../AppConfirmDialog';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import AppTooltip from '../AppTooltip';

const AppsDeleteIcon = ({ deleteAction, deleteTitle, sx }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <AppTooltip title={<IntlMessages id='common.trash' />}>
        <IconButton
          sx={sx}
          size='large'
          onClick={() => setDeleteDialogOpen(true)}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </AppTooltip>
      <AppConfirmDialog
        open={isDeleteDialogOpen}
        onDeny={setDeleteDialogOpen}
        onConfirm={deleteAction}
        title={deleteTitle}
        dialogTitle={<IntlMessages id='common.deleteItem' />}
      />
    </>
  );
};

export default AppsDeleteIcon;

AppsDeleteIcon.propTypes = {
  deleteAction: PropTypes.func,
  deleteTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sx: PropTypes.object,
};
