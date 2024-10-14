import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { useAuthUser } from '@crema/hooks/AuthHooks';

import { requestPasswordReset } from '../../../../toolkit/actions';
import AppLoader from '@crema/components/AppLoader';

const ChangePasswordRequest = ({ message }) => {
  const dispatch = useDispatch();
  const { user } = useAuthUser();
  const { loading } = useSelector(({ common }) => common);

  const [response, setResponse] = useState('');



  const handleSendEmail = async () => {

  try {
    const res = await dispatch(
      requestPasswordReset({
             email: user.email,
        userId: user._id,
      })
    )
  
    setResponse(res.message);
  } catch (error) {
    setResponse('Failed to send password reset email. Please try again later. ERROR: ' + error);
    console.error('Error sending password reset email:', error);
  }
};



  return loading ? (
    <AppLoader />
  ) : (
    <Box>
      <Button onClick={handleSendEmail} variant='contained'>
        {message}
      </Button>
      <Box sx={{ color: 'red' }}>{response}</Box>
    </Box>
  );
};

export default ChangePasswordRequest;
