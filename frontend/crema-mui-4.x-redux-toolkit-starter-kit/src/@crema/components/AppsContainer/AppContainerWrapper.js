import React from 'react';
import PropsTypes from 'prop-types';
import Box from '@mui/material/Box';
import { NavStyle } from '@crema/constants/AppEnums';

const getMainHeaderHeight = (navStyle, screenSize) => {
  if (navStyle === NavStyle.BIT_BUCKET) return screenSize >= 1200 ? 0 : 70; // Header Height
  return screenSize >= 600 ? 70 : 56;
};

const AppContainerWrapper = ({ children, navStyle, footer, ...rest }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: {
          xs: `calc(100vh - ${
            47 + // AppsHeader Height // apps title block height
            40 + //Container Padding
            getMainHeaderHeight(navStyle, 0) +
            (footer ? 47 : 0)
          }px) !important`,
          sm: `calc(100vh - ${
            47 + // AppsHeader Height
            40 + //Container Padding
            getMainHeaderHeight(navStyle, 600) +
            (footer ? 47 : 0)
          }px) !important`,
          md: `calc(100vh - ${
            47 + // AppsHeader Height
            60 + //Container Padding
            getMainHeaderHeight(navStyle, 900) +
            (footer ? 47 : 0)
          }px) !important`,
          lg: `calc(100vh - ${
            40 + // AppsHeader Height
            60 + //Container Padding
            getMainHeaderHeight(navStyle, 1200) +
            (footer ? 47 : 0)
          }px) !important`,
          xl: `calc(100vh - ${
            40 + // AppsHeader Height
            100 + //Container Padding
            getMainHeaderHeight(navStyle, 1536) +
            (footer ? 57 : 0)
          }px) !important`,
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default AppContainerWrapper;

AppContainerWrapper.propTypes = {
  children: PropsTypes.node,
  navStyle: PropsTypes.string,
  footer: PropsTypes.bool,
};
