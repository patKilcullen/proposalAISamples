import React from 'react';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { Fonts } from '@crema/constants/AppEnums';

const TableHeaderRow = styled(TableRow)(({ theme }) => {
  return {
    '& th': {
      fontSize: 14,
      padding: 8,
      fontWeight: Fonts.MEDIUM,
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.common.white,
      '&:first-of-type': {
        paddingLeft: 20,
      },
      '&:last-of-type': {
        paddingRight: 20,
      },
    },
  };
});

const TableHeader = ({ children, ...rest }) => {
  return <TableHeaderRow {...rest}>{children}</TableHeaderRow>;
};

export default TableHeader;
TableHeader.propTypes = {
  children: PropTypes.node,
};
