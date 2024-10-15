import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Signature from './Singnature';
import ProposalSideMenu from '../ProposalSideMenu';

import { roleStatusDisplay } from 'utils/roleStatusDisplay';
const SentProposalSideMenu = ({
  proposal,
  role,
  selectedVersionNum,
  proposalVersions,
  handleSelectVersion,
  status,
  displayRole,
  handleClientEdit,
  handleSumbitProposal,
  handleSendClientSignature,
  proposalVersion,
  handleAddClientSignature,
  handleAddBusinessSignature,
  resetSignature,
  openTimer,
  setOpenTimer,
  roleType,
}) => {
  const [sign, setSign] = useState(false);
  const [signatories, setSignatories] = useState({
    client: null,
    business: null,
  });

  // OPEN OTP TIMER (needs to be in hte grandparent component)
  // const [openTimer, setOpenTimer] = useState(false);
  // BUTTONS
  const buttons = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '5px',

        flexWrap: 'wrap',
      }}
    >
      <>
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
          onClick={handleClientEdit}
          disabled={
            !(
              role === 'clientAdmin' &&
              proposal.status === 'sent' &&
              selectedVersionNum === proposalVersions.length - 1
            )
          }
        >
          Edit
        </Button>
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
          onClick={() => setSign(true)}
          /* If status is sent, user is client, and they are on latest version, show signature box,
        if client singed and user is business, show signature box, else show not signed message*/
          disabled={
            (!(
              (role === 'clientAdmin' || role === 'clientApprover') &&
              proposal.status === 'sent' &&
              selectedVersionNum === proposalVersions.length - 1
            ) &&
              !(
                proposal?.status === 'clientSigned' &&
                roleType === 'business' &&
                selectedVersionNum === proposalVersions.length - 1
              )) ||
            (roleType === 'Business' &&
              proposal.status !== 'clientSigned' &&
              proposal.status === 'signed') //necessary????
          }
        >
          Sign Proposal
        </Button>
      </>

      {/* ADD SIGNATURE MODAL */}
      <Signature
        handleSumbitProposal={handleSumbitProposal}
        handleSendClientSignature={handleSendClientSignature}
        sign={sign}
        setSign={setSign}
        content={proposalVersion}
        handleAddClientSignature={handleAddClientSignature}
        handleAddBusinessSignature={handleAddBusinessSignature}
        resetSignature={resetSignature}
        openTimer={openTimer}
        setOpenTimer={setOpenTimer}
        proposal={proposal}
        role={role}
      />
    </Box>
  );
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
      roleType={roleType}
    />
  );
};

export default SentProposalSideMenu;
