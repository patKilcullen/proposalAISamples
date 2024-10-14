import React, { useState, useRef } from 'react';
import { TextField, Button, Typography, Box, Checkbox } from '@mui/material';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import html2canvas from 'html2canvas';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const fonts = [
  { label: 'Brush Script', font: 'Brush Script MT, cursive' },
  { label: 'Snell Roundhand', font: 'Snell Roundhand, cursive' },
  { label: 'Great Vibes', font: 'Great Vibes, cursive' },
  { label: 'Dancing Script', font: 'Dancing Script, cursive' },
  { label: 'Sacramento', font: 'Sacramento, cursive' },
  { label: 'Homemade Apple', font: 'Homemade Apple, cursive' },
];

const TextSign = ({
  contact,
  handleAddClientSignature,
  handleAddBusinessSignature,
  sendOtp,
  role,
}) => {
  const { user } = useAuthUser();
  const [text, setText] = useState(user?.userName);
  const [selectedFont, setSelectedFont] = useState('Brush Script MT, cursive');
  const contentRef = useRef(null);

  // CHANGE FONT
  const handleFontChange = (font) => {
    setSelectedFont(font);
  };

  //  ADD SIGNATURE  get signature from text and add to document depending on admin or client
  const addSignature = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current)
        .then((canvas) => {
          const dataUrl = canvas.toDataURL();
          // handleAddClientSignature({dataUrl, type: "text"});
          if (role === 'clientAdmin') {
            handleAddClientSignature({signature: dataUrl, type: "text"});
          }
          if (role === 'businessAdmin') {
            handleAddBusinessSignature({signature: dataUrl, type: "text"});
          }
          sendOtp();
        })
        .catch((error) => {
          console.error('Error capturing content:', error);
        });
    }
  };

  return (
    <>
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5%',
            marginBottom: '16px',
          }}
        >
          {/* TEXT BOX */}
          <TextField
            label='Type your signature here'
            variant='outlined'
            fullWidth
            multiline
            style={{
              fontFamily: selectedFont,
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Box>
        {/* FONTS */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: '10px',
            justifyContent: 'center',
          }}
        >
          {fonts.map((font) => (
            <div
              key={font.label}
              style={{
                fontFamily: font.font,
                fontSize: '18px',
                border:
                  font.font === selectedFont
                    ? '2px solid black'
                    : '1px solid #ccc',
                padding: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                minWidth: '30%',
                maxWidth: '30%',
                overflow: 'hidden',
                height: '32px',
              }}
              onClick={() => handleFontChange(font.font)}
            >
              {user?.userName.substring(0, 112)}
            </div>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px',
            gap: '5px',
          }}
        >
          <Typography sx={{ fontSize: '15px' }}>Signature:</Typography>

          <Box
            sx={{
              border: '2px solid black',
              borderRadius: '25px',
              width: '75%',
              height: '50px',
              paddingLeft: '10px',
            }}
          >
            {/* SIGNATURE THAT WILL ?Be added /to/ /do/c */}
            <Typography
              ref={contentRef}
              variant='body1'
              style={{
                fontFamily: selectedFont,
                textAlign: 'left',
                fontSize: '40px',
                width: '100%',
                overflowX: 'auto',
                overflowY: 'none',
                maxHeight: '50px',
              }}
            >
              {text}
            </Typography>
          </Box>
        </Box>
      </div>
      {/* CONTACT INFO */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
          disabled={!text}
          sx={{ height: '60px', display: 'flex', width: '400px', gap: '10px' }}
        >
          <Box>Sign and Complete</Box> <ArrowForwardIcon />
        </Button>
      </Box>
    </>
  );
};

export default TextSign;
