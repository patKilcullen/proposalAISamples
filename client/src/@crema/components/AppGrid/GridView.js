import React, { useEffect, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import PropTypes from 'prop-types';
import { Box, useTheme } from '@mui/material';
import { useWidth } from '@crema/helpers/Common';

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

const GridView = ({
  sx,
  column,
  responsive,
  itemPadding,
  // animation,
  renderRow,
  onEndReached,
  data,
  containerStyle,
  border,
  ListFooterComponent,
  ListEmptyComponent,
}) => {
  const theme = useTheme();
  const width = useWidth();
  const borderStyle = {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    overflow: 'hidden',
  };

  const [displayColumn, setColumn] = useState(column);
  if (!onEndReached) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onEndReached = () => {};
  }

  useEffect(() => {
    setColumn(column);
  }, [column]);

  useEffect(() => {
    const getColumnCount = () => {
      if (responsive) {
        if (width === 'xs') {
          return responsive.xs || column;
        } else if (width === 'sm') {
          return responsive.sm || responsive.xs || column;
        } else if (width === 'md') {
          return responsive.md || responsive.sm || responsive.xs || column;
        } else if (width === 'lg') {
          return (
            responsive.lg ||
            responsive.md ||
            responsive.sm ||
            responsive.xs ||
            column
          );
        } else if (width === 'xl') {
          return (
            responsive.xl ||
            responsive.lg ||
            responsive.md ||
            responsive.sm ||
            responsive.xs ||
            column
          );
        }
      } else {
        return column;
      }
    };
    setColumn(getColumnCount());
  }, [width, column, responsive]);

  let style = containerStyle;
  if (border) {
    style = { ...style, ...borderStyle };
  }
  useBottomScrollListener(onEndReached, 200);
  return (
    <Box
      sx={{
        width: '100%',
        ...sx,
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          margin: -itemPadding,
          ...style,
        }}
      >
        {data.length > 0
          ? data.map((item, index) => (
              <Box
                style={{
                  flexGrow: 0,
                  maxWidth: `${100 / displayColumn}%`,
                  flexBasis: `${100 / displayColumn}%`,
                  padding: itemPadding,
                  boxSizing: 'border-box',
                }}
                key={'grid-' + index}
              >
                {renderRow(item, index)}
              </Box>
            ))
          : null}
      </Box>
      {data.length === 0 ? getEmptyContainer(ListEmptyComponent) : null}
      {getFooterContainer(ListFooterComponent)}
    </Box>
  );
};

export default GridView;
GridView.propTypes = {
  sx: PropTypes.object,
  theme: PropTypes.object,
  width: PropTypes.string,
  responsive: PropTypes.object,
  itemPadding: PropTypes.number,
  renderRow: PropTypes.func,
  border: PropTypes.bool,
  column: PropTypes.number,
  animation: PropTypes.string,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
};
GridView.defaultProps = {
  border: false,
  data: [],
  column: 3,
  animation: 'transition.expandIn',
  itemPadding: 12,
  // responsive: {
  //   xs: 1,
  //   sm: 2,
  //   md: 2,
  //   lg: 4,
  //   xl: 4,
  // },
};
