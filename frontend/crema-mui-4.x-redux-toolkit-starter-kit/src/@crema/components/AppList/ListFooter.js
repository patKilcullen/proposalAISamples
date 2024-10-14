import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ListFooter = ({ loading, footerText }) => {
  return loading ? (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        color: (theme) => theme.palette.text.secondary,
        justifyContent: 'center',
        p: 2,
        borderTop: 1,
        borderTopColor: (theme) => theme.palette.divider,
        boxSizing: 'border-box',
      }}
    >
      <CircularProgress size={16} />
      <Box component='span' sx={{ ml: 2 }}>
        Loading...
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        p: 2.5,
        color: (theme) => theme.palette.text.secondary,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography>{footerText}</Typography>
    </Box>
  );
};

ListFooter.propTypes = {
  loading: PropTypes.bool,
  footerText: PropTypes.string,
};

ListFooter.defaultProps = {
  loading: false,
};

export default ListFooter;
