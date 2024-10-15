import React from 'react';

import { Box, Typography } from '@mui/material';

// Contact Info Item
const ContactInfo = ({ title, info, icon }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          color: 'grey',
        }}
      >
        {icon}
        <Typography>{title}:</Typography>
      </Box>

      {info}
    </Box>
  );
};

export default ContactInfo;
