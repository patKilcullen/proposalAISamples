import React, { useMemo } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/components/AppTableContainer';
import AppLoader from '@crema/components/AppLoader';

const ProposalTable = ({
  proposalData,
  loading,
  onChangeStatus,
  handleDeleteProposal,
  handleReverseDate,
  handleReverseOrder,
}) => {
  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading
            handleReverseDate={handleReverseDate}
            handleReverseOrder={handleReverseOrder}
          />
        </TableHead>

        <TableBody>
          {loading ? (
            <AppLoader />
          ) : (
            proposalData.map((data) => (
              <TableItem
                data={data}
                key={data._id}
                onChangeStatus={onChangeStatus}
                handleDeleteProposal={handleDeleteProposal}
              />
            ))
          )}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default ProposalTable;

ProposalTable.defaultProps = {
  productData: [],
};

ProposalTable.propTypes = {
  productData: PropTypes.array,
  loading: PropTypes.bool,
};
