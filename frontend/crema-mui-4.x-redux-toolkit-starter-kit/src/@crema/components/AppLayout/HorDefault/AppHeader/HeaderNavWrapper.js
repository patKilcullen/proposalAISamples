import React from 'react';
import PropsTypes from 'prop-types';
import { alpha, Box } from '@mui/material';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';

const HeaderNavWrapper = ({ children }) => {
  const {
    sidebarBgColor,
    sidebarTextColor,
    sidebarMenuSelectedBgColor,
    sidebarMenuSelectedTextColor,
  } = useSidebarContext();
  return (
    <Box
      sx={{
        backgroundColor: sidebarBgColor,
        color: sidebarTextColor,
        py: 2.5,
        '& .navbarNav': {
          display: 'flex',
          padding: 0,
        },
        '& .navItem': {
          width: 'auto',
          cursor: 'pointer',
          py: 1,
          px: { xs: 4, lg: 5 },
          borderRadius: 1,
          '&.active': {
            color: sidebarMenuSelectedTextColor,
            backgroundColor: alpha(sidebarMenuSelectedBgColor, 0.8),
            '& .navLinkIcon': {
              color: (theme) => theme.palette.secondary.main,
            },
          },
        },
        '& .navLinkIcon': {
          mr: 2.5,
          color: (theme) => theme.palette.common.white,
          fontSize: 20,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default HeaderNavWrapper;

HeaderNavWrapper.propTypes = {
  children: PropsTypes.node,
};
