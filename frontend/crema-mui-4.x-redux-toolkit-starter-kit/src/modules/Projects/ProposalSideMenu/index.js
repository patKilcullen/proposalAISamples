import React, { useState, useEffect, useMemo } from 'react';
import AppCard from '@crema/components/AppCard';
import { Box, FormControl, Select, MenuItem, Typography } from '@mui/material';
import AddTeamMembers from 'modules/teamManagement/AddTeamMembers';
import CompareVersions from 'modules/Components/CompareVersions';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import AllProposalUsers from 'modules/Users/AllProposalUsers/UsersList';
import { formatDate } from 'utils/formatDate';
import { getRoles } from 'utils/roleUtils';
import SingleUser from 'modules/Users/AllProposalUsers/SingleUser';
import { Fonts } from '@crema/constants/AppEnums';
import ProposalStatus from './ProposalStatus';

const ProposalSideMenu = ({
  proposal,
  role,
  selectedVersionNum,
  proposalVersions,
  handleSelectVersion,
  displayRole,
  buttons,
  hasAutoSaveError,
  roleType,
}) => {
  const [updatedAt, setUpdatedAt] = useState('');

  // VERSION CREATOR... the creator of the current proposal version
  const [versionCreator, setVersionCreator] = useState({
    user: null,
    role: null,
    business: null,
  });

  // SET VERSION CREATOR
  useEffect(() => {
    if (proposalVersions.length > 0) {
      const createrRole = getRoles(
        proposal,
        proposalVersions[selectedVersionNum]?.creator,
      );
      setVersionCreator({
        user: proposalVersions[selectedVersionNum]?.creator,
        role: createrRole,
        business: createrRole.roleType,
      });
    }
  }, [selectedVersionNum, proposalVersions]);

  // VERSION CREATOR
  const memoizedVersionCreator = useMemo(() => {
    return (
      <SingleUser
        user={
          versionCreator?.role?.role === 'businessAdmin' ||
          versionCreator?.role?.role === 'clientAdmin'
            ? versionCreator?.user?.businessId
            : versionCreator?.user
        }
        role={versionCreator?.role}
        isBusiness={
          versionCreator?.role?.role === 'businessAdmin' ||
          versionCreator?.role?.role === 'clientAdmin'
            ? true
            : false
        }
        business={
          versionCreator.business === 'business'
            ? proposal?.businessId?.businessName
            : proposal?.clientId?.userName
        }
        sxStyle={{ width: '200px' }}
        versionCreator={true}
        hideRoleDisplay={true}
      />
    );
  }, [versionCreator]);

  // WHEN PROPSAL UPDATED, ADD UPDATED DATE based on version displayed
  useEffect(() => {
    const versionDate = proposalVersions[selectedVersionNum]?.updatedAt;
    const date = new Date(versionDate);
    setUpdatedAt(formatDate(date));
  }, [proposal.updatedAt, selectedVersionNum, proposalVersions]);

  return (
    <AppCard sx={{ overflow: 'auto' }}>
      {/* DROPDOWN FOR PROPOSAL VERSION NUMBER */}
      <FormControl required sx={{ m: 1, width: '100%' }}>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '0 auto',
            fontWeight: Fonts.BOLD,
          }}
        >
          Versions
          {/* COMPARE VERSIONS */}
          {proposalVersions.length > 1 && (
            <CompareVersions proposalVersions={proposalVersions} />
          )}
          :
        </Typography>
        <Select
          labelId='demo-simple-select-required-label'
          id='demo-simple-select-required'
          value={selectedVersionNum}
          // label='Version'
          onChange={(e) => handleSelectVersion(Number(e.target.value))}
        >
          {proposalVersions.map((_, index) => (
            <MenuItem key={index} value={index}>
              {index === proposalVersions.length - 1 ? 'current' : index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* AUTOSAVE ERROR */}
      <Typography sx={{ ml: '50px', color: 'red' }}>
        {hasAutoSaveError ? 'Autosave failed' : null}
      </Typography>

      {/* VERSION CREATOR: renders name of creator of current version... if clinet, add client, else business user*/}
      {proposal.status !== 'signed' && (
        <Box sx={{ fontSize: 12, color: 'grey.500' }}>
          {/* UPDATED TIME STAMP */}
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <Typography>
              {proposal.status === 'signed'
                ? `Signing completed: `
                : proposal.status === 'clientSigned'
                  ? `Client signed: `
                  : `Saved :   `}
            </Typography>
            <Typography sx={{ color: 'black' }}>{updatedAt}</Typography>
          </Box>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            Saved by:
            {versionCreator.role &&
              memoizedVersionCreator}
          </Typography>
          {/* USER ROLE */}
          <Typography sx={{ display: 'flex', gap: '5px' }}>
            Your Role:
            <Typography sx={{ color: 'black', fontWeight: Fonts.BOLD }}>
              {displayRole}
            </Typography>
          </Typography>
        </Box>
      )}

      {/* BUTTONS */}
      <Box>{buttons}</Box>

      <ProposalStatus
        proposal={proposal}
        roleType={roleType}
        proposalVersions={proposalVersions}
        selectedVersionNum={selectedVersionNum}
      />
      {/* PROPOSAL MEMBERS */}
      <AllProposalUsers proposal={proposal} userRole={role} />

      {/* ADD TEAM MEMBERS */}
      {(role === 'businessAdmin' || role === 'clientAdmin') &&
        proposal.status !== 'signed' &&
        proposal.status !== 'clientSigned' && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <AddTeamMembers
              role={role}
              proposal={proposal}
              businessRole={role === 'businessAdmin' ? 'business' : 'client'}
            />
          </Box>
        )}
    </AppCard>
  );
};

export default ProposalSideMenu;
