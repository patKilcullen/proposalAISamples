import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';

const AppsPagination = ({
  count = 0,
  page,
  onPageChange,
  rowsPerPage,
  ...rest
}) => {
  return (
    <TablePagination
      component='div'
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      nextIconButtonProps={{ 'aria-label': 'Next Page' }}
      onPageChange={onPageChange}
      rowsPerPageOptions={[]}
      {...rest}
    />
  );
};

export default AppsPagination;

AppsPagination.defaultProps = {
  rowsPerPage: 15,
};

AppsPagination.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  rowsPerPage: PropTypes.number,
};
