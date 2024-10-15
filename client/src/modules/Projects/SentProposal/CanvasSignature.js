import React, { useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { Box, Typography, Button } from '@mui/material';
import { useAuthUser } from '@crema/hooks/AuthHooks';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ReplayIcon from '@mui/icons-material/Replay';
import { fetchError } from 'toolkit/actions';

const Canvas = ({
  contact,
  handleAddClientSignature,
  handleAddBusinessSignature,
  sendOtp,
  role,
}) => {
  const canvasRef = useRef(null);
  const { user } = useAuthUser();

  //  ADD SIGNATURE  get signature from canvas and add to document depending on admin or client
  const addSignature = () => {
    if (canvasRef.current) {
      canvasRef.current
        .exportImage('png')
        .then((data) => {
          if (role === 'clientAdmin') {
            handleAddClientSignature({ signature: data, type: 'canvas' });
          }
          if (role === 'businessAdmin') {
            handleAddBusinessSignature({ signature: data, type: 'canvas' });
          }
          sendOtp();
        })
        .catch((error) => {
          // Throw error if proplbel exporting image...
          console.log(error);
          dispatchEvent(fetchError('Error Adding Signature'));
        });
    }
  };

  // CLEAR SIGNATURE
  const handleClear = () => {
    canvasRef.current.clearCanvas();
  };

  // ENAABLE SIGNATURE button... let user click button only when something is on the canvas
  const [signatureData, setSignatureData] = useState(null);
  const handleEnableButton = (signature) => {
    setSignatureData(signature);
  };

  return (
    <>
      <Box
        mt={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography style={{ marginBottom: '15px', fontSize: '15px' }}>
            Draw Signature:
          </Typography>

          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={2}
            strokeColor='black'
            // width='100%'
            // height='100px'
            style={{
              border: '1px solid black',

              // marginLeft: '-23%',
              marginBottom: '10px',
              width: '150%',
              height: '200%',
              //    width: '100px',
              // height: '50%',
            }}
            onChange={handleEnableButton}
          />
        </Box>
        <Button
          type='submit'
          onClick={handleClear}
          sx={{
            color: 'grey',
            right: '-90px',
            top: '-50px',
            alignSelf: 'flex-end',
          }}
        >
          <ReplayIcon></ReplayIcon>
        </Button>
      </Box>
      {/* Signer Contact Info */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          flexDirection: 'column',
          marginTop: { lg: '400px' },
          position: { lg: 'absolute' },
          gap: '10px',
        }}
      >
        {contact}
        {/* SIGN AND COMPLETE BUTTON */}
        <Button
          color='primary'
          variant='contained'
          type='submit'
          onClick={addSignature}
          disabled={!signatureData?.length > 0}
          sx={{ height: '60px', display: 'flex', width: '400px', gap: '10px' }}
        >
          <Box>Sign and Complete</Box> <ArrowForwardIcon />
        </Button>
      </Box>
    </>
  );
};

export default Canvas;
