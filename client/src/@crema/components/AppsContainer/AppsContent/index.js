import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import SimpleBarReact from 'simplebar-react';

const AppsContentContainer = styled(SimpleBarReact)(() => {
  return {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'column',
    '& .simplebar-content': {
      height: '100%',
    },
  };
});

const AppsContent = ({ isDetailView, fullView, children, ...rest }) => {
  return (
    <AppsContentContainer
      {...rest}
      sx={{
        height: {
          xs: `calc(100% - ${isDetailView ? 60 : 129}px)`,
          sm: `calc(100% - ${fullView ? 0 : 60}px)`,
        },
      }}
    >
      {children}
    </AppsContentContainer>
  );
};

export default AppsContent;

AppsContent.propTypes = {
  children: PropTypes.node,
  fullView: PropTypes.bool,
  isDetailView: PropTypes.bool,
};

AppsContent.defaultProps = { isDetailView: false };
