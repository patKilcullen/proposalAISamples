import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Box, Button } from '@mui/material';
import { onAddContacts, onSendUserInvite } from '../../toolkit/actions';
import PleaseCreateBusiness from 'modules/errorPages/PleaseCreateBusinessModal';
import SelectContactsWithRole from 'modules/Components/SelectContactsWithRole';

export default function AddTeamMembers({ proposal, businessRole, role }) {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [openAddTeamMembers, setOpenAddTeamMembers] = useState(false);
  const [updateClientAsBusiness, setUpdateClientAsBusiness] = useState(false);

  // OPEN ADD TEAM MEMBERS
  // avaiable to business and client admins only if businesness onbaording complete, otherwise show please create proposal modal
  const [showPleaseCreateBusiness, setShowPleaseCreateBusiness] =
    useState(false);
  const handleOpenAddTeamMembers = (type) => {
    if (role === 'clientAdmin' && !user.businessId?.onboardingComplete) {
      setShowPleaseCreateBusiness(true);
    } else {
      // if type is businessToClient, business Admin is updated client
      if (type === 'businessToClient') {
        setUpdateClientAsBusiness(true);
      } else {
        setUpdateClientAsBusiness(false);
      }
      setOpenAddTeamMembers(true);
    }
  };
  const handleCloseAddTeamMembers = () => setOpenAddTeamMembers(false);

  // ADD Contacts..  adds new emails to user contacts
  const addContacts = () => {
    const onlyEmails = selectedEmails.map((user) => user.contactEmail);
    dispatch(onAddContacts(onlyEmails));
  };

  // ADD MEMBER: sends invite email to each user
  const onAddMember = async (selectedEmails) => {
    addContacts();
    for (const member of selectedEmails) {
      dispatch(
        onSendUserInvite({
          proposal,
          // if type is businessToClient, business Admin is updated client, so use 'client'
          role: `${updateClientAsBusiness ? 'client' : businessRole}${member.role}`,
          clientEmail: member.contactEmail,
        }),
      );
    }
    handleCloseAddTeamMembers();
  };

  return (
    <Box>
      {/* ADD TEAM MEMBERS */}
      {(role === 'businessAdmin' || role === 'clientAdmin') && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => handleOpenAddTeamMembers()} color='primary'>
            Add Team Members
          </Button>
        </Box>
      )}
      {/* ADD CLEINT TEAM MEMBERS IF BUSINESS ADMIN */}
      {role === 'businessAdmin' && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => handleOpenAddTeamMembers('businessToClient')}
            color='primary'
          >
            Add Client Team Members
          </Button>
        </Box>
      )}
      {/* PLEASE CREATE BUSINESS/COMPLETE ONBOARDING */}
      {showPleaseCreateBusiness && (
        <PleaseCreateBusiness
          open={showPleaseCreateBusiness}
          setOpen={setShowPleaseCreateBusiness}
          message={'to add team members to a proposal'}
        />
      )}
      {/* ADD MEMBERS MODAL */}
      <SelectContactsWithRole
        title={'Add New Team Members'}
        buttonText={'Add Members'}
        open={openAddTeamMembers}
        handleClose={handleCloseAddTeamMembers}
        onSend={onAddMember}
      />
    </Box>
  );
}
