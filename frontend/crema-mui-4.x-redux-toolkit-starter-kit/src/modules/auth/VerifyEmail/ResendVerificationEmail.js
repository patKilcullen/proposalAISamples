import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {sendVerificationEmail, fetchError, onUpdateUser} from 'toolkit/actions'

const ResendVerificationEmail = ({message}) => {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  // FETCH CONTEXT
  //  const { fetchError } = useInfoViewActionsContext();
const [showResendEmail, setShowResendEmail] = useState(true )

  const handleSendEmail = async() => {
 
try{
setShowResendEmail(false)

await dispatch(sendVerificationEmail(user));
}
catch(error){

    dispatch(fetchError(error))
}
  
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {message && <Typography sx={{ color: 'red' }}>{message}:</Typography>}
  
      {showResendEmail && <Button onClick={handleSendEmail}  variant="outlined">
        resend Verification email
      </Button>}
     
      <Typography >... or try refreshing the page.</Typography>
    </Box>
  );
};

export default ResendVerificationEmail;
