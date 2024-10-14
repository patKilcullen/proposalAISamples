import React from 'react';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';

const AppGridContainer = ({ children, ...others }) => {
  const isMDDown = useMediaQuery((theme) => theme.breakpoints.down('md'));
  return (
    <Grid container spacing={isMDDown ? 5 : 8} {...others}>
      {children}
    </Grid>
  );
};

export default AppGridContainer;

AppGridContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
