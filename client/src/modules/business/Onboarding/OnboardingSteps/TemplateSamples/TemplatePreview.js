import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactHtmlParser from 'react-html-parser';

const style = {
  position: 'absolute',
  top: '50vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75vw',
  maxHeight: '90vh', 
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center',
};

const closeButtonStyle = {
  marginTop: '16px', 
};

export default function BasicModal({ previewTemplate, selectedTemplate, setPreviewTemplate }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreviewTemplate(false);
  };

  // OPEN/CLOSE
  useEffect(() => {
    previewTemplate ? handleOpen() : handleClose();
  }, [previewTemplate]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h1' component='h2' fontWeight="bold">
            {selectedTemplate?.type}
          </Typography>
          <div>
            {ReactHtmlParser(selectedTemplate?.content?.replace(/\n/g, '<br />'))}
          </div>
          <Button style={closeButtonStyle} onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}