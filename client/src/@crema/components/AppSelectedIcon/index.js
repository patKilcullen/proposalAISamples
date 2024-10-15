import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const AppSelectedIcon = ({ backgroundColor, isCenter = true, color }) => {
  let centerStyle = isCenter
    ? {
        position: 'absolute',
        left: '50%',
        top: '50%',
        zIndex: 1,
        transform: 'translate(-50%, -50%)',
      }
    : {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
      };
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: backgroundColor || 'primary.main',
        color: color || 'primary.contrastText',
        ...centerStyle,
        '& svg': {
          fontSize: 16,
        },
      }}
    >
      <CheckIcon>
        <IntlMessages id='customizer.checked' />
      </CheckIcon>
    </Box>
  );
};

export default AppSelectedIcon;

AppSelectedIcon.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  isCenter: PropTypes.bool,
};
