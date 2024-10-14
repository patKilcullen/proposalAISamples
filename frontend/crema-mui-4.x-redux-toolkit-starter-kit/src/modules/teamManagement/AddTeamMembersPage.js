import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthUser } from '@crema/hooks/AuthHooks';

import AppCard from '@crema/components/AppCard';
import MenuItem from '@mui/material/MenuItem';

import {
  Box,
  Button,
  Typography,
  Autocomplete,
  IconButton,
  TextField,
} from '@mui/material';

import AppComponentHeader from '@crema/components/AppComponentHeader';

import {
  onEditPartialBusiness,
  onCreateUser,
  onGetBusinessUserContacts,
  onGetUserContacts,
  onAddContacts,
} from '../../toolkit/actions';

import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import AppInfoView from '@crema/components/AppInfoView';

import CloseIcon from '@mui/icons-material/Close';

import validator from 'email-validator';

import AddIcon from '@mui/icons-material/Add';
import ComingSoon from 'modules/errorPages/ComingSoon'

const AddTeamMembers = () => {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  const uniqueEmails = useSelector(({ contacts }) => contacts.contacts);
  const { fetchError, showMessage } = useInfoViewActionsContext();
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [memberRole, setMembeRole] = useState('collaborator');
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');

  // GET THE BUSINESS CONTACTS
  useEffect(() => {
    dispatch(onGetUserContacts(user._id));
  }, []);

  // ADD MEmeber to lest when user presses enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleStageContact();
    }
  };

  // ADD user email to list...
  // check for value, check is emai lis valid,
  // trims enteresd data and adds to list
  const handleStageContact = () => {
    if (
      validator.validate(searchValue.trim()) &&
      // validator.validate(memberEmail.trim()) &&
      memberName
    ) {
      if (!selectedEmails.includes(searchValue.trim())) {
        const newMember = {
          name: memberName,
          contactEmail: searchValue.trim(),
          role: memberRole,
          // newEmail: memberEmail,
        };
        setSelectedEmails([...selectedEmails, newMember]);
      }
      setSearchValue('');
      setMemberEmail('');
      setMemberName('');
    } else {
      fetchError(
        !memberName
          ? 'Please fill out entire form'
          : 'Please submit a valid email',
      );
    }
  };

  // ADD Contacts..  adds new emails to user contacts
  const addContacts = () => {
    dispatch(onAddContacts(selectedEmails));
  };

  // ADD MEMBER: creates a user for each staged user,  adds that user to business,
  // sends email and displays success message, otherwise error mesage
  const onAddMember = async () => {
    // Add contacts incase any new emails...
    addContacts();

    // CREATE NEW USER
    try {
      for (const member of selectedEmails) {
        // IMPORTANT will not be creating a new team member... will be adding new 'allowdUSer' to Proposal"
        console.log(
          "IMPORTANT: will not be creating a new team member... will be adding new 'allowdUSer' to Proposal",
        );
        await dispatch(
          // onCREATEUSER on backend no long esitst its used to create google user but this one is no longer needed
          // waiting to chance when proposal includes accessUSers ...
          onCreateUser({
            userName: member.name,
            email: member.contactEmail,
            role: member.role === 'Any' ? 'client' : member.role,
            businessId: user.businessId._id,
          }),
        )
          // EDIT BUSINESS TO INCUDE USER
          .then(async (res) => {
            try {
              await dispatch(
                onEditPartialBusiness({
                  userId: user._id,
                  _id: user.businessId._id,
                  newUser: res.user,
                }),
              )
                // TODO: if setting users to have roloes approve and collaborator, will need to update everwehere the
                // SEND EMAIL TO USER
                .then(() => {
                  try {
                    console.log(
                      ` LINK: http://localhost:4200/new-team-member/${res.user._id} EMAIL to ${member.contactEmail},`,
                    );
                  } catch (error) {
                    console.error('Error during add user send email:', error);
                    fetchError(`Error sending email to ${member.email}`);
                  }
                })
                .then((res) => {
                  // CONFIRMATION MESSAGE
                  showMessage(
                    `${
                      selectedEmails.length > 1
                        ? 'Users'
                        : selectedEmails[0].name
                    } added to buiness`,
                  );
                  setSelectedEmails([]);
                });
            } catch (error) {
              fetchError(`Error creating member: ${error.message}`);
            }
          });
      }
    } catch (error) {
      // ERROR: check error code for dupliucate email code and fetch error accordingly
      if (error.response.data.message) {
        const errorCode = error.response.data.message.substring(0, 7);
        fetchError(
          errorCode.trim() === 'E11000'
            ? `Account Email already exists`
            : `Error creating member: ${error.message}`,
        );
      } else {
        fetchError('Something went wrong');
      }
    }
  };

  // REMOVE CONTACT from staged list
  const handleRemoveContact = (index) => {
    setSelectedEmails(
      selectedEmails.filter((email) => email !== selectedEmails[index]),
    );
  };


  let comingSoon = true
  return (
    <>
      <AppComponentHeader
        title='Add Team Members'
        description='invite new members to join your business'
      />{comingSoon ? 
      <ComingSoon removeNotifyMe={true}/>:
      <AppCard sx={{ maxWidth: '700px' }}>
        <Box sx={{ borderRadius: '5px' }}>
          <Box sx={{ padding: '10px' }}>
            {/* NEW MEMBERSL: SELECTED EMAILS */}
            {selectedEmails?.length > 0 ? (
              <Typography component='p' sx={{ fontSize: 16 }}>
                New Members:{' '}
              </Typography>
            ) : (
              ''
            )}
            {selectedEmails.map((email, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginTop: '5px',
                }}
              >
                <Typography
                  sx={{
                    border: '1px solid black',
                    borderRadius: '10px',
                    height: '50px',
                    width: '175px',
                    padding: '0 10px', // Add padding for better spacing

                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {email.name}
                </Typography>
                <Typography
                  sx={{
                    border: '1px solid black',
                    borderRadius: '10px',
                    height: '50px',
                    width: '40%',
                    padding: '0 10px',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {email.contactEmail}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    sx={{
                      border: '1px solid black',
                      borderRadius: '10px',
                      height: '50px',
                      width: '130px',
                      padding: '0 10px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {email.role}
                  </Typography>
                  <IconButton onClick={() => handleRemoveContact(index)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            {/* ADD NEW MEMBER */}
            <Typography component='p' sx={{ fontSize: 16 }}>
              Add New Member:{' '}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: '5px',
              }}
            >
              <TextField
                required
                id='outlined'
                label='name'
                value={memberName}
                InputLabelProps={{ shrink: true }}
                onChange={(event, newValue) => {
                  setMemberName(event.target.value);
                }}
                sx={{ width: '175px' }}
              />

              {/* MEMBER CONTACT EMAIL INPUT */}
              <Autocomplete
                // sx={{ marginTop: '5px' }}
                sx={{ marginTop: '5px', width: '40%' }}
                value={searchValue}
                onChange={(event, newValue) => {
                  setSearchValue(newValue);
                }}
                onKeyDown={handleKeyDown}
                options={uniqueEmails}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{ shrink: true }}
                    label='contact email'
                  />
                )}
                freeSolo
                filterOptions={(options, params) => {
                  // Filter drop down option to include text matching the input and not include emails already selected
                  const filtered = options.filter(
                    (option) =>
                      option
                        .toLowerCase()
                        .includes(params.inputValue.toLowerCase()) &&
                      !selectedEmails.includes(option),
                  );
                  // if the entered text does not match anythign in the emailas array, setSearch Value to the input
                  if (
                    params.inputValue.trim() !== '' &&
                    !filtered.includes(params.inputValue)
                  ) {
                    setSearchValue(params.inputValue);
                  }
                  return filtered;
                }}
              />
              <Box>
                {/* ROLE DROPDOWN SELECT */}
                <TextField
                  value={memberRole}
                  onChange={(e) => {
                    setMembeRole(e.target.value);
                  }}
                  select
                  label='role'
                >
                  <MenuItem key={1} value='collaborator'>
                    Collaborator
                  </MenuItem>

                  <MenuItem key={2} value='approver'>
                    Approver
                  </MenuItem>
                </TextField>
              </Box>

              <IconButton onClick={handleStageContact}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            marginTop: '16px',
            justifyContent: 'flex-end',
          }}
        >
          {/* SUBMIT BUTTON */}
          <Button
            onClick={() => onAddMember(selectedEmails)}
            variant='contained'
            disabled={!selectedEmails.length > 0}
          >
            Add Members
          </Button>
        </Box>
        <AppInfoView />
        {/* <AppInfoView  /> */}
      </AppCard>}
    </>
  );
};

export default AddTeamMembers;
