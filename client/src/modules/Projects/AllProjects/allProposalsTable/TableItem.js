import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { getRoles } from 'utils/roleUtils';
import { roleStatusDisplay } from 'utils/roleStatusDisplay';
import UsersSelect from 'modules/Users/AllProposalUsers/UsersSelect';
import SingleUser from 'modules/Users/AllProposalUsers/SingleUser';
import AppTooltip from '@crema/components/AppTooltip';
import AppsDeleteIcon from '@crema/components/AppsDeleteIcon';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const TableItem = ({ data, handleDeleteProposal }) => {
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const [role, setRole] = useState('');

  // CONFIGURE DATE: get date from proposal, create a new date out of it, and run DAte methods on it to show mm/dd/yyyy
  const date = new Date(data.updatedAt);
  const fullDate = `${date.getMonth() + 1}/${date.getDate()}/${
    date.getFullYear() % 100
  }`;

// set user role
  useEffect(() => {
    let userRole = getRoles(data, user);
    setRole(userRole);
  }, [data]);

  return (
    <TableRow key={data.id} className='item-hover'>
      {/* TITLE */}
      <StyledTableCell align='left' sx={{ width: '150px' }}>
        <Button
          sx={{
            marginLeft: '-20px',
            width: '150px',
            display: 'flex',
            overflow: 'auto',
          }}
          onClick={() =>
            navigate(
              data.status === 'draft' || data.status === 'in-revision'
                ? `/edit-project/${data._id}`
                : `/sent-project/${data._id}`,
            )
          }
        >
          {data.title ? (
            <AppTooltip title={data.title}>{data.title}</AppTooltip>
          ) : (
            <InfoOutlinedIcon />
          )}
        </Button>
      </StyledTableCell>

      {/* CLIENT NAME */}
      <StyledTableCell align='left'>
        {/*if clientId exits, display that name, othertwise dispplay name used in proposal, else  message */}
        <SingleUser
          user={
            data.clientId ? data.clientId : { userName: 'No client assigned' }
          }
          sxStyle={{ width: '150px' }}
          role={role}
          hideRoleDisplay={true}
        />
      </StyledTableCell>

      {/* BUSINESS  */}
      <StyledTableCell align='left' sx={{ width: 50 }}>
        <SingleUser
          user={data.businessId}
          isBusiness={true}
          sxStyle={{ width: '150px' }}
          role={role}
          hideRoleDisplay={true}
        />
      </StyledTableCell>
      {/* ROLE */}
      <StyledTableCell align='left' sx={{}}>
        <AppTooltip title={`Role: ${role.displayRole}`} arrow>
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={
              data.status === 'draft' || data.status === 'returned-revision'
                ? `/edit-project/${data._id}`
                : `/sent-project/${data._id}`
            }
          >
            {role.displayRole}
          </Link>
        </AppTooltip>
      </StyledTableCell>
      {/* PROPOSAL STATUS */}
      <StyledTableCell align='left' sx={{ maxWidth: 150 }}>
        <AppTooltip title={roleStatusDisplay(data, role)} arrow>
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={
              data.status === 'draft' || data.status === 'returned-revision'
                ? `/edit-project/${data._id}`
                : `/sent-project/${data._id}`
            }
          >
            {/* Depending on role type(client or business) and status, give brief description */}
            {roleStatusDisplay(data, role)}
          </Link>
        </AppTooltip>
      </StyledTableCell>

      {/* PROPOSAL Budget*/}
      <StyledTableCell align='left' sx={{ maxWidth: 100 }}>
        <AppTooltip
          title={`Budget: ${
            data.metadata?.proposalInfo.budgetAndPricing || 'N/A'
          }`}
          arrow
        >
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={
              data.status === 'draft' || data.status === 'returned-revision'
                ? `/edit-project/${data._id}`
                : `/sent-project/${data._id}`
            }
          >
            {data.metadata?.proposalInfo.budgetAndPricing
              ? data.metadata?.proposalInfo.budgetAndPricing
              : ''}
          </Link>
        </AppTooltip>
      </StyledTableCell>
      {/* DATE */}
      <StyledTableCell align='left'>
        {' '}
        <Link
          style={{ textDecoration: 'none', color: 'black' }}
          to={
            data.status === 'draft' || data.status === 'returned-revision'
              ? `/edit-project/${data._id}`
              : `/sent-project/${data._id}`
          }
        >
          {fullDate}
        </Link>
      </StyledTableCell>

      {/* PROPOSAL USERS */}
      <StyledTableCell align='left'>
        <UsersSelect proposal={data} />
      </StyledTableCell>

      {/* EDIT/VIEW button, depeneding on the status of the proposal */}
      <StyledTableCell align='left'>
        {/* DELETE BUTTON */}
        {(role.role === 'clientAdmin' || role.role === 'businessAdmin') && (
          <Button
            sx={{ marginLeft: '-15px' }}
            onClick={() => {
              handleDeleteProposal(data._id);
            }}
          >
            <AppsDeleteIcon />
          </Button>
        )}
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
};
