// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useAuthUser } from '@crema/hooks/AuthHooks';

// import AppCard from '@crema/components/AppCard';
// import MenuItem from '@mui/material/MenuItem';

// import {
//   Box,
//   Button,
//   Typography,
//   Autocomplete,
//   IconButton,
//   TextField,
//   Modal,
// } from '@mui/material';

// import AppComponentHeader from '@crema/components/AppComponentHeader';
// import { onGetUserContacts } from '../../toolkit/actions';
// import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

// import CloseIcon from '@mui/icons-material/Close';
// import validator from 'email-validator';
// import AddIcon from '@mui/icons-material/Add';
// import ExitButton from 'modules/Components/ExitButton';
// import CopyLinkButton from 'modules/Components/CopyLinkButton';
// import AppInfoView from '@crema/components/AppInfoView';
// import AppTooltip from '@crema/components/AppTooltip';

// // Modal style
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   minWidth: '35vw',
//   maxHeight: '90vh',
//   overflowY: 'auto',
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   borderRadius: '20px',
// };

// export default function SelectContactsWithRole({
//   open,
//   handleClose,
//   title,
//   buttonText,
//   sendInitialProposal,
//   link,
//   onSend,
// }) {
//   const { user } = useAuthUser();
//   const dispatch = useDispatch();
//   const uniqueEmails = useSelector(({ contacts }) => contacts.contacts);
//   const { fetchError } = useInfoViewActionsContext();

//   const [selectedEmails, setSelectedEmails] = useState([]);
//   const [searchValue, setSearchValue] = useState('');
//   const [memberRole, setMembeRole] = useState('collaborator');
//   const [memberName, setMemberName] = useState('');

//   // GET THE BUSINESS CONTACTS
//   useEffect(() => {
//     dispatch(onGetUserContacts(user._id));
//   }, [dispatch, user._id]);

//   // ADD user email to list
//   const handleStageContact = () => {
//     if (validator.validate(searchValue.trim()) && memberName) {
//       if (!selectedEmails.includes(searchValue.trim())) {
//         const newMember = {
//           name: memberName,
//           contactEmail: searchValue.trim(),
//           role: memberRole,
//         };
//         setSelectedEmails([...selectedEmails, newMember]);
//       }
//       setSearchValue('');
//       setMemberName('');
//     } else {
//        fetchError(
//         !memberName
//           ? 'Please fill out the entire form'
//           : 'Please submit a valid email'
//       );
//     }
//   };

//   // REMOVE CONTACT from staged list
//   const handleRemoveContact = (index) => {
//     setSelectedEmails(
//       selectedEmails.filter((email) => email !== selectedEmails[index])
//     );
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby='modal-modal-title'
//       aria-describedby='modal-modal-description'
//     >
//       <Box sx={style}>
//         <ExitButton onClose={handleClose} />
//         <AppComponentHeader title={title} />
//            <Typography component='p' sx={{ fontSize: 10, mt: -4 }}>
//                    Add new contact to this proposal{' '}
//               </Typography>
//         <AppCard sx={{ maxWidth: '700px' }}>
//           <Box sx={{ borderRadius: '0px' }}>
//             <Box sx={{ padding: '10px' }}>
//               {/* ADD NEW MEMBER */}
//               {/* <Typography component='p' sx={{ fontSize: 16 }}>
//                 Add New Contact To This Proposal:{' '}
//               </Typography> */}
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   flexWrap: { xs: 'wrap', sm: 'nowrap', gap: "10px" },
//                   marginTop: '5px',
//                 }}
//               >
//                 <TextField
//                   required
//                   id='outlined'
//                   label='Name'
//                   value={memberName}
//                   InputLabelProps={{ shrink: true }}
//                   onChange={(event) => {
//                     setMemberName(event.target.value);
//                   }}
//                   sx={{ width: '175px', mt: 1 }}
//                 />

//                 {/* MEMBER CONTACT EMAIL INPUT */}
//                 <Autocomplete
//                   sx={{ marginTop: '5px' }}
//                   value={searchValue}
//                   onChange={(event, newValue) => {
//                     setSearchValue(newValue);
//                   }}
//                   options={uniqueEmails}
//                   renderInput={(params) => (
//                     <TextField
//                       required
//                       {...params}
//                       InputLabelProps={{ shrink: true }}
//                       label='Email'
//                       sx={{ width: '250px' }}
//                     />
//                   )}
//                   freeSolo
//                   filterOptions={(options, params) => {
//                     const filtered = options.filter(
//                       (option) =>
//                         option
//                           .toLowerCase()
//                           .includes(params.inputValue.toLowerCase()) &&
//                         !selectedEmails.includes(option)
//                     );
//                     if (
//                       params.inputValue.trim() !== '' &&
//                       !filtered.includes(params.inputValue)
//                     ) {
//                       setSearchValue(params.inputValue);
//                     }
//                     return filtered;
//                   }}
//                 />

//                 {/* ROLE DROPDOWN SELECT */}
//                 <TextField
//                   required
//                   value={memberRole}
//                   onChange={(e) => {
//                     setMembeRole(e.target.value);
//                   }}
//                   select
//                   label='Role'
//                   sx={{ width: '130px', mt: 1 }}
//                 >
//                   {sendInitialProposal && (
//                     <MenuItem key={1} value='Administrator'>
//                       Administrator
//                     </MenuItem>
//                   )}
//                   <MenuItem key={1} value='Collaborator'>
//                     Collaborator
//                   </MenuItem>
//                   <MenuItem key={2} value='Approver'>
//                     Approver
//                   </MenuItem>
//                 </TextField>

//                 <IconButton onClick={handleStageContact}>
//                   <AddIcon />
//                 </IconButton>
//               </Box>

//               {/* NEW MEMBERS: SELECTED EMAILS */}
//               {selectedEmails.length > 0 && (
//                 <Typography component='p' sx={{ fontSize: 16, mt: 4 }}>
//                   Contacts:{' '}
//                 </Typography>
//               )}
//               {selectedEmails.map((email, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     marginTop: '5px',
//                     flexWrap: { xs: 'wrap', sm: 'nowrap' },
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                        borderBottom: '1px solid grey',

//                       // borderRadius: '10px',
//                       height: '50px',
//                       width: '175px',
//                       padding: '0 10px',
//                       display: 'flex',
//                       alignItems: 'center',
//                       overflow: 'hidden',

//                     }}
//                   >
//                     {email.name}
//                   </Typography>
//                   <AppTooltip title={email.contactEmail}>
//                   <Typography
//                     sx={{
//                       borderBottom: '1px solid grey',

//                       // borderRadius: '10px',
//                       height: '50px',
//                       width: '250px',
//                       padding: '0 10px',
//                       display: 'flex',
//                       alignItems: 'center',
//                        overflow: 'hidden',
//                       // ml: -10
//                     }}
//                   >
//                     {email.contactEmail}
//                   </Typography>
//                   </AppTooltip>
//                   <Box sx={{ display: 'flex' }}>
//                     <Typography
//                       sx={{
//                        borderBottom: '1px solid grey',

//                       // borderRadius: '10px',
//                         height: '50px',
//                         width: '130px',
//                         padding: '0 10px',
//                         display: 'flex',
//                         alignItems: 'center',
//                       }}
//                     >
//                       {email.role}
//                     </Typography>
//                     <IconButton onClick={() => handleRemoveContact(index)}>
//                       <CloseIcon />
//                     </IconButton>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </Box>

//           <Box
//             sx={{
//               display: 'flex',
//               marginTop: '16px',
//               justifyContent: link ? 'space-around' : 'flex-end',
//             }}
//           >
//             {/* COPY LINK BUTTON */}
//             {link && <CopyLinkButton text={link} />}

//             {/* SUBMIT BUTTON */}
//             <Button
//               onClick={() => onSend(selectedEmails)}
//               variant='contained'
//               disabled={!selectedEmails.length > 0}
//             >
//               {buttonText}
//             </Button>
//           </Box>
//         </AppCard>
//         <AppInfoView type="context" />
//       </Box>
//     </Modal>
//   );
// }

import React, { useEffect, useState } from 'react';
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
  Modal,
} from '@mui/material';

import AppComponentHeader from '@crema/components/AppComponentHeader';
import { onGetUserContacts } from '../../toolkit/actions';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

import CloseIcon from '@mui/icons-material/Close';
import validator from 'email-validator';
import AddIcon from '@mui/icons-material/Add';
import ExitButton from 'modules/Components/ExitButton';
import CopyLinkButton from 'modules/Components/CopyLinkButton';
import AppInfoView from '@crema/components/AppInfoView';
import AppTooltip from '@crema/components/AppTooltip';
import SingleUser from 'modules/Users/AllProposalUsers/SingleUser';
// Modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '35vw',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '20px',
};

export default function SelectContactsWithRole({
  open,
  handleClose,
  title,
  buttonText,
  sendInitialProposal,
  link,
  onSend,
}) {
  const { user } = useAuthUser();
  const dispatch = useDispatch();
  const uniqueEmails = useSelector(({ contacts }) => contacts.contacts);
  const { fetchError } = useInfoViewActionsContext();

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [memberRole, setMembeRole] = useState(
    sendInitialProposal ? 'Administrator' : 'Collaborator',
  );
  const [emailError, setEmailError] = useState(false);

  // GET THE BUSINESS CONTACTS
  useEffect(() => {
    dispatch(onGetUserContacts(user._id));
  }, [dispatch, user._id]);

  // ADD user email to list
  const handleStageContact = (e) => {
    setEmailError(false);
    if (e.key === 'Enter') {
      if (validator.validate(searchValue.trim())) {
      // if email not already added to selectsEmails, add it
         if (!selectedEmails.filter((email) => email.contactEmail === searchValue.trim()).length) {
          const newMember = {
            contactEmail: searchValue.trim(),
            role: memberRole,
          };

          setSelectedEmails([...selectedEmails, newMember]);
        }
        setSearchValue('');
      } else {
        setEmailError(true);
      }
    }
  };

  // REMOVE CONTACT from staged list
  const handleRemoveContact = (index) => {
    setSelectedEmails(
      selectedEmails.filter((email) => email !== selectedEmails[index]),
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <ExitButton onClose={handleClose} />
        <AppComponentHeader title={title} />
        <Typography component='p' sx={{ fontSize: 10, mt: -4 }}>
          Add new contact to this proposal{' '}
        </Typography>
        <AppCard sx={{ maxWidth: '700px' }}>
          <Box>
            <Box sx={{ padding: '10px' }}>
              {/* ADD NEW MEMBER */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexWrap: { xs: 'wrap', sm: 'nowrap', gap: '10px' },
                  marginTop: '5px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Box sx={{ border: '2px solid blue', width: '400px' }}>
                    {/* SELECTED EMAILS */}
                    {selectedEmails.map((email, index) => (
                      <Box
                        key={index}
                        sx={{
                          alignItems: 'center',
                          marginTop: '5px',
                          flexWrap: 'wrap',
                          border: '2px solid blue',
                          borderRadius: '25px',
                          display: 'inline-flex',
                          width: 'auto',
                          overflow: 'hidden',
                        }}
                      >
                        <AppTooltip title={email.contactEmail}>
                          <Box sx={{ maxWidth: '250px' }}>
                            <SingleUser
                              user={{ userName: email.contactEmail }}
                            />
                          </Box>
                        </AppTooltip>
                        <Box sx={{ display: 'flex' }}>
                          <IconButton
                            onClick={() => handleRemoveContact(index)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                    {/* MEMBER CONTACT EMAIL INPUT */}

                    <Autocomplete
                        // disablePortal
                      onKeyDown={handleStageContact}
                      sx={{ marginTop: '5px' }}
                      value={searchValue}
                      onChange={(event, newValue) => {
                        setSearchValue(newValue);
                      }}
                      options={uniqueEmails}
                      renderInput={(params) => (
                        <TextField
                          
                          required
                          {...params}
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none',
                              },
                            },
                            '& .MuiInput-underline:before': {
                              borderBottom: 'none',
                            },
                            '& .MuiInput-underline:after': {
                              borderBottom: 'none',
                            },
                          }}
                        />
                      )}
                      freeSolo
                      filterOptions={(options, params) => {
                        const filtered = options.filter(
                          (option) =>
                            option
                              .toLowerCase()
                              .includes(params.inputValue.toLowerCase()) &&
                            !selectedEmails.includes(option),
                        );
                        if (
                          params.inputValue.trim() !== '' &&
                          !filtered.includes(params.inputValue)
                        ) {
                          setSearchValue(params.inputValue);
                        }
                        return filtered;
                      }}
                    />
                  </Box>
                  {emailError && (
                    <Typography sx={{ color: 'red' }}>
                      Please enter a vald email address.
                    </Typography>
                  )}
                </Box>
                {/* ROLE DROPDOWN SELECT */}
                <TextField
                  defaultValue={'Collaborator'}
                  required
                  value={memberRole}
                  onChange={(e) => {
                    setMembeRole(e.target.value);
                  }}
                  select
                  label='Role'
                  sx={{ width: '130px', mt: 1, alignSelf: 'flex-end' }}
                >
                  {sendInitialProposal && (
                    <MenuItem key={0} value='Administrator'>
                      Administrator
                    </MenuItem>
                  )}
                  {!sendInitialProposal && (
                    <MenuItem key={1} value='Collaborator'>
                      Collaborator
                    </MenuItem>
                  )}
                  {!sendInitialProposal && (
                    <MenuItem key={2} value='Approver'>
                      Approver
                    </MenuItem>
                  )}
                </TextField>
                {/* 
                <IconButton sx={{alignSelf: "center"}} onClick={()=>handleStageContact({key: "Enter"})}>
                  <AddIcon />
                </IconButton> */}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              marginTop: '16px',
              justifyContent: link ? 'space-around' : 'flex-end',
            }}
          >
            {/* COPY LINK BUTTON */}
            {link && <CopyLinkButton text={link} />}
          

            {/* SUBMIT BUTTON */}
            <Button
              onClick={() => onSend(selectedEmails)}
              variant='contained'
              disabled={!selectedEmails.length > 0}
            >
              {buttonText}
            </Button>
          </Box>
         
        </AppCard>
        <AppInfoView type='context' />
      </Box>
    </Modal>
  );
}
