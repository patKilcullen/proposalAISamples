import React from 'react';
import PropsTypes from 'prop-types';
import { Box } from '@mui/material';

const SidebarWrapper = ({ children, ...rest }) => {
  return (
    <Box
      sx={{
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.5s ease',
        position: { xs: 'relative', lg: 'fixed' },
        top: 0,
        left: 0,
        zIndex: 1101,
        '& .app-sidebar': {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          width: '100%',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default SidebarWrapper;

SidebarWrapper.propTypes = {
  children: PropsTypes.node,
};
