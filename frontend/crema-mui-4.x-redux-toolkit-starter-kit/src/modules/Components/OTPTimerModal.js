import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {  fetchError, verifyOtp } from 'toolkit/actions';
import PreviewModal from './PreviewModal';

import ExitButton from './ExitButton';
const style = {
  position: 'absolute',
  top: '50vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '35vw',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: "space-around",
  gap: "20px",
  alignItems: 'center',
  borderRadius: '20px',
  padding: "50px"
};

const OTPTimer = ({
  openTimer,
  setOpenTimer,
  timeLeft,
  setTimeLeft,
  onComplete,
  buttonText,
  preview,
  content,
  resetSignature,
   sendOtp
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
   
      console.log("Error Verifying OTP" + error)
      dispatch(fetchError("Error Submitting OTP: " + error))
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
    resetSignature()
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

  // OPEN PREVIEW of the contenct 
  const [openPreview, setOpenPreview] = useState(false);

  const handleResend = ()=>{
    sendOtp()
  }
  return (
    <Modal
      open={openTimer}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
     
      <Box sx={style}>
         <ExitButton onClose={handleClose} />
        <Typography component='p' sx={{ fontSize: 16, fontWeight: 'bold' }}>
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
              OTP expired.
            </Typography>
          ) : (
            <Typography component='p' sx={{ fontSize: 16 }}>
              OTP expires in: {formattedTime}
            </Typography>
          )}

        </Box>
 {/* RESEND OTP */}
        <Button sx={{marginTop: "-20px"}}
        onClick={handleResend}
        >Resend OTP</Button>
{/* OTP ERROR */}
        <TextField
          name={'otp'}
          variant='outlined'
          sx={{
            width: '100%',
            my: 2,
          }}
          placeholder='one time password'
          value={otp}
          onChange={handleInputOtp}
        />
        {/* PREVIEW BUTTON - if preview is in props */}
        {preview && (
          <Button onClick={() => setOpenPreview(true)}>{preview}</Button>
        )}
        <PreviewModal
          openPreview={openPreview}
          setOpenPreivew={setOpenPreview}
          content={content}
        />
        
        <Typography sx={{ color: 'red', marginBottom: '5px' }}>
          {error}
        </Typography>

        {/* SUBMIT BUTTON */}
        <Button
          onClick={handleSubmitOtp}
          disabled={showExpired}
          variant='contained'
        >
          {buttonText}
        </Button>
      </Box>
    </Modal>
  );
};

export default OTPTimer;
