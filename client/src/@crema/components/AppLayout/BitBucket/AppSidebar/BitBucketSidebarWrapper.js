import React from 'react';
import PropsTypes from 'prop-types';
import { Box } from '@mui/material';

const BitBucketSidebarWrapper = ({ children, ...rest }) => {
  return (
    <Box
      sx={{
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.5s ease',
        '& .bit-bucket-sidebar-fixed': {
          display: 'flex',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 99,
        },
        '& .bit-bucket-btn': {
          position: 'absolute',
          top: 20,
          right: '-12px',
          borderRadius: '50%',
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
          cursor: 'pointer',
          zIndex: 99,
          display: { xs: 'none', lg: 'block' },
          '& svg': {
            display: 'block',
          },
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default BitBucketSidebarWrapper;

BitBucketSidebarWrapper.propTypes = {
  children: PropsTypes.node,
};
