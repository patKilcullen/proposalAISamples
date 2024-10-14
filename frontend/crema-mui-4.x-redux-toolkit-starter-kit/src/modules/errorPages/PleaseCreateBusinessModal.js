import React from 'react'
import {Link} from 'react-router-dom'
import AppCard from '@crema/components/AppCard';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Box, Button, Typography, Modal, IconButton } from '@mui/material';
import { set } from 'lodash';
 import PleaseCreateBusiness from 'modules/errorPages/PleaseCreateBusiness';
import CloseIcon from '@mui/icons-material/Close';

import ExitButton from 'modules/Components/ExitButton';
const style = {
  position: 'absolute',
  top: '50vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '35vw',
  //   width: '35vw',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '20px',
};

// PLEASE CREATE BUSINESS component used if user try to do things like 
// create a proposal that need a business before a business is created
const PleaseCreateBusinessModal = ({message, open, setOpen}) => {
   const { user } = useAuthUser();

   const handleClose = () =>{
    setOpen(false)
   }
  return (
    <Modal open={open}
    onClose={handleClose}
    >
    <AppCard sx={style}>
      <ExitButton onClose={handleClose} />
      <PleaseCreateBusiness message={message}/>
    </AppCard>
    </Modal>
  );
}

export default PleaseCreateBusinessModal
