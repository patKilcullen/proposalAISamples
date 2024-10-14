import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import ImgUpload from 'modules/Components/ImageUpload';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuthUser } from '@crema/hooks/AuthHooks';
const UploadSignature = ({
  contact,
  handleAddClientSignature,
  handleAddBusinessSignature,
  sendOtp,
  role,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { user } = useAuthUser();

  //  ADD SIGNATURE  get signature from uploaded file and add to document depending on admin or client
  const addSignature = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      if (role === 'clientAdmin') {
        handleAddClientSignature({signature: dataUrl, type: "upload"});
      }
      if (role === 'businessAdmin') {
        handleAddBusinessSignature({signature: dataUrl, type: "upload"});
      }
      sendOtp();
    };

    reader.readAsDataURL(uploadedFiles[0]);
  };

  return (
    <>
      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ marginBottom: '15px' }}>Upload Signature</div>
      </Box>
      {/* UPLOADED FILE */}
      <ImgUpload
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
      {/* CONTACT INFO */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: '400px',
          position: 'absolute',
          gap: '10px',
        }}
      >
        {contact}
        {/* SIGN BUTTON */}
        <Button
          color='primary'
          variant='contained'
          type='submit'
          onClick={addSignature}
          disabled={!uploadedFiles?.length > 0}
          sx={{ height: '60px', display: 'flex', width: '400px', gap: '10px' }}
        >
          <Box>Sign and Complete</Box> <ArrowForwardIcon />
        </Button>
      </Box>
    </>
  );
};

export default UploadSignature;
