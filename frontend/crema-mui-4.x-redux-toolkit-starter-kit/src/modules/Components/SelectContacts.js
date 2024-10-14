import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, TextField, Autocomplete, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AppLoader from '@crema/components/AppLoader';
import CopyLinkButton from './CopyLinkButton';

import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

import { useAuthUser } from '@crema/hooks/AuthHooks';
import validator from 'email-validator';
import ResendVerificationEmail from './VerifyEmail';
import { fetchError } from 'toolkit/actions';
import ExitButton from './ExitButton';
const style = {
  position: 'absolute',
  top: '50vh',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '35vw',
  //   width: '35vw',
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

export default function SelectContacts({
  showContacts,
  setShowContacts,
  handleSubmit,
  link,
  title,
  contacts,
  buttonText,
  setMessage,
  existingEmail,


  selectedEmails,
setSelectedEmails

}) {
  const dispatch = useDispatch()
const {user} = useAuthUser()
  const { loadingContacts, message } = useSelector(({ contacts }) => contacts);
  // FETCH CONTEXT
  // const { fetchError } = useInfoViewActionsContext();
  const [open, setOpen] = useState(false);
  // const [selectedEmails, setSelectedEmails] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [emailVerified, setEmailVerified] = useState(false)


// useEffect(()=>{
// setSelectedEmails([existingEmail]);
// }, [existingEmail])
  // OPEN MODAL When show contacts is set to true, set open and SHOW MODAL
 
  useEffect(() => {

    // FAILED TO LOAD CONTACTS... display message

 if(!loadingContacts && message){

  dispatch(fetchError(message))

  }

    if (showContacts) {

      setOpen(true);
   
    } else {
      setOpen(false);
      setShowContacts(false);
    }
    if(user.verified){
      setEmailVerified(true)
    }
  }, [showContacts]);
 

 
  //   CLOSE MODAL
  const handleClose = () => {
    setOpen(false);
    setShowContacts(false);

  };

  // ADD EMIAIL to list... check for valid email,
  // check to make sure it isnat already included
  // add to array of selected emails
  const handleAddEmail = () => {
    if (validator.validate(searchValue.trim())) {
      if (searchValue.trim() !== '') {
        if (!selectedEmails.includes(searchValue.trim())) {
          setSelectedEmails([...selectedEmails, searchValue.trim()]);
        }
        setSearchValue('');
      }
    } else {
     dispatch(fetchError('Please submit a valid email'));
    }
  };

  // REMOVE contact from list
  const handleRemoveEmail = (index) => {
    setSelectedEmails(
      selectedEmails.filter((email) => email !== selectedEmails[index]),
    );
  };

  //   PRESS ENTER to add email
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <ExitButton onClose={handleClose}/>
        <Typography
          id='modal-modal-title'
          variant='h1'
          component='h2'
          fontWeight='bold'
          sx={{ marginBottom: '20px' }}
        >
          {title}
        </Typography>
        {!emailVerified ? (
          <>
            <Typography>Please verify your email to contiue...</Typography>
            <ResendVerificationEmail  message={"Please verify email address to send a proposal"}/>
          </>
        ) : (
          <Box
            sx={{
              border: '2px solid blue',
              borderRadius: '10px',
              width: '100%',
            }}
          >
            <Box
              sx={{
                padding: '5px',
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
              }}
            >
              {/* SELECTED EMAILS */}
              {selectedEmails.length > 0 && selectedEmails.map((email, index) => (
                <Box
                  key={index}
                  sx={{
                    border: '1px solid black',
                    borderRadius: '20px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      padding: '0 10px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {email}...
                  </Typography>
                  {/* REMOVE CONTACT BUTTONG */}
                  <IconButton
                    sx={{ position: 'absolute', right: '-10px' }}
                    onClick={() => handleRemoveEmail(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
              {/* DISPLAY LOADER when contacts are loading */}
              <Box sx={{ display: 'flex' }}>
                {loadingContacts ? (
                  <Box
                    sx={{
                      width: '250px',
                      height: '53px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <AppLoader />
                  </Box>
                ) : (
                  <>
                    {/* EMAIL FIELDS */}

                    <Autocomplete
                      value={searchValue}
                      onChange={(event, newValue) => {
                        setSearchValue(newValue);
                      }}
                      onKeyDown={handleKeyDown}
                      options={[existingEmail, ...contacts]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Enter Email'
                          sx={{
                            minWidth: '250px',
                            width: '28vw',
                            cursor: 'pointer',
                            marginTop: '5px',
                          }}
                        />
                      )}
                      freeSolo
                      // Filter drop down option to include text matching the input and not include emails already selected
                      filterOptions={(options, params) => {
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

                    {/* ADD/PLUS contact button */}
                    <IconButton onClick={() => handleAddEmail()}>
                      <AddIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        )}
        {/* MESSAGE BOX only display if used has added email to list */}
        {/* {selectedEmails.length > 0 ? (
          <TextField
            multiline
            name='message'
            variant='outlined'
            rows={4}
            sx={{
              width: '100%',
              my: 2,
            }}
            placeholder='message'
            onChange={(e) => setMessage(e.target.value)}
          />
        ) : null} */}
        <Box
          sx={{
            display: 'flex',
            marginTop: '16px',
            justifyContent: 'space-between',
            width: '80%',
          }}
        >
          {/* COPY BUTTON */}
          <CopyLinkButton 
          text={link} 
           />
           {/* SUBMIT BUTTTIN */}
                  <Button
            // onClick={() => handleSubmit(selectedEmails)} 
                onClick={() => {
             
                  handleSubmit(selectedEmails)
//  setSendToClient((prev)=> !prev)
                }} 
            variant='contained'
            // disabled={selectedEmails.length > 0 ? false : true}
            disabled={selectedEmails.length <= 0 || !emailVerified}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
