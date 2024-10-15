import React from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';

const getEmptyContainer = (ListEmptyComponent) => {
  if (ListEmptyComponent)
    return React.isValidElement(ListEmptyComponent) ? (
      ListEmptyComponent
    ) : (
      <ListEmptyComponent />
    );
  return null;
};

const getFooterContainer = (ListFooterComponent) => {
  if (ListFooterComponent)
    return React.isValidElement(ListFooterComponent) ? (
      ListFooterComponent
    ) : (
      <ListFooterComponent />
    );
  return null;
};
const ListView = ({
  renderRow,
  onEndReached,
  data,
  // animation,
  // delay = 0,
  // duration = 200,
  containerStyle,
  border,
  ListFooterComponent,
  ListEmptyComponent,
  ...rest
}) => {
  const theme = useTheme();
  const borderStyle = {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    overflow: 'hidden',
  };

  if (!onEndReached) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onEndReached = () => {};
  }

  let style = containerStyle;
  if (border) {
    style = { ...style, ...borderStyle };
  }
  useBottomScrollListener(onEndReached, 200);
  return (
    <Box
      style={{ ...style }}
      {...rest}
      // enter={{ delay, duration, animation }}
    >
      {data.length > 0
        ? data.map((item, index) => renderRow(item, index))
        : getEmptyContainer(ListEmptyComponent)}
      {getFooterContainer(ListFooterComponent)}
    </Box>
  );
};

export default ListView;
ListView.propTypes = {
  border: PropTypes.bool,
  renderRow: PropTypes.func,
  delay: PropTypes.number,
  duration: PropTypes.number,
  animation: PropTypes.string,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
};
ListView.defaultProps = {
  border: false,
  // animation: 'transition.slideUpIn',
  data: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onEndReached: () => {},
};
