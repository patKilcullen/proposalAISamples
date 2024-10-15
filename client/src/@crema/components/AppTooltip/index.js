import React from 'react';
import PropTypes from 'prop-types';
import Zoom from '@mui/material/Zoom';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { lighten } from '@mui/material';
import styled from '@emotion/styled';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: lighten(theme.palette.background.default, 0.25),
    '&:before': {
      boxShadow: theme.shadows[1],
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: lighten(theme.palette.background.default, 0.25),
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const AppTooltip = ({ title, children, placement = 'top' }) => {
  return (
    <LightTooltip
      title={title}
      TransitionComponent={Zoom}
      placement={placement}
      arrow
    >
      {children}
    </LightTooltip>
  );
};
export default AppTooltip;

AppTooltip.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.object,
  ]),
  placement: PropTypes.string,
  children: PropTypes.node,
};
