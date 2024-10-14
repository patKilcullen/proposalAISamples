import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, TextField } from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { fetchError, verifyOtp } from 'toolkit/actions';

// TODO/// is this component used?
const OTPTimer = ({
  openTimer,
  setOpenTimer,
  timeLeft,
  setTimeLeft,
  onComplete,
  buttonText,
}) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showExpired, setShowExpired] = useState(false);

  // SUBMIT THE PASSWORD - if verified onComplet funciton from parent
  const handleSubmitOtp = () => {
    dispatch(verifyOtp(otp)).then((res) => {
      if (res?.data?.success) {
        onComplete();
      } else {
        setError(res);
      }
    }).catch((error)=>{
   
      fetchError("ERROR: " + error)
    })
  };

// COUNTDOWN: if modal is open and time is left, count down
  useEffect(() => {
    if (openTimer) {
      if (timeLeft > 0) {
        setFormattedTime(convertToMinutesAndSeconds(timeLeft));
        const intervalId = setInterval(() => {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
        }, 1000);
        return () => clearInterval(intervalId);
      } else {
        setShowExpired(true);
      }
    }
  }, [timeLeft, openTimer]);


  // CLOSE MODAL
  const handleClose = () => {
    setOpenTimer(false);
  };

  // INPUT OTP
  const handleInputOtp = (e) => {
    setOtp(e.target.value);
  };

  // FORMAT TIME from setTimeout milliseconds
    const [formattedTime, setFormattedTime] = useState(null);
  const convertToMinutesAndSeconds = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    // <Modal
    //   open={openTimer}
    //   onClose={handleClose}
    //   aria-labelledby='modal-modal-title'
    //   aria-describedby='modal-modal-description'
    // >
      // <Box sx={style}>
      <Box>
        <Typography component='p' sx={{ fontSize: 16, fontWeight: "bold" }}>
          A One Time Password was sent to your email inbox.
        </Typography>
        <Typography component='p' sx={{ fontSize: 16 }}>
          Please enter the OTP below.{' '}
        </Typography>
        <Box sx={{ display: 'flex', alignContent: 'center', gap: '5px' }}>
          {' '}
          <AccessTimeIcon />
          {showExpired ? (
            <Typography component='p' sx={{ fontSize: 16, color: 'red' }}>
              oneTimePassword expired.
            </Typography>
          ) : (
            <Typography component='p' sx={{ fontSize: 16 }}>
              OTP expires in: {formattedTime}
            </Typography>
          )}
        </Box>

        <TextField
          name={'otp'}
          variant='outlined'
          sx={{
            width: '100%',
            my: 2,
          }}
          placeholder='password'
          value={otp}
          onChange={handleInputOtp}
        />

        <Typography sx={{ color: 'red', marginBottom: '5px' }}>
          {error}
        </Typography>
        <Button
          onClick={handleSubmitOtp}
          disabled={showExpired}
          variant='contained'
        >
          {buttonText}
        </Button>
      </Box>
    // </Modal>
  );
};

export default OTPTimer;
