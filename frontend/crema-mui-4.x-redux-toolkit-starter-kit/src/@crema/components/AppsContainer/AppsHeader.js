import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

const AppsHeader = ({ children }) => {
  return (
    <Box
      sx={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        padding: {
          xs: '4px 10px',
          xl: '12px 10px',
        },
      }}
      className='apps-header'
    >
      {children}
    </Box>
  );
};

export default AppsHeader;

AppsHeader.propTypes = {
  children: PropTypes.node,
};

AppsHeader.defaultProps = {};
