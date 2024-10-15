import React from 'react';
import PropsTypes from 'prop-types';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material';
import { ThemeMode } from '@crema/constants/AppEnums';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';

const SidebarBgWrapper = ({ children }) => {
  const {
    sidebarBgColor,
    sidebarTextColor,
    mode,
    allowSidebarBgImage,
    sidebarBgImageId,
  } = useSidebarContext();
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: sidebarBgColor,
        backgroundImage: allowSidebarBgImage
          ? `url(/assets/images/sidebar/images/${sidebarBgImageId}.png)`
          : '',
        backgroundRepeat: allowSidebarBgImage ? 'no-repeat' : '',
        backgroundPosition: allowSidebarBgImage ? 'center center' : '',
        backgroundSize: allowSidebarBgImage ? 'cover' : '',
        color: sidebarTextColor,
        // boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.04)',
        '&:before': {
          content: '""',
          display: allowSidebarBgImage ? 'block' : 'none',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: (theme) =>
            mode === ThemeMode.LIGHT
              ? alpha(theme.palette.common.white, 0.5)
              : alpha(theme.palette.common.black, 0.5),
        },
        '& > *': {
          position: 'relative',
          zIndex: 3,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default SidebarBgWrapper;

SidebarBgWrapper.propTypes = {
  children: PropsTypes.node,
  allowSidebarBgImage: PropsTypes.bool,
  themeMode: PropsTypes.string,
  sidebarBgColor: PropsTypes.oneOfType([PropsTypes.string, PropsTypes.number]),
  sidebarBgImageId: PropsTypes.oneOfType([
    PropsTypes.string,
    PropsTypes.number,
  ]),
};
