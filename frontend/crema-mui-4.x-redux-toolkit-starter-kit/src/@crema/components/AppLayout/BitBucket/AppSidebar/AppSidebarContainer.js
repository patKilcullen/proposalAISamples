import React from 'react';
import PropsTypes from 'prop-types';
import { Box } from '@mui/material';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';

const AppSidebarContainer = ({ children, ...rest }) => {
  const { borderColor } = useSidebarContext();
  return (
    <Box
      sx={{
        pl: 0,
        py: 0,
        transition: 'all 0.5s ease',
        width: 256,
        borderLeft: `solid 1px ${borderColor}`,
        '& .app-sidebar': {
          position: 'relative',
          width: '100%',
          zIndex: 1,
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default AppSidebarContainer;

AppSidebarContainer.propTypes = {
  children: PropsTypes.node,
};
