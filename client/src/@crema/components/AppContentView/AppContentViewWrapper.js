import React from 'react';
import PropsTypes from 'prop-types';
import { Box } from '@mui/material';

const AppContentViewWrapper = ({ children, ...rest }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
        maxWidth: { xl: 1650 },
        mx: { xl: 'auto' },
        width: { xl: '100%' },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default AppContentViewWrapper;

AppContentViewWrapper.propTypes = {
  children: PropsTypes.node,
};
