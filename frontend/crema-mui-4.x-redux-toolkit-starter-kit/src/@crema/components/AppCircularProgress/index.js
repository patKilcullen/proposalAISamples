import React from 'react';
import ProtoTypes from 'prop-types';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Fonts } from '@crema/constants/AppEnums';

const AppCircularProgress = ({
  value,
  centerNode,
  hidePercentage,
  minWidth,
  maxWidth,
  valueStyle,
  activeColor,
  pathColor,
  thickness,
  ...props
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        minWidth: minWidth,
        maxWidth: maxWidth,
        margin: '0 auto',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          variant='determinate'
          value={100}
          sx={{
            color: pathColor,
            width: '100% !important',
            height: '100% !important',
          }}
          thickness={thickness}
          {...props}
        />
        <CircularProgress
          sx={{
            color: activeColor,
            animationDuration: '550ms',
            position: 'absolute',
            left: (theme) => (theme.direction === 'rtl' ? -2 : 2),
            top: -2,
            width: '100% !important',
            height: '100% !important',
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          variant='determinate'
          value={value}
          thickness={thickness}
          {...props}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {centerNode}
        {hidePercentage ? null : (
          <Box
            component='p'
            sx={{
              fontSize: 30,
              fontWeight: Fonts.MEDIUM,
              color: (theme) => theme.palette.secondary.main,
              ...valueStyle,
            }}
          >
            {value}%
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default AppCircularProgress;
AppCircularProgress.propTypes = {
  hidePercentage: ProtoTypes.bool,
  centerNode: ProtoTypes.node,
  minWidth: ProtoTypes.oneOfType([ProtoTypes.number, ProtoTypes.object]),
  maxWidth: ProtoTypes.oneOfType([ProtoTypes.number, ProtoTypes.object]),
  pathColor: ProtoTypes.string,
  activeColor: ProtoTypes.string,
  value: ProtoTypes.number,
  thickness: ProtoTypes.number,
  valueStyle: ProtoTypes.object,
};

AppCircularProgress.defaultProps = {
  hidePercentage: false,
  minWidth: 160,
  maxWidth: 200,
  pathColor: '#d6d6d6',
  activeColor: '#23fa23',
  thickness: 10,
};
