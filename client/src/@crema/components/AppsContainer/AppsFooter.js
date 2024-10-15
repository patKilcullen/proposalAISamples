import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const AppsFooter = (props) => {
  const { children } = props;
  return (
    <Box
      sx={{
        px: 5,
        py: 2,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      {children}
    </Box>
  );
};

export default AppsFooter;

AppsFooter.propTypes = {
  children: PropTypes.node,
};
