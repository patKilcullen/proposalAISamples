import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Typography, Modal, IconButton } from '@mui/material';

const ExitButton = ({ onClose, style }) => {
  return (
    <IconButton
      aria-label='close'
      sx={
        style
          ? { ...style }
          : {
              position: 'absolute',
              right: 4,
              top: 4,
              color: 'grey.700',
            }
      }
      onClick={onClose}
      size='large'
    >
      <CloseIcon />
    </IconButton>
  );
};

export default ExitButton;
