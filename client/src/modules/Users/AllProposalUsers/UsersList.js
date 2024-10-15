import React, { useMemo, useState, useEffect } from 'react';
import AppCard from '@crema/components/AppCard';
import SingleUser from './SingleUser';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const AllProposalUsers = ({ proposal, userRole, stakeholders }) => {
  const [businessName, setBusinessName] = useState('');
  const [clientName, setClientName] = useState('');

  // SET BUSINESS AND CLIENT NAME
  useEffect(() => {
    setBusinessName(proposal?.businessId?.businessName);
    setClientName(
      proposal.clientId?.businessId
        ? proposal.clientId.businessId.businessName
        : proposal.clientId?.userName,
    );
  }, [proposal?.businessId?.businessName, proposal.clientId?.userName]);

  // MEMOIZED VERSION OF DIFERENT ROLES
  const memoizedBusinessUser = useMemo(() => {
    return (
      <SingleUser
        user={proposal.businessId}
        role={{ displayRole: 'Business Administrator', role: 'businessAdmin' }}
        isBusiness={true}
        business={businessName}
        businessType={
          userRole === 'businessAdmin'
            ? 'business'
            : userRole === 'clientAdmin'
              ? 'client'
              : null
        }
      />
    );
  }, [proposal._id, businessName]);

  const memoizedClientUser = useMemo(() => {
    return proposal?.clientId ? (
      <SingleUser
        ass={true}
        isBusiness={proposal?.clientId?.businessId ? true : false}
        user={
          proposal?.clientId?.businessId
            ? proposal.clientId.businessId
            : proposal?.clientId
        } //if client has business, display business info
        role={{ displayRole: 'Client Administrator', role: 'clientAdmin' }}
        business={clientName}
        businessType={
          userRole === 'businessAdmin'
            ? 'business'
            : userRole === 'clientAdmin'
              ? 'client'
              : null
        }
      />
    ) : null;
  }, [proposal._id, clientName]);

  const memoizedClientCollaborators = useMemo(() => {
    return proposal?.clientCollaborators?.length > 0
      ? proposal.clientCollaborators.map((user, key) => (
          <SingleUser
            key={key}
            user={user}
            role={{
              displayRole: 'Client Collaborator',
              role: 'clientCollaborator',
            }}
            business={clientName}
            userCanEdit={userRole === 'clientAdmin'}
            pid={proposal._id}
            businessType={
              userRole === 'businessAdmin'
                ? 'business'
                : userRole === 'clientAdmin'
                  ? 'client'
                  : null
            }
          />
        ))
      : null;
  }, [proposal._id, clientName]);

  const memoizedBusinessCollaborators = useMemo(() => {
    return proposal?.businessCollaborators?.length > 0
      ? proposal.businessCollaborators.map((user, key) => (
          <SingleUser
            key={key}
            user={user}
            role={{
              displayRole: 'Business Collaborator',
              role: 'businessCollaborator',
            }}
            business={businessName}
            userCanEdit={userRole === 'businessAdmin'}
            pid={proposal._id}
            businessType={
              userRole === 'businessAdmin'
                ? 'business'
                : userRole === 'clientAdmin'
                  ? 'client'
                  : null
            }
          />
        ))
      : null;
  }, [proposal._id, businessName]);

  const memoizedClientApprovers = useMemo(() => {
    return proposal?.clientApprovers?.length > 0
      ? proposal.clientApprovers.map((user, key) => (
          <SingleUser
            key={key}
            user={user}
            role={{ displayRole: 'Client Approver', role: 'clientApprover' }}
            business={clientName}
            userCanEdit={userRole === 'clientAdmin'}
            pid={proposal._id}
            businessType={
              userRole === 'businessAdmin'
                ? 'business'
                : userRole === 'clientAdmin'
                  ? 'client'
                  : null
            }
          />
        ))
      : null;
  }, [proposal._id, clientName]);

  const memoizedBusinessApprovers = useMemo(() => {
    return proposal?.businessApprovers?.length > 0
      ? proposal.businessApprovers.map((user, key) => (
          <SingleUser
            key={key}
            user={user}
            role={{
              displayRole: 'Business Approver',
              role: 'businessApprover',
            }}
            business={businessName}
            userCanEdit={userRole === 'businessAdmin'}
            pid={proposal._id}
            businessType={
              userRole === 'businessAdmin'
                ? 'business'
                : userRole === 'clientAdmin'
                  ? 'client'
                  : null
            }
          />
        ))
      : null;
  }, [proposal._id, businessName]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      {!stakeholders && (
        <Typography
          sx={{
            borderBottom: '1px solid',
            borderColor: grey[500],
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
          Proposal Roles
        </Typography>
      )}
      <AppCard sx={{ boxShadow: '0', overflow: 'auto', width: '250px' }}>
        {memoizedBusinessUser}
        {memoizedClientUser}
        {memoizedClientCollaborators}
        {memoizedBusinessCollaborators}
        {memoizedClientApprovers}
        {memoizedBusinessApprovers}
      </AppCard>
    </Box>
  );
};

export default AllProposalUsers;
