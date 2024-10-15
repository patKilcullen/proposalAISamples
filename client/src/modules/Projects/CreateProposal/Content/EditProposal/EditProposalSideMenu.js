import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import ProposalSideMenu from 'modules/Projects/ProposalSideMenu';
import { all } from 'axios';

const EditProposalSideMenu = ({
  proposal,
  role,
  handleSendProposalRevision,
  handleSendToClient,
  handleSendUpdateCurrentVersion,
  selectedVersionNum,
  proposalVersions,
  handleSelectVersion,
  status,
  displayRole,
  hasAutoSaveError,
  allowAutoSave,
  roleType,
}) => {
  // BUTTONS
  const buttons =
    selectedVersionNum === proposalVersions?.length - 1 ||
    status === 'draft' ? (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '5px',

          flexWrap: 'wrap',
        }}
      >
        {((role === 'clientAdmin' ||
          role === 'clientCollaborator' ||
          role === 'clientApprover') &&
          status === 'in-revision') ||
        ((role === 'businessAdmin' || role === 'businessCollaborator') &&
          status === 'returned-revision') ||
        (role === 'businessCollaborator' && status === 'returned') ||
        // (status === 'draft' && role === 'businessApprover')  ? null : (
        role === 'businessApprover' ? null : (
          <Button
            sx={{
              padding: 0,
              width: '100%',
              mt: 4,
              height: '40px',
            }}
            color='primary'
            variant='contained'
            type='submit'
            // if user is working on draft, default submit, otherwise if 'user' is on returned, update to returned revision,
            // otherwise updateversion with same status(IS THIS last conditional EVEN USED????)
            onClick={
              status === 'draft' && role === 'businessAdmin'
                ? null
                : role === 'businessAdmin' && status === 'returned'
                  ? () => handleSendProposalRevision('returned-revision')
                  : () => handleSendProposalRevision(status)
            }
          >
            {status === 'draft' &&
            (role === 'businessAdmin' || role === 'businessCollaborator')
              ? 'Save Changes'
              : 'Edit'}
          </Button>
        )}

        {role === 'businessAdmin' || role === 'clientAdmin' ? (
          <Button
            sx={{
              padding: 0,
              width: '100%',
              mt: 4,
              height: '40px',
            }}
            color='primary'
            variant='contained'
            type='submit'
            // depending on user type and proposal status, update current version(do not not create new version)
            // and update status accordingly... If status is "returned" to user, user can accept and send same version back,
            onClick={
              role === 'businessAdmin' && status === 'draft'
                ? // SEND PROPOSAL POP UP/MODAL
                  handleSendToClient
                : role === 'clientAdmin' && status === 'in-revision'
                  ? () => {
                      handleSendUpdateCurrentVersion('returned');
                    }
                  : (role === 'businessAdmin' &&
                        status === 'returned-revision') ||
                      // if user hits (accept on returned proposal,keep clients changes and update status to sent)
                      (role === 'businessAdmin' && status === 'returned')
                    ? () => {
                        handleSendUpdateCurrentVersion('sent');
                      }
                    : null
            }
          >
            {role === 'businessAdmin' && status === 'returned'
              ? 'Accept'
              : `Send to ${role === 'businessAdmin' ? 'Client' : 'Business'}`}
          </Button>
        ) : (
          // Use empy box to keep styling consistent in where last updated section is place
          <Box
            sx={{
              padding: 0,
              width: '125px',
              mt: 4,
              height: '40px',
            }}
          />
        )}
      </Box>
    ) : null;

  return (
    <ProposalSideMenu
      buttons={buttons}
      proposal={proposal}
      proposalVersions={proposalVersions}
      handleSelectVersion={handleSelectVersion}
      role={role}
      selectedVersionNum={selectedVersionNum}
      status={status}
      displayRole={displayRole}
      hasAutoSaveError={hasAutoSaveError}
      editProposal={true}
      roleType={roleType}
    />
  );
};

export default EditProposalSideMenu;
