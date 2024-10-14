import React from 'react';
import PropsTypes from 'prop-types';
import { Box } from '@mui/material';

const StandardSidebarWrapper = ({ children, ...rest }) => {
  return (
    <Box
      sx={{
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.5s ease',
        position: 'relative',
        top: 0,
        left: 0,
        zIndex: 1101,
        '& .app-sidebar': {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          width: '100%',
          borderRight: '0 none',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default StandardSidebarWrapper;

StandardSidebarWrapper.propTypes = {
  children: PropsTypes.node,
};
