import React from 'react';
import { Box } from '@mui/material';
import PropsTypes from 'prop-types';

const MainContent = ({ children, ...rest }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        ml: { lg: '280px' },
        width: { xs: '100%', lg: `calc(100% - 280px)` },
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.5s ease',
      }}
      className='mainContent'
      {...rest}
    >
      {children}
    </Box>
  );
};

export default MainContent;

MainContent.propTypes = {
  children: PropsTypes.node,
};
