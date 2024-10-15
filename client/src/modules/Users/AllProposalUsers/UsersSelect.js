import React, { useMemo, useState, useEffect } from 'react';
import SingleUser from './SingleUser';
import Select from './Select';

const UsersSelect = ({ proposal }) => {
  const [businessName, setBusinessName] = useState('');
  const [clientName, setClientName] = useState('');

  // SET BIZ AND CLIENT NAMES
  useEffect(() => {
    setBusinessName(proposal.businessId.businessName);
    setClientName(proposal?.clientId?.userName);
  }, [proposal.businessId.businessName, proposal.clientId?.userName]);

  // MEMOIZED VERSION OF DIFERENT ROLES
  const memoizedBusinessUser = useMemo(() => {
    return {
      role: 'businessAdmin',
      user: (
        <SingleUser
          user={proposal.businessId}
          role={{ displayRole: 'Business Admin', role: 'businessAdmin' }}
          isBusiness={true}
          business={businessName}
        />
      ),
    };
  }, [proposal._id, businessName]);

  const memoizedClientUser = useMemo(() => {
    return proposal.clientId
      ? {
          role: 'clientAdmin',
          user: (
            <SingleUser
              user={proposal.clientId}
              role={{ displayRole: 'Client Admin', role: 'clientAdmin' }}
              business={clientName}
            />
          ),
        }
      : {};
  }, [proposal._id, clientName]);

  const memoizedClientCollaborators = useMemo(() => {
    return proposal?.clientCollaborators?.length > 0
      ? proposal.clientCollaborators.map((user, key) => ({
          role: 'clientCollaborators',
          user: (
            <SingleUser
              key={key}
              user={user}
              role={{
                displayRole: 'Client Collaborator',
                role: 'clientCollaborator',
              }}
              business={clientName}
            />
          ),
        }))
      : [];
  }, [proposal._id, clientName]);

  const memoizedBusinessCollaborators = useMemo(() => {
    return proposal?.businessCollaborators?.length > 0
      ? proposal.businessCollaborators.map((user, key) => ({
          role: 'businessCollaborators',
          user: (
            <SingleUser
              key={key}
              user={user}
              role={{
                displayRole: 'Business Collaborator',
                role: 'businessCollaborator',
              }}
              business={businessName}
            />
          ),
        }))
      : [];
  }, [proposal._id, businessName]);

  const memoizedClientApprovers = useMemo(() => {
    return proposal?.clientApprovers?.length > 0
      ? proposal.clientApprovers.map((user, key) => ({
          role: 'clientApprovers',
          user: (
            <SingleUser
              key={key}
              user={user}
              role={{ displayRole: 'Client Approver', role: 'clientApprover' }}
              business={clientName}
            />
          ),
        }))
      : [];
  }, [proposal._id, clientName]);

  const memoizedBusinessApprovers = useMemo(() => {
    return proposal?.businessApprovers?.length > 0
      ? proposal.businessApprovers.map((user, key) => ({
          role: 'businessApprovers',
          user: (
            <SingleUser
              key={key}
              user={user}
              role={{
                displayRole: 'Business Approver',
                role: 'businessApprover',
              }}
              business={businessName}
            />
          ),
        }))
      : [];
  }, [proposal._id, businessName]);

  return (
    <Select
      menus={[
        memoizedClientUser,
        memoizedBusinessUser,
        ...memoizedBusinessCollaborators,
        ...memoizedBusinessApprovers,
        ...memoizedClientCollaborators,
        ...memoizedClientApprovers,
        {},
      ]}
    ></Select>
  );
};

export default UsersSelect;
