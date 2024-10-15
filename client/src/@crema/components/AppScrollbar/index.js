import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const StyledSimpleBarReact = styled(SimpleBarReact)(() => ({
  height: '100%',
  width: '100%',
}));

const AppScrollbar = (props) => {
  const { children, ...others } = props;

  return <StyledSimpleBarReact {...others}>{children}</StyledSimpleBarReact>;
};

export default AppScrollbar;

AppScrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
