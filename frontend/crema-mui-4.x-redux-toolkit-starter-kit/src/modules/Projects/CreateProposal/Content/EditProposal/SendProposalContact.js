import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  onGetUserContacts,
  onAddContacts,
  onSendUserInvite,
} from '../../../../../toolkit/actions';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import SelectContactsWithRole from 'modules/Components/SelectContactsWithRole';
export default function SendProposalContact({
  showContacts,
  sendToClient,
  setShowContacts,
  proposal,
  setSendToClient,
}) {
  const dispatch = useDispatch();
  const business = useSelector(({ business }) => business.singleBusiness);
  const uniqueEmails = useSelector(({ contacts }) => contacts.contacts);
  const [message, setMessage] = useState('');
  const { fetchError } = useInfoViewActionsContext();

  const { user } = useAuthUser();

  useEffect(() => {
    if (business?._id) {
      dispatch(onGetUserContacts(user._id));
    }
  }, [business]);

  // ADD Contacts
  const addContacts = () => {
    dispatch(onAddContacts(selectedEmails));
  };

  // SEND EMAIL TO EACH CLIENT ADDED
  //  Adds contacts then runds handleSendClient in index
  // and passes in email to send proposalto each email
  const handleSendToClient = async (selectedEmails) => {
    addContacts();

    let adminEmails = [];
    let roleEmails = [];

    for (const email of selectedEmails) {
      if (email.role === 'Administrator') {
        adminEmails.push(email.contactEmail);
      } else {
        roleEmails.push(email);
      }
    }
    // check if required admin role iexists... if not, error app diaplue
    if (adminEmails.length < 1) {
      fetchError('You must assign as least one contact as an Administrator');
      return;
    }

    sendToClient({
      clientEmails: adminEmails,
    });

    for (const email of roleEmails) {
      dispatch(
        onSendUserInvite({
          proposal,
          role: `client${email.role}`,
          clientName: email.name,
          clientEmail: email.contactEmail,
        }),
      );
    }
  };

  // EXISTING EMAIL that user already entered for client
  const [existingEmail, setExistingEmail] = useState('');
  useEffect(() => {
    if (proposal) {
      setExistingEmail(proposal?.metadata?.clientInfo?.clientRepEmail);
    }
  }, [proposal]);

  // RESET sendToClient if showContacts is false/in case of errors when sendign emai land then resend attempt
  useEffect(() => {
    if (!showContacts) {
      setSendToClient(false);
    }
  }, [showContacts]);

  const [selectedEmails, setSelectedEmails] = useState([]);
  useEffect(() => {
    setSelectedEmails([existingEmail]);
  }, [existingEmail]);

  const handleCloseContacts = () => {
    setShowContacts(false);
  };

  return (
    <SelectContactsWithRole
      sendInitialProposal={true}
      open={showContacts}
      handleClose={handleCloseContacts}
      handleSubmit={handleSendToClient}
      //  link={`${process.env.REACT_APP_BASE_URL}/edit-poject/${proposal._id}`}
      title='Send Proposal'
      contacts={uniqueEmails}
      buttonText={'Send Email'}
      message={message}
      setMessage={setMessage}
      existingEmail={existingEmail}
      setSendToClient={setSendToClient}
      selectedEmails={selectedEmails}
      setSelectedEmails={setSelectedEmails}
      proposal={proposal}
      onSend={handleSendToClient}
    />
  );
}
