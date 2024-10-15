import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExitButton from 'modules/Components/ExitButton';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '50vw',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
 border: '2px solid #000',
 margin: "0",
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: '99999',
  padding:"0px"
};

const PreviewModal = ({ openPreview, setOpenPreivew, content }) => {
  const handleClose = () => {
    setOpenPreivew(false);
  };

  const closeButtonStyle = {
    position: 'sticky',
    height: "10px",
    top: '10px', 
    left: '100%', 
    zIndex: '9999', 
  };
  
  return (
    <Modal
      open={openPreview}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
           <ExitButton onClose={handleClose} style={closeButtonStyle}/>
        <Box sx={{ border: '4px solid grey', marginTop: "20px", marginLeft: "10px",  marginRight: "10px", padding: "10px"}}>{content}</Box>
      </Box>
    </Modal>
  );
};

export default PreviewModal;