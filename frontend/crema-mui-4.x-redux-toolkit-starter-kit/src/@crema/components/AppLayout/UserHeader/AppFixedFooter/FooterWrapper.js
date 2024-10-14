import React from 'react';
import { alpha, Box } from '@mui/material';
import PropsTypes from 'prop-types';

const FooterWrapper = ({ children, ...rest }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 1102,
        boxShadow: 'none',
        border: '1px solid #e8e5dd',
        backgroundColor: (theme) => theme.palette.background.paper,
        backgroundImage: (theme) =>
          `linear-gradient(${alpha(theme.palette.common.white, 0.05)}, ${alpha(
            theme.palette.common.white,
            0.05,
          )})`,
        color: (theme) => theme.palette.text.primary,
        margin: '0',
        '& .footerContainer': {
          alignItems: 'center',
          flexDirection: 'row',
          display: 'flex',
          padding: { xs: '5px 20px', md: '5px 32px', xl: '10px 32px' },
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default FooterWrapper;

FooterWrapper.propTypes = {
  children: PropsTypes.node,
  sidebarHeaderColor: PropsTypes.string,
};
