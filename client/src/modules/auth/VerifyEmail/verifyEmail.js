import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { Button, Box } from '@mui/material';

import { fetchError, onVerifyUserEmail } from '../../../toolkit/actions';
import AppInfoView from '@crema/components/AppInfoView';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

const VerifyEmail = () => {
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Need to do this toe resend email verification
  const handleVerifyEmail = () => {
    const verifyEmail = async () => {
      try {
        await dispatch(onVerifyUserEmail({ id, token }));
        navigate('/');
      } catch (error) {
        dispatch(fetchError(error));
      }
    };
    verifyEmail();
  };

  return (
    <>
      <Box>
        Please verify email:<Button onClick={handleVerifyEmail}>verify</Button>
      </Box>
      <AppInfoView />
    </>
  );
};

export default VerifyEmail;
